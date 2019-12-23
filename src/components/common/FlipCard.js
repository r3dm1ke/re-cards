import React, {useEffect, useRef} from 'react';
import {
  Card, makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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
    backfaceVisibility: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  back: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    top: 0,
    width: '100%',
    backfaceVisibility: 'hidden',
    transform: 'rotateY(180deg)',
    zIndex: 2,
  },
}));

const FlipCard = (props) => {
  const {flipped, front, back, className} = props;
  const classes = useStyles();
  const front_ref = useRef(null);
  const back_ref = useRef(null);

  useEffect(() => {
    if (front_ref.current !== null || back_ref.current !== null) {
      const front_height = front_ref.current.clientHeight;
      const back_height = back_ref.current.clientHeight;
      const min_height = Math.max(front_height, back_height);
      // eslint-disable-next-line fp/no-mutation
      front_ref.current.style.minHeight = `${min_height}px`;
      // eslint-disable-next-line fp/no-mutation
      back_ref.current.style.minHeight = `${min_height}px`;
    }
    return () => {};
  });

  return (
    <div className={className}>
      <div
        className={flipped ?
          `${classes.inner} ${classes.inner_flipped}` : classes.inner}
      >
        <Card className={classes.front} ref={front_ref}>
          {front}
        </Card>
        <Card className={classes.back} ref={back_ref}>
          {back}
        </Card>
      </div>
    </div>
  );
};

export default FlipCard;
