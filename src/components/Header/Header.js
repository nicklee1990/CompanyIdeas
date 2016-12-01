import React from 'react'
import style from './Header.scss'
import AppBar from 'react-toolbox/lib/app_bar'

export const Header = () => (
  <div className={style.header}>
    <AppBar raised theme={style}>
      <a className={style.logo} href="/">
        <img src="http://www.ten10.com/wp-content/themes/ten10/images/ten10-logo.png" />
      </a>
    </AppBar>
  </div>
)

export default Header
