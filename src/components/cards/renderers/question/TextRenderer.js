import React from 'react';
import {Typography} from '@material-ui/core';

export default (props) => (
  <Typography style={{textAlign: 'center'}} variant={'h5'}>{props.children}</Typography>
);
