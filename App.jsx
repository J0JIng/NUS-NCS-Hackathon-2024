import * as React from 'react';
import MainContainer from './components/MainContainer';
import HomeStack from './components/HomeStack';

import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';


function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  return (
      <HomeStack />
  );
}

export default App;
