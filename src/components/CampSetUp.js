import { Checkbox } from "@mui/material";
import { BookingInformation } from "@/pages/_app";
import { useState, useContext, useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Typography } from "@mui/material";
export function CampSetUp() {
  const [bookingDetails, setBookingDetails] = useContext(BookingInformation);

  const [isChecked, setIsChecked] = useState(false);

  function changeIsChecked() {
    isChecked ? setIsChecked(false) : setIsChecked(true);
  }

  function updateBookingDetails() {
    setBookingDetails((prev) => ({
      ...prev,
      campSetUp: isChecked,
    }));
  }

  useEffect(() => {
    updateBookingDetails();
  }, [isChecked]);

  return (
    <>
      <div className="m-10 flex justify-start">
        <FormGroup className="flex items-center">
          <FormControlLabel
            control={
              <Checkbox
                onChange={changeIsChecked}
                checked={isChecked}
                sx={{
                  "& .MuiSvgIcon-root": {
                    color: "yellow",
                    "&.Mui-checked": {
                      color: "yellow",
                    },
                    ".MuiTouchRippe-root": {
                      color: "yellow",
                    },
                    "&.MuiCheckbox-root": {
                      fontFamily: "var(--font-josefin)",
                    },
                  },
                }}
              />
            }
            label={
              <Typography style={{ fontFamily: "var(--font-josefin" }}>
                <strong> Want us to set up your camp?</strong> <br></br> 399,-
              </Typography>
            }
            className="flex items-center pt-5 font-sans text-color-white"
          />
        </FormGroup>
      </div>
    </>
  );
}
