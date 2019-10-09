// AUTH
export const LOGGED_IN = 'logged_in';
export const LOGGED_OUT = 'logged_out';
export const APP_INITIALIZED = 'app_initialized';

// LAYOUT
export const TOGGLE_DRAWER = 'toggle_drawer';

// MICS
export const ADD_LOADER = 'add_loader';
export const REMOVE_LOADER = 'remove_loader';
export const SHOW_ALERT = 'show_alert';
export const HIDE_ALERT = 'hide_alert';

// DECKS
export const DECKS_LOADED = 'decks_loaded';
export const DECKS_SEARCH_TERM_UPDATED = 'decks_search_term_updated';
export const DECKS_SORT_PROP_CHANGED = 'decks_sort_prop_updated';
export const DECKS_SORT_DIRECTION_TOGGLED = 'decks_sort_direction_triggered';

// DECKS/EDIT DIALOG
export const EDIT_DECK_DIALOG_TOGGLED = 'toggle_edit_deck_dialog';
export const EDIT_DECK_DIALOG_NAME_CHANGED = 'edit_deck_name_changed';
export const EDIT_DECK_DIALOG_ID_CHANGED = 'set_edit_deck_id';
export const EDIT_DECK_DIALOG_ERROR_ADDED = 'edit_deck_dialog_error_added';
export const EDIT_DECK_DIALOG_ERRORS_CLEARED = 'edit_deck_dialog_errors_cleared';

// CARDS
export const DECK_SELECTED = 'deck_selected';
export const CARDS_LOADED = 'cards_loaded';
export const CARDS_SEARCH_TERM_UPDATED = 'cards_search_term_updated';
export const CARDS_SORT_PROP_CHANGED = 'cards_sort_prop_changed';
export const CARDS_SORT_DIRECTION_TOGGLED = 'cards_sort_direction_toggled';

// CARDS/EDIT DIALOG
export const OPEN_EDIT_CARD_DIALOG = 'open_edit_card_dialog';
export const EDIT_CARD_DIALOG_ID_CHANGED = 'edit_card_dialog_id_changed';
export const EDIT_CARD_DIALOG_QUESTION_CHANGED = 'edit_card_dialog_question_changed';
export const EDIT_CARD_DIALOG_ANSWER_CHANGED = 'edit_card_dialog_answer_changed';
export const EDIT_CARD_DIALOG_DECK_CHANGED = 'edit_card_dialog_deck_changed';
export const EDIT_CARD_DIALOG_VALIDATION_REQUIRED_CHANGED = 'edit_card_dialog_validation_required_changed';
export const EDIT_CARD_DIALOG_QUESTION_TYPE_CHANGED = 'edit_card_dialog_question_type_changed';
export const CLOSE_EDIT_CARD_DIALOG = 'close_edit_card_dialog';
export const EDIT_CARD_DIALOG_ANSWER_TYPE_CHANGED = 'edit_card_dialog_answer_type_changed';
export const EDIT_CARD_DIALOG_ANSWER_LIST_ADDED_NEW_ENTRY = 'edit_card_dialog_answer_list_added_new_entry';
export const EDIT_CARD_DIALOG_ANSWER_LIST_ENTRY_MODIFIED = 'edit_card_dialog_answer_list_entry_modified';
export const EDIT_CARD_DIALOG_ANSWER_LIST_REMOVED_ENTRY = 'edit_card_dialog_answer_list_removed_entry';
export const EDIT_CARD_DIALOG_ANSWER_LIST_CHANGED = 'edit_card_dialog_answer_list_changed';
export const EDIT_CARD_DIALOG_ERRORS_CHANGED = 'edit_card_dialog_errors_changed';
export const EDIT_CARD_DIALOG_ERRORS_CLEARED = 'edit_card_dialog_errors_cleared';
export const EDIT_CARD_DIALOG_TAB_CHANGED = 'edit_card_dialog_tab_changed';

// DASHBOARD
export const SIMPLE_STUDY_DECK_SELECTED = 'simple_study_deck_selected';

// STUDY
export const CARDS_FOR_STUDY_LOADED = 'cards_for_study_loaded';
export const START_STUDY = 'start_study';
export const SET_STUDY_MODE = 'set_study_mode';
export const STUDY_INCREMENT_INDEX = 'study_increment_index';
export const STUDY_INCREMENT_SCORE = 'study_increment_score';
export const STUDY_FINISHED = 'study_finished';
export const STUDY_SHOW_RESULTS = 'study_show_results';
export const STUDY_VALIDATION_VALUE_CHANGED = 'study_validation_value_changed';
export const STUDY_VALIDATION_CONFIRMED_CHANGED = 'study_validation_confirmed_changed';
export const STUDY_IS_CORRECT_CHANGED = 'study_is_correct_changed';
export const CARDS_FOR_SIMPLE_STUDY_LOADED = 'cards_for_simple_study_loaded';

// ERRORS
export const ERROR_HAPPENED = 'error_happened';
export const ERROR_DISMISSED = 'error_dismissed';

// OFFLINE
export const IS_OFFLINE = 'is_offline';
export const IS_ONLINE = 'is_online';

// ============== WIDGETS ===============
// QUICK STUDY
export const NUMBER_OF_CARDS_FOR_QUICK_STUDY_CHANGED = 'number_of_cards_changed';
// ============= /WIDGETS ===============
