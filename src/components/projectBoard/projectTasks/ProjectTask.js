import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { deleteProjectTask } from "../../../actions/backlogAction";

class ProjectTask extends Component {
  onDeleteClicked(backlog_id, ps_id) {
    this.props.deleteProjectTask(backlog_id, ps_id);
  }

  render() {
    const { project_task } = this.props;
    let priorityString;
    let priorityClass;

    if (project_task.priority === 1) {
      priorityString = "HIGH";
      priorityClass = "bg-danger text-light";
    }

    if (project_task.priority === 2) {
      priorityString = "MEDIUM";
      priorityClass = "bg-warning text-light";
    }

    if (project_task.priority === 3) {
      priorityString = "LOW";
      priorityClass = "bg-info text-light";
    }

    if (project_task.priority === 0) {
      priorityString = "LOW";
      priorityClass = "bg-info text-light";
    }

    return (
      <div className="card mb-1 bg-light">
        <div className={`card-header text-primary ${priorityClass}`}>
          ID: {project_task.projectSequence} -- Priority:{priorityString}
        </div>
        <div className="card-body bg-light">
          <h5 className="card-title">{project_task.summary}</h5>
          <p className="card-text text-truncate ">
            {project_task.acceptanceCriteria}
          </p>

          <Link
            to={`/updateProjectTask/${project_task.projectIdentifier}/${project_task.projectSequence}`}
            className="btn btn-primary"
          >
            View / Update
          </Link>

          <button
            className="btn btn-danger ml-4"
            onClick={this.onDeleteClicked.bind(
              this,
              project_task.projectIdentifier,
              project_task.projectSequence
            )}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

ProjectTask.propTypes = {
  deleteProjectTask: PropTypes.func.isRequired
  //errors: PropTypes.object.isRequired
};

export default connect(
  null,
  { deleteProjectTask }
)(ProjectTask);
