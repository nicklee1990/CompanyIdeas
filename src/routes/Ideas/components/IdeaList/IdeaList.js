import React, { PropTypes } from 'react'
import IdeaListItem from '../../containers/IdeaListItemContainer'
import style from './IdeaList.scss'

let IdeaList = (props) => (
  <div className={style.idea_list}>
    {
      props.ideas.map((idea, index) => <IdeaListItem
        key={index}
        id={idea._id}
        name={idea.name}
        description={idea.description}
        imageUrl={idea.image_url}
        author={idea.author}
        status={idea.status}
        votes={idea.votes}
      />)
    }
  </div>
)

IdeaList.propTypes = {
  ideas: PropTypes.array.isRequired
}

export default IdeaList
