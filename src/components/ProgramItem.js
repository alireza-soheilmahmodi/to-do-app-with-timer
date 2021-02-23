import React from "react";

class ProgramItem extends React.Component {
  convertSecondsToHourMinuteSecond(timeInSeconds) {
    let hourOfTime = String(Math.floor(timeInSeconds / 3600));
    let minuteOfTime = String(Math.floor(timeInSeconds / 60) % 60);
    let secondOfTime = String(
      timeInSeconds - (Number(hourOfTime) * 3600 + Number(minuteOfTime) * 60)
    );

    hourOfTime = hourOfTime.length == 1 ? `0${hourOfTime}` : hourOfTime;
    minuteOfTime = minuteOfTime.length == 1 ? `0${minuteOfTime}` : minuteOfTime;
    secondOfTime = secondOfTime.length == 1 ? `0${secondOfTime}` : secondOfTime;

    return `${hourOfTime}:${minuteOfTime}:${secondOfTime}`;
  }

  showButton() {
    if (this.props.programItem.remainingTime == 0) {
      return (
        <button type="button" className="btn btn-success disabled">
          completed
        </button>
      );
    }
    if (this.props.active != null && this.props.active != this.props.index) {
      return (
        <button type="button" className="btn btn-primary disabled">
          start
        </button>
      );
    }
    if (this.props.active == this.props.index) {
      return (
        <button
          type="button"
          className="btn btn-danger"
          onClick={this.props.stop}
        >
          stop
        </button>
      );
    }

    return (
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          this.props.startClickedItem(this.props.index);
        }}
      >
        start
      </button>
    );
  }

  render() {
    const progress = Math.floor(
      100 -
        (this.props.programItem.remainingTime / this.props.programItem.time) *
          100
    );
    return (
      <div className="card text-dark bg-light my-4">
        <div className="card-body">
          <h4 className="card-title">{this.props.programItem.name}</h4>
          <h5 className="card-subtitle mb-2 text-muted">
            {this.convertSecondsToHourMinuteSecond(this.props.programItem.time)}
          </h5>
          <div className="progress my-2">
            <div
              className="progress-bar progress-bar-striped bg-info"
              role="progressbar"
              style={{
                width: `${progress}%`,
              }}
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {progress}%
            </div>
          </div>
          <h5 className="card-subtitle mb-2 text-muted">
            remaining time:
            {this.convertSecondsToHourMinuteSecond(
              this.props.programItem.remainingTime
            )}
          </h5>
          {this.showButton()}
        </div>
      </div>
    );
  }
}

export default ProgramItem;
