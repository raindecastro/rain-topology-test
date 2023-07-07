import React from 'react'
import { Logo } from '@pmndrs/branding'
import { motion } from 'framer-motion'

const Overlay = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 2 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      <Logo style={{ position: 'absolute', bottom: 40, left: 40, width: 30 }} />
      <a href="https://pmnd.rs/" style={{ position: 'absolute', bottom: 40, left: 90, fontSize: '13px' }}>
        An early-stage AI venture fund
        <br />
        hackers backing hackers
      </a>
      <div style={{ position: 'absolute', top: 40, left: 40 }}>TOPOLOGY</div>
      <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}>info@topology.fund</div>
    </motion.div>
  )
}

export default Overlay
