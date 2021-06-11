import React from "react";
import styled from "styled-components";

const TimeInputContainer = styled.div`
  width: 10.3em;
  display: flex;
  border-radius: 0.3em;

  & > span {
    background: var(--primary);
    display: flex;
    padding: 0.35em;
    border-radius: 0.3em 0px 0px 0.3em;
    color: white;
    font-size: 1.4em;
  }

  & > input {
    width: 100%;
    border: none;
    outline: none;
    border-radius: 0px 0.3em 0.3em 0px;
    font-weight: 600;
    color: var(--primary);
    text-align: center;
    font-size: 1em;

    &:focus {
      box-shadow: 0px 0px 0px 2px var(--primary);
    }

    &::placeholder {
      color: rgb(93, 92, 92);
      font-weight: 400;
    }
  }
`;

export const validateTimeInput = (prevValue, newValue) => {
  //Function Used to control the input of time so that only valid entries are possible.

  function isNumeric(value) {
    return /^-?\d+$/.test(value);
  }

  // Incase of deletion
  if (newValue.length < prevValue.length) {
    //When deleting the Colon , the second value is also deleted.
    if (newValue.length === 2) {
      return newValue.slice(0, -1);
    }
    return newValue;
  } else if (newValue.length > prevValue.length) {
    let input = newValue.slice(-1);

    // Only Allow Numeric Values on Input
    if (isNumeric(input)) {
      input = parseInt(input);

      switch (prevValue.length) {
        case 0:
          // Only 0,1,2 can be valid value for 1st index of HH:MM
          if ([0, 1, 2].includes(input)) {
            return input.toString();
          } else {
            //Autocomplete the value if the provided value cant be in first index of HH:MM, ex 6 become 06:
            return "0" + input.toString() + ":";
          }
          break;

        case 1:
          // Making sure that hours doesnt exceed 23
          if (parseInt(`${prevValue}${input}`) <= 23) {
            return prevValue + input.toString() + ":";
          }
          break;

        case 3:
          // Only 0-6 can be valid value for 3rd index of HH:MM
          if ([0, 1, 2, 3, 4, 5].includes(input)) {
            return prevValue + input.toString();
          }
          break;
        case 4:
          return newValue;
      }
    }
  }
  //If nothing matches then dont update with newvalue
  return prevValue;
};

function TimeInput({
  className,
  onChange: passedOnChange,
  value,
  placeholder,
  ...others
}) {
  //TODO: Is this approach alright?.

  const input = React.useRef(null);

  const handleChange = (e) => {
    const newValue = validateTimeInput(value, e.target.value);
    if (newValue !== value) {
      input.current.value = newValue;
      passedOnChange(e);
    }
  };

  return (
    <TimeInputContainer className={className}>
      <span>
        <i className="fas fa-clock"></i>
      </span>

      <input
        type="text"
        value={value}
        ref={input}
        onChange={handleChange}
        placeholder={placeholder}
        {...others}
      />
    </TimeInputContainer>
  );
}

export default TimeInput;
