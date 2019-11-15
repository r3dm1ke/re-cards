import React, {useState} from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Terms from './terms';
import Intro from './intro';
import Decks from './decks';
import Done from './done';
import CardActions from '../../../common/CardActions';

const NUMBER_OF_SLIDES = 4;

const useStyles = makeStyles((theme) => ({
  content: {
    paddingBottom: theme.spacing(2),
  },
}));

const Slides = (props) => {
  const {on_close} = props;
  const classes = useStyles();
  const [slide, set_slide] = useState(0);
  return (
    <>
      <DialogContent className={classes.content}>
        <Terms visible={slide === 0}/>
        <Intro visible={slide === 1}/>
        <Decks visible={slide === 2}/>
        <Done visible={slide === 3}/>
      </DialogContent>
      <CardActions
        size={'large'}
        buttons={[
          {text: 'Previous', disabled: slide === 0, on_click: () => set_slide(slide - 1)},
          slide === NUMBER_OF_SLIDES - 1 ? (
            {text: 'Close', on_click: on_close}
          ) : (
            {text: 'Next', on_click: () => set_slide(slide + 1)}
          ),
        ]}
      />
    </>
  );
};

export default Slides;
