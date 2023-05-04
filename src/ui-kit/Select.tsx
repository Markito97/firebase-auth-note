import { FC, useEffect, useRef, useState } from "react";
import styles from "./Select.module.css";
import { SelectOption } from "./SelectOption";
import { Arrows } from "../assets/ArrowUpDown";

interface SelectProps {
  defaultValue: string;
  options: { text: string; value: string }[];
  onChange: (value: string) => void;
}

export const Select: FC<SelectProps> = (props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(props.defaultValue);
  const selectRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (value: string): void => {
    void props.onChange(value);
  };

  const handleClose = (): void => {
    void setIsOpen(false);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent): void => {
      if (!selectRef.current || !selectRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.addEventListener("mousedown", handleClick);
    };
  });

  return (
    <div
      ref={selectRef}
      className={styles.select__wrapper}
      onClick={(e) => {
        setIsOpen(true);
      }}
    >
      <div style={{ display: "flex", columnGap: "15px", alignItems: "center" }}>
        <Arrows />
        {selected}
      </div>
      {isOpen && (
        <div className={styles.select__content}>
          {props.options.map((option, index) => (
            <SelectOption
              key={index}
              {...option}
              onClose={(e) => {
                e.stopPropagation();
                handleClose();
                handleChange(option.value);
                setSelected(option.text);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
