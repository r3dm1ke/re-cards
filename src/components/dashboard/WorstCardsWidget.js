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
  withStyles
} from '@material-ui/core';
import {connect} from 'react-redux';
import MathJaxRenderer from "../common/MathRenderer";
import {study_worst_cards} from "../../actions/worst_cards";

class WorstCardsWidget extends Component {

  renderCards() {
    const {cards, classes} = this.props;
    return cards.map(card => {
      const green = Math.round((card.ratio / 100) * 255);
      const red = 255 - green;
      const color = `rgb(${red}, ${green}, 0)`;
      return (
        <ListItem key={card.id} className={classes.listItem}>
          <ListItemText primary={card.question} />
          <div
            className={classes.progress}
            style={{backgroundColor: color, width: `${card.ratio}%`}}
          />
        </ListItem>
      )
    })
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
    )
  }
}

const styles = theme => ({
  root: {
    maxWidth: '20rem',
    height: '25rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  list: {
    height: '15rem',
    overflowY: 'scroll'
  },
  progress: {
    display: 'block',
    height: '4px'
  },
  listItem: {
    display: 'flex',
    paddingLeft: 0,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  [theme.breakpoints.down('sm')]: {
    root: {
      width: '100%',
      maxWidth: 'initial'
    }
  }
});
const mapStateToProps = state => ({
  cards: state.worst_cards.worst_cards
});
const mapDispatchToProps = dispatch => ({
  start_study: () => dispatch(study_worst_cards())
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WorstCardsWidget));
