import { ReactNode, forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

type ModalProps = {
  children: ReactNode;
  buttonCaption: string;
};

const Modal = forwardRef(
  ({ children, buttonCaption }: ModalProps, ref: any) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    useImperativeHandle(ref, () => {
      return {
        open() {
          dialogRef.current?.showModal();
        },
      };
    });

    return createPortal(
      <dialog
        ref={dialogRef}
        className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
      >
        {children}
        <form method="dialog" className="mt-4 text-right">
          <Button>{buttonCaption}</Button>
        </form>
      </dialog>,
      document.getElementById("modal-root") as HTMLElement
    );
  }
);

export default Modal;
