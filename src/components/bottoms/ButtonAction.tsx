import { ButtonHTMLAttributes, ReactElement, useId } from 'react';

const colors = {
   primaryBlue: 'bg-primaryBlue',
   secondaryBlue: 'bg-secondaryBlue',
   tertiaryBlue: 'bg-tertiaryBlue',
   quaternaryBlue: 'bg-quaternaryBlue',
}

type Icolor = 'primaryBlue' | 'secondaryBlue' | 'tertiaryBlue' | 'quaternaryBlue';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   className?: string;
   children?: ReactElement;
   text?: string;
   bgColor: Icolor;
   trueAnimation?: boolean;
}

export const ButtonAction = ({ className, bgColor, children, text = 'texto boton', trueAnimation = true, ...props }: ButtonProps) => {
   const backgroundColor = colors[bgColor]
   const id = useId();

   return (
      <button
         className={`text-white px-3 py-2 rounded-lg text-sm font-semibold space-x-2 ${trueAnimation ? 'btnAnimation' : ''} ${backgroundColor} ${className}`}
         id={id}
         {...props}
      >
         <span className='align-middle'>{text}</span>
         {children && <div className='inline-block align-middle'>{children}</div>}
      </button>
   )
}
{/* <div class="buton-container">
<button class="btn btn-1">BUTTON</button>
</div> */}

