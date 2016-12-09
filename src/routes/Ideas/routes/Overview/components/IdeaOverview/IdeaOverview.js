import React, { PropTypes } from 'react'
import InterstitialMessage from 'components/InterstitialMessage'
import LoadingMessage from 'components/LoadingMessage'
import { Button } from 'react-toolbox/lib/button'
import { FontIcon } from 'react-toolbox/lib/font_icon'
import { browserHistory } from 'react-router'
import style from './IdeaOverview.scss'
import { CommentList } from '../CommentList'
import AddCommentForm from '../../forms/AddCommentForm'
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card'
import { IconButton } from 'react-toolbox/lib/button'

export const IdeaOverview = ({ idea, isLoading, isLoadingComments, comments, handleSubmit, addVote }) => {
  let commentSection

  if (!isLoading && !idea) {
    return (
      <InterstitialMessage
        image="/broken.png"
        message="Could not load idea. Does it still exist?"
      />
    )
  }

  if (isLoadingComments) {
    commentSection = <LoadingMessage message="Loading comments..." />
  } else {
    commentSection = comments && comments.length > 0 ? <CommentList comments={comments} />
      : <InterstitialMessage
        message="There aren't any comments yet. Add one!"
      />
  }

  return (
    <div>
      <Button icon="arrow_back" onClick={() => browserHistory.push('/ideas')} label="Back" flat primary />
      <div className={style.overview_container}>
      {
        isLoading ? <LoadingMessage message="Loading idea..." />
          : <div>
          <Card className={style.card}>
            <CardTitle
              avatar={idea.imageUrl || 'https://help.github.com/assets/images/help/profile/identicon.png'}
              title={idea.author}
              subtitle={`submitted 3 days ago`}
              className={style.header}
            />
            <CardTitle
              title={idea.name}
            />
            <CardText>{idea.description}</CardText>
            <CardActions>
              <IconButton icon='favorite' accent onClick={() => addVote()} /> {idea.votes.length}
            </CardActions>
            <CardText>
              <div className={style.comments_section}>
                <h5 className="text-primary"><FontIcon className="icon" value="comment" /><span> Comments</span></h5>
                <AddCommentForm onSubmit={handleSubmit} />
                {commentSection}
              </div>
            </CardText>
          </Card>
          </div>
      }
    </div>
    </div>
  )
}

IdeaOverview.propTypes = {
  idea: React.PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    author: PropTypes.string.isRequired
  }),
  isLoading: React.PropTypes.bool,
  isLoadingComments: React.PropTypes.bool,
  comments: React.PropTypes.array,
  handleSubmit: React.PropTypes.func.isRequired
}

export default IdeaOverview
