import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Divider,
  makeStyles
} from '@material-ui/core';
import DeckSearchBox from "./DeckSearchBox";
import DeckSortSelector from "./DeckSortSelector";
import DeckSelector from "../cards/DeckSelector";
import CardSearchBox from "../cards/CardSearchBox";
import SortSelect from "../cards/CardSortSelector";

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  divider: {
    width: '100%'
  }
}));

export default props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <DeckSearchBox />
      <DeckSortSelector />
      <Divider className={classes.divider}/>
    </div>
  )
}