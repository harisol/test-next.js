import React, { CSSProperties, useEffect, useRef } from 'react';
import { useGlobalStore } from './provider';
import utilStyles from '../../styles/utils.module.css';

const myStyle: CSSProperties = {
  marginBottom: '20px',
};

export const ChildComp1 = () => {
  const { state, dispatch } = useGlobalStore();
  return (
    <div className={utilStyles.flexBox} style={myStyle}>
      Current Counter: {state.counter}
      <button onClick={() => dispatch({ type: 'INCREMENT_COUNTER' })}>
        Add
      </button>
    </div>
  );
};

export const ChildComp2 = () => {
  const { state, dispatch } = useGlobalStore();
  return (
    <div className={utilStyles.flexBox} style={myStyle}>
      Current Filter: {state.filter}
      <button onClick={() => dispatch({ type: 'TOGGLE_FILTER' })}>
        Toggle
      </button>
    </div>
  );
};

export const CurrentUser = () => {
  const { state, dispatch } = useGlobalStore();
  const { user } = state;
  const inputName = useRef<HTMLInputElement>(null);
  const inputAge = useRef<HTMLInputElement>(null);
  const inputNationality = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log('fetching user data..');

    // consider this from data source (ex. API)
    const userFromDataSource = {
      name: 'Haris',
      age: '25',
      nationality: 'Indonesia',
    };
    dispatch({
      type: 'SET_USER',
      payload: userFromDataSource,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('current value user', user);
  }, [user]);

  return (
    <div className={utilStyles.flexBox}>
      <div id="user-table">
        <p>User Data</p>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>: {user.name}</td>
            </tr>
            <tr>
              <td>Age</td>
              <td>: {user.age}</td>
            </tr>
            <tr>
              <td>Nationality</td>
              <td>: {user.nationality}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="user-form">
        <p>User Form</p>
        <input
          type="text"
          placeholder="Name"
          style={{ display: 'block' }}
          ref={inputName}
        />
        <input
          type="number"
          placeholder="Age"
          style={{ display: 'block' }}
          ref={inputAge}
        />
        <input
          type="text"
          placeholder="Nationality"
          style={{ display: 'block' }}
          ref={inputNationality}
        />
        <button
          onClick={() => {
            // below console log will still get the old value.
            // use hook useEffect to get the new value after dispatch call
            dispatch({
              type: 'SET_USER',
              payload: {
                name: inputName.current?.value,
                age: inputAge.current?.value,
                nationality: inputNationality.current?.value,
              },
            });

            console.log('old value user', user);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
