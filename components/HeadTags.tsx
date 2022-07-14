import { DefaultSeo } from 'next-seo';

const HeadTags = () => {
  return (
    <DefaultSeo
      title="Electrify"
      description="Fast EV Chargers"
      additionalMetaTags={[
        { name: 'application-name', content: 'Electrify' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent',
        },
        { name: 'theme-color', content: '#FFDA39' },
        { name: 'apple-mobile-web-app-title', content: 'Electrify' },
      ]}
      additionalLinkTags={[
        { rel: 'apple-touch-icon', href: '/icons/icon-192x192.png' },
        {
          rel: 'apple-touch-icon',
          href: '/icons/icon-152x152.png',
          sizes: '152x152',
        },
        {
          rel: 'apple-touch-icon',
          href: '/icons/icon-180x180.png',
          sizes: '180x180',
        },
        {
          rel: 'apple-touch-icon',
          href: '/icons/icon-167x167.png',
          sizes: '167x167',
        },

        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/ico', sizes: '48x48', href: '/ico-48.ico' },
        { rel: 'icon', type: 'image/ico', sizes: '16x16', href: '/ico-16.ico' },
        { rel: 'manifest', href: '/manifest.json' },
      ]}
    />
  );
};

export default HeadTags;
