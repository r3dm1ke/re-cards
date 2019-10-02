export const extract_card_from_ref_async = async (card) => {
  const card_data = card.data();
  card_data.id = card.id;
  const deck_data = await card_data.deck.get();
  card_data.deckName = deck_data.data().subject;
  return card_data;
};

export const extract_cards_from_docs_async = async (cards) => {
  return await Promise.all(cards.docs.map(async (q) => ({...(await extract_card_from_ref_async(q))})));
};
