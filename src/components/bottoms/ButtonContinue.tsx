import { motion } from "framer-motion";

interface ButtonProps {
   handleContinue: () => void;
}

export const ButtonContinue = ({ handleContinue }: ButtonProps) => {
   return (
      <motion.button
         className="bg-[#48b] hover:opacity-85 w-fit p-2 fixed bottom-2 right-2 rounded-md"
         initial={{ y: 50, opacity: 0 }}  // Inicialmente fuera de la vista y transparente
         animate={{ y: 0, opacity: 1 }}   // Se mueve hacia su posición final y se hace visible
         transition={{ duration: 0.5, ease: "easeOut" }} // Tiempo de la animación
         onClick={handleContinue}
      >
         Continuar
      </motion.button>
   );
}
