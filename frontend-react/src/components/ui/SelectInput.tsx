import { cx, css } from "@emotion/css";
import { typography } from "@/constants/typography";
import { ChevronDown } from "lucide-react";
import IconWrapper from "@/components/ui/IconWrapper";
import { useState } from "react";
import colorPalette from "@/constants/colorPalette";
import CustomPopover from "@/components/ui/CustomPopover";
import { styles } from "@/constants/styles";

interface options {
  label: string;
  value: string;
}

const SelectInput = ({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: options[];
}) => {
  const button = null;
  const [open, setOpen] = useState(false);

  const currentLabel = options?.find((option) => option.value === value)?.label;

  return (
    <CustomPopover
      open={open}
      setOpen={setOpen}
      trigger={
        <div
          ref={button}
          onClick={() => setOpen((prev) => !prev)}
          className={cx(
            `${typography.textL}`,
            css`
              display: flex;
              gap: 5px;
              align-items: center;
              height: 36px;
              cursor: pointer;
              font-weight: 500;
              min-height: 34px;
              color: ${colorPalette.text};
              background: transparent;
              overflow: hidden;

              padding: 0 ${styles.padding.large}px;
              border-radius: ${styles.borderRadius.small}px;
              &:hover {
                background: ${colorPalette.backgroundTertiary};
              }
            `
          )}
        >
          {currentLabel ?? "Classical Rag"}
          <IconWrapper
            Icon={ChevronDown}
            // className="ml-auto"
            size={16}
          />
        </div>
      }
      content={
        <div className={css``}>
          {options?.map((option) => {
            return (
              <button
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={css`
                  cursor: pointer;
                  width: 100%;
                  text-align: left;
                  color: ${colorPalette.text};
                  padding: 8px 12px;

                  // not for last
                  &:not(:last-child) {
                    border-bottom: 1px solid ${colorPalette.strokePrimary};
                  }
                  background: transparent;

                  &:hover {
                    background: ${colorPalette.backgroundTertiary};
                  }
                `}
              >
                <span className={cx(typography.textM)}>{option.label}</span>
              </button>
            );
          })}
        </div>
      }
    />
  );
};

export default SelectInput;
