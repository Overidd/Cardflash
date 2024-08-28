import { createContext } from "react";
import { ChallegeRandom } from "../utils";

type ContectChallengeType = {
   updateFetchDay: () => Promise<boolean>;
   updateFetchCategory: (category: string) => Promise<boolean>;
   challengeAnswer: (response: string, id: string) => void;
   state: ChallegeRandom[];
   // isLoading: boolean;
   // counterAnswers: {
   //    correct: number,
   //    incorrect: number,
   //    total: number,
   // };
}

const defaultState = {
   state: [],
   isLoading: false,
   counterAnswers: {
      correct: 0,
      incorrect: 0,
      total: 0,
   },
   updateFetchDay: () => Promise.resolve(false),
   updateFetchCategory: () => Promise.resolve(false),
   challengeAnswer: () => { },
}

export const ContextChallenge = createContext<ContectChallengeType>(defaultState)

// Otros contextos
export const IsLoadingContext = createContext<boolean>(false);
export const CounterAnswersContext = createContext({
   correct: 0,
   incorrect: 0,
   total: 0,
});
