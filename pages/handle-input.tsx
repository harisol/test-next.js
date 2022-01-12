import { NextPage } from 'next';
import Layout from '../components/layout';
import Head from 'next/head';
import { useRef, useState } from 'react';

const HandleInput: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Handle Input</title>
      </Head>
      <p style={{ color: '#d31777' }}>
        Theese are options of input handling in react
      </p>
      <Option1 />
      <hr style={{ marginTop: '20px' }} />
      <Option2 />
      <hr style={{ marginTop: '20px' }} />
      <Option3 />
      <hr style={{ marginTop: '20px' }} />
      <Option4 />
    </Layout>
  );
};

export default HandleInput;

// -----------------------------------------------------------------

const defaultInputValues = { name: '', age: '', nationality: '' };
const Option1 = () => {
  const [inputName, setName] = useState('');
  const [inputAge, setAge] = useState('');
  const [inputNationality, setNationality] = useState('');

  return (
    <>
      <h3>With useState hook</h3>
      <input
        type="text"
        placeholder="Name"
        style={{ display: 'block' }}
        value={inputName}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        style={{ display: 'block' }}
        value={inputAge}
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nationality"
        style={{ display: 'block' }}
        value={inputNationality}
        onChange={(e) => setNationality(e.target.value)}
      />
    </>
  );
};

const Option2 = () => {
  const [inputs, setInput] = useState(defaultInputValues);

  // read more about handle every type of input in here
  // https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <>
      <h3>With useState hook and dynamic handler</h3>
      <input
        type="text"
        placeholder="Name"
        style={{ display: 'block' }}
        name="name"
        value={inputs.name}
        onChange={handleInputChange}
      />
      <input
        type="number"
        placeholder="Age"
        style={{ display: 'block' }}
        name="age"
        value={inputs.age}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Nationality"
        style={{ display: 'block' }}
        name="nationality"
        value={inputs.nationality}
        onChange={handleInputChange}
      />
    </>
  );
};

const Option3 = () => {
  const inputName = useRef<HTMLInputElement>(null);
  const [x, setX] = useState(1);
  const popUpValue = () => {
    // value will change here
    alert(`You input: ${inputName.current?.value}`);
  };

  return (
    <>
      <h3>
        With useRef hook
        <br />
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        (rendered value won't change unless a state is updated)
      </h3>
      <p>
        State: {x}
        &emsp;&emsp;&emsp;&emsp; You Input: {inputName.current?.value}
      </p>
      <input
        type="text"
        placeholder="text"
        style={{ display: 'block' }}
        ref={inputName}
      />
      <button onClick={popUpValue}>
        Show updated value that is not rendered
      </button>
      &nbsp;
      <button onClick={() => setX(x + 1)}>
        update state so the rendered value is updated
      </button>
      &nbsp;
    </>
  );
};

const Option4 = () => {
  const [user, setUser] = useState(defaultInputValues);

  const updateUser = () => {
    // we must cast it to as HTMLInputElement because
    // default type is HTMLElement which doesn't have value attribute
    const name = document.getElementById('name') as HTMLInputElement;
    const age = document.getElementById('age') as HTMLInputElement;
    const nationality = document.getElementById(
      'nationality'
    ) as HTMLInputElement;

    setUser({
      name: name.value,
      age: age.value,
      nationality: nationality.value,
    });
  };

  const resetInputField = () => {
    const name = document.getElementById('name') as HTMLInputElement;
    const age = document.getElementById('age') as HTMLInputElement;
    const nationality = document.getElementById(
      'nationality'
    ) as HTMLInputElement;

    [name, age, nationality].forEach((inputText) => (inputText.value = ''));
  };

  return (
    <>
      <h3>With web document API</h3>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '360px',
        }}
      >
        <div>
          <p style={{ margin: 0 }}>Name: {user.name}</p>
          <p style={{ margin: 0 }}>Age: {user.age}</p>
          <p style={{ margin: 0 }}>Nationality: {user.nationality}</p>
        </div>
        <div>
          <input
            type="text"
            placeholder="Name"
            style={{ display: 'block' }}
            id="name"
          />
          <input
            type="number"
            placeholder="Age"
            style={{ display: 'block' }}
            id="age"
          />
          <input
            type="text"
            placeholder="Nationality"
            style={{ display: 'block' }}
            id="nationality"
          />
          <button onClick={updateUser}>Submit</button>&nbsp;
          <button onClick={resetInputField}>Reset Input</button>
        </div>
      </div>
    </>
  );
};
