import React from 'react';
import {Typography} from '@material-ui/core';

export default ({children, ...rest}) => (
  <Typography
    style={{textAlign: 'center'}}
    variant={'h5'}
    {...rest}
  >
    {children}
  </Typography>
);
