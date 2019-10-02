import * as types from './types';
import {is_dev} from '../utils/env';
import {error_happened} from './errors';

export const subscribe_to_network = () => async (dispatch) => {
  if (is_dev()) {
    window.addEventListener('offline', () => dispatch(set_offline()));
    window.addEventListener('online', () => dispatch(set_online()));
    dispatch(navigator.onLine ? set_online() : set_offline());
  } else {
    const ping = () => async (dispatch) => {
      try {
        const result = await fetch(`${process.env.PUBLIC_URL}/ping.json`, {cache: 'no-store'});
        if (result.ok) {
          dispatch(set_online());
        }
      } catch (e) {
        dispatch(set_offline());
      }
    };
    dispatch(ping());
    setInterval(() => dispatch(ping()), 15000);
  }
};

const set_online = () => ({
  type: types.IS_ONLINE,
});

const set_offline = () => async (dispatch) => {
  dispatch(error_happened('Now working offline'));
  dispatch({type: types.IS_OFFLINE});
};
