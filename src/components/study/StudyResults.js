import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Card, CardActions, CardContent, Typography} from '@material-ui/core';
import {study_teardown} from '../../actions/study';

export default () => {
  const dispatch = useDispatch();
  const study_length = useSelector((state) => state.study.study_length);
  const study_score = useSelector((state) => state.study.study_score);
  const teardown = () => dispatch(study_teardown());

  const render_score_results = () => {
    return `Out of ${study_length} cards you knew ${study_score}. 
                That is ${Math.floor((study_score / study_length) * 100)}%.`;
  };

  return (
    <Card>
      <CardContent>
        <Typography variant={'h3'}>Results</Typography>
        <Typography variant={'h6'}>{render_score_results()}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={teardown}>Close</Button>
      </CardActions>
    </Card>
  );
};
