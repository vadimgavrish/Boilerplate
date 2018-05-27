/* eslint-disable */
import React from 'react';
import {Field, reduxForm} from 'redux-form';
import './styles.css';

const required = value => value ? undefined : 'Required';
const minLength8 = value => value.length < 8 ? 'Password must be at least 8 characters.' : undefined;

const PassResetForm = props => {
  const { 
    handleSubmit, 
    pristine, 
    passError, 
    submitting,
    passResetForm,
  } = props;

  const hasError = passResetForm && passResetForm.submitFailed;
  const syncErrors = hasError ? passResetForm.syncErrors : null;

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
      <div>
          <Field
            name="password"
            component="input"
            type="password"
            placeholder="Enter New Password"
            className="passFieldreg"
            validate={[required, minLength8]}
          />
        </div>
        <div>
          <Field
            name="passwordConfirm"
            component="input"
            type="password"
            placeholder="Confirm New Password"
            className="passFieldConfirm"
            validate={[required, minLength8]}
          />
        </div>
        { hasError && syncErrors && syncErrors.password && 
          <div className='signUpError'>
            Password is too short
          </div>
        }
        { passError &&
          <div className='signUpError'>
            Passwords don't match
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
      </form>
    </div>
  )
}

export default reduxForm({
  form: 'PassResetForm' 
})(PassResetForm);
