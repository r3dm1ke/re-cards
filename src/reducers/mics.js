import * as types from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  loaders: []
};

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case types.ADD_LOADER:
      if (state.loaders.find(e => e.handle === action.payload.handle)) return state;
      return {...state, loading: true, loaders: [...state.loaders, action.payload]}
    case types.REMOVE_LOADER:
      const loaders = state.loaders.filter(e => e.handle !== action.payload);
      const loading = loaders.length > 0;
      return {...state, loaders, loading};
    default:
      return state;
  }
}