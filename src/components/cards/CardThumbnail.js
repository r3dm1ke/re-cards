import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  makeStyles,
  Divider,
  Chip,
} from '@material-ui/core';
import {Skeleton} from '@material-ui/lab';
import QuestionRenderer from './renderers/QuestionRenderer';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '15rem',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: theme.spacing(1),
    position: 'relative',
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  chip: {
    display: 'flex',
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  answer: {
    'filter': 'blur(5px)',
    '&:hover, &:focus, &:active': {
      filter: 'none',
    },
  },
}));

export default (props) => {
  const {
    question,
    question_type,
    answer,
    onEdit,
    deckName,
    ratio,
    skeleton,
    onDelete,
    style,
  } = props;
  const classes = useStyles();

  const render_skeleton = () => (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Skeleton variant={'text'} width={'100%'} height={30}/>
        <Skeleton variant={'text'} width={'50%'} height={30}/>
      </CardContent>
      <div>
        <Divider/>
        <CardActions>
          <Skeleton variant={'rect'} width={'30%'} height={20} />
        </CardActions>
      </div>
    </Card>
  );

  const render_question = () => (
    <QuestionRenderer question={question} question_type={question_type}/>
  );

  if (skeleton) return render_skeleton();
  const red_color = Math.round(((100 - ratio) / 100) * 255);
  const green_color = Math.round(((ratio) / 100) * 255);
  const color = `rgb(${red_color}, ${green_color}, 0)`;
  return (
    <Card className={classes.root} style={{...style}}>
      <Chip label={deckName} variant={'outlined'} size={'small'} className={classes.chip}/>
      <CardContent className={classes.content}>
        {render_question()}
        <Typography variant={'overline'} className={classes.answer}>{answer}</Typography>
      </CardContent>
      <div>
        <Divider style={{backgroundColor: color}}/>
        <CardActions>
          <Button color={'inherit'} onClick={onEdit}>Edit</Button>
          <Button color={'inherit'} onClick={onDelete}>Delete</Button>
        </CardActions>
      </div>
    </Card>
  );
};
