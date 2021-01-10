import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Provider as AuthProvider, Context as AuthContext } from './src/context/AuthContext';
import { ResolveScreen, AuthStackScreen, AppStackScreen } from './routes';

const App = () => {
  const { state, getUser } = React.useContext(AuthContext);
  const { isSignedIn, loading } = state;
  React.useEffect(() => {
    getUser()
  }, []);
  return (
    <NavigationContainer>
      {
        loading ? <ResolveScreen/> : isSignedIn ? (
          <AppStackScreen />
          ) : (
          <AuthStackScreen />
        )
      }
    </NavigationContainer>
  )
}

export default () => (
  <AuthProvider>
    <App/>
  </AuthProvider>
)