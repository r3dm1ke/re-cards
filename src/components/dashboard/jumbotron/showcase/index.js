import React from 'react';
import Slider from 'react-slick';
import {
  makeStyles,
  Typography,
} from '@material-ui/core';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const slider_settings = {
  dots: false,
  infinite: true,
  speed: 1500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '500px',
    height: '50%',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
}));

export default (props) => {
  const classes = useStyles();

  return (
    <Slider {...slider_settings} className={classes.root}>
      <div>
        <Typography className={classes.text} variant={'h6'}>You have 6 cards to study today</Typography>
      </div>
      <div>
        <Typography className={classes.text} variant={'h6'}>So far, you have mastered 12 cards across 5 decks</Typography>
      </div>
    </Slider>
  );
};

