import React, { PropTypes } from 'react'
import { Link as RouterLink } from 'react-router'
import { ListItem } from 'react-toolbox/lib/list'
import style from './IdeaListItem.scss'

let IdeaListItem = (props) => {
  const { name, imageUrl, author, id, votes, status } = props

  return (
    <RouterLink to={`ideas/${id}`}>
      <ListItem
        avatar={imageUrl || 'https://help.github.com/assets/images/help/profile/identicon.png'}
        caption={<span><strong>{name}</strong> <small>suggested by {author}</small></span>}
        legend={`${votes} votes`}
        className={`${style.idea} ${style[status]}`}
        rightIcon="star"
      />
    </RouterLink>
  )
}

IdeaListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  author: PropTypes.string.isRequired,
  votes: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
}

IdeaListItem.defaultProps = {
  votes: 0,
  status: 'open'
}

export default IdeaListItem
