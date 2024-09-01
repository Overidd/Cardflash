import { ContextChallenge, CounterAnswersContext, IsLoadingContext, challegeReduce } from "./";
import { ReactNode, useReducer, useState } from "react";
import { getCardCategory, getCardRandom } from "../services";
import { ChallegeRandom } from "../utils";

const initialState: ChallegeRandom[] = [];

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
            data: data,
            numQueries: 4,
         }
      })
      setCounterAnswers(item => ({
         ...item,
         total: data.length,
      }))

      return true
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

   const challengeAnswer = (id: string, response: string): boolean => {
      const data = state.find((item) => item.id === id)
      const answer = data?.Answers[data?.index || 0]

      if (answer?.toLowerCase() === response.toLowerCase()) {
         setCounterAnswers(item => ({
            ...item,
            correct: item.correct + 1,
         }))
         return true
      }
      setCounterAnswers(item => ({
         ...item,
         incorrect: item.incorrect + 1,
      }))
      return false
   }
   const challengeDispatch = (id: string) => {
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
         challengeDispatch,
      }}>
         <IsLoadingContext.Provider value={isLoading}>
            <CounterAnswersContext.Provider value={counterAnswers}>
               {children}
            </CounterAnswersContext.Provider>
         </IsLoadingContext.Provider>
      </ContextChallenge.Provider>
   )
}