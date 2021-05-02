import { ApolloProvider } from '@apollo/client';
import useApolloClient from 'hooks/use-apollo-client';
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

import '@wordpress/block-library/build-style/editor.css'
import '@wordpress/block-library/build-style/style.css'
import '@wordpress/block-library/build-style/theme.css'

function MyApp({ Component, pageProps = {} }) {
  const apolloClient = useApolloClient(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp