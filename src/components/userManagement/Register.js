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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    } else {
    }
  }

  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    const { errors } = this.state;
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
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": this.props.errors.fullName
                    })}
                    placeholder="Name"
                    value={this.state.fullName}
                    onChange={this.onChange}
                    name="fullName"
                  />
                  {this.props.errors.fullName && (
                    <div className="invalid-feedback">
                      {this.props.errors.fullName}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": this.props.errors.username
                    })}
                    placeholder="Email Address"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                  {(this.props.errors.username ||
                    this.props.errors.userAlreadyExists) && (
                    <div className="invalid-feedback">
                      {this.props.errors.username}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": this.props.errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {this.props.errors.password && (
                    <div className="invalid-feedback">
                      {this.props.errors.password}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": this.props.errors.confirmPassword
                    })}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.onChange}
                  />
                  {this.props.errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {this.props.errors.confirmPassword}
                    </div>
                  )}
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
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProp = state => ({
  errors: state.errors,
  security: state.security
});

export default connect(
  mapStateToProp,
  { createNewUser }
)(Register);
