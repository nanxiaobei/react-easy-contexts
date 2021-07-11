import React, { useContext, createContext } from 'react';

const create = (hookMap) => {
  const ctx = {};

  const AppProvider = Object.entries(hookMap).reduceRight((Merged, [hookKey, useValue]) => {
    const OneContext = createContext({});
    ctx[hookKey] = () => useContext(OneContext); // eslint-disable-line react-hooks/rules-of-hooks

    const OneProvider = ({ children }) => (
      <OneContext.Provider value={useValue()}>{children}</OneContext.Provider>
    );

    if (!Merged) return OneProvider;

    return ({ children }) => (
      <OneProvider>
        <Merged>{children}</Merged>
      </OneProvider>
    );
  }, null);

  ctx.useProvider = () => AppProvider;
  return ctx;
};

export default create;
