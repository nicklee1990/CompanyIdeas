import { connect } from 'react-redux'
import { showAddIdeaForm, closeAddIdeaForm, createIdea, fetchIdeas, sortIdeas } from '../modules/ideas'
import AllIdeasView from '../components/AllIdeasView'
import { submit } from 'redux-form'

const mapDispatchToProps = {
  sortBy: (key) => sortIdeas(key),
  showForm : () => showAddIdeaForm(),
  loadMore : () => fetchIdeas(),
  closeForm : () => closeAddIdeaForm(),
  performSubmit: () => submit('createIdea'),
  handleSubmit: (values) => createIdea(values)
}

const mapStateToProps = (state) => ({
  ideas: state.ideas.ideasList.sort((a, b) => {
    return b.createdAt - a.createdAt
  }),
  isAddIdeaFormShown: state.ideas.isAddIdeaFormShown,
  showLoadMore: !state.ideas.allPagesLoaded && state.ideas.ideasList.length > 0,
  fetching: state.ideas.fetching,
  creating: state.ideas.creating
})

export default connect(mapStateToProps, mapDispatchToProps)(AllIdeasView)
