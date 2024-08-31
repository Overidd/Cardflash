import { motion } from 'framer-motion';
import { LoaderCircle } from 'lucide-react'
import { useChallenge, useLoadingChallenge } from "../../contexts"
import { Card } from "."
// import { ButtonContinue } from "../bottoms"

interface CardChallendProps {
   className?: string;
   conpletedChallend: () => void;
}
export const CardChallend = ({ className, conpletedChallend }: CardChallendProps) => {
   const { state, challengeAnswer, challengeDispatch } = useChallenge()
   const isLoading = useLoadingChallenge()

   if (state.length === 0) {
      return
   }

   const { id, Question, Answers, index } = state[0];

   const isCorrectSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
      const response = e.currentTarget.innerText;
      const childrens = e.currentTarget.parentElement!.children;

      const isCorrect = challengeAnswer(id, response);

      if (isCorrect) {
         e.currentTarget.style.borderColor = '#00bf63';
         e.currentTarget.style.borderStyle = 'dashed';
         setTimeout(() => {
            challengeDispatch(id);
         }, 800);
      } else {
         e.currentTarget.style.borderColor = '#ff5755';
         const correctButton = childrens[index || 0] as HTMLButtonElement;
         correctButton.style.borderColor = '#00bf63';
         correctButton.style.borderStyle = 'dashed';
         setTimeout(() => {
            challengeDispatch(id);
         }, 1000);
      }

      for (let i = 0; i < childrens.length; i++) {
         const button = childrens[i] as HTMLButtonElement;
         button.disabled = true;
      }
      conpletedChallend()
   };

   return (
      <Card bgColor="greySegundary"
         className={`${className} relative`}
      >
         {
            isLoading
               ? <LoaderCircle
                  size={60}
                  className="animate-spin absolute inset-0 m-auto"
               />
               : <motion.div
                  className={`text-[#fffe] p-4 grid grid-rows-[50%_50%] md:grid-rows-[45%_55%] h-full`}
                  initial={{ x: '45%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 50, duration: 0.5 }}
                  key={id}
               >
                  <p className="text-center self-center">
                     {Question}
                  </p>

                  <div
                     className="grid grid-cols-2 gap-3"
                  >
                     {
                        Answers.map((data, index) => (
                           <SelectResponse
                              key={index}
                              text={data}
                              isCorrectSelect={isCorrectSelect}
                           />
                        ))
                     }
                  </div>
                  {/* {
               shake &&
               <ButtonContinue
                  handleContinue={handleContinue}
               />
            } */}
               </motion.div>
         }
      </Card>
   )
}

interface SelectProps {
   text: string;
   isCorrectSelect: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SelectResponse = ({ text, isCorrectSelect }: SelectProps) => {
   const maxLength = 100;
   const displayText = text.substring(1, maxLength) + "...";
   return (
      <button className="cursor-pointer relative place-content-center text-center text-balance text-sm rounded-md transition-all border-2 border-[#fff5] hover:border-[#fff9]"
         type="button"
         onClick={isCorrectSelect}
      >
         {
            text.length > maxLength &&
            displayText
         }
         {text}
      </button>
   )
};