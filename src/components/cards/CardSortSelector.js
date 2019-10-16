import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {cards_sort_direction_toggled, cards_sort_prop_updated} from '../../actions/cards/cards';
import {SORT_PROPS} from '../../const/cards';
import SortSelector from '../common/SortSelector';

export default () => {
  const sort_prop = useSelector((state) => state.cards.sort_prop);
  const sort_direction = useSelector((state) => state.cards.sort_direction);
  const dispatch = useDispatch();
  const sort_prop_updated = (new_sort_prop) => dispatch(cards_sort_prop_updated(new_sort_prop));
  const sort_direction_toggled = () => dispatch(cards_sort_direction_toggled());

  return (
    <SortSelector
      sort_prop_value={sort_prop}
      sort_direction_value={sort_direction}
      sort_prop_value_updated={sort_prop_updated}
      sort_direction_value_toggled={sort_direction_toggled}
      sort_props={SORT_PROPS}
    />
  );
};
