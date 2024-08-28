import { ReactNode, useReducer, useState } from "react";
import { ContextChallenge, CounterAnswersContext, IsLoadingContext, challegeReduce } from "./";
import { getCardCategory, getCardRandom } from "../services";
import { ChallegeRandom } from "../utils";

const initialState: ChallegeRandom[] = []

type ProviderProps = {
   children: ReactNode;
};

export const ProviderChallenge = ({ children }: ProviderProps) => {
   const [state, dispatch] = useReducer(challegeReduce, initialState)
   const [isLoading, setIsLoading] = useState(false)
   const [counterAnswers, setCounterAnswers] = useState({
      correct: 0,
      incorrect: 0,
      total: 0,
   })

   const updateFetchDay = async () => {
      setIsLoading(true)
      const { data, status } = await getCardRandom()
      setIsLoading(false)

      if (!status) {
         return status
      }

      dispatch({
         type: "SET_CARDS",
         payload: {
            data,
            numQueries: 4,
         }
      })
      setCounterAnswers(item => ({
         ...item,
         total: data.length,
      }))
      return status
   }

   const updateFetchCategory = async (category: string) => {
      setIsLoading(true)
      const { data, status } = await getCardCategory(category)
      setIsLoading(false)

      if (!status) {
         return status
      }
      dispatch({
         type: "SET_CARDS",
         payload: {
            data,
            numQueries: 4,
         }
      })

      setCounterAnswers(item => ({
         ...item,
         total: data.length,
      }))

      return status
   }

   const challengeAnswer = (response: string, id: string) => {
      const data = state.find(({ id }) => id === id)
      const answer = data?.Answers[data?.index || 0]

      if (answer === response) {
         setCounterAnswers(item => ({
            ...item,
            correct: item.correct + 1,
         }))
      } else {
         setCounterAnswers(item => ({
            ...item,
            incorrect: item.incorrect + 1,
         }))
      }

      dispatch({
         type: "CHALLEMGE_ANSWERED",
         payload: {
            id,
         }
      })
   }

   return (
      <ContextChallenge.Provider value={{
         state,
         updateFetchDay,
         updateFetchCategory,
         challengeAnswer,
      }}>
         <IsLoadingContext.Provider value={isLoading}>
            <CounterAnswersContext.Provider value={counterAnswers}>
               {children}
            </CounterAnswersContext.Provider>
         </IsLoadingContext.Provider>
      </ContextChallenge.Provider>
   )
}

// Custom hooks para consumir los contextos individuales

