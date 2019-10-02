import React from 'react';
import {useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core';
import SimpleStudyWidget from '../components/dashboard/SimpleStudyWidget';
import WorstCardsWidget from '../components/dashboard/WorstCardsWidget';
import TrendWidget from '../components/dashboard/TrendWidget';
import SmartStudyWidget from '../components/dashboard/SmartStudyWidget';
import ExamModeWidget from '../components/dashboard/ExamModeWidget';
import Jumbotron from '../components/dashboard/jumbotron';
import {check_logged_in} from '../utils/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  widget: {
    margin: '0.5rem',
  },
}));

export default () => {
  const classes = useStyles();
  const logged_in = useSelector((state) => state.auth.logged_in);
  const offline = useSelector((state) => state.offline.offline);

  const online_and_offline_widgets = [
    <SimpleStudyWidget key={'simple_study'} className={classes.widget}/>,
    <WorstCardsWidget key={'worst_cards'} className={classes.widget}/>,
    <TrendWidget key={'trend'} className={classes.widget} />
  ];

  const online_only_widgets = [
    <SmartStudyWidget key={'smart_study'} className={classes.widget} />,
    <ExamModeWidget key={'exam_mode'} className={classes.widget} />,
  ];

  return (
    <div className={classes.root}>
      <Jumbotron/>
      {check_logged_in(logged_in)}
      {online_and_offline_widgets}
      {offline ? null : online_only_widgets}
    </div>
  );
};
