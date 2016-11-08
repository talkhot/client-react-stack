// mock
const initState = {
  OPTION: 0,
  FILTER: 0
};

const selected = (previousState = initState, action) => {
  if (action.type === 'SET_SELECTED_FILTER_AND_OPTION') {
    const { filterIndex, optionIndex } = action;

    const newState = {
      FILTER: (filterIndex !== null) ? filterIndex : previousState.FILTER,
      OPTION: (optionIndex !== null) ? optionIndex : previousState.OPTION
    };

    return newState;
  }

  if (action.type === 'SET_SELECTED_FILTER') {
    const { filterIndex } = action;

    const newState = {
      FILTER: (filterIndex !== null) ? filterIndex : previousState.FILTER,
      OPTION: previousState.OPTION
    };

    return newState;
  }

  if (action.type === 'SET_SELECTED_OPTION') {
    const { optionIndex } = action;

    const newState = {
      FILTER: previousState.FILTER,
      OPTION: (optionIndex !== null) ? optionIndex : previousState.OPTION
    };

    return newState;
  }

  return previousState;
};

export default selected;
