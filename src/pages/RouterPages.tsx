import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage, Layout, SettingPage } from './';

export const RouterPages = () => {
   return (
      <Routes>
         <Route path="/" element={<Layout />} >
            <Route path="/" element={<HomePage />} />
            <Route path="/setting" element={<SettingPage />} />
         </Route>
         
         <Route path="*" element={<Navigate to={'/'} />} />
      </Routes >
   )
}
