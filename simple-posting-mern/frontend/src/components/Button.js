const Button = (props) => {
  return (
    <button type={props.type} disabled={props.disabled}>
      {props.name}
    </button>
  );
};

export default Button;
