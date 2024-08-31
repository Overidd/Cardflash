import confetti from 'canvas-confetti';
import { useState } from 'react';
import { useCart, useChallenge } from '../contexts';
import { toggleModal } from '../helpers';

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

let isFinishedCard = false
let isbarToday = false
let isbarFinish = false
let isbarChallenge = false

export const useControllerCard = () => {
   const { state } = useCart()
   const { state: stateChallenge, updateFetchCategory } = useChallenge()

   const [controllerCard, setControllerCard] = useState({
      open_controllerCardPast: state.cardDayPast.length > 0 && true,// en el caso de que si existe las card pasadas se activa el controllador
      open_controllerCardToday: state.cardDayPast.length === 0 && state.cardDay.length > 0 && true, // en el caso de que solo exista card de hoy se activa el controllador
      open_controllerCardIsPast: false,
      open_controllerCardFinish: state.cardDayPast.length === 0 && state.cardDay.length === 0 ? true : false,
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
      toggleModal.show('categorias')
   }
   const startChallend = (category: string) => {
      updateFetchCategory(category)
      setopenCard(() => ({
         open_cardPast: false,
         open_cardToday: false,
         open_cardChallenge: true,
      }))
      closeCardController()
      isbarFinish = false
      isbarToday = false
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

   const conpletedChallend = () => {
      if (stateChallenge.length === 1) {
         handleConfetti()
         setopenCard(() => ({
            open_cardToday: false,
            open_cardPast: false,
            open_cardChallenge: false,
         }))
         if (state.cardDay.length > 0) {
            console.log(' hay cardDay ')
            setControllerCard(() => ({
               open_controllerCardPast: false,
               open_controllerCardToday: true,
               open_controllerCardIsPast: false,
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
      }
   }
   return {
      state,
      stateChallenge,
      controllerCard,
      openCard,
      handelStart,
      handelComplete,
      handelChallend,
      startChallend,
      handelOmit,
      isCardToday,
      isCardPast,
      conpletedChallend,
      isFinishedCard,
      isbarToday,
      isbarFinish,
      isbarChallenge,
   }
}
