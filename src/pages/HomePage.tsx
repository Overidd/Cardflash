import { useState } from "react"
import confetti from 'canvas-confetti';
import { ControllerCardFinish, ControllerCardIsPast, ControllerCardPast, ControllerCardToday } from "../components/controllersCard"
import { useCart } from "../contexts"
import { CardShowpastday, CardshowToday } from "../components/cards"

let isFinishedCard = false
const handleConfetti = () => {
   confetti({
      particleCount: 130,
      startVelocity: 30,
      spread: 360,
      origin: {
         x: 0.5,
         y: 0.5,
      },
   });
};

let percentageToday = 0
let percentagePast = 0

let isbarToday = false
let isbarFinish = false

export const HomePage = () => {
   const { state } = useCart()

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
   }

   const handelChallend = () => {
      setopenCard(() => ({
         open_cardPast: false,
         open_cardToday: false,
         open_cardChallenge: true,
      }))

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

   percentageToday = Math.round((((numState.numToday - state.cardDay.length) / numState.numToday) * 100))
   percentagePast = Math.round((((numState.numPast - state.cardDayPast.length) / numState.numPast) * 100))

   console.log(percentagePast)
   return (
      <main className="min-h-[calc(100vh-4rem)] w-fit mx-auto flex justify-center items-center">

         <section className="grid grid-rows-[5rem_1.3rem_minmax(0,_1fr)]  gap-2">
            <div className="row-start-1 text-black text-5xl font-semibold place-self-center place-content-center">
               <h3 className={`${openCard.open_cardToday ? 'block' : 'hidden'}`}>
                  {state.cardDay.length}
               </h3>
               <h3 className={`${openCard.open_cardPast ? 'block' : 'hidden'}`}>
                  {state.cardDayPast.length}
               </h3>

            </div>
            <div className="row-start-2 text-base bg-slate-600 rounded-md overflow-hidden">
               {
                  isbarToday &&
                  <div className={`px-1 bg-[#48b] w-[${percentageToday}%] h-full text-center`}>
                     {/* {percentageToday}% */}
                  </div>
               }
               {
                  isbarFinish &&
                  <div className={`px-1 bg-[#48b] w-[${percentagePast}%] h-full text-center `}>
                     {/* {percentagePast}% */}
                  </div>
               }
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
            </div>
         </section>
      </main >
   )
}
