// source: https://github.com/iam4x/isomorphic-flux-boilerplate
// We use react-intl for internationalization, it uses browser implementation of Intl.
const loaders = {
  en: async () => {
    if (!window.Intl) {
      await require('promise?global!intl')();
      await require('promise?global!intl/locale-data/jsonp/en.js')();
    }
    // load language files here for the app
    return await require('promise?global!data/en')();
  }
};

export default async (locale) => {
  if (process.env.NODE_ENV === 'test') return { messages: {} };

  const result = await loaders[locale]();
  if (process.env.BROWSER) {
    window.ReactIntl = require('react-intl');
    const { addLocaleData } = require('react-intl');
    addLocaleData(require(`react-intl/locale-data/${locale}.js`));
  }

  return result;
};
