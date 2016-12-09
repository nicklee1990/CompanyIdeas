import React, { PropTypes } from 'react'
import { Link as RouterLink } from 'react-router'
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card'
import { IconButton } from 'react-toolbox/lib/button'
import style from './IdeaListItem.scss'

let IdeaListItem = (props) => {
  const { name, imageUrl, author, id, votes, description, addVote } = props

  return (
    <div className={style.idea}>
      <Card className={style.card}>

        <RouterLink to={`ideas/${id}`}>
          <CardTitle
            avatar={imageUrl || 'https://help.github.com/assets/images/help/profile/identicon.png'}
            title={author}
            subtitle={`submitted 3 days ago`}
            className={style.header}
          />
          <CardTitle
            title={name}
            subtitle={description}
          />
        </RouterLink>
        <CardActions>
          <IconButton icon='favorite' accent onClick={() => addVote(id)} /> {votes.length}
          <RouterLink to={`ideas/${id}`}>
            <IconButton icon='comment'  /> 23
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
  status: PropTypes.string.isRequired,
  addVote: PropTypes.func.isRequired
}

IdeaListItem.defaultProps = {
  votes: [],
  status: 'open'
}

export default IdeaListItem
