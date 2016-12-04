import React, { PropTypes } from 'react'
import { ListItem } from 'react-toolbox/lib/list'
import style from './Comment.scss'

let Comment = (props) => {
  const { text, imageUrl, author, id } = props

  return (
    <div id={id}>
      <ListItem
        avatar={imageUrl || 'https://help.github.com/assets/images/help/profile/identicon.png'}
        caption={text}
        className={style.comment}
        legend={`by ${author}`}
        selectable={false}
        ripple={false}
      />
    </div>
  )
}

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  author: PropTypes.string.isRequired
}

export default Comment
