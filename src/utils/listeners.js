import {subscribe_to_cards} from '../actions/cards/cards';
import {subscribe_to_decks} from '../actions/decks/decks';
import {subscribe_to_network} from '../actions/offline';

export const add_subscribers = () => async (dispatch) => {
  dispatch(subscribe_to_network());
  dispatch(subscribe_to_decks());
  dispatch(subscribe_to_cards());
};
