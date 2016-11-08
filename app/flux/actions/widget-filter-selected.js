export function setSelectedFilterAndOption(filterIndex, optionIndex) {
  return {
    type: 'SET_SELECTED_FILTER_AND_OPTION',
    filterIndex, optionIndex
  };
}

export function setSelectedFilter(filterIndex) {
  return {
    type: 'SET_SELECTED_FILTER',
    filterIndex
  };
}

export function setSelectedOption(optionIndex) {
  return {
    type: 'SET_SELECTED_OPTION',
    optionIndex
  };
}
