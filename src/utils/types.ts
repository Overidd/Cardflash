
export type ChallegeRandom = {
   id: string;
   page_url: string;
   icon_url: string;
   Category: Category;
   Theme: Category;
   Answers: string[]
   index?: number;
}

export type CardState = {
   cardDay: IdataJSONCard[],
   cardDayPast: IdataJSONCard[],
};
export enum OpctionsStatus {
   Incorrect = 'Incorrect',
   Regular = 'Regular',
   Correct = 'Correct',
};

export type IupdatePageDate = {
   id: string,
   id_database: string,
   status: string, // OpctionsStatus
   respontracker: number,
   days: number[

   ]
   penaltyIcorrect?: number,
   penaltyRegular?: number,
   penaltyCorrecet?: number,
}

export type Iuser = {
   name: string;
}

export interface IdataJSONCard {
   object: string;
   id: string;
   page_url: string;
   icon_url: string;
   database_id: string;
   properties: IPropertiesCards;
}

export interface IPropertiesCards {
   Question: Answer;
   Category: Category;
   Theme: Category;
   Status: Status;
   Answer: Answer;
   Date: DateClass;
   Respontracker: Respontracker;
}

interface Answer {
   content: null | string;
   link: null | string;
}

interface Category {
   select:  string;
   color:  string;
   id: string;
}

interface DateClass {
   date: string;
}

interface Respontracker {
   number: number | null;
}

interface Status {
   name: string;
   color: string;
}
