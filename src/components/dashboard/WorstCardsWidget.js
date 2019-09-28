import React, {Component} from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  withStyles,
} from '@material-ui/core';
import {connect} from 'react-redux';
import MathRenderer from '../common/MathRenderer';
import {study_worst_cards} from '../../actions/worst_cards';
import {Q_MATH, Q_TEXT} from '../../const/cards';

class WorstCardsWidget extends Component {
  renderCards() {
    const {cards, classes} = this.props;
    return cards.map((card) => {
      const green = Math.round((card.ratio / 100) * 255);
      const red = 255 - green;
      const color = `rgb(${red}, ${green}, 0)`;
      return (
        <ListItem key={card.id} className={classes.listItem}>
          {this.renderCardQuestion(card)}
          <div
            className={classes.progress}
            style={{backgroundColor: color, width: `${card.ratio}%`}}
          />
        </ListItem>
      );
    });
  }

  // eslint-disable-next-line require-jsdoc
  renderCardQuestion(card) {
    if (card.question_type === Q_TEXT) {
      return <ListItemText primary={card.question} />
    } else if (card.question_type === Q_MATH) {
      return <MathRenderer content={card.question} />
    }
    return null;
  }

  render() {
    const {classes, className, start_study} = this.props;
    return (
      <Card className={`${classes.root} ${className}`}>
        <CardContent className={classes.content}>
          <Typography variant={'h4'}>Your worst cards</Typography>
          <List className={classes.list}>
            {this.renderCards()}
          </List>
        </CardContent>
        <CardActions>
          <Button color={'inherit'} onClick={start_study}>Study</Button>
        </CardActions>
      </Card>
    );
  }
}

const styles = (theme) => ({
  root: {
    maxWidth: '20rem',
    height: '25rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  list: {
    height: '15rem',
    overflowY: 'scroll',
  },
  progress: {
    display: 'block',
    height: '4px',
  },
  listItem: {
    display: 'flex',
    paddingLeft: 0,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  [theme.breakpoints.down('sm')]: {
    root: {
      width: '100%',
      maxWidth: 'initial',
    },
  },
});
const mapStateToProps = (state) => ({
  cards: state.worst_cards.worst_cards,
});
const mapDispatchToProps = (dispatch) => ({
  start_study: () => dispatch(study_worst_cards()),
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WorstCardsWidget));
