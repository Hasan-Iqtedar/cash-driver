import "../styles/inputField.css";

const InputField = (props) => {
  return (
    <div className="input" style={props.style}>
      {props.icon ? <props.icon className="icon" /> : ""}
      <input
        name={props.name}
        type={props.type}
        required={true}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.changeHandler}
        style={props.fieldStyle}
      ></input>
      {props.icon2 ? (
        <props.icon2
          className="icon"
          style={props.icon2style}
          onClick={props.icon2Handler}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default InputField;
