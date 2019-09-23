export const extract_card_from_ref_async = async (card) => {
  const card_data = card.data();
  card_data.id = card.id;
  const deck_data = await card_data.deck.get();
  card_data.deckName = deck_data.data().subject;
  return card_data;
};

export const extract_cards_from_docs_async = async (cards) => {
  const data = [];
  for (const q of cards.docs) {
    const card_data = await extract_card_from_ref_async(q);
    data.push(card_data);
  }
  return data;
};