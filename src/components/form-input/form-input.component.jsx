import "./form-input.style.scss";

const FormInput = ({ label, ...otherProps }) => {

  return (
    <div className="group">
      <input
        className="form-input"
        // type="text"
        // required
        // onChange={handleChange}
        // name="displayName"
        // value={displayName}
        {...otherProps}
      />
      {
        label && (
          <label
            className={`${otherProps.value.length ? "shrink" : ""} form-input-label`}>
            {label}
          </label>
        )
      }
    </div>

  )
};

export default FormInput;
