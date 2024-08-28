import { useState } from "react"

export const useValidInput = () => {
   const [shake, setShake] = useState(false)
   const [value, setValue] = useState('')   
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
   };
   
   const validoContinue = (): boolean => {
      if (String(value.trim()).length <= 0) {
         setShake(true); // Activar animación de vibración
         setTimeout(() => setShake(false), 500); // Desactivar después de un tiempo la animacion
         return false;
      }

      return true
   };
   
   return {
      shake,
      handleChange,
      validoContinue,
   }
}


