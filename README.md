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
import create from 'react-easy-contexts';
import Main from './Main';

export const ctx = create({
  useX() {
    const [x1, setX1] = useState(0);
    const [x2, setX2] = useState(0);
    return useMemo(() => ({ x1, x2, setX1, setX2 }), [x1, x2]);
  },
  useY() {
    const [y1, setY1] = useState(0);
    const [y2, setY2] = useState(0);
    return useMemo(() => ({ y1, y2, setY1, setY2 }), [y1, y2]);
  },
  useZ() {
    const [z1, setZ1] = useState(0);
    const [z2, setZ2] = useState(0);
    return useMemo(() => ({ z1, z2, setZ1, setZ2 }), [z1, z2]);
  },
});

const App = () => {
  const Provider = ctx.useProvider();
  return (
    <Provider>
      <Main />
    </Provider>
  );
};

// Main.jsx
import { ctx } from './App';

const Main = () => {
  const { x1, x2 } = ctx.useX();
  const { y1, y2 } = ctx.useY();
  const { z1, z2 } = ctx.useZ();

  return (
    <div>
      {x1} {x2} {y1} {y2} {z1} {z2}
    </div>
  );
};
```

**Without `react-easy-contexts`, equals to:**

```jsx
// App.jsx
import { useState, useContext, useMemo, createContext } from 'react';

const XContext = createContext({});
const YContext = createContext({});
const ZContext = createContext({});

export const useX = () => useContext(XContext);
export const useY = () => useContext(YContext);
export const useZ = () => useContext(ZContext);

const XProvider = ({ children }) => {
  const [x1, setX1] = useState(0);
  const [x2, setX2] = useState(0);
  const value = useMemo(() => ({ x1, x2, setX1, setX2 }), [x1, x2]);
  return <XContext.Provider value={value}>{children}</XContext.Provider>;
};
const YProvider = ({ children }) => {
  const [y1, setY1] = useState(0);
  const [y2, setY2] = useState(0);
  const value = useMemo(() => ({ y1, y2, setY1, setY2 }), [y1, y2]);
  return <YContext.Provider value={value}>{children}</YContext.Provider>;
};
const ZProvider = ({ children }) => {
  const [z1, setZ1] = useState(0);
  const [z2, setZ2] = useState(0);
  const value = useMemo(() => ({ z1, z2, setZ1, setZ2 }), [z1, z2]);
  return <ZContext.Provider value={value}>{children}</ZContext.Provider>;
};

const App = () => {
  return (
    <XProvider>
      <YProvider>
        <ZProvider>
          <Main />
        </ZProvider>
      </YProvider>
    </XProvider>
  );
};

// Main.jsx
import { useX, useY, useZ } from './App';

const Main = () => {
  const { x1, x2 } = useX();
  const { y1, y2 } = useY();
  const { z1, z2 } = useZ();

  return (
    <div>
      {x1} {x2} {y1} {y2} {z1} {z2}
    </div>
  );
};
```

## Try

[![Edit react-easy-contexts](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-easy-contexts-28f8z?fontsize=14&hidenavigation=1&theme=dark)

## API

### create

```js
import create from 'react-easy-contexts';

const ctx = create({ useA() {}, useB() {}, useC() {} });
// don't use "useProvider" as key, it'll be overwritten.
```

## License

[MIT License](https://github.com/nanxiaobei/react-easy-contexts/blob/master/LICENSE) © [nanxiaobei](https://mrlee.me/)
