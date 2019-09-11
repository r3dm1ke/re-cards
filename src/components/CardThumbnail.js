import React, {Component} from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  withStyles,
  Divider,
  Chip
} from "@material-ui/core";

class CardThumbnail extends Component {
  render() {
    const {question, answer, onEdit, classes, deckName, ratio} = this.props;
    const red_color = Math.round(((100 - ratio) / 100) * 255);
    const green_color = Math.round(((ratio) / 100) * 255);
    const color = `rgb(${red_color}, ${green_color}, 0)`;
    console.log(color);
    return (
      <Card className={classes.root} style={{...this.props.style}}>
        <Chip label={deckName} variant={'outlined'} size={'small'}  className={classes.chip}/>
        <CardContent>
          <Typography variant={'h6'}>{question}</Typography>
          <Typography variant={'overline'} className={classes.answer}>{answer}</Typography>
        </CardContent>
        <div>
          <Divider style={{backgroundColor: color}}/>
          <CardActions>
            <Button color={'inherit'} onClick={onEdit}>Edit</Button>
          </CardActions>
        </div>
      </Card>
    )
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '15rem'
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: theme.spacing(1),
    position: 'relative'
  },
  chip: {
    display: 'flex',
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  answer: {
    filter: 'blur(5px)',
    '&:hover, &:focus, &:active': {
      filter: 'none'
    }
  }
});

export default withStyles(styles)(CardThumbnail);

