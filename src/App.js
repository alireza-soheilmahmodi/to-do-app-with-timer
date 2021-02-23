import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import AddItem from "./components/AddItem";
import alert from "./alert.mp3";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nameOfNewItem: "",
      hourTimeOfNewItem: "",
      minuteTimeOfNewItem: "",
      programList: [],
      intervalShouldBeCleared: false,
    };

    this.handleInput = this.handleInput.bind(this);
    this.addItemToProgramList = this.addItemToProgramList.bind(this);
    this.countDownOfClickedProgramItem = this.countDownOfClickedProgramItem.bind(
      this
    );
    this.intervalHasBeenCompleted = this.intervalHasBeenCompleted.bind(this);
  }

  handleInput(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  }

  addItemToProgramList() {
    this.setState((prevState) => {
      const totalTimeInMinuteOfNewItem =
        (Number(prevState.hourTimeOfNewItem) * 60 +
          Number(prevState.minuteTimeOfNewItem)) *
        60;
      return {
        programList: [
          ...prevState.programList,
          {
            name: prevState.nameOfNewItem,
            time: totalTimeInMinuteOfNewItem,
            remainingTime: totalTimeInMinuteOfNewItem,
          },
        ],
      };
    });
  }

  countDownOfClickedProgramItem(index) {
    this.setState((prevState) => {
      let intervalShouldBeCleared = false;
      const programList = prevState.programList.map((item, j) => {
        if (index == j && item.remainingTime == 0) {
          intervalShouldBeCleared = true;
          new Audio(alert).play();
        } else if (index == j) {
          item.remainingTime--;
        }
        return item;
      });
      return {
        programList,
        intervalShouldBeCleared,
      };
    });
  }
  intervalHasBeenCompleted() {
    this.setState({
      intervalShouldBeCleared: false,
    });
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />

          <Route
            exact
            path="/"
            render={(props) => (
              <Main
                {...props}
                programList={this.state.programList}
                intervalShouldBeCleared={this.state.intervalShouldBeCleared}
                countDownOfClickedProgramItem={
                  this.countDownOfClickedProgramItem
                }
                intervalHasBeenCompleted={this.intervalHasBeenCompleted}
              />
            )}
          />

          <Route
            exact
            path="/add"
            render={(props) => (
              <AddItem
                {...props}
                handleInput={this.handleInput}
                addItemToProgramList={this.addItemToProgramList}
              />
            )}
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
