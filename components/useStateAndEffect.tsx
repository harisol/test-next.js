import { useEffect, useState } from 'react';

const defaultExternalData = { hits: [] };

// ------- Sample useState and useEffect -------
export const Counter = (): JSX.Element => {
  const [personName, setPersonName] = useState('');
  const [count, setCount] = useState(0);
  const [externalData, setExternalData] = useState(defaultExternalData);

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonName(e.target.value);
  };

  // to pass parameter in event
  // wrap in in outer function
  const addCounter = (param: number) => {
    return (e: React.MouseEvent) => {
      const { type } = e;
      // console.log('type:', type);

      setCount(count + param);
    };
  };

  // Similar to componentDidMount and componentDidUpdate on class component.
  // this function run every side effect.
  // Data fetching and manually changing the DOM in React components
  // are examples of side effects
  useEffect(() => {
    console.log(`I'm called when a DOM is changed or at first render `);
  });

  // pass second argument with array of state or props (can be mixed)
  // to make it depend on mutation of that state or props only
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `clicked ${count} times`;

    // this is useEffect cleanup
    // cleanup means, before going to next page
    // or running useEffect on next re-render (when component unmount),
    // run this function first.
    return () => {
      console.log(
        `I'm called before 'Click me' button re-render or unmounted. the last click count times is ${count}`
      );
    };
  }, [count]);

  // pass second argument with empty array to make it
  // run only on first render
  useEffect(() => {
    console.log('fetching external data..');

    const fetchData = () => {
      fetch('https://hn.algolia.com/api/v1/search?query=redux').then(
        async (res) => {
          const data = await res.json();
          setExternalData(data);
          console.log('data fetched successfully');
        }
      );
    };

    const x = 3000;
    // wait x miliseconds before fetching data
    const fetchingExternalData = setTimeout(fetchData, x);

    return () => {
      // clear timeout to avoid memory leak
      // if inside setTimeout contains updating
      // state that already unmounted
      // (e.g. component is re-rendered or moving to other page)
      clearTimeout(fetchingExternalData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <hr />
      <button onClick={addCounter(1)}>Click me</button>
      <p>You clicked {count} times</p>
      <hr />
      <p>
        Theese are datas from external API which is loaded on first render only
        because we pass empty array on useEffect second argument
      </p>
      <ul>
        {!externalData.hits.length
          ? '(Loading Data..)'
          : externalData.hits.map((item: any) => (
              <li key={item.objectID}>
                <a href={item.url}>{item.title}</a>
              </li>
            ))}
      </ul>
    </div>
  );
};
