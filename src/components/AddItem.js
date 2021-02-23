import { useHistory } from "react-router-dom";

function AddItem(props) {
  const history = useHistory();
  return (
    <div className="container form-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.addItemToProgramList();
          history.push("/");
        }}
      >
        <h2>add item</h2>
        <input
          type="text"
          name="nameOfNewItem"
          onChange={props.handleInput}
          placeholder="title"
        />
        <br />
        <input
          type="number"
          name="hourTimeOfNewItem"
          onChange={props.handleInput}
          placeholder="hour"
          required
        />

        <input
          type="number"
          name="minuteTimeOfNewItem"
          onChange={props.handleInput}
          placeholder="minute"
          required
        />
        <br />
        <input type="submit" className="btn btn-danger" value="add to list" />
      </form>
    </div>
  );
}
export default AddItem;
