import { createContext, useContext, ReactNode, useState } from "react";

interface ExampleProviderProps {
  children: ReactNode;
}
interface ExampleProps {
  isOn: boolean;
  toggleExample: (valor:boolean) => void;
}


const ExampleContext = createContext({} as ExampleProps);

export function ExampleProvider({ children }: ExampleProviderProps) {

  const [example, setExample] = useState({
    toggleExample: (valor:boolean) => toggleExample(valor),
    isOn: true,
  })

  const { isOn } = example;

  function toggleExample(valor:boolean) {
    setExample({...example, isOn: !valor})
  }


  return (
    <ExampleContext.Provider value={example}>
      {children}
    </ExampleContext.Provider>
  );
}

export const useExampleContext = () => useContext(ExampleContext)