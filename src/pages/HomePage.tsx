import { useState } from "react"
import confetti from 'canvas-confetti';
import { ControllerCardFinish, ControllerCardIsPast, ControllerCardPast, ControllerCardToday } from "../components/controllersCard"
import { useCart, useChallenge, useCounterAnswers } from "../contexts"
import { CardShowpastday, CardshowToday } from "../components/cards"
import { CardChallend } from "../components/cards/CardChallend";

let isFinishedCard = false
const handleConfetti = () => {
   confetti({
      particleCount: 130,
      startVelocity: 40,
      spread: 360,
      origin: {
         x: 0.5,
         y: 0.5,
      },
   });
};

let percentageToday = 0
let percentagePast = 0
let percentageChalleng = 0

let isbarToday = false
let isbarFinish = false
let isbarChallenge = false

export const HomePage = () => {
   const { state } = useCart()
   const { state: stateChallenge } = useChallenge()

   const [numState, setNumState] = useState({
      numToday: state.cardDay.length,
      numPast: state.cardDayPast.length,
   })

   const [controllerCard, setControllerCard] = useState({
      open_controllerCardPast: state.cardDayPast.length > 0 && true,// en el caso de que si existe las card pasadas se activa el controllador
      open_controllerCardToday: state.cardDayPast.length === 0 && state.cardDayPast.length > 0 && true, // en el caso de que solo exista card de hoy se activa el controllador
      open_controllerCardIsPast: false,
      open_controllerCardFinish: state.cardDayPast.length === 0 && state.cardDayPast.length === 0 ? true : false,
   })

   const [openCard, setopenCard] = useState({
      open_cardPast: false,
      open_cardToday: false,
      open_cardChallenge: false,
   })

   const closeCardController = () => {
      setControllerCard(() => ({
         open_controllerCardPast: false,
         open_controllerCardToday: false,
         open_controllerCardIsPast: false,
         open_controllerCardFinish: false,
      }))
   }

   const handelStart = () => {
      setopenCard(() => ({
         open_cardPast: false,
         open_cardToday: true,
         open_cardChallenge: false,
      }))
      closeCardController()
      isbarToday = true
      isbarFinish = false
      isbarChallenge = false
   }

   const handelComplete = () => {
      setopenCard(() => ({
         open_cardPast: true,
         open_cardToday: false,
         open_cardChallenge: false,
      }))
      closeCardController()
      isbarToday = false
      isbarFinish = true
      isbarChallenge = false
   }

   const handelChallend = () => {
      setopenCard(() => ({
         open_cardPast: false,
         open_cardToday: false,
         open_cardChallenge: true,
      }))
      closeCardController()
      isbarToday = false
      isbarFinish = false
      isbarChallenge = true
   }

   const handelOmit = () => {
      setControllerCard(() => ({
         open_controllerCardPast: false,
         open_controllerCardToday: true,
         open_controllerCardIsPast: false,
         open_controllerCardFinish: false,
      }))
   }

   // console.log(controllerCard)
   const isCardToday = () => {
      if (state.cardDay.length === 1) {
         handleConfetti()
         setopenCard(() => ({
            open_cardToday: false,
            open_cardPast: false,
            open_cardChallenge: false,
         }))

         if (state.cardDayPast.length > 0) {
            setControllerCard(() => ({
               open_controllerCardPast: false,
               open_controllerCardToday: false,
               open_controllerCardIsPast: true,
               open_controllerCardFinish: false,
            }))
            return
         }

         setControllerCard(() => ({
            open_controllerCardPast: false,
            open_controllerCardToday: false,
            open_controllerCardIsPast: false,
            open_controllerCardFinish: true,
         }))
         isFinishedCard = true
      }
   }
   const isCardPast = () => {
      if (state.cardDayPast.length === 1) {
         handleConfetti()
         setopenCard(() => ({
            open_cardToday: false,
            open_cardPast: false,
            open_cardChallenge: false,
         }))
         if (state.cardDay.length === 0) {
            setControllerCard(() => ({
               open_controllerCardPast: false,
               open_controllerCardToday: false,
               open_controllerCardIsPast: false,
               open_controllerCardFinish: true,
            }))
            isFinishedCard = true
            return
         }

         setControllerCard(() => ({
            open_controllerCardPast: false,
            open_controllerCardToday: true,
            open_controllerCardIsPast: false,
            open_controllerCardFinish: false,
         }))

      }
   }
   const { total } = useCounterAnswers()
   percentageToday = Math.round((((numState.numToday - state.cardDay.length) / numState.numToday) * 100))
   percentagePast = Math.round((((numState.numPast - state.cardDayPast.length) / numState.numPast) * 100))
   percentageChalleng = Math.round((((total - stateChallenge.length) / total) * 100))

   return (
      <main className="min-h-[calc(100vh-4rem)] w-fit mx-auto flex justify-center items-center">

         <section className="grid grid-rows-[4rem_1.3rem_minmax(0,_1fr)] gap-3">
            <div className="row-start-1 text-[#fff] text-6xl font-semibold place-self-center place-content-center">
               <h3 className={`${openCard.open_cardToday ? 'block' : 'hidden'}`}>
                  {state.cardDay.length}
               </h3>
               <h3 className={`${openCard.open_cardPast ? 'block' : 'hidden'}`}>
                  {state.cardDayPast.length}
               </h3>
               <h3 className={`${openCard.open_cardChallenge ? 'block' : 'hidden'}`}>
                  {stateChallenge.length}
               </h3>
               {/* stateChallenge */}
            </div>
            <div className="relative row-start-2 text-base bg-slate-600 rounded-md overflow-hidden">
               {isbarToday && (
                  <div
                     className="px-1 bg-[#48b] h-full text-center transition-all"
                     style={{ width: `${percentageToday}%` }}
                  >
                     <small className="absolute left-0 right-0 mx-auto w-fit font-semibold">{percentageToday}%</small>
                  </div>
               )}
               {isbarFinish && (
                  <div
                     className="px-1 bg-[#48b] h-full text-center transition-all"
                     style={{ width: `${percentagePast}%` }}
                  >
                     <small className="absolute left-0 right-0 mx-auto w-fit font-semibold">{percentagePast}%</small>
                  </div>
               )}
               {isbarChallenge && (
                  <div
                     className="px-1 bg-[#48b] h-full text-center transition-all"
                     style={{ width: `${percentageChalleng}%` }}
                  >
                     <small className="absolute left-0 right-0 mx-auto w-fit font-semibold">{percentageChalleng}%</small>
                  </div>
               )}
            </div>
            <div className="row-start-3">
               {
                  controllerCard.open_controllerCardPast &&
                  <ControllerCardPast
                     handelComplete={handelComplete}
                     handelOmit={handelOmit}
                  />
               }
               {
                  controllerCard.open_controllerCardToday &&
                  <ControllerCardToday
                     handelStart={handelStart}
                     handelChallend={handelChallend}
                  />
               }
               {
                  controllerCard.open_controllerCardIsPast &&
                  <ControllerCardIsPast
                     handelComplete={handelComplete}
                     handelChallend={handelChallend}
                  />
               }
               {
                  controllerCard.open_controllerCardFinish &&
                  <ControllerCardFinish
                     handelChallend={handelChallend}
                     isFinished={isFinishedCard}
                  />
               }
               {openCard.open_cardToday &&
                  <CardshowToday
                     isCardToday={isCardToday}
                  />
               }
               {
                  openCard.open_cardPast &&
                  <CardShowpastday
                     isCardPast={isCardPast}
                  />
               }
               {
                  // openCard.open_cardChallenge &&
                  <CardChallend
                     className={`${openCard.open_cardChallenge ? 'grid' : 'hidden'}`}
                  />
               }
            </div>
         </section>
      </main >
   )
}
