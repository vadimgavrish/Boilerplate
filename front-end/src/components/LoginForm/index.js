/* eslint-disable */
import React from 'react';
import {Field, reduxForm} from 'redux-form';
import './styles.css';

const LoginForm = props => {
  const { handleSubmit, selectPage, pristine, submitting, hasError } = props;

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
          <div>
            <Field 
              name="email"
              component="input"
              type="text"
              placeholder="Email"
              className="emailField"
            />
          </div>
          <div>
            <Field
              name="password"
              component="input"
              type="password"
              placeholder="Password"
              className="passField"
            />
          </div>
        { hasError &&
          <div className='loginError'>
            Invalid Username / Password
          </div>
        }
        <div 
          className='link'
          onClick={() => selectPage('recover')}  
        >
          <p>Forgot password?</p>
        </div>
        <div>
          <button 
            type='submit'
            className='loginButton'
          >
            Login
          </button>
        </div>
        <div 
          className='link'
          onClick={() => selectPage('register')}
        >
          <p>Need an account? Register here</p>
        </div>
      </form>
    </div>
  )
}

export default reduxForm({
  form: 'LoginForm'
})(LoginForm);
