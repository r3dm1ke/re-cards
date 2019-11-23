[![Actions Status](https://github.com/r3dm1ke/re-cards/workflows/CI/badge.svg)](https://github.com/r3dm1ke/re-cards/actions)

# RE:Cards
This is an open-source web application to study and manage flashcards.
You can view the deployed version [here](https://card.redmike.me).

### Status
This app is in active development and is not at a release stage yet. Use at
your own risk.

### Why
I wanted to get more experience with React and Google Firebase, as well as look into
PWAs (Progressive Web Apps). I decided to develop a PWA that will help students like me
to organize and study flashcards with the help of [spaced repetition](https://en.wikipedia.org/wiki/Spaced_repetition) 
algorithm. 

### Technologies used
- Frontend:
    - [React (v16, hooks)](https://reactjs.org/)
    - [Material-UI](https://material-ui.com/)
    - [Redux](https://redux.js.org/)
    - [PWA spec, service workers](https://en.wikipedia.org/wiki/Progressive_web_applications)
- Backend:
    - [Firebase Firestore](https://firebase.google.com/)
    - [Firebase Hosting](https://firebase.google.com/)
- DevOps:
    - [Github Actions](https://github.com/features/actions)
    
### Roadmap
- [x] Authentication
- [x] User introduction & minimal tutorial
- [x] Create decks
- [x] Create cards
- [x] Basic types of cards
    - [x] Math equations
    - [x] Multiple choice
- [x] Study cards manually
- [x] Study cards using spaced repetition
- [x] Card mastery
- [x] "Days studying in a row"
- [ ] Reminders
- [ ] Advanced card types
    - [ ] Photos
    - [ ] Match
- [ ] Prompt to install PWA
- [ ] Live decks
- [ ] Shared decks
- [ ] AI-assisted spaced repetition algorithm
- [ ] ???

### Keys & Development
You will note that the `firestore.js` file contains keys to access the Firestore API.
This is not a mistake, there is no point in concealing them as anyone can access them
if you open the live website and look in the developer console. There are 2 sets of keys there:
for production and development. Production is only allowed to operate on live domain,
development only allowed to operate on `localhost`.

### Contributions
This is an open-source project and any contributions are welcome. Feel free
to open an issue is you find a bug, or a pull request to fix it. For feature requests,
reach out to me first.
