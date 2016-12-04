import React from 'react'
import style from './InterstitialMessage.scss'

export const InterstitialMessage = ({ image, message }) => (
  <div className={`${style.interstitial} text-center`} >
    {
      image && <img src={image} />
    }

    <h5>{message}</h5>
  </div>
)

InterstitialMessage.propTypes = {
  image: React.PropTypes.string,
  message: React.PropTypes.string.isRequired
}

export default InterstitialMessage
