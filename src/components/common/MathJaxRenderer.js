import React, {useState} from 'react';
import MathJax from 'react-mathjax2';
import {Skeleton} from '@material-ui/lab';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  skeleton: {
    marginTop: 0,
    marginBottom: 0,
  },
}));

export default (props) => {
  const [mathRendered, setMathRendered] = useState(false);
  const classes = useStyles();
  const {block, content} = props;
  return (
    <MathJax.Context
      noGate
      input={'tex'}
      onLoad={() => setMathRendered(true)}
    >
      {mathRendered ?
        <MathJax.Node block={block}>{content}</MathJax.Node> :
        <Skeleton className={classes.skeleton} height={50} width={'100%'} />
      }
    </MathJax.Context>
  );
};
