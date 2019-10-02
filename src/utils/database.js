export const extract_card_from_ref_async = async (card) => {
  const card_data = card.data();
  card_data.id = card.id;
  const deck_data = await card_data.deck.get();
  card_data.deckName = deck_data.data().subject;
  if (card_data.repetition_due) {
    card_data.repetition_due = new Date(card_data.repetition_due.seconds * 1000);
  }
  return card_data;
};

export const extract_cards_from_docs_async = async (cards) => {
  return await Promise.all(cards.docs.map(async (q) => ({...(await extract_card_from_ref_async(q))})));
};
