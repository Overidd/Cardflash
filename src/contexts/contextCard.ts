import { createContext } from 'react'
import { CardState } from '../utils'

type ControllerCardState = {
   open_controllerCardPast: boolean;
   open_controllerCardToday: boolean;
   open_controllerCardIsPast: boolean;
   open_controllerCardFinish: boolean;
};

type ContextCardType = {
   state: CardState;
   questionAnsweredDay: (id: string, status: string) => Promise<boolean>;
   questionAnsweredDayLast: (id: string, status: string) => Promise<boolean>;
   numToday: number;
   numPast: number;
   isLoading: boolean;
};


const defaultState: CardState = {
   cardDay: [],
   cardDayPast: [],
};

export const ContextCard = createContext<ContextCardType>({
   state: defaultState,
   questionAnsweredDay: async () => false,
   questionAnsweredDayLast: async () => false,
   numToday: 0,
   numPast: 0,
   isLoading: false
});

type ContextControllerType = {
   controllerCard: ControllerCardState;
   setControllerCard: React.Dispatch<React.SetStateAction<ControllerCardState>>;
}

export const contextControllerCard = createContext<ContextControllerType>({
   controllerCard: {
      open_controllerCardPast: false,
      open_controllerCardToday: false,
      open_controllerCardIsPast: false,
      open_controllerCardFinish: false,
   },
   setControllerCard: () => { },
});