import { useCart } from "../../contexts";
import { CardQuestion } from "./CardQuestion";


interface IshowTodayProps {
  isCardToday: ()=> void
}
export const CardshowToday = ({isCardToday}:IshowTodayProps) => {
  const { state, questionAnsweredDay } = useCart();

  if (state.cardDay.length === 0) {
    return <p className="text-black">No hay tarjetas disponibles para mostrar.</p>
  }

  const { properties: { Question, Answer, Category, Theme }, id } = state.cardDay[0];

  return (
    <CardQuestion
      bgColor="transparent"
      question={Question.content || ''}
      answer={Answer.content || ''}
      properties={[{ ...Category }, { ...Theme }]}
      link={Answer.link || ''}
      questionAnswer={questionAnsweredDay}
      id={id}
      isCard={isCardToday}
    />
  );
};
