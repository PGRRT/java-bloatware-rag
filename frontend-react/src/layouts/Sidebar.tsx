/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import {
  Tooltip,
  UnstyledButton,
  Text,
  ActionIcon,
  Button,
} from "@mantine/core";
import { css } from "@emotion/react";
import { Menu, TextAlignJustify, X } from "lucide-react";
import colorPalette from "@/constants/colorPalette";
import IconWrapper from "@/components/ui/IconWrapper";
import { styles } from "@/constants/styles";

const buttonsStyle = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: all 0.2s;

  position: absolute;
  top: 0;
  padding: ${styles.padding.xs};
  border-radius: ${styles.borderRadius.small};

  &:hover {
    background: ${colorPalette.backgroundTertiary} !important;
  }
`;

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const sidebarWidth = expanded ? 280 : 70;

  const menuItems = [
    // to be added
  ];

  return (
    <div
      css={css`
        width: ${sidebarWidth}px;
        transition: width 0.3s;
        background-color: ${colorPalette.backgroundSecondary};
        border-right: 1px solid ${colorPalette.strokePrimary};
        color: white;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        padding: 1rem;
      `}
    >
      <div
        css={css`
          width: 100%;
          position: relative;
        `}
      >
        <div
          onClick={() => setExpanded(!expanded)}
          aria-hidden={expanded}
          css={css`
            ${buttonsStyle}

            left: 50%;
            transform: translateX(-50%);
            opacity: 1;
            pointer-events: auto;
            cursor: pointer;
            ${expanded &&
            css`
              opacity: 0;
              pointer-events: none;
            `}
          `}
        >
          <IconWrapper
            size={24}
            Icon={TextAlignJustify}
            color={colorPalette.accent}
            // hoverColor={colorPalette.textActive}
          />
        </div>

        <div
          onClick={() => setExpanded(!expanded)}
          aria-hidden={!expanded}
          css={css`
            ${buttonsStyle}

            right: 0;
            top: 0;
            opacity: 0;

            pointer-events: none;
            cursor: pointer;
            ${expanded &&
            css`
              opacity: 1;
              pointer-events: auto;
            `}
          `}
        >
          <IconWrapper size={24} Icon={X} color={colorPalette.accent} />
        </div>
      </div>

      {/* Menu items */}
      {menuItems.map((item) => (
        <Tooltip
          key={item.label}
          label={item.label}
          position="right"
          disabled={expanded}
          withArrow
        >
          <UnstyledButton
            onClick={() => console.log(item.label)}
            css={css`
              width: 100%;
              display: flex;
              align-items: center;
              gap: 12px;
              padding: 8px;
              border-radius: 6px;
              cursor: pointer;
              &:hover {
                background-color: rgba(255, 255, 255, 0.1);
              }
            `}
          >
            {item.icon}
            {expanded && <Text>{item.label}</Text>}
          </UnstyledButton>
        </Tooltip>
      ))}
    </div>
  );
}
