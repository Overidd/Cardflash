import { useContext } from "react"
import { ContextChallenge, CounterAnswersContext, IsLoadingContext } from "."

export const useChallenge = () => {
   const state = useContext(ContextChallenge)

   if (!state) {
      throw new Error("useChallenge debe estar usado dentro de un ProviderChallenge");
   }

   return state
}

export const useLoadingChallenge = () => {
   const isLoading = useContext(IsLoadingContext)

   return isLoading;
};
export const useCounterAnswers = () => {
   const counterAnswers = useContext(CounterAnswersContext)
   if (!counterAnswers) {
      throw new Error("useCounterAnswers debe estar usado dentro de un CounterAnswersContext");
   }
   return counterAnswers;
};
