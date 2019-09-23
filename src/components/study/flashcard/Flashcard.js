import React, {Component} from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  Slide,
  withStyles
} from "@material-ui/core";
import Question from "./Question";
import Answer from "./Answer";
import {A_MULTIPLE_CHOICE, A_SINGLE_CHOICE, A_TEXT} from "../../../const/cards";

class Flashcard extends Component {

  state = {
    validation_value: this.props.answer_type === A_TEXT ? '' : new Set(),
    confirmed: false
  };

  renderActions() {
    const {validation_required, answer, classes, answer_type, answer_list} = this.props;
    const {confirmed, validation_value} = this.state;

    const check_validation = () => {
      if (answer_type === A_TEXT) {
        return validation_value === answer;
      } else if (answer_type === A_MULTIPLE_CHOICE || answer_type === A_SINGLE_CHOICE) {
        for (let i = 0; i < answer_list.length; i++) {
          if (answer_list[i].is_correct && !validation_value.has(i)) return false;
          else if (!answer_list[i].is_correct && validation_value.has(i)) return false;
        }
        return true;
      }
    };


    if (validation_required) {

      if (!confirmed) {
        return <Button onClick={() => this.setState({confirmed: true})}>Confirm</Button>
      } else {
        if (check_validation()) {
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

  onSuccess() {
    this.clear();
    this.props.onSuccess();
  }

  onFail() {
    this.clear();
    this.props.onFail();
  }

  clear() {
    this.setState({validation_value: null, confirmed: ''})
  }

  render() {
    const {
      classes,
      question,
      question_type,
      answer,
      answer_type,
      answer_list,
      validation_required
    } = this.props;
    const {
      confirmed,
      validation_value
    } = this.state;
    if (validation_value === null) {
      this.setState({validation_value: this.props.answer_type === A_TEXT ? '' : new Set()});
      return null;
    }
    return (
      <Slide direction={'up'} in mountOnEnter unmountOnExit>
        <Card className={classes.root}>
          <CardContent className={classes.content}>
            <Question
              question={question}
              question_type={question_type}
            />
            <Answer
              answer={answer}
              answer_type={answer_type}
              answer_list={answer_list}
              validation_required={validation_required}
              disabled={confirmed}
              validation_value={validation_value}
              on_validation_value_change={(value) => this.setState({validation_value: value})}
            />
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

  answerField: {
    width: '100%'
  },
  buttonSucc: {},
  buttonFail: {}
});
export default withStyles(styles)(Flashcard);