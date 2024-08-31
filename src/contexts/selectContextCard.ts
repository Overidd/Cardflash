import { useContext } from "react";
import { ContextCard } from "./contextCard";


export const useCart = () => {
   const state = useContext(ContextCard);

   if (!state) {
      console.log("useCartDay debe estar usado dentro de un ProviderCard");
   }
   return state
}