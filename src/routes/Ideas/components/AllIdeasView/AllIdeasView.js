import React, { PropTypes } from 'react'
import { IdeaList } from '../IdeaList'
import CreateIdeaForm from '../../forms/CreateIdeaForm'
import InterstitialMessage from 'components/InterstitialMessage'
import LoadingMessage from 'components/LoadingMessage'
import { Button } from 'react-toolbox/lib/button'
import Dialog from 'react-toolbox/lib/dialog'

export const AllIdeasView = (props) => {
  const { ideas, showForm, closeForm, isAddIdeaFormShown,
    fetching, creating, performSubmit, handleSubmit } = props
  if (fetching) {
    return <LoadingMessage message="Loading ideas..." />
  }

  return (
    <div>
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
        ideas.length > 0 ? <IdeaList ideas={ideas} /> :
          <InterstitialMessage
            image="/not_found.png"
            message="There aren't any ideas yet. Add one!"
          />
      }
    </div>
  )
}

AllIdeasView.propTypes = {
  ideas: PropTypes.array.isRequired,
  isAddIdeaFormShown: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  creating: PropTypes.bool.isRequired,
  showForm: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
  performSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

AllIdeasView.defaultProps = {
  ideas: []
}

export default AllIdeasView
