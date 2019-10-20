import React from 'react';
import TextField from '@material-ui/core/TextField';

const TextPrompt = (props) => {
  const {
    validation_value,
    on_validation_value_changed,
  } = props;
  return (
    <TextField
      margin={'normal'}
      variant={'outlined'}
      label={'Your answer'}
      value={validation_value}
      onChange={(e) => on_validation_value_changed(e.target.value)}
    />
  );
};

export default TextPrompt;
