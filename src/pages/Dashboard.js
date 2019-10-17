import React from 'react';
import {useSelector} from 'react-redux';
import {makeStyles, useMediaQuery, useTheme} from '@material-ui/core';
import DailyStudyWidget from '../components/dashboard/widgets/DailyStudyWidget';
import CardsCountWidget from '../components/dashboard/widgets/CardsCountWidget';
import QuickStudyWidget from '../components/dashboard/widgets/quick_study_widget';
import StreakWidget from '../components/dashboard/widgets/StreakWidget';
import AdWidget from '../components/dashboard/widgets/AdWidget';
import MasonryLayout from '../components/common/MasonryLayout';
import Jumbotron from '../components/dashboard/jumbotron';
import {check_logged_in} from '../utils/auth';
import {Parallax, Element} from 'rc-scroll-anim';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  widgets: {
    transform: 'translateY(1px)',
    marginTop: '299px', // Dont ask
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  widget: {
  },
  parallax: {
    position: 'fixed',
    left: '264px',
    right: '54px',
    zIndex: 0,
    [theme.breakpoints.down('sm')]: {
      left: '24px',
    },
  },
}));

export default () => {
  const classes = useStyles();
  const logged_in = useSelector((state) => state.auth.logged_in);

  if (!logged_in) return check_logged_in(logged_in);

  const theme = useTheme();
  const is_sm = useMediaQuery(theme.breakpoints.down('sm'));
  const is_md = useMediaQuery(theme.breakpoints.down('md'));
  let cols = 3;
  // eslint-disable-next-line fp/no-mutation
  if (is_md) cols = 2;
  // eslint-disable-next-line fp/no-mutation
  if (is_sm) cols = 1;

  return (
    <div className={classes.root}>
      <div className={classes.parallax}>
        <Parallax
          animation={{
            opacity: 0,
            scaleX: 0.5,
            scaleY: 0.5,
            playScale: [0.9, 1.4],
          }}
          location={'parallax-anchor'}
        >
          <Jumbotron/>
        </Parallax>
      </div>
      <Element id={'parallax-anchor'}/>
      <MasonryLayout className={classes.widgets} columns={cols} gap={24}>
        <DailyStudyWidget/>
        <CardsCountWidget/>
        <QuickStudyWidget/>
        <StreakWidget/>
        <AdWidget/>
      </MasonryLayout>
    </div>
  );
};
