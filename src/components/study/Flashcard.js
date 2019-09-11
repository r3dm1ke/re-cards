import React, {Component} from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Divider,
  Slide,
  withStyles
} from "@material-ui/core";

class Flashcard extends Component {
  render() {
    const {question, answer, classes, onSuccess, onFail} = this.props;
    return (
      <Slide direction={'up'} in mountOnEnter unmountOnExit>
        <Card className={classes.root}>
          <CardContent className={classes.content}>
            <Typography variant={'h3'} className={classes.question}>{question}</Typography>
            <Typography variant={'h5'} className={classes.answer}>{answer}</Typography>
          </CardContent>
          <Divider />
          <CardActions className={classes.actions}>
            <Button onClick={onSuccess}>I know this</Button>
            <Button onClick={onFail}>STOOPID</Button>
          </CardActions>
        </Card>
      </Slide>
    )
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '25rem'
    }
  },
  content: {},
  actions: {
    justifyContent: 'space-around'
  },
  question: {
    textAlign: 'center',
    margin: theme.spacing(2)
  },
  answer: {
    margin: theme.spacing(2),
    textAlign: 'center',
    filter: 'blur(5px)',
    '&:hover, &:focus, &:active': {
      filter: 'none'
    }
  }
});
export default withStyles(styles)(Flashcard);