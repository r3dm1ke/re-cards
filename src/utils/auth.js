import React from 'react';
import {auth} from '../firebase';
import {Redirect} from 'react-router-dom';

export const get_uid = () => auth.currentUser.uid;
export const check_logged_in = (logged_in) => logged_in ? null : <Redirect to={'/'}/>;
