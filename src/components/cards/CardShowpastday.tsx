import { useCart } from "../../contexts"
import { CardQuestion } from "."

interface IshowTodayProps {
  isCardPast: () => void
}
export const CardShowpastday = ({ isCardPast }: IshowTodayProps) => {
  const { state, questionAnsweredDayLast } = useCart()

  if (state.cardDayPast.length === 0) {
    return <p className="text-black">No hay tarjetas disponibles para mostrar.</p>
  }
  const { properties: { Question, Answer, Category, Theme, Status }, id } = state.cardDayPast[0]

  return (
    <CardQuestion
      bgColor="transparent"
      question={Question.content || ''}
      answer={Answer.content || ''}
      properties={[{ ...Category }, { ...Theme }]}
      link={Answer.link || ''}
      questionAnswer={questionAnsweredDayLast}
      statusColor={Status.color}
      id={id}
      isCard={isCardPast}
    />
  )
}
