/* eslint-disable */
import React from 'react';
import {Field, reduxForm} from 'redux-form';
import './styles.css';

const required = value => value ? undefined : 'Required';
const emailValidation = value => {
  const regex = RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$');
  const valid = regex.test(value);
  return valid ? undefined : 'Must be a valid email address';
};

const RecoveryForm = props => {
  const { handleSubmit, selectPage, recoveryForm, pristine, submitting } = props;

  const hasError = recoveryForm && recoveryForm.submitFailed;
  const syncErrors = hasError ? recoveryForm.syncErrors : null;

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
          <div>
            <Field 
              name="email"
              component="input"
              type="text"
              placeholder="Enter your email"
              className="recoveryEmailField"
              validate={[required, emailValidation]}
            />
          </div>
          { hasError && syncErrors && syncErrors.email && 
            <div className='signUpError'>
              Enter a valid email address
            </div>
          }
        <div>
          <button 
            type='submit'
            className='submitButton'
          >
            Submit
          </button>
        </div>
        <div 
          className='link'
          onClick={() => selectPage('login')}
        >
          <p>Login here</p>
        </div>
      </form>
    </div>
  )
}

export default reduxForm({
  form: 'RecoveryForm'
})(RecoveryForm);
