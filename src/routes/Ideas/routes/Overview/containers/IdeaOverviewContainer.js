import { connect } from 'react-redux'
import IdeaOverview from '../components/IdeaOverview'
import { addVote } from '../../../modules/ideas'
import { addComment } from '../modules/comments'

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: (values) => dispatch(addComment(ownProps.params.id, values.text)),
  addVote: () => dispatch(addVote(ownProps.params.id))
})

const mapStateToProps = (state, ownProps) => ({
  isLoading: state.ideas.fetching,
  isLoadingComments: state.comments.fetching,
  idea: state.ideas.ideasList.find((idea) => idea._id === ownProps.params.id) || null,
  comments: state.comments.commentsByIdeaId[ownProps.params.id]
})

export default connect(mapStateToProps, mapDispatchToProps)(IdeaOverview)
