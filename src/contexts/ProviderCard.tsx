import { useReducer, ReactNode, useEffect } from 'react'
import { ContextCard, cardReducer, ACTION_TYPE } from '.'
import { IdataJSONCard } from '../utils';
import { getTwoCardType, updateCard } from '../services';
import { dataQuestion } from '../data/dataQuestion';

const initialState = dataQuestion


type ProviderProps = {
   children: ReactNode;
};

// ----
const localUserDays: number[] = JSON.parse(localStorage.getItem('userDays') || '[]');


export const ProviderCard = ({ children }: ProviderProps) => {
   const [state, dispatch] = useReducer(cardReducer, initialState)

   // useEffect(() => {
   //    getTwoCardType()
   //       .then(({ cardDay, cardDayPast }) => {
   //          updateDispatchFetch(cardDay, cardDayPast)
   //       })
   // }, []);

   // // Actualizar el estado con los datos obtenidos
   // const updateDispatchFetch = (cardDay: IdataJSONCard[], cardDayPast: IdataJSONCard[]) => {
   //    return dispatch({
   //       type: 'SET_CARDS',
   //       payload: {
   //          cardDay,
   //          cardDayPast
   //       }
   //    })
   // }

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

      // const isDataUpdate = await updateCard(id, data)
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
      // const isDataUpdate = await updateCard(id, data)
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
      }}>
         {children}
      </ContextCard.Provider>
   )
}