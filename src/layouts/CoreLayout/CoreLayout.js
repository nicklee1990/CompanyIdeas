import React from 'react'
import Header from '../../components/Header'

export const CoreLayout = ({ children }) => (
  <div>
    <Header />
    <div>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
