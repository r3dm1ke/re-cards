import React, {useEffect, useRef, useState} from 'react';
import {
  Card,
  makeStyles,
} from '@material-ui/core';
import FlipCard from '../../common/FlipCard';
import Skeleton from './Skeleton';
import BackSide from './BackSide';
import FrontSide from './FrontSide';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

export default (props) => {
  const {
    question,
    question_type,
    answer,
    answer_type,
    on_edit,
    deck_name,
    skeleton,
    on_delete,
  } = props;
  const classes = useStyles();
  const [flipped, set_flipped] = useState(false);

  if (skeleton) {
    return (
      <Card className={classes.root}>
        <Skeleton />
      </Card>
    );
  }

  const on_flip = () => set_flipped(!flipped);

  return (
    <FlipCard
      flipped={flipped}
      className={classes.root}
      front={
        <FrontSide
          question={question}
          question_type={question_type}
          on_edit={on_edit}
          on_delete={on_delete}
          deck_name={deck_name}
          on_flip={on_flip}
        />
      }
      back={
        <BackSide
          answer={answer}
          answer_type={answer_type}
          on_flip={on_flip}
        />
      }
    />
  );
};
