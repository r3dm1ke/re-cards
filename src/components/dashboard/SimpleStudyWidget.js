import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  FormGroup,
  FormControl,
  FormControlLabel,
  Checkbox,
  Button,
  withStyles,
} from '@material-ui/core';
import {Skeleton} from '@material-ui/lab';
import {simple_study_deck_selected} from '../../actions/dashboard';
import {start_study} from '../../actions/study';
import {SIMPLE_STUDY} from '../../const/study';

class SimpleStudyWidget extends Component {
  renderSkeletons() {
    return [
      <Skeleton variant={'text'} width={'70%'} height={40} key={1}/>,
      <Skeleton variant={'text'} width={'70%'} height={40} key={2}/>,
      <Skeleton variant={'text'} width={'70%'} height={40} key={3}/>,
    ];
  }

  renderDecks() {
    const {decks, decks_selected, deck_selected} = this.props;
    if (decks === undefined) {
      return this.renderSkeletons();
    }
    console.log(decks_selected);
    return decks.map((deck) => (
      <FormControlLabel
        control={
          <Checkbox
            value={deck.id}
            checked={decks_selected.indexOf(deck.id) > -1}
            onChange={(e) => deck_selected(deck.id, e.target.checked)}
          />
        }
        label={deck.name}
        key={deck.id}
      />
    ));
  }

  render() {
    const {classes, start_study, className} = this.props;
    return (
      <Card className={`${classes.root} ${className}`}>
        <CardContent className={classes.content}>
          <Typography variant={'h4'}>Simple Study</Typography>
          <Typography variant={'overline'}>Select decks to study:</Typography>
          <FormControl component={'fieldset'}>
            <FormGroup>
              {this.renderDecks()}
            </FormGroup>
          </FormControl>
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
});
const mapStateToProps = (state) => ({
  decks: state.cards.decks,
  decks_selected: state.dashboard.simple_study_decks,
  refresh_helper: state.dashboard.refresh_helper,
});
const mapDispatchToProps = (dispatch) => ({
  deck_selected: (deck, selected) => dispatch(simple_study_deck_selected(deck, selected)),
  start_study: () => dispatch(start_study(SIMPLE_STUDY)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SimpleStudyWidget));
