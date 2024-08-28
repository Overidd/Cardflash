import { CardState, IdataJSONCard } from "../utils";

export const ACTION_TYPE = {
   SET_CARDS: 'SET_CARDS',
   QUESTION_ANSWERED_DAY: 'QUESTION_ANSWERED_DAY',
   QUESTION_ANSWERED_DAY_LAST: 'QUESTION_ANSWERED_DAY_PAST',
} as const;

type CardAction =
   | {
      type: typeof ACTION_TYPE.SET_CARDS;
      payload: {
         cardDay: IdataJSONCard[];
         cardDayPast: IdataJSONCard[]
      }
   }
   | { type: typeof ACTION_TYPE.QUESTION_ANSWERED_DAY; payload: { id: string } }
   | { type: typeof ACTION_TYPE.QUESTION_ANSWERED_DAY_LAST; payload: { id: string } }


export const cardReducer = (state: CardState, action: CardAction): CardState => {
   switch (action.type) {
      case ACTION_TYPE.SET_CARDS:
         return {
            // ...state,
            cardDay: action.payload.cardDay,
            cardDayPast: action.payload.cardDayPast,
            
         };

      case ACTION_TYPE.QUESTION_ANSWERED_DAY: {
         const newState = state.cardDay.filter((item) => item.id !== action.payload.id)

         return {
            ...state,
            cardDay: newState,
         };
      }
      case ACTION_TYPE.QUESTION_ANSWERED_DAY_LAST: {
         const newState = state.cardDayPast.filter(item => item.id !== action.payload.id)
         return {
            ...state,
            cardDayPast: newState,
         };
      }

   }
}