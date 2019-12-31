import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createNewUser } from "../../actions/securityActions";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      password: "",
      fullName: "",
      username: "",
      confirmPassword: "",
      error: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const registerUser = {
      password: this.state.password,
      fullName: this.state.fullName,
      username: this.state.username,
      confirmPassword: this.state.confirmPassword
    };
    this.props.createNewUser(registerUser, this.props.history);

    console.log(registerUser);
    // console.log(updateProjectTask);

    // this.props.updateProjectTask(this.state.projectIdentifier, this.state.projectSequence,updateProjectTasks);
  }
  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Account</p>
              <form action="create-profile.html" onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Name"
                    value={this.state.fullName}
                    onChange={this.onChange}
                    name="fullName"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.onChange}
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProp = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProp,
  { createNewUser }
)(Register);
