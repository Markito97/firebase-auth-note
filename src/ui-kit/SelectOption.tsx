import { FC } from "react";
import styles from "./SelectOption.module.css";

interface SelectOptionProps {
  text: string;
  value: string;
  onClose: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const SelectOption: FC<SelectOptionProps> = (props) => {
  return (
    <div className={styles.select__option} onClick={props.onClose}>
      {props.text}
    </div>
  );
};
