import * as types from './types';

export const subscribe_to_network = () => async (dispatch) => {
  const ping = () => async (dispatch) => {
    try {
      const result = await fetch(`${process.env.PUBLIC_URL}/ping.json`);
      if (result.ok) {
        dispatch(set_online());
      }
    } catch (e) {
      dispatch(set_offline());
    }
  };
  dispatch(ping());
  setInterval(() => dispatch(ping()), 15000);
};

const set_online = () => ({
  type: types.IS_ONLINE,
});

const set_offline = () => ({
  type: types.IS_OFFLINE,
});
