import React, { PropTypes } from 'react'
import Subheader from '../../../../../../components/Subheader'
import LoadingMessage from '../../../../../../components/LoadingMessage'
import { Button } from 'react-toolbox/lib/button'
import { browserHistory } from 'react-router'

export const IdeaOverview = ({ idea, isLoading }) => {

  let content;

  if (isLoading) {
    content = <LoadingMessage message="Loading idea..." />
  } else {
    content = <div>
      <Subheader text={`${idea.name} suggested by ${idea.author}`} size="large" />
      <p>{idea.description}</p>
    </div>

  }

  return (
    <div>
      <Button icon="arrow_back" onClick={() => browserHistory.push('/ideas')} label="Back" flat primary />
      {content}
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
