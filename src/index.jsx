import { useContext, useMemo, createContext } from 'react';

const wrappers = Symbol();

export const create = (hookMap) => {
  const proto = Object.defineProperty({}, wrappers, { value: [] });
  const contexts = Object.create(proto);

  Object.entries(hookMap).forEach(([hookKey, useValue]) => {
    const AppContext = createContext({});

    const useAppContext = () => useContext(AppContext);
    const AppWrapper = ({ children }) => (
      <AppContext.Provider value={useValue()}>{children}</AppContext.Provider>
    );

    contexts[hookKey] = useAppContext;
    contexts[wrappers].push(AppWrapper);
  });
  return contexts;
};

export const useProvider = (contexts) => {
  return useMemo(() => {
    return contexts[wrappers].reduceRight((Inside, Wrapper) => ({ children }) => (
      <Wrapper>
        <Inside>{children}</Inside>
      </Wrapper>
    ));
  }, [contexts]);
};
