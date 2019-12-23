import React from 'react';
import Slider from 'react-slick';
import {
  makeStyles,
} from '@material-ui/core';
import getMotivationalQuotes from './MotivationalQuotes';
import SmartStudyCTA from './SmartStudyCTA';
import MasteryProgress from './MasteryProgress';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {shuffle} from '../../../../utils/random';
import {useSelector} from 'react-redux';

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
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingBottom: theme.spacing(4),
    maxWidth: '100%',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
}));

export default (props) => {
  const classes = useStyles();
  const quotes = getMotivationalQuotes();
  const slides = [
    ...quotes,
    <MasteryProgress key={'mastery'}/>,
  ];

  const smart_study_advisable = useSelector((state) => state.cards.smart_study_advisable);
  // eslint-disable-next-line fp/no-mutating-methods
  if (smart_study_advisable) slides.push(<SmartStudyCTA key={'smart_s'}/>);
  const shuffled_slides = shuffle(slides);

  return (
    <div className={classes.container}>
      <Slider {...slider_settings} className={`${classes.root} ${props.className}`}>
        {shuffled_slides}
      </Slider>
    </div>
  );
};

