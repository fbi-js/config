import React from 'react'
import ReactDOM from 'react-dom'

import '@/index.css'
import '@/index.less'
import '@/index.scss'
import App from '@/App'

export default (): void => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('app')
  )
}
