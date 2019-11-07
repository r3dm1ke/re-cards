import React from 'react';
import DoneIcon from '@material-ui/icons/AssignmentTurnedIn';
import BaseSlide from './base_slide';


const Done = (props) => {
  return (
    <BaseSlide
      {...props}
      Icon={DoneIcon}
      text={'You are all set! Happy studying!'}
    />
  );
};

export default Done;
