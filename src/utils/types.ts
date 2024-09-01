
export type ChallegeRandom = {
   id: string;
   Question: string
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
export enum ColorKeys {
   Grey = 'grey',
   GreySegundary = 'greySegundary',
   Red = 'red',
   Yellow = 'yellow',
   Green = 'green',
   Default = 'default',
   Gray = 'gray',
   Blue = 'blue',
   Purple = 'purple',
   Brown = 'brown',
   Orange = 'orange',
   Pink = 'pink',
}

interface Category {
   select: string;
   color: ColorKeys;
   id?: string;
}

interface DateClass {
   date: string;
}

interface Respontracker {
   number: number | null;
}

interface Status {
   name: string;
   color: ColorKeys;
}
