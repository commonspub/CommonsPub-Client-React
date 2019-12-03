import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import getApolloClient from './apollo/client';
import App from './containers/App/App';
import { ProvideContexts } from './context/global';
import { integrateSessionApolloRedux } from './integrations/Session-Apollo-Redux';
import createStore from './redux/store';
import registerServiceWorker from './registerServiceWorker';
import { createLocalSessionKVStorage } from './util/keyvaluestore/localSessionStorage';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { integrateToastNotifications } from './integrations/Toast-Notifications';
import { createDynamicLinkEnv } from './util/apollo/dynamicLink';
import * as Sentry from '@sentry/browser';
Sentry.init({
  dsn: 'https://cee9deb57dce41a9963b0cb234076db6@sentry.io/1825990'
});

run();
async function run() {
  const Global = createGlobalStyle`
      body, html {
          border: 0;
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          font-family: 'Open Sans', sans-serif !important;
      }
      
      * {
        box-sizing: border-box;
      }

      body {
      background: #F5F6F7;
      overflow-y: scroll;
      overscroll-behavior-y: none;
      .ais-SearchBox {
        height: 42px;
        border-radius: 4px;
        border: 1px solid #dadada
        input {
          height: 40px;
          border: none;
          background: #fff;
          margin: 0 !important; 
          border-radius: 4px;
          text-indent: 30px;
          padding: 0;
        }
      }
      .ais-InstantSearch__root { 
        display: flex;
      width: 100%; }
      }
  `;
  const createLocalKVStore = createLocalSessionKVStorage('local');
  const store = createStore({ createLocalKVStore });
  const initialState = store.getState();
  const authToken =
    (initialState.session.auth && initialState.session.auth.token) || undefined;
  const dynamicLinkEnv = createDynamicLinkEnv();

  const appLink = dynamicLinkEnv.link;
  const apolloClient = await getApolloClient({ authToken, appLink });

  integrateSessionApolloRedux(dynamicLinkEnv.srv, store.dispatch);
  integrateToastNotifications(dynamicLinkEnv.srv, store.dispatch);
  const ApolloApp = () => (
    <ApolloProvider client={apolloClient.client}>
      <ToastContainer
        hideProgressBar
        transition={Slide}
        autoClose={3000}
        newestOnTop
      />
      <ProvideContexts
        store={store}
        apolloInterceptor={apolloClient.opInterceptor as any}
        dynamicLinkSrv={dynamicLinkEnv.srv}
      >
        <Global />
        <App />
      </ProvideContexts>
    </ApolloProvider>
  );

  ReactDOM.render(<ApolloApp />, document.getElementById('root'));

  registerServiceWorker();
}
