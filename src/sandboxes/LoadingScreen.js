import React from 'react'

const LoadingScreen = () => {
  return (
    <div
      style={{
        background: '#FFF',
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 9999,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none'
      }}>
      <span className="shine">TOPOLOGY</span>
    </div>
  )
}

export default LoadingScreen
