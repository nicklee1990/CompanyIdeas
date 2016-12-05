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
        caption={name}
        legend={`suggested by ${author}`}
        className={`${style.idea} ${style[status]}`}
        rightIcon={<span>{votes} votes</span>}
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
  votes: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired
}

IdeaListItem.defaultProps = {
  votes: 0,
  status: 'open'
}

export default IdeaListItem
