import { connect } from 'react-redux'
import IdeaOverview from '../components/IdeaOverview'

const mapDispatchToProps = {
}

const mapStateToProps = (state, ownProps) => ({
  isLoading: !state.ideas || state.ideas.fetching,
  idea: state.ideas ?
    state.ideas.ideasList.find((idea) => idea._id === ownProps.params.id) :
    null
})

export default connect(mapStateToProps, mapDispatchToProps)(IdeaOverview)
