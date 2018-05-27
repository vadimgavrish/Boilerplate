/* eslint-disable */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import PassResetForm from '../../components/PassResetForm/index';
import { resetPassAttempt } from '../../redux/Auth/actions';
import './styles.css';

import {
  passResetFormSelector,
} from '../../redux/Auth/selectors';

class PassReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passError: false,
      redirect: false,
    };
  }

  resetPassAttempt(val) {
    const pass = val.password;
    const passConfirm = val.passwordConfirm;
    
    this.setState({
      passError: false,
    });
  
    if (pass !== passConfirm) {
      this.setState({ passError: true });
    } else {
      this.props.actions.resetPassAttempt(val);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: this.props.path }} />
    }

    return (
      <div className="resetPage">
        <PassResetForm
          onSubmit={(val) => this.resetPassAttempt(val)}
          passResetForm={this.props.passResetForm}
          passError={this.state.passError}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  passResetForm: passResetFormSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ resetPassAttempt }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PassReset);
