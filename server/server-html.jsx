import React from 'react';

type Props = {
  assets: Object,
  locale: string,
  title: string,
  description: string
};

function ServerHTML(props: Props) {
  const { assets, locale, title, description } = props

  return (
    <html lang={ locale }>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, user-scalable=no' />
        <meta name='mobile-web-app-capable' content='yes' />

        { /* Styles */ }
        <link rel='icon' type='image/ico' href='/favicon.ico' />
        { assets.style.map((href, idx) =>
          <link key={ idx } rel='stylesheet' href={ href } />) }
        <style id='stylesheet' />

        { /* SEO */ }
        <title>{ title }</title>
        <meta name='description' content={ description } />
      </head>
      <body>
        <div id='root'/>
        <script src={ assets.script[0] } />
      </body>
    </html>
  )
}

export default ServerHTML;
