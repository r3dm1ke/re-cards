const moment = require('moment');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const firestore = admin.firestore();

module.exports.reminder = functions.https.onRequest(async (req, resp) => {
  if (security_check(req)) {
    const users_to_be_notified = await get_users_to_be_notified();

    for (const user of users_to_be_notified.docs) {
      if (is_notification_required(user)) {
        await send_notification(user);
        await clear_notification(user);
      }
    }
    resp.status(200).send();
  } else {
    resp.status(403).send();
  }
});

const security_check = (req) => req.get('Authorization') === get_auth_token();

const get_auth_token = () => (
  functions.config() &&
  functions.config().notifications_scheduler &&
  functions.config().notifications_scheduler.auth_token
);

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
  const {notification_registration_token} = user.data();
  if (notification_registration_token) {
    const message = {
      notification: create_notification(),
      token: notification_registration_token,
    };
    admin.messaging().send(message);
  }
};

const create_notification = () => ({
  title: 'Time to study',
  body: 'It is time to study your flashcards. It will not take long',
});

const clear_notification = async (user) => {
  const user_ref = user.ref;
  await user_ref.update({notification: false});
};
