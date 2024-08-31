import { useCart, useCounterAnswers } from "../contexts"
import { CardState, ChallegeRandom } from "../utils"

let percentageToday = 0
let percentagePast = 0
let percentageChalleng = 0

export const usePercemtage = (state: CardState, stateChallenge: ChallegeRandom[]) => {

   const { total } = useCounterAnswers()
   const { numPast, numToday } = useCart()

   percentageToday = Math.round((((numToday - state.cardDay.length) / numToday) * 100))
   percentagePast = Math.round((((numPast - state.cardDayPast.length) / numPast) * 100))
   percentageChalleng = Math.round((((total - stateChallenge.length) / total) * 100))

   return {
      percentageToday,
      percentagePast,
      percentageChalleng,
   }
}
