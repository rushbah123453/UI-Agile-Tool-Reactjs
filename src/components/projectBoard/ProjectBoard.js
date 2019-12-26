import React, { Component } from "react";
import { Link } from "react-router-dom";
import Backlog from "./Backlog";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBacklogs } from "../../actions/backlogAction";
import classnames from "classnames";

class ProjectBoard extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.getBacklogs(id);
  }

  render() {
    const { id } = this.props.match.params;
    const { projectTasks } = this.props.backlog;
    return (
      <div className="container">
        <Link to={`/addProjectTask/${id}`}>
          <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
        <br />
        <hr />
        <Backlog project_task_props={projectTasks} />
      </div>
    );
  }
}

const mapStateToProp = state => ({
  backlog: state.backlog
});

ProjectBoard.propTypes = {
  getBacklogs: PropTypes.func.isRequired,
  backlog: PropTypes.object.isRequired
};

export default connect(
  mapStateToProp,
  { getBacklogs }
)(ProjectBoard);
