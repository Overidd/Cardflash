import { useContext } from "react";
import { ContextCard } from "./contextCard";


export const useCart = () => {
   const state = useContext(ContextCard);

   if (!state) {
      console.log("useCartDay debe estar usado dentro de un ProviderCard");
   }
   return state
}
// export const useCartDay = () => {
//    const { state, questionAnsweredDay } = useContext(ContextCard);

//    if (!state) {
//       throw new Error("useCartDay debe estar usado dentro de un ProviderCard");
//    }

//    return {
//       cardDate: state.cardDay,
//       questionAnsweredDay: questionAnsweredDay,
//    }
// }

// export const useCartDayLast = () => {
//    const { state, questionAnsweredDayLast } = useContext(ContextCard)
//    if (!state) {
//       throw new Error("useCartDayLast debe estar usado dentro de un ProviderCard");
//    }

//    return {
//       cardDate: state.cardDayPast,
//       questionAnsweredDayLast: questionAnsweredDayLast,
//    }
// }