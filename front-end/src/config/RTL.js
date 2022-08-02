import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

/** pass all components thru a cache provide for RTL */
function RTL(props) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}


export default RTL;