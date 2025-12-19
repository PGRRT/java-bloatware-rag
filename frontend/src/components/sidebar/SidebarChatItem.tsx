import ContentWrapper from "@/components/ui/ContentWrapper";
import IconWrapper from "@/components/ui/IconWrapper";
import colorPalette from "@/constants/colorPalette";
import { styles } from "@/constants/styles";
import { typography } from "@/constants/typography";
import { css, cx } from "@emotion/css";

const SidebarChatItem = ({
  label,
  icon,
  action,
  isDisabled = false,
  smallPadding = false,
}: {
  label: string;
  icon?: React.ElementType;
  action?: () => void;
  isDisabled?: boolean;
  smallPadding?: boolean;
}) => {
  return (
    <>
      <ContentWrapper
        key={label}
        gap="10px"
        align="center"
        customCss={css`
          transition: background 0.2s;
          padding: ${smallPadding ? "8px" : "10px"} 10px;
          border-radius: ${styles.borderRadius.small};
          width: 100%;
          color: ${colorPalette.text};
          &:hover {
            background: ${colorPalette.backgroundTertiary};
          }

          ${isDisabled &&
          css`
            opacity: 0.5;
            pointer-events: none;
          `}
        `}
        as="button"
        onClick={action}
      >
        {icon && <IconWrapper size={14} Icon={icon} />}

        <span
          className={cx(
            typography.textM,
            css`
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              max-width: 90%;
            `
          )}
        >
          {label}
        </span>
      </ContentWrapper>
    </>
  );
};

export default SidebarChatItem;
