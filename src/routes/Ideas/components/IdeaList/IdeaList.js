import React, { PropTypes } from 'react'
import IdeaListItem from './IdeaListItem'
import { List, ListSubHeader } from 'react-toolbox/lib/list'

let IdeaList = (props) => (
  <List selectable ripple>
    <ListSubHeader caption="Popular Ideas" />
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
  </List>
)

IdeaList.propTypes = {
  ideas: PropTypes.array.isRequired
}

export default IdeaList
