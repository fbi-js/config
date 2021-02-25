import React from 'react'

import '@/app.css'
import Logo from '@/logo.svg'

const App: React.FunctionComponent = () => {
  return (
    <div className='app'>
      <header className='app-header'>
        <Logo className='app-logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <a
          className='app-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
        <div className='buttom-logo' />
      </header>
    </div>
  )
}

export default App
