import { useReducer, ReactNode, useEffect } from 'react'
import { ContextCard, cardReducer, ACTION_TYPE } from '.'
import { IdataJSONCard } from '../utils';
import { getTwoCardType, updateCard } from '../services';

const initialState = {
   cardDay: [
      {
         object: "card",
         id: "1",
         page_url: "/page1",
         icon_url: "/icon1.png",
         database_id: "db1",
         properties: {
            Question: { content: "What is the capital of France?", link: null },
            Category: { select: "Geography", color: "blue", id: "cat1" },
            Theme: { select: "Europe", color: "green", id: "theme1" },
            Status: { name: "New", color: "red" },
            Answer: { content: "Paris", link: null },
            Date: { date: "2024-08-28" },
            Respontracker: { number: 3 },
         },
      },
      {
         object: "card",
         id: "2",
         page_url: "/page2",
         icon_url: "/icon2.png",
         database_id: "db2",
         properties: {
            Question: { content: "What is 2 + 2?", link: null },
            Category: { select: "Math", color: "yellow", id: "cat2" },
            Theme: { select: "Arithmetic", color: "orange", id: "theme2" },
            Status: { name: "New", color: "green" },
            Answer: { content: "4", link: null },
            Date: { date: "2024-08-28" },
            Respontracker: { number: 1 },
         },
      },
   ],
   cardDayPast: [
      {
         object: "card",
         id: "3",
         page_url: "/page3",
         icon_url: "/icon3.png",
         database_id: "db3",
         properties: {
            Question: { content: "What is the boiling point of water?", link: null },
            Category: { select: "Science", color: "blue", id: "cat3" },
            Theme: { select: "Physics", color: "purple", id: "theme3" },
            Status: { name: "Reviewed", color: "grey" },
            Answer: { content: "100°C", link: null },
            Date: { date: "2024-08-27" },
            Respontracker: { number: 2 },
         },
      },
   ],
};


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