from django.urls import path

from . import views

app_name = "ragwebapp"

urlpatterns = [
    path("", views.index, name="index"),
    path("chat/<int:chat_id>", views.chat, name="chat"),
    path("newchat", views.new_chat, name="new_chat"),
]
