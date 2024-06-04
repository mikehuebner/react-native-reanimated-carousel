import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

interface WebProviderProps {
  children: ReactNode;
}

interface WebContextProps {
  color: string;
  page?: string;
}

const defaultColor = 'light';

export const WebContext = createContext<WebContextProps>(null!);

export const WebProvider = ({ children }: WebProviderProps) => {
  const [color, setColor] = useState(defaultColor);
  const [page, setPage] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const color = urlParams.get('color');
    const page = urlParams.get('page');

    color && setColor(color);
    page && setPage(page);
  }, []);

  return <WebContext.Provider value={{ color, page }}>{children}</WebContext.Provider>;
};

export const useWebContext = (): WebContextProps | undefined => {
  return useContext(WebContext);
};
