import { createContext, ReactNode, useState } from "react";

interface IThemeContext {
  theme: string;
  setTheme: (val: string) => void;
}

interface IProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<IThemeContext | null>(null);

export const ThemeContextProvider = ({ children }: IProviderProps) => {
  const [theme, setTheme] = useState("Light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
