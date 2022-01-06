// ------- Sample createContext and useContext -------
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

type ThemeCtx = {
  usedTheme: any;
  themeSetter?: () => any;
};

const themes = {
  light: {
    foreground: 'blue',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

// Context lets us pass a value deep into the component tree
// without passing props through every component.
// here we set 'themes.light' for default value
export const ThemeContext = createContext<ThemeCtx>({
  usedTheme: themes.light,
});

type ThemeProps = {
  val: keyof typeof themes;
};

export const Theme = (props: PropsWithChildren<ThemeProps>): JSX.Element => {
  const { val, children } = props;

  // define state and dispatcher to be passed to context provider
  const [myTheme, setMyTheme] = useState(themes[val]);

  const toggleTheme = () => {
    const newTheme = myTheme == themes.dark ? themes.light : themes.dark;
    setMyTheme(newTheme);
  };

  return (
    <>
      {/* 
        using new value of 'ThemeContext'.
        children component inside 'ThemeContext.Provider'
        that call 'useContext' will get this new value.
        We can pass anything to provider value including function or dispatcher
      */}
      <ThemeContext.Provider
        value={{ usedTheme: myTheme, themeSetter: toggleTheme }}
      >
        {/*
          Components which are descendants of a Provider are called consumer.
          Consumer, and all components within this function ('Theme' function)
          will re-render whenever the Provider's value changes. 
        */}
        {children}
      </ThemeContext.Provider>
    </>
  );
};

export const Toolbar = (props: any): JSX.Element => {
  return (
    <div style={{ padding: '10px', background: 'pink' }}>
      <p>This is toolbar with id: {props.toolbarId}</p>
      <ThemedButton themedButtonId={props.toolbarId} />
    </div>
  );
};

const ThemedButton = (props: any): JSX.Element => {
  // it will read the current context value from the closest
  // matching Provider above it in the tree.
  const { usedTheme } = useContext(ThemeContext);

  // this themeSetter is available if passed by context,
  // because the context doesn't have it by default
  const { themeSetter } = useContext(ThemeContext);

  useEffect(() => {
    return () => {
      console.log(
        `'ThemedButton' with id ${props.themedButtonId} component is re-rendered. This happens because props 'value' of nearest context provider is changed`
      );
    };
  });

  return (
    <div>
      {themeSetter ? (
        <p>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Theme can be changed because the context has 'themeSetter' function
          passed by context provider
        </p>
      ) : null}

      <button
        style={{
          background: usedTheme.background,
          color: usedTheme.foreground,
        }}
        onClick={themeSetter}
      >
        I am styled by theme context!
      </button>
    </div>
  );
};

// we make custom hook to use context
// more efficiently in any other of this file
export const useThemeContext = () => useContext(ThemeContext);
