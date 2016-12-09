import { connect } from 'react-redux'
import IdeaListItem from '../components/IdeaList/IdeaListItem'
import { addVote } from '../modules/ideas'

const mapDispatchToProps = {
  addVote: (id) => addVote(id)
}

export default connect(null, mapDispatchToProps)(IdeaListItem)
