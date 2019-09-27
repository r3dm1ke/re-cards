import React, {Component} from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  withStyles,
  Divider,
  Chip,
} from '@material-ui/core';
import {Skeleton} from '@material-ui/lab';
import {Q_MATH, Q_TEXT} from '../../const/cards';
import MathJaxRenderer from '../common/MathRenderer';

class CardThumbnail extends Component {
  renderQuestion() {
    const {question, question_type} = this.props;
    if (question_type === Q_TEXT) {
      return <Typography variant={'h6'}>{question}</Typography>;
    } else if (question_type === Q_MATH) {
      console.log('mathjax rendered!');
      return (
        <MathJaxRenderer block content={question} />
      );
    }
  }

  renderSkeleton() {
    const {classes} = this.props;
    return (
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
  }

  render() {
    const {answer, onEdit, classes, deckName, ratio, skeleton, onDelete} = this.props;
    if (skeleton) return this.renderSkeleton();
    const red_color = Math.round(((100 - ratio) / 100) * 255);
    const green_color = Math.round(((ratio) / 100) * 255);
    const color = `rgb(${red_color}, ${green_color}, 0)`;
    console.log(color);
    return (
      <Card className={classes.root} style={{...this.props.style}}>
        <Chip label={deckName} variant={'outlined'} size={'small'} className={classes.chip}/>
        <CardContent className={classes.content}>
          {this.renderQuestion()}
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
  }
}

const styles = (theme) => ({
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
});

export default withStyles(styles)(CardThumbnail);

