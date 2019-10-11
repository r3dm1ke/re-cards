import React, {useState} from 'react';
import Widget from '../../../common/widget';
import {useSelector, useDispatch} from 'react-redux';
import {
  makeStyles,
  Button,
  Typography,
  Slider, Collapse,
} from '@material-ui/core';
import {Skeleton} from '@material-ui/lab';
import Details from './Details';
import {number_of_cards_changed_for_quick_study, start_quick_study} from '../../../../actions/widgets/quick_study';

const useStyles = makeStyles((theme) => ({
  subtitle: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
  },
  start_button: {
    width: '100%',
    fontSize: '1.5rem',
    marginTop: theme.spacing(2),
  },
  customize_button: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  slider: {
    width: 'initial',
    flex: 1,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export default (props) => {
  const classes = useStyles();
  const number_of_eligible_cards = useSelector((state) => state.widgets.quick_study.number_of_eligible_cards);
  const selected_cards_count = useSelector((state) => state.widgets.quick_study.number_of_cards_selected);
  const dispatch = useDispatch();
  const [expanded, set_expanded] = useState(false);
  const render_widget_content = () => {
    return render_quick_study_controls();
  };
  const render_quick_study_controls = () => {
    const min = Math.min(1, number_of_eligible_cards || 0);
    const max = number_of_eligible_cards;
    const step = Math.floor(Math.sqrt(max));
    const marks = [
      {value: min, label: min},
      {value: max, label: max},
    ];
    const minutes = Math.ceil(selected_cards_count / 3);
    return (
      <React.Fragment>
        <Typography variant={'subtitle1'} className={classes.subtitle}>
          Study {selected_cards_count} random card{selected_cards_count === 1 ? '' : 's'} from all your decks.
          It is going to take about {minutes} minute{minutes === 1 ? '' : 's'}.
        </Typography>
        <Slider
          value={selected_cards_count}
          onChange={(_, value) =>
            (value !== selected_cards_count ? dispatch(number_of_cards_changed_for_quick_study(value)) : null)}
          min={min}
          max={max}
          step={step}
          marks={marks}
          valueLabelDisplay={'auto'}
          className={classes.slider}
        />
        <Button
          className={classes.start_button}
          size={'large'}
          variant={'contained'}
          color={'primary'}
          onClick={() => dispatch(start_quick_study())}
        >
          Start
        </Button>
        <Collapse in={expanded}>
          <Details />
        </Collapse>
        <Button
          className={classes.customize_button}
          size={'large'}
          variant={'outlined'}
          color={'primary'}
          onClick={() => set_expanded(!expanded)}
        >
          {expanded ? 'Hide' : 'Customize'}
        </Button>
      </React.Fragment>
    );
  };
  const render_not_enough_cards = () => {
    return (
      <React.Fragment>
        <Typography variant={'subtitle1'} className={classes.subtitle}>
          It would be better if you have at least 4 cards before you start studying.
          Press the button below to add a new card.
        </Typography>
        <Button className={classes.start_button} size={'large'} variant={'contained'} color={'primary'}>
          Add a new card
        </Button>
      </React.Fragment>
    );
  };
  return (
    <Widget
      title={'Custom study'}
      containerClassName={classes.container}
    >
      {number_of_eligible_cards ? (
        render_widget_content()
      ) : <Skeleton variant='rectangle' width={'100%'} height={150} />}
    </Widget>
  );
};
