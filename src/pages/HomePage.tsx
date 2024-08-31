import { CardShowpastday, CardshowToday, CardChallend } from "../components/cards"
import { ControllerCardFinish, ControllerCardIsPast, ControllerCardPast, ControllerCardToday } from "../components/controllersCard"
import { ChallengModal } from "../components/modals";
import { useControllerCard, usePercemtage } from "../hooks";
import { LoaderCircle } from 'lucide-react';


export const HomePage = () => {
   const { state,
      isLoading,
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
      isbarChallenge
   } = useControllerCard()

   const { percentageChalleng, percentagePast, percentageToday } = usePercemtage(state, stateChallenge)

   if (isLoading) {
      return (
         <main className="w-[90%] min-h-[calc(100vh-4rem)] md:w-fit mx-auto flex justify-center items-center">
            <LoaderCircle
               size={40}
               className="animate-spin"
            />
         </main>
      )
   }

   return (
      <main className="w-[90%] min-h-[calc(100vh-4rem)] md:w-fit mx-auto flex justify-center items-center">
         <section className="w-[100%] grid grid-rows-[3rem_1.3rem_minmax(0,_1fr)] gap-3">

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
                     isToday={controllerCard.open_controllerCardToday}
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
                  <CardChallend
                     conpletedChallend={conpletedChallend}
                     className={`${openCard.open_cardChallenge ? 'grid' : 'hidden'}`}
                  />
               }
               {
                  <ChallengModal startChallend={startChallend} />
               }
            </div>
         </section>
      </main >
   )
}
