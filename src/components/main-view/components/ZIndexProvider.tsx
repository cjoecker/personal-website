import React, { createContext, useState } from 'react';

interface ZIndexContext {
  maxZIndex: number;
  setMaxZIndex: (newIndex: number) => void;
}

export const ZIndexContext = createContext<ZIndexContext>(undefined!);

export function ZIndexProvider(props: any) {
  const [maxZIndex, setMaxZIndex] = useState(0);
  const value = { maxZIndex, setMaxZIndex };
  return <ZIndexContext.Provider value={value} {...props} />;
}
