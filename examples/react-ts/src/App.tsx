import React from 'react'

import '@/app.css'
// import logo from '@/logo.svg'
import Logo from '@/logo.svg'

const App: React.FunctionComponent = () => {
  return (
    <div className='app'>
      <header className='app-header'>
        <Logo width={100} height={100} />
        {/* <img src={logo} className='app-logo' alt='logo' /> */}
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
      </header>
    </div>
  )
}

export default App
