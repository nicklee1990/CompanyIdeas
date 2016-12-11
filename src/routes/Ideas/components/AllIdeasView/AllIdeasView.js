import React, { PropTypes } from 'react'
import { IdeaList } from '../IdeaList'
import CreateIdeaForm from '../../forms/CreateIdeaForm'
import InterstitialMessage from 'components/InterstitialMessage'
import LoadingMessage from 'components/LoadingMessage'
import { Button } from 'react-toolbox/lib/button'
import Dialog from 'react-toolbox/lib/dialog'
import Subheader from 'components/Subheader'

export const AllIdeasView = (props) => {
  const { ideas, showForm, closeForm, isAddIdeaFormShown,
    fetching, creating, performSubmit, handleSubmit, loadMore, showLoadMore } = props
  if (fetching && ideas.length === 0) {
    return <LoadingMessage message="Loading ideas..." />
  }

  return (
    <div>
      <Subheader text="The Ideas Board" size="large" />
      <Button icon="add" onClick={showForm} label="Add New Idea" flat primary />
      <Dialog
        actions={[
          { label: 'Cancel', onClick: closeForm, disabled: creating },
          { label: 'Save', onClick: performSubmit, disabled: creating }
        ]}
        active={isAddIdeaFormShown}
        onEscKeyDown={closeForm}
        onOverlayClick={closeForm}
        title="Add a New Idea"
      >
        <CreateIdeaForm onSubmit={handleSubmit} />
      </Dialog>
      {
        ideas.length > 0 ? <IdeaList ideas={ideas} />
        : <InterstitialMessage
          image="/no_results.png"
          message="There aren't any ideas yet. Add one!"
        />
      }
      {
        showLoadMore &&
        <div className="text-center">
          <Button onClick={loadMore} label="Load More..." raised primary />
        </div>
      }
    </div>
  )
}

AllIdeasView.propTypes = {
  ideas: PropTypes.array.isRequired,
  isAddIdeaFormShown: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  creating: PropTypes.bool.isRequired,
  showLoadMore: PropTypes.bool.isRequired,
  showForm: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
  loadMore: PropTypes.func.isRequired,
  performSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

AllIdeasView.defaultProps = {
  ideas: []
}

export default AllIdeasView
