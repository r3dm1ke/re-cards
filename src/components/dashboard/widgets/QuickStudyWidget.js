import React from 'react';
import Widget from '../../common/widget';
import {useSelector, useDispatch} from 'react-redux';
import {
  makeStyles,
  Button,
  Typography,
  Slider,
} from '@material-ui/core';
import {Skeleton} from '@material-ui/lab';
import {number_of_cards_changed, start_quick_study} from '../../../actions/widgets/quick_study';

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
}));

export default (props) => {
  const classes = useStyles();
  const total_cards_count = useSelector((state) => state.cards.cards ? state.cards.cards.length: null);
  const selected_cards_count = useSelector((state) => state.widgets.quick_study.number_of_cards);
  const dispatch = useDispatch();
  const render_widget_content = () => {
    if (total_cards_count > 3) return render_quick_study_controls();
    return render_not_enough_cards();
  };
  const render_quick_study_controls = () => {
    const min = 1;
    const max = total_cards_count;
    const step = Math.floor(Math.sqrt(max));
    const marks = [
      {value: min, label: min},
      {value: max, label: max},
    ];
    return (
      <React.Fragment>
        <Typography variant={'subtitle1'} className={classes.subtitle}>
          Study 20 random cards from all your decks. It is going to take about 10 minutes.
        </Typography>
        <Slider
          value={selected_cards_count}
          onChange={(_, value) =>
            (value !== selected_cards_count ? dispatch(number_of_cards_changed(value)) : null)}
          min={min}
          max={max}
          step={step}
          marks={marks}
          valueLabelDisplay={'auto'}
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
        <Button className={classes.customize_button} size={'large'} variant={'outlined'} color={'primary'}>
          Customize
        </Button>
      </React.Fragment>
    );
  };
  const render_not_enough_cards = () => {
    return (
      <React.Fragment>
        <Typography variant={'subtitle1'} className={classes.subtitle}>
          It would be better if you have at least 4 cards before you start studying. Press the button below to add a new card.
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
    >
      {total_cards_count ? (
        render_widget_content()
      ) : <Skeleton variant='rectangle' width={320} height={150} />}
    </Widget>
  );
};
