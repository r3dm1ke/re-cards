import React, {useState, useEffect} from 'react';
import {makeStyles, Typography} from '@material-ui/core';
import {shuffle} from '../../../../utils/random';

const QUOTES = [
  'Push yourself because no one else is going to do it for you',
  'If it is important to you, you will find a way. If not, you will find an excuse',
  'The secret of getting ahead is getting started',
  'The expert in anything was once a beginner',
  'It always seems impossible until it is done',
  'A year from now you\'ll wish you had started today',
  'You deserve better',
];

const QUOTE_COUNT = 3;

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    color: 'white',
  },
}));

export default () => {
  const classes = useStyles();
  const quotes = shuffle(QUOTES).slice(0, QUOTE_COUNT);
  return quotes.map((quote, index) => (
    <div key={index}>
      <Typography
        variant={'h3'}
        className={classes.root}
      >{quote}</Typography>
    </div>
  ));
};
