import React, { useContext, createContext } from 'react';

const create = (hookMap) => {
  const ctx = {};

  const AppProvider = Object.entries(hookMap).reduceRight((Merged, [hookKey, useValue]) => {
    const OneContext = createContext({});
    ctx[hookKey] = () => useContext(OneContext); // eslint-disable-line react-hooks/rules-of-hooks

    if (!Merged) {
      return ({ children }) => (
        <OneContext.Provider value={useValue()}>{children}</OneContext.Provider>
      );
    }

    return ({ children }) => (
      <OneContext.Provider value={useValue()}>
        <Merged>{children}</Merged>
      </OneContext.Provider>
    );
  }, null);

  ctx.useProvider = () => AppProvider;

  return ctx;
};

export default create;
