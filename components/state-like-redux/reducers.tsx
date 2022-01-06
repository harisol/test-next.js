export const initialStateRootReducer = {
  counter: 1,
  filter: 'off',
  user: { name: '', age: '', nationality: '' },
};

type thisStateType = typeof initialStateRootReducer;

const counterReducer = (
  prevState: thisStateType,
  action: any
): typeof initialStateRootReducer.counter => {
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      return prevState.counter + 1;
    default:
      return prevState.counter;
  }
};

const filterReducer = (
  prevState: thisStateType,
  action: any
): typeof initialStateRootReducer.filter => {
  switch (action.type) {
    case 'TOGGLE_FILTER':
      return prevState.filter == 'on' ? 'off' : 'on';
    default:
      return prevState.filter;
  }
};

const usrReducer = (
  prevState: thisStateType,
  action: any
): typeof initialStateRootReducer.user => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_USER':
      const newUser =
        payload === undefined
          ? prevState.user
          : {
              name: payload.name || '',
              age: payload.age || '',
              nationality: payload.nationality || '',
            };

      return newUser;
    default:
      return prevState.user;
  }
};

export const rootReducer = (prevState: any, action: any) => {
  return {
    counter: counterReducer(prevState, action),
    filter: filterReducer(prevState, action),
    user: usrReducer(prevState, action),
  };
};
