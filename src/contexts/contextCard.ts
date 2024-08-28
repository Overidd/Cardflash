import { createContext } from 'react'
import { CardState } from '../utils'

type ContextCardType = {
   state: CardState
   questionAnsweredDay: (id: string, status: string) => Promise<boolean>;
   questionAnsweredDayLast: (id: string, status: string) => Promise<boolean>;
}

const defaultState: CardState = {
   cardDay: [],
   cardDayPast: [],
};

export const ContextCard = createContext<ContextCardType>({
   state: defaultState,
   questionAnsweredDay: async () => false,
   questionAnsweredDayLast: async () => false,
});

