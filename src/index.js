import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App'
import { Logo } from '@pmndrs/branding'

function Overlay() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      <Logo style={{ position: 'absolute', bottom: 40, left: 40, width: 30 }} />
      <a href="https://pmnd.rs/" style={{ position: 'absolute', bottom: 40, left: 90, fontSize: '13px' }}>
        An early-stage AI venture fund
        <br />
        hackers backing hackers
      </a>
      <div style={{ position: 'absolute', top: 40, left: 40 }}>TOPOLOGY</div>
      <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}>info@topology.fund</div>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Overlay />
  </>
)
