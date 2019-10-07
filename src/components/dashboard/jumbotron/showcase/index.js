import React from 'react';
import Slider from 'react-slick';
import {
  makeStyles,
  Typography,
} from '@material-ui/core';
import MotivationalQuotes from './MotivationalQuotes';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const slider_settings = {
  dots: false,
  infinite: true,
  speed: 500,
  autoplaySpeed: 3000,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  adaptiveHeight: true,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '350px',
    [theme.breakpoints.up('md')]: {
      width: '500px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '750px',
    },
  },
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingBottom: theme.spacing(4),
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
}));

export default (props) => {
  const classes = useStyles();
  const quotes = MotivationalQuotes();

  return (
    <div className={classes.container}>
      <Slider {...slider_settings} className={`${classes.root} ${props.className}`}>
        {quotes}
      </Slider>
    </div>
  );
};

