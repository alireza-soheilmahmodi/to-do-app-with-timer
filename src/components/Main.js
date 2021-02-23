import React from "react";
import { Link } from "react-router-dom";
import ProgramItem from "./ProgramItem";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null,
    };
    this.interval = null;
    this.startClickedItem = this.startClickedItem.bind(this);
    this.stop = this.stop.bind(this);
  }

  renderProgramsContent() {
    return this.props.programList.map((programItem, index) => (
      <ProgramItem
        key={index}
        programItem={programItem}
        index={index}
        startClickedItem={this.startClickedItem}
        stop={this.stop}
        active={this.state.active}
      />
    ));
  }

  startClickedItem(index) {
    this.setState({
      active: index,
    });

    this.interval = setInterval(() => {
      this.props.countDownOfClickedProgramItem(index);
    }, 1000);
  }

  stop() {
    this.setState({
      active: null,
    });
    clearInterval(this.interval);
  }

  componentDidUpdate() {
    if (this.props.intervalShouldBeCleared) {
      this.stop();
      this.props.intervalHasBeenCompleted();
    }
  }

  render() {
    return (
      <div className="container">
        <Link to="add">
          <button
            onClick={this.stop}
            type="button"
            className="btn btn-danger add-button"
          >
            +
          </button>
        </Link>
        {this.renderProgramsContent()}
      </div>
    );
  }
}

export default Main;
