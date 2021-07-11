import React, { useContext, createContext } from 'react';

const create = (hookMap) => {
  const ctx = {};
  const hookEntries = Object.entries(hookMap);
  let AppProvider;

  for (let i = hookEntries.length - 1; i >= 0; i--) {
    const [hookKey, useContextValue] = hookEntries[i];
    const OneContext = createContext({});

    AppProvider = AppProvider
      ? ({ children }) => (
          <OneContext.Provider value={useContextValue()}>
            <AppProvider>{children}</AppProvider>
          </OneContext.Provider>
        )
      : ({ children }) => (
          <OneContext.Provider value={useContextValue()}>{children}</OneContext.Provider>
        );

    ctx[hookKey] = () => useContext(OneContext); // eslint-disable-line react-hooks/rules-of-hooks
  }

  ctx.useProvider = () => AppProvider;
  return ctx;
};

export default create;
