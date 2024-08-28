import { PropsWithChildren } from "react";
// import { toggleModal } from '../../helpers'
// import { X } from 'lucide-react';

interface IProps extends PropsWithChildren {
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
            {/* <button
               type="button"
               className="absolute top-2 right-2 text-2xl cursor-pointer z-30"
               onClick={() => toggleModal.close(id)} // Asegúrate de tener la función para cerrar el modal
            >
               <X />
            </button> */}
            {children}
         </div>
      </dialog>
   );
};
