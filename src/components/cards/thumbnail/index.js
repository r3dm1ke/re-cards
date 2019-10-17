import React, {useState} from 'react';
import {
  Card,
  makeStyles,
} from '@material-ui/core';
import Skeleton from './Skeleton';
import BackSide from './BackSide';
import FrontSide from './FrontSide';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  inner: {
    position: 'relative',
    width: '100%',
    height: '100%',
    transition: 'transform 0.3s',
    transformStyle: 'preserve-3d',
  },
  inner_flipped: {
    transform: 'rotateY(180deg)',
  },
  front: {
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
  },
  back: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    transform: 'rotateY(180deg)',
  },
}));

export default (props) => {
  const {
    question,
    question_type,
    answer,
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
    <div className={classes.root}>
      <div
        className={flipped ?
          `${classes.inner} ${classes.inner_flipped}` :
          classes.inner}>
        <Card className={classes.front}>
          <FrontSide
            question={question}
            question_type={question_type}
            on_edit={on_edit}
            on_delete={on_delete}
            deck_name={deck_name}
            on_flip={on_flip}
          />
        </Card>
        <Card className={classes.back} raised>
          <BackSide
            answer={answer}
            on_flip={on_flip}
          />
        </Card>
      </div>
    </div>
  );
};
