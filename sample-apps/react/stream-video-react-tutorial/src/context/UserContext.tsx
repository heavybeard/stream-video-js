import { createContext, ReactNode, useContext, useState } from 'react';
import { UserInput } from '@stream-io/video-client';
import users from '../../data/users';

type UserDataContextValue = {
  setSelectedUserId: (userId: string) => void;
  users: Record<string, UserInput>;
  selectedUserId?: string;
};

const UserDataContext = createContext<UserDataContextValue>({
  setSelectedUserId: () => null,
  users,
});

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [selectedUserId, setSelectedUserId] = useState('alice');

  return (
    <UserDataContext.Provider
      value={{ setSelectedUserId, selectedUserId, users }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);
