import React, { PropTypes } from 'react'
import Comment from './Comment'
import { List } from 'react-toolbox/lib/list'

let CommentList = (props) => (
  <List selectable={false} ripple={false}>
    {
      props.comments.map((comment, index) => <Comment
        key={index}
        id={comment._id}
        text={comment.text}
        imageUrl={comment.image_url}
        author={comment.author}
      />)
    }
  </List>
)

CommentList.propTypes = {
  comments: PropTypes.array.isRequired
}

CommentList.defaultProps = {
  comments: []
}

export default CommentList
