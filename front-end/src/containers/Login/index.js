import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  login,
  loginAttempt,
  registerAttempt,
  recoverAttempt,
} from '../../redux/Auth/actions';
import LoginForm from '../../components/LoginForm/index';
import {
  loggedInSelector,
  errorSelector,
  registerFormSelector,
  recoveryFormSelector,
} from '../../redux/Auth/selectors';
import RegisterForm from '../../components/RegisterForm/index';
import RecoveryForm from '../../components/RecoveryForm/index';

/* eslint-disable */
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      emailError: false,
      passError: false,
      pageSelector: 'login'
    };
  }

  componentDidUpdate() {
    if (this.props.loggedIn) {
      this.setState({ redirect: true });
    }
  }

  selectPage(page) {
    this.setState({ pageSelector: page });
  }

  loginAttempt(val) {
    this.props.actions.loginAttempt(val);
  }

  registerAttempt(val) {
    const email        = this.props.registerForm.values.email;
    const emailConfirm = this.props.registerForm.values.emailConfirm;
    const pass         = this.props.registerForm.values.password;
    const passConfirm  = this.props.registerForm.values.passwordConfirm;

    this.setState({
      emailError: false,
      passError: false,
    });

    if (email !== emailConfirm) {
      this.setState({ emailError: true });
    } else if (pass !== passConfirm) {
      this.setState({ passError: true });
    } else {
      this.props.actions.registerAttempt(val);
    }
  }

  recoverAttempt(val) {
    this.props.actions.recoverAttempt(val);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: this.props.path }} />
    }

    return (
      <div className='loginPage'>
        {this.state.pageSelector === 'login' &&
          <LoginForm 
            onSubmit={(val) => this.loginAttempt(val)}
            selectPage={(val) => this.selectPage(val)}
            hasError={this.props.loginError}
          />
        }
        {this.state.pageSelector === 'register' &&
          <RegisterForm
            onSubmit={(val) => this.registerAttempt(val)}
            selectPage={(val) => this.selectPage(val)}
            registerForm={this.props.registerForm}
            emailError={this.state.emailError}
            passError={this.state.passError}
          />
        }
        {this.state.pageSelector === 'recover' &&
          <RecoveryForm
            onSubmit={(val) => this.recoverAttempt(val)}
            selectPage={(val) => this.selectPage(val)}
            recoveryForm={this.props.recoveryForm}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: loggedInSelector(state),
  loginError: errorSelector(state),
  registerForm: registerFormSelector(state),
  recoveryForm: recoveryFormSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ 
    login, 
    loginAttempt, 
    registerAttempt, 
    recoverAttempt
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
