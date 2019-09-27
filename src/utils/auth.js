import {auth} from '../firebase';

export const get_uid = () => auth.currentUser.uid;
