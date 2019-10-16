import React from 'react';
import {Grow, makeStyles, Typography} from '@material-ui/core';
import {useSelector, useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';
import CardThumbnail from '../components/cards/CardThumbnail';
import Filters from '../components/cards/Filters';
import {
  delete_card,
} from '../actions/cards/cards';
import {
  open_edit_card_dialog_for_existing_card,
  open_edit_card_dialog_for_new_card,
} from '../actions/cards/cards_form';
import NewItemCard from '../components/common/NewItemCard';
import EditCardDialog from '../components/cards/edit_dialog/EditCardDialog';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  title: {
    textAlign: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },
}));

// eslint-disable-next-line max-lines-per-function
export default () => {
  const logged_in = useSelector((state) => state.auth.logged_in);
  if (!logged_in) return <Redirect to={'/'} />;

  const cards = useSelector((state) => state.cards.filtered_cards);
  useSelector((state) => state.cards.refresh_helper);
  const classes = useStyles();
  const dispatch = useDispatch();

  const render_cards = () => {
    if (cards === undefined) {
      return render_skeletons();
    }
    return cards
      .map((card, index) => (
        <Grow timeout={index * 250} key={card.id} in>
          <CardThumbnail
            question={card.question}
            question_type={card.question_type}
            answer={card.answer}
            deckName={card.deck_name}
            ratio={card.ratio}
            onEdit={() => dispatch(open_edit_card_dialog_for_existing_card(card))}
            onDelete={() => dispatch(delete_card(card))}
          />
        </Grow>
      ));
  };

  const render_skeletons = () => {
    return [1, 2, 3, 4, 5].map((id) => (
      <CardThumbnail key={id} skeleton />
    ));
  };

  const final_delay = cards === undefined ? 0 : cards.length * 250;

  return (
    <div>
      <Typography variant={'h2'} className={classes.title}>Your cards</Typography>
      <Filters />
      <div className={classes.cardContainer}>
        {render_cards()}
        <Grow timeout={final_delay} in>
          <NewItemCard onClick={() => dispatch(open_edit_card_dialog_for_new_card())}/>
        </Grow>
      </div>
      <EditCardDialog />
    </div>
  );
};
