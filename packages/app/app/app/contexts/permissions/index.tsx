import React, {createContext, useContext, useState} from 'react';
import {requestNotifications} from 'react-native-permissions';
import {IPermissionsContext, Notifications} from './interfaces';

const PermissionsContext = createContext<IPermissionsContext>({} as any);

interface PermissionsProviderProps {
  children: React.ReactElement;
}

export function PermissionsProvider({children}: PermissionsProviderProps) {
  const [notifications, setNotifications] = useState<Notifications>({
    status: null,
    settings: null,
  });

  const requester = () =>
    requestNotifications(['alert', 'sound']).then(r => setNotifications(r));

  return (
    <PermissionsContext.Provider
      value={{
        notifications: {
          state: notifications,
          request: requester,
        },
      }}>
      {children}
    </PermissionsContext.Provider>
  );
}

export function usePermissions() {
  return useContext(PermissionsContext);
}
