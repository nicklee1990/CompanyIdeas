import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import { TextBox } from 'components/Form'

let AddCommentForm = (props) => (
  <form onSubmit={props.handleSubmit} onKeyDown={(e) => e.keyCode === 13 ? props.handleSubmit() : null}>
    <Field name="text" floating label="Type your comment and hit Enter to submit"
      component={TextBox} type="text" required />
  </form>
)

/*
Note: We can just validate server side here so this is not required
const validate = values => {
  const errors = {}
  if (!values.text) {
    errors.text = 'Required'
  } else if (values.text.length > 500) {
    errors.text = 'Must be 500 characters or less'
  }
  return errors
}
*/

// Decorate the form component
AddCommentForm = reduxForm({
  form: 'addComment'
})(AddCommentForm)

AddCommentForm.propTypes = {
  handleSubmit: PropTypes.func
}

export default AddCommentForm
