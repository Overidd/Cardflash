import { toggleModal } from "../../helpers"
import { ButtonCategory } from "../bottoms"
import { Modal } from "./Modal"
import { StickyNote } from "lucide-react"

const data = [
   {
      id: 'ca1',
      category: 'React',
      color: 'bg-blue-500',
   }
]

interface ModalPros {
   startChallend: (category: string) => void
}

export const ChallengModal = ({ startChallend }: ModalPros) => {
   const closeModal = () => {
      toggleModal.close('categorias')
   }
   const getTextButton = (e: React.MouseEvent<HTMLButtonElement>) => {
      const button = e.currentTarget as HTMLButtonElement;
      toggleModal.close('categorias');
      startChallend(button.innerText);
   }
   return (
      <Modal
         id="categorias"
         onClick={closeModal}
      >
         <div className="space-x-4">
            {
               data.map((item) => (
                  <ButtonCategory
                     key={item.id}
                     id={item.id}
                     text={item.category}
                     onClick={getTextButton}
                     className={`py-2 px-4 rounded-lg ${item.color}`}
                  >
                     <StickyNote size={17} />
                  </ButtonCategory>
               ))
            }
         </div>
      </Modal>
   )
}
