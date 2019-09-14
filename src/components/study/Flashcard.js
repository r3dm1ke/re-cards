import React, {Component} from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Divider,
  Slide,
  TextField,
  withStyles
} from "@material-ui/core";
import {Q_MATH, Q_TEXT} from "../../const/cards";
import MathJax from "react-mathjax2";

class Flashcard extends Component {

  state = {
    validation_value: '',
    confirmed: false
  };

  renderAnswer() {
    const {answer, validation_required, classes} = this.props;
    const {validation_value, confirmed} = this.state;
    if (validation_required) {
      return (
        <TextField
          label={'Answer'}
          className={classes.answerField}
          disabled={confirmed}
          value={validation_value}
          onChange={e => this.setState({validation_value: e.target.value})}
        />
      )
    } else {
      return <Typography variant={'h5'} className={classes.answer}>{answer}</Typography>
    }
  }

  renderActions() {
    const {validation_required, answer, classes} = this.props;
    const {confirmed, validation_value} = this.state;
    if (validation_required) {
      if (!confirmed) {
        return <Button onClick={() => this.setState({confirmed: true})}>Confirm</Button>
      } else {
        if (answer === validation_value) {
          return <Button variant={'contained'} color={'primary'} className={classes.buttonSucc} onClick={this.onSuccess.bind(this)}>You are correct</Button>
        } else {
          return <Button variant={'contained'} color={'secondary'} className={classes.buttonFail} onClick={this.onFail.bind(this)}>You are wrong</Button>
        }
      }
    } else {
      return [
        <Button variant={'contained'} color={'primary'} key={'succ'} onClick={this.onSuccess.bind(this)}>I know this</Button>,
        <Button variant={'contained'} color={'secondary'} key={'fail'} onClick={this.onFail.bind(this)}>STOOPID</Button>
      ]
    }
  }

  renderQuestion() {
    const {question, question_type, classes} = this.props;
    if (question_type === Q_TEXT) {
      return <Typography variant={'h3'} className={classes.question}>{question}</Typography>;
    } else if (question_type === Q_MATH) {
      console.log('mathjax rendered!');
      return (
        <MathJax.Context input={'tex'}>
          <MathJax.Node block>{question}</MathJax.Node>
        </MathJax.Context>
      )
    }
  }

  clear() {
    this.setState({validation_value: '', confirmed: false});
  }

  onSuccess() {
    this.clear();
    this.props.onSuccess();
  }

  onFail() {
    this.clear();
    this.props.onFail();
  }

  render() {
    const {classes} = this.props;
    return (
      <Slide direction={'up'} in mountOnEnter unmountOnExit>
        <Card className={classes.root}>
          <CardContent className={classes.content}>
            {this.renderQuestion()}
            {this.renderAnswer()}
          </CardContent>
          <Divider />
          <CardActions className={classes.actions}>
            {this.renderActions()}
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
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
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
  },
  answerField: {
    width: '100%'
  },
  buttonSucc: {},
  buttonFail: {}
});
export default withStyles(styles)(Flashcard);