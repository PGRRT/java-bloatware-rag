import logging
from typing import List

import httpx
from django import forms
from django.core.files.uploadedfile import UploadedFile
from django.http import HttpResponse, HttpRequest, JsonResponse
from django.shortcuts import render, redirect
from .models import ChatConversation, ChatMessage

logger = logging.getLogger(__name__)


def index(request: HttpRequest) -> HttpResponse:
    context = {"chats": ChatConversation.objects.all()}
    return HttpResponse(
        render(request=request, template_name="ragwebapp/index.html", context=context)
    )


class MultipleFileInput(forms.ClearableFileInput):
    allow_multiple_selected = True


class MultipleFileField(forms.FileField):
    def __init__(self, *args, **kwargs) -> None:
        kwargs.setdefault("widget", MultipleFileInput())
        super().__init__(*args, **kwargs)

    def clean(self, data, initial=None) -> list | list[bool]:
        single_file_clean = super().clean
        if isinstance(data, (list, tuple)):
            result = [single_file_clean(d, initial) for d in data]
        else:
            result = [single_file_clean(data, initial)]
        return result


class MessageForm(forms.Form):
    message = forms.CharField(required=False)
    attachments = MultipleFileField(required=False)


def chat(request: HttpRequest, chat_id: int) -> HttpResponse | JsonResponse:
    if request.method == "POST":
        form = MessageForm(request.POST, request.FILES)
        form.full_clean()

        logger.info("Cleaned data:", form.cleaned_data)

        message: str | None = form.cleaned_data.get("message")
        attachments: List[UploadedFile] | None = form.cleaned_data.get("attachments")

        # TODO :: API URL from config

        with httpx.Client() as client:
            if attachments:
                logger.info(f"Sending {len(attachments)} to the API")

                files = [
                    ("files", (file.name, file, file.content_type))
                    for file in attachments
                ]

                client.post(f"http://localhost:8081/upload/{chat_id}", files=files)

            if message:
                logger.info("Sending query to the API")
                response = client.post(
                    f"http://localhost:8081/query/{chat_id}", json={"query": message}
                )

                query = ChatMessage(
                    message=message, is_response=False, conversation_id=chat_id
                )
                rag_response = ChatMessage(
                    message=response.json()["message"],
                    is_response=True,
                    conversation_id=chat_id,
                )

                query.save()
                rag_response.save()

        return redirect("ragwebapp:chat", chat_id=chat_id)
        # return JsonResponse(
        #    data={"hello": "hell"}
        # )
    else:
        chat_conversation: ChatConversation = ChatConversation.objects.get(id=chat_id)
        messages = chat_conversation.chatmessage_set.all()

        chats = ChatConversation.objects.all()

        print(chats)

        context = {"chat_id": chat_id, "messages": messages, "chats": chats}
        return HttpResponse(
            render(
                request=request, template_name="ragwebapp/chat.html", context=context
            )
        )


def new_chat(request: HttpRequest) -> HttpResponse:
    new_conversation = ChatConversation(title="Example title")
    new_conversation.save()

    print(new_conversation.id)

    return redirect("ragwebapp:chat", chat_id=new_conversation.id)
