import {firestore} from '../../firebase';
import {get_uid} from '../auth';

export const engage_exam_mode = async () => {
  const uid = get_uid();
  const card_ref = firestore.collection('cards');
  const batch = firestore.batch();
  const cards = await card_ref.where('uid', '==', uid).get();
  cards.docs.forEach((card) => {
    batch.update(card_ref.doc(card.id), {
      s_r_deck: 1,
      last_studied: null,
      score: 0,
      ratio: 0,
      total: 0,
    });
  });
  await batch.commit();
};
