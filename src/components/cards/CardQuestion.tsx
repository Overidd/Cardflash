import { useState } from "react";
import { motion } from "framer-motion";
import { Card, Icolor } from "./Card";
import { ButtonResponse } from "../bottoms/ButtonResponse";

type Ipropite = {
   select: string,
   color: string
   id?: string
}[];

interface IQuestion {
   bgColor: Icolor;
   question: string;
   answer: string;
   properties: Ipropite
   id: string;
   link: string;
   questionAnswer: (id: string, status: string) => void
   isCard: () => void
}

export const CardQuestion = ({ isCard, link, questionAnswer, id, bgColor, question, answer, properties }: IQuestion) => {
   const [isFlipped, setIsFlipped] = useState(false);

   const handleFlip = () => {
      setIsFlipped(!isFlipped);
   };

   const handleUpdateQuestion = (e: React.MouseEvent<HTMLButtonElement>, id = '') => {
      const status = e.currentTarget.name
      questionAnswer(id, status)
      isCard()
   };

   const openlink = () => {
      if (link.length > 0) {
         window.open(link, '_blank');
      }
   }
   return (
      <Card bgColor={bgColor}>
         <div
            className="w-full h-full"
            style={{ perspective: "1000px" }} // Aplicar perspectiva
         >
            <motion.div
               className="relative w-full h-full bg-red cursor-pointer select-none"
               onClick={handleFlip}
               initial={false}
               animate={{ rotateX: isFlipped ? 180 : 0 }}
               transition={{ duration: 0.3, ease: "easeOut" }} // Transición más suave
               style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
               }}
            >
               <div
                  className="p-2 absolute w-full h-full backface-hidden flex justify-center items-center"
                  style={{ backfaceVisibility: "hidden" }}
               >
                  <div className="space-x-2 absolute top-3 left-3 text-[0.9rem] font-semibold">
                     {
                        properties.map(({ color, select, id }) => {
                           if (select == null) return
                           return (
                              <span key={id} className={`w-fit inline-block px-2 py-1 rounded-md bg-${color} border-2 border-[#fff4]`}>
                                 {select}
                              </span>)
                        })
                     }
                  </div>
                  <div className="text-center text-xl">
                     <p>{question}</p>
                  </div>
               </div>

               <div
                  className="p-2 absolute w-full h-full backface-hidden text-xl grid grid-rows-[10%_60%_20%] gap-4"
                  style={{
                     transform: "rotateX(180deg)",
                     backfaceVisibility: "hidden",
                  }}
               >
                  <ButtonResponse
                     className="w-fit ml-auto py-0"
                     bgColor="link"
                     text="link"
                     onClick={openlink}
                  />
                  <p className="w-[90%] mx-auto text-center text-base text-balance place-content-center">{answer}</p>
                  <div className="text-center space-x-4">
                     <ButtonResponse
                        bgColor="incorrect"
                        text="Incorrecto"
                        name="Incorrect"
                        onClick={(e) => handleUpdateQuestion(e, id)}
                     />
                     <ButtonResponse
                        bgColor="regular"
                        text="Regular"
                        name="Regular"
                        onClick={(e) => handleUpdateQuestion(e, id)}
                     />
                     <ButtonResponse
                        bgColor="correct"
                        text="Correcto"
                        name="Correct"
                        onClick={(e) => handleUpdateQuestion(e, id)}
                     />
                  </div>
               </div>
            </motion.div>
         </div>
      </Card>
   );
};
