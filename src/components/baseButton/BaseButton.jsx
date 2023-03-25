import cn from "classnames";
import s from "./style.module.scss";

export const BaseButton = ({ children, color, ...props }) => {
  return (
    <button {...props} className={cn(s.btn, s[color])}>
      {children}
    </button>
  );
};