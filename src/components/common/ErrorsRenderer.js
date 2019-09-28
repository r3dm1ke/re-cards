import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import ErrorSnackbar from './ErrorSnackbar';
import {error_dismissed} from '../../actions/errors';

export default (props) => {
  const errors = useSelector((state) => state.errors.errors);
  const dispatch = useDispatch();
  const on_dismiss = (index) => () => dispatch(error_dismissed(index));
  return (
    <React.Fragment>
      {errors.map((error, index) => (
        <ErrorSnackbar
          content={error.description}
          on_dismiss={on_dismiss(index)}
        />
      ))}
    </React.Fragment>
  );
};
