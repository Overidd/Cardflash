import { useCart } from "../../contexts"
import { CardQuestion } from "./CardQuestion"

interface IshowTodayProps {
  isCardPast: () => void
}
export const CardShowpastday = ({ isCardPast }: IshowTodayProps) => {
  const { state, questionAnsweredDayLast } = useCart()

  if (state.cardDayPast.length === 0) {
    return <p className="text-black">No hay tarjetas disponibles para mostrar.</p>
  }
  const { properties: { Question, Answer, Category, Theme }, id } = state.cardDayPast[0]

  console.log(state)

  return (
    <CardQuestion
      bgColor="transparent"
      question={Question.content || ''}
      answer={Answer.content || ''}
      properties={[{ ...Category }, { ...Theme }]}
      link={Answer.link || ''}
      questionAnswer={questionAnsweredDayLast}
      id={id}
      isCard={isCardPast}
    />
  )
}
