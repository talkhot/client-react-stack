export default () => {
  if (window) {
    // doest't support IE8
    return window.innerWidth;
  }
};
