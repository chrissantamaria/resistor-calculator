import React, { useState, createContext, useContext } from 'react';
import { Snackbar } from '@material-ui/core';

const NotificationContext = createContext(() => {});
// Custom hook that exposes a setNotification function
// which any component can call to display a Snackbar notification
export const useNotification = () => useContext(NotificationContext);

export default function NotificationProvider({ children, ...props }) {
  const [notification, setNotification] = useState(null);

  // Renders Snackbar as a sibling to Notification's children but
  // provides setNotification to them through Context
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={!!notification}
        autoHideDuration={4000}
        onClose={() => setNotification(null)}
        message={<span>{notification}</span>}
        // Allowing for additional props / overriding above
        {...props}
      />
      <NotificationContext.Provider value={setNotification}>
        {children}
      </NotificationContext.Provider>
    </>
  );
}
