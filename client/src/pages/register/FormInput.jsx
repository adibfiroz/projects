import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;
  const [userExists, setUserExists] = useState(false);

  const { data } = useFetch("/users");

  const notFound = data.find((obj) => {
    return obj.username === inputProps.value;
  });

  const handleFocus = (e) => {
    setFocused(true);
    if (notFound) {
      setUserExists(true);
    } else {
      setUserExists(false);
    }
  };

  return (
    <div className="registerFormInputs">
      {userExists && <div className="userRed">User already exists!</div>}

      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() => inputProps.name === "password" && setFocused(true)}
        focused={focused.toString()}
      />
      <span className="errorMsg">{errorMessage}</span>
    </div>
  );
};
export default FormInput;
