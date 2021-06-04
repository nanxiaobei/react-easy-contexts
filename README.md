# react-easy-contexts ♒️

A simple tool to add multiple React contexts easily.

[![npm](https://img.shields.io/npm/v/react-easy-contexts.svg?style=flat-square)](https://www.npmjs.com/package/react-easy-contexts)
[![npm](https://img.shields.io/npm/dt/react-easy-contexts?style=flat-square)](https://www.npmtrends.com/react-easy-contexts)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-easy-contexts?style=flat-square)](https://bundlephobia.com/result?p=react-easy-contexts)
[![npm peer dependency version](https://img.shields.io/npm/dependency-version/react-easy-contexts/peer/react?style=flat-square)](https://github.com/facebook/react)
[![GitHub](https://img.shields.io/github/license/nanxiaobei/react-easy-contexts?style=flat-square)](https://github.com/nanxiaobei/react-easy-contexts/blob/master/LICENSE)

---

## Add

```shell script
yarn add react-easy-contexts

# or

npm i react-easy-contexts
```

## Use

```jsx
// App.jsx
import { useState, useMemo } from 'react';
import { create, useProvider } from 'react-easy-contexts';

export const ctx = create({
  useX() {
    const [x, setX] = useState({});
    return useMemo(() => ({ x, setX }), [x]);
  },
  useY() {
    const [y, setY] = useState({});
    return useMemo(() => ({ y, setY }), [y]);
  },
  useZ() {
    const [z, setZ] = useState({});
    return useMemo(() => ({ z, setZ }), [z]);
  },
});

const App = () => {
  const Provider = useProvider(ctx);
  return (
    <Provider>
      <AppMain />
    </Provider>
  );
};

// AppMain.jsx
const AppMain = () => {
  const { x } = ctx.useX();
  const { y } = ctx.useY();
  const { z } = ctx.useZ();

  return (
    <div>
      {x} {y} {z}
    </div>
  );
};
```

**Without `react-easy-contexts`, equals to:**

```jsx
import { useState, useContext, useMemo, createContext } from 'react';

const XContext = createContext({});
const YContext = createContext({});
const ZContext = createContext({});

export const useX = () => useContext(XContext);
export const useY = () => useContext(YContext);
export const useZ = () => useContext(ZContext);

const XProvider = ({ children }) => {
  const [x, setX] = useState({});
  const value = useMemo(() => ({ x, setX }), [x]);
  return <XContext.Provider value={value}>{children}</XContext.Provider>;
};
const YProvider = ({ children }) => {
  const [y, setY] = useState({});
  const value = useMemo(() => ({ y, setY }), [y]);
  return <YContext.Provider value={value}>{children}</YContext.Provider>;
};
const ZProvider = ({ children }) => {
  const [z, setZ] = useState({});
  const value = useMemo(() => ({ z, setZ }), [z]);
  return <ZContext.Provider value={value}>{children}</ZContext.Provider>;
};

const App = () => {
  return (
    <XProvider>
      <YProvider>
        <ZProvider>
          <AppMain />
        </ZProvider>
      </YProvider>
    </XProvider>
  );
};

// AppMain.jsx
const AppMain = () => {
  const { x } = useX();
  const { y } = useY();
  const { z } = useZ();

  return (
    <div>
      {x} {y} {z}
    </div>
  );
};
```

## API

### create

```js
const hookMap = { useA() {}, useB() {} };

const ctx = create(hookMap);
```

### useProvider

```jsx
const Provider = useProvider(ctx);
```

## License

[MIT License](https://github.com/nanxiaobei/react-easy-contexts/blob/master/LICENSE) © [nanxiaobei](https://mrlee.me/)
