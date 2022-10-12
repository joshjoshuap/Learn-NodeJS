const Button = (props) => {
  return (
    <button
      className={props.className}
      type={props.type}
      disabled={props.disabled}
    >
      {props.name}
    </button>
  );
};

export default Button;
