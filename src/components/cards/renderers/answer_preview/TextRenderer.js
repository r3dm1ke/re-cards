import React from 'react';
import {
  Typography,
} from '@material-ui/core';

export default (props) => (
  <Typography variant={'h5'} style={{textAlign: 'center'}}>{props.answer}</Typography>
);
