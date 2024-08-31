import { DialogHTMLAttributes, PropsWithChildren } from "react";

interface IProps extends PropsWithChildren, DialogHTMLAttributes<HTMLDialogElement> {
   id: string;
}

export const Modal = ({ children, id, ...props }: IProps) => {
   return (
      <dialog
         className="z-10 backdrop-blur-sm w-full h-full bg-transparent fixed inset-0 "
         aria-labelledby="modal-title"
         role="dialog"
         aria-modal="true"
         id={id}
         {...props}
      >
         <div className="rounded-md relative flex justify-center items-center h-full">
            {children}
         </div>
      </dialog>
   );
};
