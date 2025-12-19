import SidebarChatItem from "@/components/sidebar/SidebarChatItem";
import ContentWrapper from "@/components/ui/ContentWrapper";
import IconWrapper from "@/components/ui/IconWrapper";
import colorPalette from "@/constants/colorPalette";
import { styles } from "@/constants/styles";
import { typography } from "@/constants/typography";
import { css, cx } from "@emotion/css";
import { Tooltip, UnstyledButton, Text, Button, Loader } from "@mantine/core";
import { SearchIcon, SettingsIcon, SquarePen } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

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
    icon: SearchIcon,
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
  // Zamień to na swój hook gdy będzie gotowy endpoint:
  // const { chats, isLoading, isLoadingMore, loadMore, isReachingEnd } = useInfiniteChats();

  // Tymczasowo dummy data (symulacja 150 chatów)
  const [chats, setChats] = useState(
    Array.from({ length: 150 }, (_, i) => ({
      id: i + 1,
      label: `Chat ${i + 1} - ${
        ["AI Discussion", "ML Research", "Neural Networks", "Data Science"][
          i % 4
        ]
      }`,
    }))
  );

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: chats.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 42, // wysokość jednego itemu (padding + tekst)
    overscan: 5, // renderuj 5 dodatkowych itemów poza widokiem
  });

  // Detect when user scrolls near bottom to trigger loadMore
  const lastItemRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // loadMore(); // Odkomentuj gdy użyjesz useInfiniteChats
      }
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (!expanded) {
    return null;
  }

  return (
    <ContentWrapper
      gap="10px"
      direction="column"
      customCss={css`
        padding: 5px;
        height: 100%;
        overflow: hidden;
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
        ))}
      </ContentWrapper>

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

      <div
        ref={parentRef}
        className={css`
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;

        
        `}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => {
            const chat = chats[virtualItem.index];
            const isLast = virtualItem.index === chats.length - 1;

            return (
              <div
                key={virtualItem.key}
                ref={isLast ? lastItemRef : undefined}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <SidebarChatItem
                  label={chat.label}
                  action={() => console.log(`Chat ${chat.id} clicked`)}
                />
              </div>
            );
          })}
        </div>

        {/* Loader gdy ładuje się więcej - odkomentuj gdy użyjesz useInfiniteChats */}
        {/* {isLoadingMore && (
          <ContentWrapper justify="center" padding="10px">
            <Loader size="sm" />
          </ContentWrapper>
        )} */}
      </div>
    </ContentWrapper>
  );
};

export default SidebarContent;
