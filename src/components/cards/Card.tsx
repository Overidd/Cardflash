import { ReactElement } from 'react';

const colors = {
   grey: 'bg-grey',
   red: 'bg-red',
   yellow: 'bg-orange',
   green: 'bg-green',
   bgColorPrimary: 'bg-bgColorPrimary',
   bgColorSegundary: 'bg-bgColorSegundary',
   bgColorTertiary: 'bg-bgColorTertiary',
   transparent: 'bg-transparent',
   greySegundary: 'bg-greySegundary'
}

export type Icolor = 'grey' | 'red' | 'yellow' | 'green' | 'bgColorPrimary' | 'bgColorSegundary' | 'bgColorTertiary' | 'transparent' | 'greySegundary';

interface CardProps {
   className?: string;
   bgColor: Icolor;
   children?: ReactElement;
}

export const Card = ({ className, bgColor, children }: CardProps) => {
   const backgroundColor = colors[bgColor];

   return (
      <section
         className={`w-[100%] h-[25rem] md:w-[36rem] md:h-[23rem] rounded-lg 2xl:w-[42rem] 2xl:h-[26rem] shadow-md overflow-hidden ${backgroundColor} ${className}`}
      >
         {children}
      </section>
   )
}
