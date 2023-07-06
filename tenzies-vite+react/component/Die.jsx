export default function Die(props) {
  return (
    <div
      onClick={props.handleChange}
      className={`die ${props.isHeld ? "held" : ""}`}
    >
      {/* <h1>{props.value}</h1> */}
      <img src={props.value} alt="" />
    </div>
  );
}
