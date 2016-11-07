import debug from 'debug';

import React from 'react';
import { renderToString } from 'react-dom/server';

import ServerHTML from './server-html';

export default async function (ctx) {
  try {
    // Assets name are found into `webpack-stats`
    const assets = require('./webpack-stats.json');

    // get request locale for rendering
    const locales = require('./config').locales;
    const localeCookie = ctx.cookies.get('_lang');
    const localeDefault = require('./config').localeDefault;

    // check if we are allowed to use our locale
    const lang = (!locales.indexOf(localeCookie) > -1) ? localeDefault : localeCookie;
    const locale = lang || ctx.acceptsLanguages(locales) || localeDefault;

    // make sure we have the right lang cookie set
    if (localeCookie !== locale) ctx.cookies.set('_lang', locale);
    debug('dev')(`locale of request: ${locale}`);

    // Don't cache assets name on dev
    if (process.env.NODE_ENV === 'development') {
      delete require.cache[require.resolve('./webpack-stats.json')];
    }

    // TODO: this 'config' should go somewhere more appropriate
    const title = 'Boilerplate';
    const description = 'description';
    const statusCode = 200;

    debug('dev')('return html content');
    const props = { assets, locale, title, description };
    const html = renderToString(<ServerHTML { ...props } />)
    ctx.status = statusCode;
    ctx.body = `<!DOCTYPE html>${html}`;

  } catch (error) {
    throw error;
  }
};
