import React from 'react';
import {
  Chip,
  useTheme,
} from '@material-ui/core';

export default (props) => {
  const theme = useTheme();
  return (
    <Chip
      size={'small'}
      variant={'outlined'}
      label={props.children}
      className={props.className}
      style={{borderRadius: theme.spacing(0.5)}}
    />
  );
};

