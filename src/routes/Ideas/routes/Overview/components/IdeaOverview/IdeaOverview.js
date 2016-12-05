import React, { PropTypes } from 'react'
import Subheader from 'components/Subheader'
import InterstitialMessage from 'components/InterstitialMessage'
import LoadingMessage from 'components/LoadingMessage'
import { Button } from 'react-toolbox/lib/button'
import { FontIcon } from 'react-toolbox/lib/font_icon'
import { Avatar } from 'react-toolbox/lib/avatar'
import { browserHistory } from 'react-router'
import style from './IdeaOverview.scss'
import { CommentList } from '../CommentList'
import AddCommentForm from '../../forms/AddCommentForm'

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
      {
        isLoading ? <LoadingMessage message="Loading idea..." />
          : <div>
            <Subheader text={`${idea.name}`} size="large" />
            <h6 className={style.author}>
              <Avatar>
                <img src="https://help.github.com/assets/images/help/profile/identicon.png" />
              </Avatar>
              <span className={style.author_name}>by {idea.author}</span>
            </h6>
            <p className={style.description}>{idea.description}</p>
            <div className={style.comments_section}>
              <div className={style.vote_button}>
                <Button
                  icon="thumb_up"
                  onClick={addVote}
                  label="Vote for this Idea"
                  raised
                  primary
                />
              </div>
              <h5 className="text-primary"><FontIcon className="icon" value="comment" /><span> Comments</span></h5>
              <AddCommentForm onSubmit={handleSubmit} />
              {commentSection}
            </div>
          </div>
      }
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
