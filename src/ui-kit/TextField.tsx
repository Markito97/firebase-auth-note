import { ChangeEvent, FC, forwardRef } from "react";
import styles from "./TextField.module.css";

interface TextFieldProps {
  type?: string;
  label?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField: FC<TextFieldProps> = forwardRef((props, ref) => {
  return <input className={styles.textfield} {...props} />;
});

export default TextField;
