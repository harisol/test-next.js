import { useReducer } from 'react';

// ------- Sample useReducer -------

const initialStateUser = {
  userLoggedIn: false,
  name: '',
  token: null,
};

/**
 * An alternative to useState, usually preferable to useState
 * when you have complex state logic that involves multiple sub-values
 * or when the next state depends on the previous one
 */
export const UserInfo = (props: any): JSX.Element => {
  // first argument is a reducer of type (state, action) => newState.
  // second argument is initial state.
  const [user, dispatch] = useReducer(loginReducer, {
    ...initialStateUser,
    name: props.userName,
  });

  // second way to initialize reducer, a.k.a lazy initialization
  // It lets you extract the logic for defining the initial state outside the reducer
  const [user1, dispatch1] = useReducer(loginReducer, null, () => {
    return { ...initialStateUser, name: props.userName };
  });

  return (
    <div style={{ marginBottom: '20px' }}>
      <p style={{ color: '#d31777' }}>
        This is sample of using react hook useReducer. <br />
        an alternative of useState
      </p>
      <div style={{ marginBottom: '10px' }}>
        <strong>User Info</strong>
        <br />
        Name: {user.name}
        <br />
        Logged In: {user.userLoggedIn.toString()}
        <br />
      </div>
      {user.userLoggedIn ? (
        <button
          className="App-link"
          onClick={() => dispatch({ type: 'USER_LOGOUT' })}
        >
          {'Logout'}
        </button>
      ) : (
        <button
          className="App-link"
          onClick={() => dispatch({ type: 'USER_LOGIN' })}
        >
          {'Login'}
        </button>
      )}
    </div>
  );
};

const loginReducer = (
  state: typeof initialStateUser,
  action: any
): typeof initialStateUser => {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        ...state,
        userLoggedIn: true,
      };
    case 'USER_LOGOUT':
      return {
        ...state,
        userLoggedIn: false,
      };
    default:
      throw new Error('Unexpected type');
  }
};
