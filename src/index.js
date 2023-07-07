import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { Suspense } from 'react'
import LoadingScreen from './sandboxes/LoadingScreen'
import Overlay from './sandboxes/Overlay'

const App = React.lazy(() => import('./App'))

createRoot(document.getElementById('root')).render(
  <>
    <Overlay />
    <Suspense
      fallback={
        <>
          <LoadingScreen />
        </>
      }>
      <App />
    </Suspense>
  </>
)
