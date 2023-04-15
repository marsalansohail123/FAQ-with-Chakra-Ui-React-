import * as React from 'react'

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'

// 1. import `AppRoutering` component
import AppRoutering from './Config/Routering/AppRoutering';

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      <AppRoutering />
    </ChakraProvider>
  )
}

export default App;