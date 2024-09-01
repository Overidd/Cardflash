import { ChallegeRandom, IdataJSONCard, IupdatePageDate } from "../utils";

export const getTwoCardType = async () => {
   try {
      const response = await fetch(`${import.meta.env.VITE_APIURL}/question/list`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
      });

      const json = await response.json();
      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: IdataJSONCard[] = await json.data

      // Filtrar los datos y actualizar el estado usando dispatch
      const cardDay = data.filter(({ properties: { Date: { date } } }) => {
         const [year, month, day] = String(date).split('-')
         return new Date(`${month}-${day}-${year}`).getDate() === new Date().getDate();
      });

      const cardDayPast = data.filter(({ properties: { Date: { date } } }) => {
         const [year, month, day] = String(date).split('-')
         return new Date(`${month}-${day}-${year}`) < new Date();
      });

      console.log(cardDay, cardDayPast)
      console.log(data)
      return {
         cardDay,
         cardDayPast,
      }
   } catch (error) {
      console.error('Error fetching data:', error);
      return {
         cardDay: [],
         cardDayPast: [],
      }
   }
};


export const updateCard = async (id: string, card: IupdatePageDate) => {
   try {
      const response = await fetch(`${import.meta.env.VITE_APIURL}/question/update/${id}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(card)
      })

      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }
      // const data = await response.json()
      return true;

   } catch (error) {
      console.error('Error updating data:', error);
      return false
   }
}

export const getCardRandom = async () => {
   try {
      const response = await fetch(`${import.meta.env.VITE_APIURL}/question/list/challenge`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
      });

      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json()
      const data: ChallegeRandom[] = json.data
      return {
         data,
         status: true
      }

   } catch (error) {
      console.error('Error fetching data:', error);
      return {
         data: [],
         status: false
      }
   }
}

export const getCardCategory = async (category: string) => {
   try {
      const response = await fetch(`${import.meta.env.VITE_APIURL}/question/list/challenge/${category}`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
      })

      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json()
      const data: ChallegeRandom[] = json.data

      return {
         data,
         status: true
      }

   } catch (error) {
      console.error('Error fetching data:', error);
      return {
         data: [],
         status: false
      }
   }
}