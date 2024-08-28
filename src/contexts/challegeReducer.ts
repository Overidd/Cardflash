import { ChallegeRandom } from "../utils";

const ACTION_TYPE = {
   SET_CARDS: 'SET_CARDS',
   CHALLEMGE_ANSWERED: 'CHALLEMGE_ANSWERED',
   SET_CHALLENGE: 'SET_CHALLENGE',
   SET_CHALLENGE_ERROR: 'SET_CHALLENGE_ERROR'
} as const;

type challengeAction =
   | { type: typeof ACTION_TYPE.SET_CARDS; payload: { data: ChallegeRandom[], numQueries: number } }
   | { type: typeof ACTION_TYPE.CHALLEMGE_ANSWERED; payload: { id: string } }


export const challegeReduce = (state: ChallegeRandom[], action: challengeAction): ChallegeRandom[] => {

   switch (action.type) {
      case ACTION_TYPE.SET_CARDS: {

         const questions = action.payload.data.map(({ Answers }) => {
            return Answers[0]
         }, [])
         console.log(questions)


         const newState = action.payload.data.map((item) => {
            const questionRandom: string[] = []

            let i = 0

            while (i < (action.payload.numQueries - 1)) {
               const randomIndex = Math.floor(Math.random() * questions.length)

               if (questions[randomIndex] !== item.Answers[0]) {
                  const question = questions[randomIndex]
                  questionRandom.push(question)
                  i++
               }
            }
            const indexRandom = Math.floor(Math.random() * questionRandom.length + 1)

            questionRandom.splice(indexRandom, 0, item.Answers[0])

            return {
               ...item,
               Answers: questionRandom,
               index: indexRandom,
            }
         })
         console.log(newState)
         return newState
      }

      case ACTION_TYPE.CHALLEMGE_ANSWERED: {
         const newState = state.filter(item => item.id !== action.payload.id)
         return newState
      }

      default:
         return state
   }
}