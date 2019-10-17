import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {decks_sort_direction_toggled, decks_sort_prop_changed} from '../../actions/decks/decks';
import SortSelector from '../common/SortSelector';
import {SORT_PROPS} from '../../const/decks';

export default () => {
  const dispatch = useDispatch();
  const sort_prop = useSelector((state) => state.decks.sort_prop);
  const sort_direction = useSelector((state) => state.decks.sort_direction);
  const sort_prop_updated = (new_sort_prop) => dispatch(decks_sort_prop_changed(new_sort_prop));
  const sort_direction_toggled = () => dispatch(decks_sort_direction_toggled());

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
