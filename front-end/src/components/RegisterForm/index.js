/* eslint-disable */
import React from 'react';
import {Field, reduxForm} from 'redux-form';
import './styles.css';


const required = value => value ? undefined : 'Required';
const minLength2 = value => value.length < 2 ? 'Name must be at least 2 characters' : undefined;
const minLength8 = value => value.length < 8 ? 'Password must be at least 8 characters.' : undefined;

const emailValidation = value => {
  const regex = RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$');
  const valid = regex.test(value);
  return valid ? undefined : 'Must be a valid email address';
};

// not in use atm
const passwordValidation = value => {
  const regex = RegExp('^.*(?=.{4,10})(?=.*\d)(?=.*[a-zA-Z]).*$');
  const valid = regex.test(value);
  return valid ? undefined : 'Password must contain a letter and number';
};

const RegisterForm = props => {
  const { 
    handleSubmit, 
    selectPage, 
    pristine, 
    submitting,
    registrationAlert,
    registerForm,
    emailError,
    passError
  } = props;

  const hasError = registerForm && registerForm.submitFailed;
  const syncErrors = hasError ? registerForm.syncErrors : null;

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="name"
            component="input"
            type="text"
            placeholder="Name"
            className="nameField"
            validate={[required, minLength2]}
          />
        </div>
        { hasError && syncErrors && syncErrors.name && 
          <div className='signUpError'>
            Enter a valid name
          </div>
        }
        <div>
          <Field
            name="email"
            component="input"
            type="text"
            placeholder="Email"
            className="emailField"
            validate={[required, emailValidation]}
          />
        </div>
        <div>
          <Field
            name="emailConfirm"
            component="input" 
            type="text"
            placeholder="Confirm Email"
            className="emailFieldConfirm"
            validate={[required, emailValidation]}
          />
        </div>
        { hasError && syncErrors && syncErrors.email && 
          <div className='signUpError'>
            Enter a valid email address
          </div>
        }
        {
          emailError &&
          <div className='signUpError'>
            Emails don't match
          </div>
        }
        <div>
          <Field
            name="password"
            component="input"
            type="password"
            placeholder="Password"
            className="passFieldreg"
            validate={[required, minLength8]}
          />
        </div>
        <div>
          <Field
            name="passwordConfirm"
            component="input"
            type="password"
            placeholder="Confirm Password"
            className="passFieldConfirm"
            validate={[required, minLength8]}
          />
        </div>
        { hasError && syncErrors && syncErrors.password && 
          <div className='signUpError'>
            Password is too short
          </div>
        }
        {
          passError &&
          <div className='signUpError'>
            Passwords don't match
          </div>
        }
        <div>
          <button 
            type='submit'
            className='registerButton'
            onClick={registrationAlert}
          >
            Register
          </button>
        </div>
        <div 
          className='link'
          onClick={() => selectPage('login')}
        >
          <p>Already have an account? Login here</p>
        </div>
      </form>
    </div>
  )
}

export default reduxForm({
  form: 'RegisterForm'
})(RegisterForm);
