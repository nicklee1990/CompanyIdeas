import React, { PropTypes } from 'react'
import style from './Subheader.scss'

export const Subheader = ({ text, size }) => (
  <h5 className={`${style.subheader} ${style[size]}`}>{text}</h5>
)

Subheader.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.string
}

Subheader.defaultProps = {
  size: 'normal'
}

export default Subheader
