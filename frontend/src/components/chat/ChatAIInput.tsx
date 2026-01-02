import ContentWrapper from "@/components/ui/ContentWrapper";
import IconWrapper from "@/components/ui/IconWrapper";
import useChatInput from "@/hooks/useChatInput";
import { css, cx } from "@emotion/css";
import { Button, FileButton, Textarea, Tooltip } from "@mantine/core";
import { ChevronUp, Paperclip, Lock, Globe } from "lucide-react";
import { useState } from "react";
import type { UUID } from "@/types/global";
import type { ChatRoomType } from "@/api/enums/ChatRoom";
import { typography } from "@/constants/typography";
import { useUserSWR } from "@/hooks/useUser";

const ChatAIInput = ({ chatId }: { chatId?: UUID }) => {
  const [mode, setMode] = useState<ChatRoomType>("GLOBAL");
  const { user } = useUserSWR();

  const toggleMode = () => {
    if (!user && mode === "GLOBAL") {
      // Nie pozwalaj przełączyć na PRIVATE jeśli nie jest zalogowany
      return;
    }
    setMode((prev) => (prev === "GLOBAL" ? "PRIVATE" : "GLOBAL"));
  };
  const { setFile, message, setMessage, sendMessage } = useChatInput({
    chatId,
    mode,
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage(event as any);
    }
  };

  return (
    <form
      onSubmit={sendMessage}
      className={css`
        width: 100%;
      `}
    >
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        autosize
        minRows={1}
        maxRows={5}
        className={cx(
          css`
            .mantine-Textarea-section[data-position="left"] {
              width: 50px;
              align-items: flex-end;
              padding-bottom: 8px;
            }

            .mantine-Textarea-section[data-position="right"] {
              width: 80px;
              align-items: flex-end;
              padding-bottom: 8px;
            }

            textarea {
              border-radius: 24px;
              padding: 15px 60px 15px 50px;
            }
          `
        )}
        leftSection={
          <ContentWrapper id="asdz">
            <FileButton onChange={setFile} accept="*">
              {(props) => <IconWrapper {...props} Icon={Paperclip} />}
            </FileButton>
          </ContentWrapper>
        }
        rightSection={
          <ContentWrapper gap="10px" direction="row">
            <Tooltip
              label={
                !user && mode === "GLOBAL"
                  ? "Log in to create private chats"
                  : mode === "GLOBAL"
                  ? "Global chat - visible to everyone"
                  : "Private chat - only you can see it"
              }
              position="top"
            >
              <Button
                onClick={toggleMode}
                disabled={!user && mode === "GLOBAL"}
                className={css`
                  padding: 0 !important;
                  background: white;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 34px !important;
                  height: 34px !important;
                  ${!user && mode === "GLOBAL"
                    ? "opacity: 0.5; cursor: not-allowed;"
                    : ""}
                `}
              >
                <IconWrapper
                  Icon={mode === "GLOBAL" ? Globe : Lock}
                  color="black"
                />
              </Button>
            </Tooltip>

            <Button
              type="submit"
              onClick={toggleMode}
              className={css`
                padding: 0 !important;
                background: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 20px;
                width: 34px !important;
                height: 34px !important;
              `}
            >
              <IconWrapper Icon={ChevronUp} color="black" />
            </Button>
          </ContentWrapper>
        }
        placeholder="What's up, Doc?"
        style={{ flex: 1 }}
      />
    </form>
  );
};
export default ChatAIInput;

// import ContentWrapper from "@/components/ui/ContentWrapper";
// import IconWrapper from "@/components/ui/IconWrapper";
// import { styles } from "@/constants/styles";
// import { typography } from "@/constants/typography";
// import useChatInput from "@/hooks/useChatInput";
// import { css, cx } from "@emotion/css";
// import {
//   Button,
//   FileButton,
//   FileInput,
//   Group,
//   Pill,
//   TextInput,
// } from "@mantine/core";
// import { ChevronUp, MoveUp, Paperclip } from "lucide-react";
// import { useState } from "react";
// import type { UUID } from "@/types/global";
// import type { ChatRoomType } from "@/api/enums/ChatRoom";

// const ChatAIInput = ({ chatId }: { chatId?: UUID }) => {
//   const [mode, setMode] = useState<ChatRoomType>("GLOBAL");
//   const { file, setFile, message, setMessage, sendMessage } = useChatInput({
//     chatId,
//     mode,
//   });

//   return (
//     <form
//       onSubmit={sendMessage}
//       className={css`
//         width: 100%;
//       `}
//     >
//       <TextInput
//         value={message}
//         onChange={(e) => setMessage(e.currentTarget.value)}
//         className={css`
//           .mantine-TextInput-section[data-position="left"] {
//             width: 50px;
//           }

//           .mantine-TextInput-section[data-position="right"] {
//             width: 80px;
//           }

//           input {
//             border-radius: 30px;
//             height: initial;
//             padding: 10px 60px 10px 50px;
//           }
//         `}
//         leftSection={
//           <FileButton onChange={setFile} accept="*">
//             {(props) => <IconWrapper {...props} Icon={Paperclip} />}
//           </FileButton>
//         }
//         rightSection={
//           <ContentWrapper gap="10px" direction="row">
//             <button
//               type="submit"
//               className={css`
//                 background: white;
//                 border-radius: 50%;
//                 padding: 6px;
//                 display: flex;
//                 align-items: center;
//                 justify-content: center;
//                 cursor: pointer;
//               `}
//             >
//               <IconWrapper Icon={ChevronUp} color="black" />
//             </button>
//             <button
//               type="submit"
//               className={css`
//                 background: white;
//                 border-radius: 50%;
//                 padding: 6px;
//                 display: flex;
//                 align-items: center;
//                 justify-content: center;
//                 cursor: pointer;
//                 margin-right: 20px;
//               `}
//             >
//               <IconWrapper Icon={ChevronUp} color="black" />
//             </button>
//           </ContentWrapper>
//         }
//         placeholder="What's up, Doc?"
//         style={{ flex: 1 }}
//       />
//     </form>
//   );
// };

// export default ChatAIInput;
