import React from 'react';
import {useSelector} from 'react-redux';
import Study from '../components/study/Study';
import StudyResults from '../components/study/StudyResults';
import {Redirect} from 'react-router-dom';

export default () => {
  const study_status = useSelector((state) => state.study.study_status);
  const logged_in = useSelector((state) => state.auth.logged_in);

  if (!logged_in) return <Redirect to={'/'} />;
  const render_study = () => {
    if (study_status === 'running') {
      return <Study />;
    } else if (study_status === 'results') {
      return <StudyResults/>;
    }
    return null;
  };

  return render_study();
};
