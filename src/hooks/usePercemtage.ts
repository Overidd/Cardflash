import { useState } from "react"
import { useCounterAnswers } from "../contexts"
import { CardState, ChallegeRandom } from "../utils"

let percentageToday = 0
let percentagePast = 0
let percentageChalleng = 0

export const usePercemtage = (state: CardState, stateChallenge: ChallegeRandom[]) => {

   const { total } = useCounterAnswers()
   const [numState] = useState({
      numToday: state.cardDay.length,
      numPast: state.cardDayPast.length,
   })

   percentageToday = Math.round((((numState.numToday - state.cardDay.length) / numState.numToday) * 100))
   percentagePast = Math.round((((numState.numPast - state.cardDayPast.length) / numState.numPast) * 100))
   percentageChalleng = Math.round((((total - stateChallenge.length) / total) * 100))

   return {
      percentageToday,
      percentagePast,
      percentageChalleng,
   }
}
