// filepath: c:\Users\Efrain Diaz\Documents\Ingenieria de software\Proyecto de Grado\frontend\frontend_app\src\context\HeaderContext.jsx
import React, { createContext, useState } from 'react';

export const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [headerInfo, setHeaderInfo] = useState({
    title: "Acerca de",
    description: "Información sobre el sistema",
  });

  return (
    <HeaderContext.Provider value={{ headerInfo, setHeaderInfo }}>
      {children}
    </HeaderContext.Provider>
  );
};