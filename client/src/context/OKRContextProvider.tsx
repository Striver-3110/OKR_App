import React from 'react'


interface OKRContextType {

}


const OKRContext = React.createContext<OKRContextType | undefined>(undefined)

export const OKRContextProvider: React.FC<{children: React.ReactNode}> = ({children}) =>{

  return (
    <OKRContext.Provider value={''}>
      {children}
    </OKRContext.Provider>
  );

}