import React, { Component } from "react";
import { Link } from "react-router-dom";
import Backlog from "./Backlog";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBacklogs } from "../../actions/backlogAction";
import classnames from "classnames";

class ProjectBoard extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.getBacklogs(id);
  }

  render() {
    const { id } = this.props.match.params;
    const { projectTasks } = this.props.backlog;
    const { errors } = this.state;

    let boardContent;

    const boardAlgo = (errors, projectTasks) => {
      if (projectTasks.length < 1) {
        if (errors.projectTaskNotFound) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.projectTaskNotFound}
            </div>
          );
        } else {
          return (
            <div className="alert alert-info text-center" role="alert">
              No Project Task
            </div>
          );
        }
      } else {
        return <Backlog project_task_props={projectTasks} />;
      }
    };

    boardContent = boardAlgo(errors, projectTasks);

    return (
      <div className="container">
        <Link to={`/addProjectTask/${id}`}>
          <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
        <br />
        <hr />
        {boardContent}
      </div>
    );
  }
}

const mapStateToProp = state => ({
  backlog: state.backlog,
  errors: state.errors
});

ProjectBoard.propTypes = {
  getBacklogs: PropTypes.func.isRequired,
  backlog: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default connect(
  mapStateToProp,
  { getBacklogs }
)(ProjectBoard);
