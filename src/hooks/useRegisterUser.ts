import { useState } from 'react';
import { toggleModal } from '../helpers'

export const useRegisterUser = () => {
   const [user, setUser] = useState<{ name: string; data: number[]; }>({
      name: window.localStorage.getItem('userName') || '',
      data: JSON.parse(window.localStorage.getItem('userDays') || '[]')
   });

   const changeFrom = (e: React.FormEvent<HTMLFormElement>, numForm: number) => {
      e.preventDefault()
      const form = e.target as HTMLFormElement;
      const inputsValue: number[] = []

      if (numForm === 1) {
         const name = (form.elements.namedItem('name') as HTMLInputElement)?.value;
         window.localStorage.setItem('userName', name)
         return
      }

      if (numForm === 2) {
         for (const elementInput of form.elements) {
            if ((elementInput instanceof HTMLInputElement) && elementInput.value !== undefined && elementInput.value !== '') {
               inputsValue.push(parseInt(elementInput.value));
            }
         }
         window.localStorage.setItem('userDays', JSON.stringify(inputsValue))
      }

      const userNameLocal = window.localStorage.getItem('userName')
      const userDayLocal = window.localStorage.getItem('userDays')

      setUser({
         name: userNameLocal ?? '',
         data: userDayLocal ? JSON.parse(userDayLocal) : []
      })

      if (inputsValue.length > 0) {
         toggleModal.close('userModal')
      }
   }

   return {
      user,
      changeFrom,
   }
}
// Sakura