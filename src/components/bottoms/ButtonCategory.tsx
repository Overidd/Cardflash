import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   text: string;
   className?: string;
   children?: React.ReactNode;
}

export const ButtonCategory = ({ className, children, text = 'Category', ...props }: ButtonProps) => {
   return (
      <button
         className={`text-white px-3 py-2 rounded-lg text-sm font-semibold space-x-2 ${className}`}
         {...props}
      >
         <span className='align-middle'>{text}</span>
         {
            children &&
            <div className='inline-block align-middle'>{children}</div>
         }
      </button>
   );
}
