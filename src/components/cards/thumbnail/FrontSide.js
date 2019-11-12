import React from 'react';
import {
  CardContent,
  makeStyles,
} from '@material-ui/core';
import CardActions from '../../common/CardActions';
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
      <CardActions
        buttons={[
          {on_click: on_edit, text: 'EDIT'},
          {on_click: on_delete, text: 'DELETE'},
        ]}
      />
    </React.Fragment>
  );
};


