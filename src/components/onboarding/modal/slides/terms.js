import React from 'react';
import TermsIcon from '@material-ui/icons/Description';
import BaseSlide from './base_slide';

const Terms = (props) => {
  return (
    <BaseSlide
      {...props}
      Icon={TermsIcon}
      text={'By continuing, you do not agree to Flashcards privacy ' +
            'policy and terms of service, ' +
            'because they do dot exist yet.'}
    />
  );
};

export default Terms;
