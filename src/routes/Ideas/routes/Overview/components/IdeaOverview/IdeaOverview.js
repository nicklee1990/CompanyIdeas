import React, { PropTypes } from 'react'
import Subheader from 'components/Subheader'
import InterstitialMessage from 'components/InterstitialMessage'
import LoadingMessage from 'components/LoadingMessage'
import { Button } from 'react-toolbox/lib/button'
import { FontIcon } from 'react-toolbox/lib/font_icon'
import { browserHistory } from 'react-router'
import style from './IdeaOverview.scss'
import { CommentList } from '../CommentList'
import AddCommentForm from '../../forms/AddCommentForm'

export const IdeaOverview = ({ idea, isLoading, isLoadingComments, comments, handleSubmit }) => {

  let commentSection;

  if (isLoadingComments){
    commentSection = <LoadingMessage message="Loading comments..." />
  } else {
    commentSection = comments && comments.length > 0 ? <CommentList comments={comments} /> :
      <InterstitialMessage
        image="/no_results.png"
        message="There aren't any comments yet. Add one!"
      />
  }

  return (
    <div>
      <Button icon="arrow_back" onClick={() => browserHistory.push('/ideas')} label="Back" flat primary />
      {
        isLoading ? <LoadingMessage message="Loading idea..." /> :
          <div>
            <Subheader text={`${idea.name} suggested by ${idea.author}`} size="large" />
            <p className={style.description}>{idea.description}</p>
            <div className={style.comments_section}>
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
  })
}

export default IdeaOverview
