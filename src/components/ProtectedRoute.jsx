// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { Navigation } from './navigation';

// export const ProtectedRoute = () => {
//   // בדיקה אם המשתמש מחובר (לפי המצב ב-Redux)
//   const isAuthenticated = useSelector(state => state.user?.isAuthenticated || false);
  
//   // אם המשתמש לא מחובר, הפנה אותו לדף ההתחברות
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   // אם המשתמש מחובר, הצג את התפריט ואת תוכן העמוד
//   return (
//     <>
//       <Navigation />
//       <Outlet />
//     </>
//   );
// };
