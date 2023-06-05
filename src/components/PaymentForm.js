import React, { useState } from "react";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import { IMaskInput } from "react-imask";
export const ValidationTextFieldCardNum = styled(TextField)(({ inputValue }) => ({
  "& label.Mui-focused": {
    color: "#f9f9f9", //label focused
  },
  "& label": {
    color: "#f9f9f9", //label unfocused
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset ": {
      borderColor: "#F9F01F",
    },
    "& input": {
      color: "#f9f9f9", // Set the text color
    },

    "&:hover fieldset": {
      borderColor: "#F9F01F",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#F9F01F",
    },
    "& input:valid + fieldset": {
      borderColor: inputValue === 19 ? "green" : "F9F01F",
      borderWidth: 2,
    },
  },
}));

export const ValidationTextFieldCardHolderName = styled(TextField)({
  "& label.Mui-focused": {
    color: "#f9f9f9", //label focused
  },
  "& label": {
    color: "#f9f9f9", //label unfocused
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset ": {
      borderColor: "#F9F01F",
      color: "#F9F01F",
    },
    "& input": {
      color: "#f9f9f9", // Set the text color
    },
    "&:hover fieldset": {
      borderColor: "#F9F01F",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#F9F01F",
    },
    "& input:valid + fieldset": {
      borderColor: "green",
      borderWidth: 2,
    },
  },
});
export const ValidationTextFieldMonthYear = styled(TextField)(({ inputValue }) => ({
  "& label.Mui-focused": {
    color: "#f9f9f9", //label focused
  },
  "& label": {
    color: "#f9f9f9", //label unfocused
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset ": {
      borderColor: "#F9F01F",
    },
    "& input": {
      color: "#f9f9f9", // Set the text color
    },

    "&:hover fieldset": {
      borderColor: "#F9F01F",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#F9F01F",
    },
    "& input:valid + fieldset": {
      borderColor: inputValue === 5 ? "green" : "F9F01F",
      borderWidth: 2,
    },
  },
}));
export const ValidationTextFieldCvc = styled(TextField)(({ inputValue }) => ({
  "& label.Mui-focused": {
    color: "#f9f9f9", //label focused
  },
  "& label": {
    color: "#f9f9f9", //label unfocused
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset ": {
      borderColor: "#F9F01F",
    },
    "& input": {
      color: "#f9f9f9", // Set the text color
    },

    "&:hover fieldset": {
      borderColor: "#F9F01F",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#F9F01F",
    },
    "& input:valid + fieldset": {
      borderColor: "green",
      borderColor: inputValue === 3 ? "green" : "F9F01F",
      borderWidth: 2,
    },
  },
}));

export const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="0000-0000-0000-0000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

export const TextMaskmonthYearValue = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="00/00"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

export const TextMaskCvc = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

export function PaymentForm(props) {
  const [monthYearValue, setmonthYearValue] = useState({ monthYear: "" });
  const [cardNumberValue, setcardNumberValue] = useState({
    cardNumber: "",
  });
  const [cvcValue, setCvcValue] = useState({
    cvc: "",
  });

  const handleChangeCvc = (event) => {
    setCvcValue({
      ...cvcValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleChange = (event) => {
    setcardNumberValue({
      ...cardNumberValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangemonthYearValue = (event) => {
    setmonthYearValue({
      ...monthYearValue,
      [event.target.name]: event.target.value,
    });
  };

  const inputValue = cardNumberValue.cardNumber.length;
  const inputValuemonthYearValue = monthYearValue.monthYear.length;
  const inputValueCvc = cvcValue.cvc.length;

  return (
    <form
      className="mb-2"
      onSubmit={props.handleSubmit}
    >
      <ValidationTextFieldCardHolderName
        inputProps={{ inputMode: "text" }}
        fullWidth
        type="text"
        label="Card holder name"
        required
        variant="outlined"
        defaultValue=""
        id="validation-outlined-input"
        name="card-holder-name"
      />

      <ValidationTextFieldCardNum
        inputProps={{ inputMode: "decimal" }}
        className="mt-4"
        onChange={handleChange}
        id="formatted-text-mask-input"
        InputProps={{ inputComponent: TextMaskCustom }}
        fullWidth
        label="Card number"
        required
        variant="outlined"
        value={cardNumberValue.cardNumber}
        inputValue={inputValue}
        name="cardNumber"
      />
      <div className="flex gap-2">
        <ValidationTextFieldMonthYear
          inputProps={{ inputMode: "decimal" }}
          className="mt-4"
          onChange={handleChangemonthYearValue}
          id="formatted-text-mask-input"
          InputProps={{ inputComponent: TextMaskmonthYearValue }}
          fullWidth
          label="Month/Year"
          required
          variant="outlined"
          value={monthYearValue.monthYear}
          inputValue={inputValuemonthYearValue}
          name="monthYear"
        />
        <ValidationTextFieldCvc
          inputProps={{ inputMode: "decimal" }}
          className="mt-4"
          onChange={handleChangeCvc}
          id="formatted-text-mask-input"
          InputProps={{ inputComponent: TextMaskCvc }}
          fullWidth
          label="CVC"
          required
          variant="outlined"
          value={cvcValue.cvc}
          inputValue={inputValueCvc}
          name="cvc"
        />
      </div>

      {/* <ValidationTextField
              inputProps={{ inputMode: "text" }}
              fullWidth
              className="mt-4"
              label="cvc"
              required
              variant="outlined"
              defaultValue=""
              id="validation-outlined-input"
              name="cvc"
            /> */}

      {/* <Button onClick={() => console.log(props.bookingDetails)} className=" mb-10 h-10 gap-5 place-self-center rounded-none border-2 border-solid border-color-black px-6 font-sans font-semibold text-color-black hover:bg-color-black hover:text-color-yellow ">
                <span className="pt-1">log info</span>
              </Button> */}
    </form>
  );
}
