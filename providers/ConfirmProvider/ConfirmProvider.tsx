import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

type Confirm = {
  prompt: string;
  isOpen: boolean;
  proceed: null | ((value?: unknown) => void);
  cancel: null | (() => void);
};

export const ConfirmContext = createContext<
  [Confirm, Dispatch<SetStateAction<Confirm>>]
>([
  {
    prompt: '',
    isOpen: false,
    proceed: null,
    cancel: null,
  },
  () => {},
]);

const ConfirmProvider = ({ children }: { children: ReactNode }) => {
  const [confirm, setConfirm] = useState<Confirm>({
    prompt: '',
    isOpen: false,
    proceed: null,
    cancel: null,
  });

  return (
    <ConfirmContext.Provider value={[confirm, setConfirm]}>
      {children}
    </ConfirmContext.Provider>
  );
};

export default ConfirmProvider;
