import React, {Component} from 'react';
import {Card, CardContent, withStyles} from '@material-ui/core';
import AddIcon from '@material-ui/icons/LibraryAdd';

class NewItemCard extends Component {
  render() {
    const {classes, onClick} = this.props;

    return (
      <Card style={{...this.props.style}} className={classes.card} onClick={onClick}>
        <CardContent>
          <AddIcon className={classes.icon}/>
        </CardContent>
      </Card>
    )
  }
}

const styles = theme => ({
  card: {
    width: '100%',
    margin: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      maxWidth: '15rem'
    },
    textAlign: 'center'
  },
  icon: {
    fontSize: '7rem',
    opacity: '.5'
  }
});

export default withStyles(styles)(NewItemCard);