import React from 'react';
import {
  CardContent,
  CardActions,
  Button,
  Divider,
  makeStyles,
} from '@material-ui/core';
import DeckNameRenderer from '../renderers/DeckNameRenderer';
import QuestionRenderer from '../renderers/question';

const useStyles = makeStyles((theme) => ({
  content: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(4),
    flex: 1,
  },
  deck_name: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: 0,
  },
  button: {
    flex: 1,
    margin: 0,
    borderRadius: 0,
  },
  left_button: {
    borderBottomLeftRadius: theme.spacing(0.5),
  },
  right_button: {
    borderBottomRightRadius: theme.spacing(0.5),
  },
  button_divider: {
    height: '36px',
  },
}));

export default (props) => {
  const {
    question,
    question_type,
    on_edit,
    on_delete,
    deck_name,
    on_flip,
  } = props;
  const classes = useStyles();
  return (
    <React.Fragment>
      <CardContent className={classes.content} onClick={on_flip}>
        <DeckNameRenderer className={classes.deck_name}>{deck_name}</DeckNameRenderer>
        <QuestionRenderer question={question} question_type={question_type}/>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          onClick={on_edit}
          className={`${classes.button} ${classes.left_button}`}
        >
          EDIT
        </Button>
        <Divider orientation={'vertical'} className={classes.button_divider} />
        <Button
          onClick={on_delete}
          className={`${classes.button} ${classes.right_button}`}
        >
          DELETE
        </Button>
      </CardActions>
    </React.Fragment>
  );
};


