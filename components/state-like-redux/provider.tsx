import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from 'react';
import { initialStateRootReducer, rootReducer } from './reducers';

type FreeObject = {
  [key: string]: any;
};

// assign generic FreeObject so we can set any value in this context
// but you will lose strong typing when use the context
const GlobalStore = createContext<FreeObject>({});

// custom hook for using this context
export const useGlobalStore = () => useContext(GlobalStore);

export const GlobalProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(rootReducer, initialStateRootReducer);

  return (
    <GlobalStore.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStore.Provider>
  );
};
