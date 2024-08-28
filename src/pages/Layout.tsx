import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ProfileUser } from '../components/profile';
import { UserModal } from '../components/modals';
import { toggleModal } from '../helpers';
import { useRegisterUser } from '../hooks';
import { ProviderCard } from '../contexts';

export const Layout = () => {
   const { changeFrom, user } = useRegisterUser()

   useEffect(() => {
      if (user.name === '') {
         toggleModal.show('userModal')
      }
   }, [user])

   return (
      <div className='min-h-[100dvh] text-white overflow-hidden'>
         <UserModal changeFrom={changeFrom} />
         <header className='mt-2 mr-2'>
            <ProfileUser />
         </header>
         <ProviderCard>
            <Outlet context={{ name: user.name }} />
         </ProviderCard>
      </div>
   )
}