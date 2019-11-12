import React from 'react';
import {default as MaterialCardActions} from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  'root': {
    display: 'flex',
    padding: 0,
  },
  'root:first-child': {
    borderBottomLeftRadius: theme.spacing(0.5),
  },
  'root:last-child': {
    borderBottomRightRadius: theme.spacing(0.5),
  },
  'button': {
    flex: 1,
    borderRadius: 0,
    margin: 0,
  },
  'divider': {
    height: '36px',
  },
}));

const CardActions = (props) => {
  const classes = useStyles();
  const {buttons, size, ...rest} = props;

  return (
    <>
      <Divider />
      <MaterialCardActions className={classes.root} {...rest}>
        {buttons.map((button, index) => (
          <React.Fragment key={index}>
            <Button
              size={size}
              disabled={button.disabled}
              className={classes.button}
              onClick={button.on_click}
            >
              {button.text}
            </Button>
            {index !== (buttons.length - 1) ?
              <Divider orientation={'vertical'} className={classes.divider}/> : null}
          </React.Fragment>
        ))}
      </MaterialCardActions>
    </>
  );
};

export default CardActions;
