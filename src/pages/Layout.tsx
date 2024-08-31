import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { toggleModal } from '../helpers';
import { useRegisterUser } from '../hooks';
import { UserModal } from '../components/modals';
import { ProfileUser } from '../components/profile';
import { ProviderCard, ProviderChallenge } from '../contexts';

export const Layout = () => {
   const { changeFrom, user } = useRegisterUser()

   useEffect(() => {
      if (user.name === '') {
         toggleModal.show('userModal')
      }
   }, [user])

   return (
      <div className='font-thin min-h-[100dvh] text-white overflow-hidden bg-bgColorPrimary'>
         <UserModal changeFrom={changeFrom} />
         <header>
            <ProfileUser />
         </header>
         <ProviderCard>
            <ProviderChallenge>
               <Outlet context={{ name: user.name }} />
            </ProviderChallenge>
         </ProviderCard>
      </div>
   )
}