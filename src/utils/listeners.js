import {subscribe_to_cards} from '../actions/cards/cards';
import {subscribe_to_decks} from '../actions/decks/decks';
import {subscribe_to_network} from '../actions/offline';
import {subscribe_to_progress} from '../actions/progress';

export const add_subscribers = () => async (dispatch) => {
  dispatch(subscribe_to_network());
  dispatch(subscribe_to_decks());
  dispatch(subscribe_to_cards());
  dispatch(subscribe_to_progress());
};
