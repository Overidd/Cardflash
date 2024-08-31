
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ButtonAction } from '../bottoms'
import { useValidInput } from '../../hooks'
import { Modal } from '.'

type userModalProps = {
   changeFrom: (e: React.FormEvent<HTMLFormElement>, numForm: number) => void
}

export const UserModal = ({ changeFrom }: userModalProps) => {
   const [continueRegister, setContinueRegister] = useState<boolean>(false)
   const [animationComplete, setAnimationComplete] = useState<boolean>(false);
   return (
      <Modal id='userModal'>
         <motion.div
            className='bg-bgColorPrimary text-gray-200 flex justify-center items-center'
            initial={{
               borderRadius: '15%',
               width: '100px',
               height: '100px'
            }} // Círculo inicial
            animate={{
               borderRadius: '1rem', width: '30rem', height: '20rem'
            }} // Cuadrado final
            transition={{ duration: 1, ease: 'easeInOut' }} // Duración y tipo de transición
            onAnimationComplete={() => setAnimationComplete(true)} // Marca la animación como completa
         >
            {
               animationComplete &&
               <form onSubmit={(e) => changeFrom(e, 1)}>
                  <UserName
                     className={`${continueRegister ? 'hidden' : 'block'}`}
                     setContinueRegister={setContinueRegister}
                  />
               </form>
            }

            {
               continueRegister &&
               <form onSubmit={(e) => changeFrom(e, 2)}>
                  <UserDayConfig />
               </form>
            }
         </motion.div>
      </Modal>
   );
}


type UserNameProps = {
   setContinueRegister: (value: boolean) => void;
   className?: string;
}
const UserName = ({ setContinueRegister, className }: UserNameProps) => {
   const { shake, validoContinue, handleChange } = useValidInput()

   return (
      <fieldset className={`space-y-4 text-center ${className}`}>
         <motion.input
            className={`block border-b-2 p-2 outline-none text-center font-semibold bg-bgColor rounded-md ${shake ? 'placeholder:text-red border-b-red' : ''}`}
            type="text"
            name="name"
            autoFocus
            onChange={handleChange}
            placeholder="Ingresa tu nombre"
            animate={shake ? { x: [-5, 5, -5, 5, -5, 0] } : {}}
            transition={{ duration: 0.5 }}
         />

         <ButtonAction
            type='submit'
            bgColor="primaryBlue"
            trueAnimation={false}
            text="Continuar"
            onClick={() => setContinueRegister(validoContinue())}
         />
      </fieldset>
   );
};

type UserDayConfigPros = {
   className?: string,
}

const UserDayConfig = ({ className }: UserDayConfigPros) => {
   const { shake, handleChange, validoContinue } = useValidInput()

   const [numInput, setnumInput] = useState({
      num: 4,
      error: false,
   })

   const handelNumInput = () => {
      if (numInput.num > 10) {
         setnumInput({ ...numInput, error: true })
         return
      }
      setnumInput({
         error: false,
         num: numInput.num + 1,
      })
   }
   return (
      <motion.fieldset
         className={`text-center flex flex-col gap-4 ${className}`}
         initial={{ x: '45%', opacity: 0 }}  // Inicia desde fuera de la pantalla a la derecha
         animate={{ x: 0, opacity: 1 }}        // Se mueve al centro
         transition={{ type: 'spring', stiffness: 50, duration: 0.5 }} // Duración y tipo de transición
      >
         <label className='text-base font-bold text-gray-400'>
            Ingresa los días de repaso
         </label>
         <div className='flex flex-wrap gap-2 px-8 font-semibold text-gray-200'>
            <>
               <motion.input
                  key={1}
                  className={`border-2 border-gray-400 bg-bgColor p-2 outline-none text-center w-11 ${shake ? 'border-[#ff5757] placeholder:text-red' : ''}`}
                  name={String('numInput' + 1)}
                  type='number'
                  placeholder={String(1)}
                  autoFocus
                  onChange={handleChange}
                  animate={shake ? { x: [-5, 5, -5, 5, -5, 0] } : {}}
                  transition={{ duration: 0.5 }}
               />
               {
                  Array.from({ length: numInput.num }, (_, index) => index + 2).map((index) => (
                     <input
                        key={index}
                        className="border-2 border-gray-400 bg-bgColor p-2 outline-none text-center w-11"
                        type='number'
                        name={String('numInput' + index)}
                        // placeholder={String(index)}
                        autoFocus={index === 1}
                     />
                  ))

               }
               <button
                  className={`bg-slate-900 p-2 min-w-10 rounded-md selection:none ${numInput.error ? 'cursor-no-drop' : ''}`}
                  type='button'
                  disabled={numInput.error ? true : false}
                  onClick={handelNumInput}
               >+
               </button>
            </>
         </div>

         <ButtonAction
            className='w-fit mx-auto'
            bgColor='primaryBlue'
            text='Finalizar'
            type='submit'
            onClick={() => validoContinue()}
            trueAnimation={false}
         />
      </motion.fieldset >
   )
}