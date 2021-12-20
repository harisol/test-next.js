import { createContext, useContext, useEffect, useState } from 'react';

// ------- Sample useState and useEffect -------
export const Counter = (): JSX.Element => {
  const [personName, setPersonName] = useState('');
  const [count, setCount] = useState(0);
  const [data, setData] = useState({ hits: [] });

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonName(e.target.value);
  };

  // to pass parameter in event
  // wrap in in outer function
  const addCounter = (param: number) => {
    return (e: React.MouseEvent) => {
      const { type } = e;
      console.log('type:', type);

      setCount(count + param);
    };
  };

  // Similar to componentDidMount and componentDidUpdate on class component.
  // this function run every side effect.
  // Data fetching and manually changing the DOM in React components
  // are examples of side effects
  useEffect(() => {
    console.log(`I'm called on every DOM is changed including first render`);
  });

  // pass second argument with array of state or props (can be mixed)
  // to make it depend on mutation of that state or props only
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `clicked ${count} times`;

    // this is useEffect cleanup.
    // cleanup means, before running useEffect on next re-render
    // run this function first.
    return () => {
      console.log(`I'm called before button press`);
    };
  }, [count]);

  // pass second argument with empty array to make it
  // run only on first render
  useEffect(() => {
    console.log(`I'm effect of first render only`);
    fetch('https://hn.algolia.com/api/v1/search?query=redux').then(
      async (res) => {
        const data = await res.json();
        setData(data);
      }
    );
  }, []);

  return (
    <div>
      <p style={{ color: '#d31777' }}>
        This is sample of using react hook useEffect. <br />
        See console to see the effect when you click button or type on input
        text
      </p>
      <input
        type="text"
        onChange={changeName}
        placeholder="Input your name"
      ></input>
      <h3>Your name is {personName}</h3>
      <button onClick={addCounter(1)}>Click me</button>
      <p>You clicked {count} times</p>
      <h3>List data from external API: </h3>
      <ul>
        {!data.hits.length
          ? '(Loading Data..)'
          : data.hits.map((item: any) => (
              <li key={item.objectID}>
                <a href={item.url}>{item.title}</a>
              </li>
            ))}
      </ul>
    </div>
  );
};

// ------- Sample createContext -------

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
const ThemeContext = createContext(themes.light);

export const Theme = (): JSX.Element => {
  // define state
  const [usedTheme, setUsedTheme] = useState(themes.dark);

  const toggleTheme = () => {
    const newTheme = usedTheme == themes.dark ? themes.light : themes.dark;
    setUsedTheme(newTheme);
  };

  return (
    <>
      <p style={{ color: '#d31777' }}>
        This is sample of using react hook useContext. <br />
        See console to see the effect when you click button
      </p>

      {/* 
        using default value of 'ThemeContext'.
        this toolbar will use themes.light
      */}
      <Toolbar toolbarId={'toolbar-1'} />

      {/* 
        using new value of 'ThemeContext'.
        now children component inside 'ThemeContext.Provider'
        will use themes.dark 
      */}
      <ThemeContext.Provider value={usedTheme}>
        {/*
          Components which are descendants of a Provider are called consumer.
          Consumer, and all components within this function ('Theme' function)
          will re-render whenever the Provider's value changes. 
        */}
        <Toolbar firstPropToolbar={toggleTheme} toolbarId={'toolbar-2'} />
      </ThemeContext.Provider>
    </>
  );
};

const Toolbar = (props: any): JSX.Element => {
  useEffect(() => {
    return () => {
      console.log(
        `'Toolbar' component with id ${props.toolbarId} is re-rendered. This happens because props 'value' of nearest context provider is changed`
      );
    };
  });

  return (
    <ThemedButton
      firstPropThemedButton={props.firstPropToolbar}
      themedButtonId={props.toolbarId}
    />
  );
};

const ThemedButton = (props: any): JSX.Element => {
  // it will read the current context value from the closest
  // matching Provider above it in the tree.
  const theme = useContext(ThemeContext);

  useEffect(() => {
    return () => {
      console.log(
        `'ThemedButton' with id ${props.themedButtonId} component is re-rendered. This happens because props 'value' of nearest context provider is changed`
      );
    };
  });

  return (
    <div>
      <button
        style={{ background: theme.background, color: theme.foreground }}
        onClick={props.firstPropThemedButton}
      >
        I am styled by theme context!
      </button>
    </div>
  );
};
