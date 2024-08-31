import { useReducer, ReactNode, useEffect, useState } from 'react'
import { ContextCard, contextControllerCard, cardReducer, ACTION_TYPE } from '.'
import { getTwoCardType, updateCard } from '../services';
// import { dataQuestion } from '../data/dataQuestion';

// const initialState = dataQuestion

const initialState = {
   cardDay: [],
   cardDayPast: [],
}


type ProviderProps = {
   children: ReactNode;
};

// ----
const localUserDays: number[] = JSON.parse(localStorage.getItem('userDays') || '[]');

let numToday = 0
let numPast = 0
let isLoading = true
export const ProviderCard = ({ children }: ProviderProps) => {
   const [state, dispatch] = useReducer(cardReducer, initialState)

   const [controllerCard, setControllerCard] = useState({
      open_controllerCardPast: false,
      open_controllerCardToday: false,
      open_controllerCardIsPast: false,
      open_controllerCardFinish: false,
   });


   useEffect(() => {
      const fetchCards = async () => {
         try {
            const { cardDay, cardDayPast } = await getTwoCardType();
            dispatch({
               type: ACTION_TYPE.SET_CARDS,
               payload: { cardDay, cardDayPast },
            });

            setControllerCard({
               open_controllerCardPast: cardDayPast.length > 0,
               open_controllerCardToday: cardDayPast.length === 0 && cardDay.length > 0,
               open_controllerCardIsPast: false,
               open_controllerCardFinish: cardDayPast.length === 0 && cardDay.length === 0,
            });
            isLoading = false
            numToday = cardDay.length
            numPast = cardDayPast.length
         } catch (error) {
            console.error("Error fetching card data:", error);
         }
      };
      fetchCards();
   }, []);

   const questionAnsweredDay = async (id: string, status: string) => {
      const dataSatate = state.cardDay.find(({ id }) => id === id)

      const data = {
         id: id,
         id_database: dataSatate?.database_id || '',
         status: status,
         respontracker: dataSatate?.properties.Respontracker.number || 1,
         days: localUserDays,
         penaltyIcorrect: 2,
         penaltyRegular: 1,
         penaltyCorrecet: 1,
      }

      updateCard(id, data)
      // if (!isDataUpdate) {
      //    return false
      // }

      dispatch({
         type: ACTION_TYPE.QUESTION_ANSWERED_DAY,
         payload: {
            id: id
         }
      })
      return true

   }

   const questionAnsweredDayLast = async (id: string, status: string) => {
      const dataSatate = state.cardDay.find(({ id }) => id === id)

      const data = {
         id: id,
         id_database: dataSatate?.database_id || '',
         status: status,
         respontracker: dataSatate?.properties.Respontracker.number || 1,
         days: localUserDays,
         penaltyIcorrect: 2,
         penaltyRegular: 1,
         penaltyCorrecet: 1,
      }
      // cardDayPast: IupdatePageDate
      updateCard(id, data)
      // if (!isDataUpdate) {
      //    return false
      // }

      dispatch({
         type: ACTION_TYPE.QUESTION_ANSWERED_DAY_LAST,
         payload: {
            id: id
         }
      })

      return true
   }

   return (
      <ContextCard.Provider value={{
         state,
         questionAnsweredDay,
         questionAnsweredDayLast,
         numToday,
         numPast,
         isLoading,
      }}>
         <contextControllerCard.Provider value={{
            setControllerCard,
            controllerCard,
         }}>
            {children}
         </contextControllerCard.Provider>
      </ContextCard.Provider>
   )
}