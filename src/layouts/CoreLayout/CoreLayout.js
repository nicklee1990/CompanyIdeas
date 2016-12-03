import React from 'react'
import Header from '../../components/Header'
import Notification from '../../containers/NotificationContainer'

export const CoreLayout = ({ children }) => (
  <div>
    <Header />
    <div className="container">
      {children}
    </div>
    <Notification />
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
