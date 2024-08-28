import { ReactElement } from 'react';

const colors = {
   grey: 'bg-grey',
   red: 'bg-red',
   yellow: 'bg-orange',
   green: 'bg-green',
   rangeBlueAndSky: 'bg-rangeBlueAndSky',
   rangeGreenAndSky: 'bg-rangeGreenAndSky',
   transparent: 'bg-transparent',
}

export type Icolor = 'grey' | 'red' | 'yellow' | 'green' | 'rangeBlueAndSky' | 'rangeGreenAndSky' | 'transparent';

interface CardProps {
   className?: string;
   bgColor: Icolor;
   children?: ReactElement;
}

export const Card = ({ className, bgColor, children }: CardProps) => {
   const backgroundColor = colors[bgColor];

   return (
      <section
         className={`w-[100%] h-[25rem] md:w-[33rem] md:h-[23rem] rounded-lg 2xl:w-[36rem] 2xl:h-[26rem] shadow-md overflow-hidden ${backgroundColor} ${className}`}
      >
         {children}
      </section>
   )
}
