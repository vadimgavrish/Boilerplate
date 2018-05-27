import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../redux/Auth/actions';
import { userSelector, verifiedSelector } from '../../redux/User/selectors';

/* eslint-disable */
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  clickHandler() {
    this.props.actions.logout();
    this.setState({ redirect: true });
  }

  render() {
    if (this.state.redirect){
      return <Redirect to={{pathname: '/login'}}/>
    }

    return (
      <div className='dashboard'>
        <div className='greeting'>
          Hello {this.props.name}!
        </div>
        {this.props.verified === 0 && 
          <div className='verificationError'>
            Please confirm your email address
          </div>
        }
        <div 
          onClick={() => this.clickHandler()} 
          className='logoutButton'
        >
          Logout
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: userSelector(state),
  verified: verifiedSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ logout }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
