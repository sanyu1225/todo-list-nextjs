import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/client'
import { CssBaseline } from '@mui/material';

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)
  console.log('apolloClient: ', apolloClient);

  return (
    <ApolloProvider client={apolloClient}>
      <CssBaseline/>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
