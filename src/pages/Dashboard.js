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
import {Parallax} from 'react-skrollr';

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
    margin: '0.5rem',
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
          data={{
            'data-400': 'opacity: 0; transform: scale(0.5)',
            'data-start': 'opacity: 1; transform: scale(1)',
          }}
        >
          <Jumbotron/>
        </Parallax>
      </div>
      <MasonryLayout id={'parallax-target'} className={classes.widgets} columns={cols} gap={8}>
        {widgets}
      </MasonryLayout>
    </div>
  );
};
