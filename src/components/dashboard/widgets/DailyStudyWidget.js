import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {start_study} from '../../../actions/study';
import {SMART_STUDY} from '../../../const/study';
import Widget from '../../common/widget';
import {
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    fontSize: '1.5rem',
    marginTop: theme.spacing(2),
  },
}));

export default (props) => {
  const cards_due_for_smart_study = useSelector((state) => state.cards.cards_due_for_smart_study.length);
  const minutes = Math.ceil(cards_due_for_smart_study / 3);
  const smart_study_advisable = useSelector((state) => state.cards.smart_study_advisable);
  const classes = useStyles();
  const dispatch = useDispatch();
  const render_widget_content = () => {
    if (smart_study_advisable) {
      return (
        <React.Fragment>
          <Typography variant={'body1'}>
            You have {cards_due_for_smart_study}
            {cards_due_for_smart_study > 1 ? ' cards' : ' card'} to revise today.
            It will take about {minutes} {minutes > 1 ? 'minutes' : 'minute'}.
          </Typography>
          <Button
            size={'large'}
            variant={'contained'}
            color={'primary'}
            className={classes.button}
            onClick={() => dispatch(start_study(SMART_STUDY))}
          >
            Start
          </Button>
        </React.Fragment>
      );
    }
    return (
      <Typography variant={'body1'}>No more revising today. You can take some time to celebrate.</Typography>
    );
  };
  return (
    <Widget
      title={'Your daily studying session'}
      containerClassName={classes.container}
    >
      {render_widget_content()}
    </Widget>
  );
};
