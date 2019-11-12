import {firestore} from '../../firebase';
import {get_uid} from '../auth';
import {DEFAULT_USER_METADATA} from '../../const/user';

export const get_user_meta_collection = () => firestore.collection('users');

export const get_user_meta_ref = () =>
  get_user_meta_collection().doc(get_uid());

export const listen_to_user_meta = (callback) =>
  get_user_meta_ref().onSnapshot((query) => {
    const data = extract_user_meta_from_docs(query);
    callback(data);
  });

const extract_user_meta_from_docs = (query) => {
  return {...query.data()};
};

export const update_user_meta = (user_meta) =>
  get_user_meta_ref().set(user_meta, {merge: true});

export const create_user_meta = async () => {
  await get_user_meta_ref().set(DEFAULT_USER_METADATA);
  return DEFAULT_USER_METADATA;
};

export const get_user_meta = async () =>
  (await get_user_meta_ref().get()).data();
