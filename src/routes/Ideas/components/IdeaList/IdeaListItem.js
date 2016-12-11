import React, { PropTypes } from 'react'
import { Link as RouterLink } from 'react-router'
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card'
import { IconButton } from 'react-toolbox/lib/button'
import style from './IdeaListItem.scss'
import moment from 'moment'

let IdeaListItem = (props) => {
  const { name, imageUrl, author, id, votes, description, addVote, createdAt, comments } = props

  return (
    <div className={style.idea}>
      <Card className={style.card}>
        <RouterLink to={`ideas/${id}`}>
          <CardTitle
            avatar={imageUrl || 'https://help.github.com/assets/images/help/profile/identicon.png'}
            title={author}
            subtitle={`submitted ${moment(createdAt).fromNow()}`}
            className={style.header}
          />
          <CardTitle
            title={name}
            subtitle={description.length > 70 ? `${description.substring(0, 70)}...` : description}
            className={style.details}
          />
        </RouterLink>
        <CardActions>
          <IconButton icon="favorite_border" accent onClick={() => addVote(id)} />{votes.length}
          <RouterLink to={`ideas/${id}`}>
            <IconButton icon="chat_bubble_outline" />{comments.length}
          </RouterLink>
        </CardActions>
      </Card>
    </div>
  )
}

IdeaListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  author: PropTypes.string.isRequired,
  votes: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  addVote: PropTypes.func.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired
}

IdeaListItem.defaultProps = {
  votes: [],
  comments: [],
  status: 'open'
}

export default IdeaListItem
