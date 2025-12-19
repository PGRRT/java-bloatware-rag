import SidebarChatItem from "@/components/sidebar/SidebarChatItem";
import ContentWrapper from "@/components/ui/ContentWrapper";
import IconWrapper from "@/components/ui/IconWrapper";
import colorPalette from "@/constants/colorPalette";
import { styles } from "@/constants/styles";
import { typography } from "@/constants/typography";
import { css, cx } from "@emotion/css";
import { Tooltip, UnstyledButton, Text, Button } from "@mantine/core";
import { SettingsIcon, SquarePen } from "lucide-react";
import { useState } from "react";

const generalOptions = [
  {
    id: 1,
    label: "New chat",
    icon: SquarePen,
    action: () => console.log("New chat clicked"),
    isDisabled: false,
  },
  {
    id: 2,
    label: "Search chats",
    icon: SettingsIcon,
    action: () => console.log("Search chats clicked"),
    isDisabled: true,
  },
];

const defaultChat = [
  {
    id: 1,
    label: "Amazing road to AI",
  },
  {
    id: 2,
    label: "Understanding machine learning",
  },
  {
    id: 3,
    label: "Deep dive into neural networks",
  },
];

const SidebarContent = ({ expanded }) => {
  const [chats, setChats] = useState(defaultChat);

  if (!expanded) {
    return null;
  }

  return (
    <ContentWrapper
      gap="10px"
      direction="column"
      customCss={css`
        padding: 5px;
      `}
    >
      <ContentWrapper>
        {generalOptions.map((item) => (
          <SidebarChatItem
            key={item.id}
            label={item.label}
            icon={item.icon}
            action={item.action}
            isDisabled={item.isDisabled}
          />
          // <ContentWrapper
          //   key={item.label}
          //   gap="10px"
          //   align="center"
          //   customCss={css`
          //     transition: background 0.2s;
          //     padding: 10px;
          //     border-radius: ${styles.borderRadius.small};
          //     width: 100%;
          //     color: ${colorPalette.text};
          //     &:hover {
          //       background: ${colorPalette.backgroundTertiary};
          //     }

          //     ${item.isDisabled &&
          //     css`
          //       opacity: 0.5;
          //       pointer-events: none;
          //     `}
          //   `}
          //   as="button"
          //   onClick={item.action}
          // >
          //   <IconWrapper size={14} Icon={item.icon} />

          //   <span className={cx(typography.textM)}>{item.label}</span>
          // </ContentWrapper>
        ))}
      </ContentWrapper>

      <ContentWrapper>
        <ContentWrapper padding="8px 10px">
          <span
            className={cx(
              typography.textM,
              css`
                display: block;
                color: ${colorPalette.textMuted};
              `
            )}
          >
            Your chats
          </span>
        </ContentWrapper>

        {chats.map((chat) => (
          <SidebarChatItem
            key={chat.id}
            label={chat.label}
            action={() => console.log(`Chat ${chat.id} clicked`)}
          />
        ))}
      </ContentWrapper>

     

      <span></span>
    </ContentWrapper>
  );
};

export default SidebarContent;
