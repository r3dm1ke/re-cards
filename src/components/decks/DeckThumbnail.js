import React, {Component} from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Divider,
  withStyles,
} from '@material-ui/core';

class DeckThumbnail extends Component {
  render() {
    const {subject, onEdit, onStart, onCards, classes} = this.props;
    return (
      <Card className={classes.card} style={{...this.props.style}}>
        <CardContent>
          <Typography variant={'h5'}>{subject}</Typography>
        </CardContent>
        <div>
          <Divider />
          <CardActions>
            <Button onClick={onStart} size={'small'}>Study</Button>
            <Button onClick={onCards} size={'small'}>Cards</Button>
            <Button onClick={onEdit} size={'small'}>Edit</Button>
          </CardActions>
        </div>
      </Card>
    );
  }
}

const styles = (theme) => ({
  card: {
    width: '100%',
    margin: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      maxWidth: '15rem',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
export default withStyles(styles)(DeckThumbnail);
