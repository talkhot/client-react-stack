const helmet = (previousState = {
  titleBase: 'Boilerplate: ',
  title: ''
}, action) => {
  switch (action.type) {
    case 'SET_PAGE_TITLE':
      // set document title
      if (document) document.title = previousState.titleBase + action.title;

      return {
        titleBase: previousState.titleBase,
        title: action.title
      };
    default:
      return previousState;
  }
};

export default helmet;
