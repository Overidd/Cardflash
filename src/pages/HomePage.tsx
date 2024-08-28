import { useState } from "react"
import { ControllerCardFinish, ControllerCardIsPast, ControllerCardPast, ControllerCardToday } from "../components/controllersCard"
import { useCart } from "../contexts"
import { CardShowpastday, CardshowToday } from "../components/cards"

let isFinishedCard = false
export const HomePage = () => {
   const { state } = useCart()

   const [controllerCard, setControllerCard] = useState({
      open_controllerCardPast: state.cardDayPast.length > 0 && true,// en el caso de que si existe las card pasadas se activa el controllador
      open_controllerCardToday: state.cardDayPast.length === 0 && state.cardDayPast.length > 0 && true, // en el caso de que solo exista card de hoy se activa el controllador
      open_controllerCardIsPast: false,
      open_controllerCardFinish: state.cardDayPast.length === 0 && state.cardDayPast.length === 0 ? true : false,
   })

   const [opneCard, setopenCard] = useState({
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
   }

   const handelComplete = () => {
      setopenCard(() => ({
         open_cardPast: true,
         open_cardToday: false,
         open_cardChallenge: false,
      }))
      closeCardController()
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

   return (
      <main className="min-h-[calc(100vh-4rem)] w-fit mx-auto flex justify-center items-center border-red border">

         <section className="grid grid-rows-[7rem_1rem_minmax(0,_1fr)]  gap-2">
            <div className="row-start-1 bg-black">

            </div>
            <div className="row-start-2 bg-red">

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
               {opneCard.open_cardToday &&
                  <CardshowToday
                     isCardToday={isCardToday}
                  />
               }
               {
                  opneCard.open_cardPast &&
                  <CardShowpastday
                     isCardPast={isCardPast}
                  />
               }
            </div>
         </section>
      </main>
   )
}
