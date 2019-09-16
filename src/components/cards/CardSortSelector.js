import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  IconButton,
  withStyles
} from '@material-ui/core';
import UpIcon from '@material-ui/icons/ArrowUpward';
import DownIcon from '@material-ui/icons/ArrowDownward';
import {cards_sort_direction_toggled, cards_sort_prop_updated} from "../../actions/cards";
import {SORT_PROPS} from "../../const/cards";

class CardSortSelector extends Component {

  renderItems() {
    return SORT_PROPS.map(prop => (
      <MenuItem value={prop.value} key={prop.value}>{prop.label}</MenuItem>
    ));
  }

  renderButton() {
    const {sort_direction_toggled, classes, sort_direction} = this.props;
    return (
      <IconButton className={classes.iconButton} onClick={sort_direction_toggled}>
        {sort_direction ? <UpIcon /> : <DownIcon />}
      </IconButton>
    )
  }

  render() {
    const {classes, sort_prop_updated, sort_prop} = this.props;
    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl} variant={'outlined'}>
          <InputLabel htmlFor="sort-selector">Sort by</InputLabel>
          <Select
            value={sort_prop}
            onChange={e => sort_prop_updated(e.target.value)}
            inputProps={{
              name: 'sort_prop',
              id: 'sort-selector',
            }}
            labelWidth={60}
            className={classes.select}
          >
            {this.renderItems()}
          </Select>
        </FormControl>
        {this.renderButton()}
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing(2)
  },
  formControl: {
    flex: '1'
  },
  select: {
    paddingRight: theme.spacing(2)
  },
  [theme.breakpoints.down('sm')]: {
    root: {
      width: '100%'
    }
  }
});
const mapStateToProps = state => ({
  sort_prop: state.cards.sort_prop,
  sort_direction: state.cards.sort_direction
});
const mapDispatchToProps = dispatch => ({
  sort_prop_updated: sort_prop => dispatch(cards_sort_prop_updated(sort_prop)),
  sort_direction_toggled: () => dispatch(cards_sort_direction_toggled())
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CardSortSelector));