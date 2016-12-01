import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import style from './CreateIdeaForm.scss'
import { TextBox } from '../../../components/Form'

let CreateIdeaForm = (props) => (
  <form onSubmit={props.handleSubmit} className={style['create-form']}>
    <Field name="name" label="Idea Name" component={TextBox} type="text" required />
    <Field name="description" multiline floating rows={3} label="Idea Description"
      component={TextBox} type="text" required />
  </form>
)

const validate = values => {
  const errors = {}

  if (!values.name) {
    errors.name = 'Required'
  } else if (values.name.length > 40) {
    errors.name = 'Must be 40 characters or less'
  }
  if (!values.description) {
    errors.description = 'Required'
  } else if (values.description.length > 350) {
    errors.description = 'Must be 350 characters or less'
  }
  return errors
}

// Decorate the form component
CreateIdeaForm = reduxForm({
  form: 'createIdea',
  validate
})(CreateIdeaForm)

CreateIdeaForm.propTypes = {
  handleSubmit: PropTypes.func
}

export default CreateIdeaForm
