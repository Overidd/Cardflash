import { useOutletContext } from 'react-router-dom'
import { Iuser } from '../../utils'
import { GalleryHorizontalEnd } from "lucide-react"
import { ButtonAction } from "../bottoms"
import { Card } from "../cards"

// ControllerDayPast se cuando tienes cards pendientes de dias anteriores
interface IdayPastProps {
   handelComplete: () => void;
   handelOmit: () => void;
   className?: string;
}
export const ControllerCardPast = ({ handelComplete, handelOmit, className }: IdayPastProps) => {
   const user: Iuser = useOutletContext()
   return (
      <Card
         className={`grid grid-rows-[50%_50%] ${className}`}
         bgColor={'rangeBlueAndSky'}
      >
         <>
            <div className="text-center place-self-center space-y-2">
               <h2 className="text-2xl font-semibold">!Hola {user.name}¡</h2>
               <p>Tienes card pedientes de dias anteriores</p>
               <p>¿Quieres completar💪?</p>
            </div>

            <div className="space-x-10 row-start-2 place-self-center">
               <ButtonAction
                  className="animate-bounce hover:animate-none"
                  bgColor='tertiaryBlue'
                  text='Completar'
                  onClick={handelComplete}
               >
                  <GalleryHorizontalEnd />
               </ButtonAction>

               <ButtonAction
                  bgColor="quaternaryBlue"
                  text="Omitir"
                  onClick={handelOmit}
               />
            </div>
         </>
      </Card>
   )
}

// ControllerToday se muestran las cards pendientes de hoy
interface ItodayProps {
   handelStart: () => void;
   handelChallend: () => void;
   className?: string;
}
export const ControllerCardToday = ({ handelStart, handelChallend, className }: ItodayProps) => {
   return (
      <Card
         className={`grid grid-rows-[50%_50%] ${className}`}
         bgColor={'rangeGreenAndSky'}
      >
         <>
            <div className="text-center place-self-center space-y-2">
               <p>Empieza con tus card de hoy 💪</p>
            </div>

            <div className="space-x-10 row-start-2 place-self-center">
               <ButtonAction
                  className="animate-bounce hover:animate-none"
                  bgColor='tertiaryBlue'
                  text='Empezar'
                  onClick={handelStart}
               >
                  <GalleryHorizontalEnd />
               </ButtonAction>

               <ButtonAction
                  bgColor="quaternaryBlue"
                  text="Retos"
                  onClick={handelChallend}
               />
            </div>
         </>

      </Card>
   )
}


// ControllerDayIsPast se muestra cuando tienes cards pendientes de dias pasados despues de omitir ControllerCardPast y haber completado las card de hoy
interface IdayIsPastProps {
   handelComplete: () => void;
   handelChallend: () => void;
   className?: string;
}

export const ControllerCardIsPast = ({ handelComplete, handelChallend, className }: IdayIsPastProps) => {
   return (
      <Card
         className={`grid grid-rows-[50%_50%] ${className}`}
         bgColor={'rangeGreenAndSky'}
      >
         <>
            <div className="text-center place-self-center space-y-2">
               <p>Felicidades completaste tus card de hoy🤩</p>
               <p>Tienes card pendientes de dias anteriores complétalas</p>
            </div>

            <div className="space-x-10 row-start-2 place-self-center">
               <ButtonAction
                  className="animate-bounce hover:animate-none"
                  bgColor='tertiaryBlue'
                  text='Completar'
                  onClick={handelComplete}
               >
                  <GalleryHorizontalEnd />
               </ButtonAction>

               <ButtonAction
                  bgColor="quaternaryBlue"
                  text="Omitir"
                  onClick={handelChallend}
               />
            </div>
         </>
      </Card>
   )
}

// ControllerDayFinish se muestra cuando tienes cards pendientes de hoy y ya has completado
interface IdayFinishProps {
   handelChallend: () => void;
   isFinished: boolean;
   className?: string;
}
export const ControllerCardFinish = ({ handelChallend, isFinished, className }: IdayFinishProps) => {
   console.log(isFinished)
   return (
      <Card
         className={`grid grid-rows-[50%_50%] ${className}`}
         bgColor={'rangeGreenAndSky'}
      >
         <>
            <div className="text-center place-self-center space-y-2">
               {
                  !isFinished &&
                  <p>Felicidades estas al dia 🥳</p>
               }
               {
                  isFinished &&
                  <p>Felicidades completaste tus card 🥳</p>
               }
            </div>

            <div className="space-x-10 row-start-2 place-self-center">
               <ButtonAction
                  className="animate-bounce hover:animate-none"
                  bgColor='tertiaryBlue'
                  text='Retos'
                  onClick={handelChallend}
               >
                  <GalleryHorizontalEnd />
               </ButtonAction>
            </div>
         </>

      </Card>
   )
}
