import React from 'react';
import SchoolIcon from '@material-ui/icons/School';
import BaseSlide from './base_slide';

const Intro = (props) => {
  return (
    <BaseSlide
      {...props}
      Icon={SchoolIcon}
      text={'This app is designed to help students study flashcards. ' +
            'It employs a scientifically proven technique called spaced repetition.'}
    />
  );
};

export default Intro;
