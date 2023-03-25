import cn from "classnames";
import "./style.scss";

export const Modal = ({ activeModal, children, setShowModal }) => {
  return (
    <>
      <div
        className={cn("modal", { ["active"]: activeModal })}
        // onClick={() => setShowModal(false)}
      >
        <div
          className={cn("modal__content", { ["active"]: activeModal })}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  );
};