import React from 'react';
import {useSelector} from 'react-redux';
import {makeStyles, useMediaQuery, useTheme} from '@material-ui/core';
import SimpleStudyWidget from '../components/dashboard/SimpleStudyWidget';
import WorstCardsWidget from '../components/dashboard/WorstCardsWidget';
import TrendWidget from '../components/dashboard/TrendWidget';
import SmartStudyWidget from '../components/dashboard/SmartStudyWidget';
import ExamModeWidget from '../components/dashboard/ExamModeWidget';
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
    marginTop: '300px',
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
    zIndex: -1,
    [theme.breakpoints.down('sm')]: {
      left: '24px',
    },
  },
}));

export default () => {
  const classes = useStyles();
  const logged_in = useSelector((state) => state.auth.logged_in);
  const offline = useSelector((state) => state.offline.offline);

  const online_and_offline_widgets = [
    <SimpleStudyWidget key={'simple_study'} className={classes.widget}/>,
    <WorstCardsWidget key={'worst_cards'} className={classes.widget}/>,
    <TrendWidget key={'trend'} className={classes.widget} />,
  ];

  const online_only_widgets = [
    <SmartStudyWidget key={'smart_study'} className={classes.widget} />,
    <ExamModeWidget key={'exam_mode'} className={classes.widget} />,
  ];

  let widgets;
  if (offline) {
    widgets = [
      ...online_and_offline_widgets,
    ];
  } else {
    widgets = [
      ...online_and_offline_widgets,
      ...online_only_widgets,
    ];
  }

  if (!logged_in) return check_logged_in(logged_in);

  const theme = useTheme();
  const is_sm = useMediaQuery(theme.breakpoints.down('sm'));
  const is_md = useMediaQuery(theme.breakpoints.down('md'));
  let cols = 3;
  if (is_md) cols = 2;
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
      <MasonryLayout className={classes.widgets} columns={cols} gap={24}>
        {widgets}
      </MasonryLayout>
    </div>
  );
};
