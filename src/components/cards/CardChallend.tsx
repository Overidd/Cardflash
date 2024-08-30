import { useEffect } from "react"
import { useChallenge } from "../../contexts"
import { Card } from "./Card"
import { motion } from 'framer-motion';
// import { ButtonContinue } from "../bottoms"

interface CardChallendProps {
   className?: string;
}
export const CardChallend = ({ className }: CardChallendProps) => {
   const { state, updateFetchDay, challengeAnswer, challengeDispatch } = useChallenge()
   // const [shake, setShake] = useState(false)

   useEffect(() => {
      updateFetchDay()
   }, [])

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
   };

   console.log('first')
   // const handleContinue = () => {
   //    challengeDispatch(id)
   // }
   return (
      <Card bgColor="greySegundary"  className={className}>
         <motion.div
            className={`p-4 grid grid-rows-[45%_55%] h-full`}
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

