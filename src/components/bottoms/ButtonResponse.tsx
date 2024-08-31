import { ButtonHTMLAttributes, ReactElement } from "react";
const colors = {
  incorrect: 'bg-red',
  regular: 'bg-yellow',
  correct: 'bg-green',
  link: ' bg-blue-600',
}

type Icolor = 'incorrect' | 'regular' | 'correct' | 'link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactElement;
  text?: string;
  bgColor: Icolor;
}
export const ButtonResponse = ({ className, bgColor, children, text = 'texto boton', ...props }: ButtonProps) => {
  const backgroundColor = colors[bgColor]
  return (
    <button
      className={`text-white border-2 border-[#fff3] px-3 py-2 rounded-lg text-sm font-semibold space-x-2 hover:bg-opacity-80 ${backgroundColor} ${className}`}
      {...props}
    >
      <span className='align-middle'>{text}</span>
      {children && <div className='inline-block align-middle'>{children}</div>}
    </button>
  )
}
