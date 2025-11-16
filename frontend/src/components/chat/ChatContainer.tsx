import ChatAIInput from "@/components/chat/ChatAIInput";
import ContentWrapper from "@/components/ui/ContentWrapper";
import useChat from "@/hooks/useChat";

const ChatContainer = ({ chatId }: { chatId: string }) => {
  const { messages } = useChat({ chatId });
  console.log("messages", messages);

  return (
    <>
      <ContentWrapper width="100%" flexValue="1 1 auto">
        asd
      </ContentWrapper>
      <ContentWrapper width="100%">
        <ChatAIInput />
      </ContentWrapper>
    </>
  );
};

export default ChatContainer;
