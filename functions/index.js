const moment = require('moment');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const firestore = admin.firestore();

export const reminder = functions.pubsub.schedule('every hour').onRun(async (context) => {
  const users_to_be_notified = await get_users_to_be_notified();

  for (const user of users_to_be_notified.docs) {
    if (is_notification_required(user)) {
      send_notification(user);
      clear_notification(user);
    }
  }
});

const get_users_to_be_notified = async () => {
  const users_to_be_notified_ref = firestore.collection('users')
    .where('notification', '==', true);
  return await users_to_be_notified_ref.get();
};

const is_notification_required = (user) => {
  const user_time = moment(user.data().notification_time.toMillis());
  return moment().isAfter(user_time);
};

const send_notification = (user) => {
  // TODO
};

const clear_notification = (user) => {
  // TODO
};
