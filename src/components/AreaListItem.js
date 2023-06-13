import { BookingInformation } from "@/pages/_app";
import { useContext, useState, useEffect } from "react";

import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { Button } from "@mui/material";

export function AreaListItem(props) {
  // creates variables and sets defaultState

  // reasigns props.area to area for easy use later
  const area = props.area;
  // sets state of bookingDetails to our context(BookingInformation).
  const [bookingDetails, setBookingDetails] = useContext(BookingInformation);
  const initialArea = bookingDetails.area || "";

  // state for reserved spots
  const [spotAmount, setSpotAmount] = useState(2);

  // This function helps to indicate whether an area is available based on the amount of tickets you have chosen.
  // if the area is available then the text is white, else it's purple
  function areaAvailable() {
    const availableSpots = area.available;
    let colorClass = "text-color-red"; // default color is red
    if (availableSpots === 0) {
      colorClass = "text-color-red";
    } else if (availableSpots > 0 && availableSpots <= 49) {
      colorClass = "text-color-orange"; // set color to orange if available spots are between 1 and 49
    } else if (availableSpots >= 50 && availableSpots <= 100) {
      colorClass = "text-color-yellow"; // set color to yellow if available spots are between 50 and 100
    } else if (availableSpots > 100) {
      colorClass = "text-color-green"; // set color to green if available spots are more than 100
    }

    // return the color class based on the available spots and ticket selection
    if (bookingDetails.oneTentForEach === true) {
      return bookingDetails.ticketAmount <= availableSpots ? colorClass + " text-color-green" : "text-color-red";
    } else if (bookingDetails.oneTentForEach === false) {
      return (bookingDetails.ticketAmount < 3 && availableSpots > bookingDetails.ticketAmount) ||
        bookingDetails.ticketAmount / 3 <= availableSpots
        ? colorClass + " text-color-green"
        : "text-color-red";
    }
  }

  // const areaStatus = areaAvailable(area, bookingDetails);
  // const areaClass = areaStatus.class + (areaStatus.available ? "" : " text-color-gray");
  return (
    <>
      {/* Modal was here but has been moved to AreaList component */}
      <section
        className={`duration-500" flex h-32 w-full cursor-pointer flex-col self-center rounded-sm bg-color-black bg-gradient-to-b from-color-opacity-20 to-color-opacity-10 py-4 pl-2 pr-3 text-lg sm:w-auto ${
          area.available === 0 ? "bg-color-opacity-10" : ""
        } ${areaAvailable() === "text-color-red" ? "bg-color-opacity-10" : ""}
${area.area === bookingDetails.area ? "bg-gradient-to-b from-color-teal to-color-purple" : ""}
`}
        onClick={() => props.checkTicketAndArea(area)}
      >
        <div className="mr-0 flex justify-between duration-200">
          <h3>{area.area}</h3>
          <Radio
            checked={area.area === bookingDetails.area}
            value={area.area}
            name={area.area}
            sx={{
              m: 0,
              "& .MuiSvgIcon-root": {
                fontSize: 20,
                color: areaAvailable() === "text-color-red" ? "gray" : "yellow" && area.available === 0 ? "gray" : "yellow",

                "&.Mui-checked": {
                  color: "yellow",
                },
                "&.MuiTouchRipple-root": {
                  color: "yellow",
                },
              },
            }}
          />
        </div>
        <div className={`mt-auto  flex justify-between ${area.available === 0 ? "text-color-gray" : ""}`}>
          <p
            className={`areaAvailable()  self-center duration-200 ${
              areaAvailable() === "text-color-red" ? "text-color-gray" : ""
            } ${area.available === 0 ? "text-color-gray" : ""} `}
          >
            spots left
          </p>
          <div className="self-center font-sans">
            <span
              className={` ${areaAvailable()} pr-2.5 text-2xl  font-bold ${
                area.available === 0 || "text-color-red" ? "text-color-gray" : ""
              }`}
            >
              {area.available}
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

{
  /* <section
className={`duration-500" flex h-32 w-full cursor-pointer flex-col self-center rounded-sm bg-color-black bg-gradient-to-b from-color-opacity-20 to-color-opacity-10 py-4 pl-2 pr-3 text-lg sm:w-auto ${area.available === 0 ? "bg-color-opacity-10" : ""} ${areaAvailable() === "text-color-red" ? "bg-color-opacity-10" : ""}
${area.area === bookingDetails.area ? "bg-gradient-to-b from-color-teal to-color-purple" : ""}
`}
onClick={checkTicketAndArea}
>
<div className="mr-0 flex justify-between duration-200">
  <h3 className={` self-center text-lg duration-200 ${area.available === 0 ? "text-color-gray" : ""} ${areaAvailable() === "text-color-red" ? "text-color-gray" : ""}`}>{area.area}</h3>
  <RadioGroup
    className="self-center"
    aria-label="area"
    name="area"
    value={initialArea}
    onChange={updateBookingInformation}
  >
    <FormControlLabel
      value={area.area}
      control={
        <Radio
          className={`${area.available === 0 ? "color-gray" : ""} `}
          sx={{
            m: 0,
            "& .MuiSvgIcon-root": {
              fontSize: 20,
              color: areaAvailable() === "text-color-red" ? "gray" : "yellow" && area.available === 0 ? "gray" : "yellow",

              "&.Mui-checked": {
                color: "yellow",
              },
              "&.MuiTouchRipple-root": {
                color: "yellow",
              },
            },
          }}
          disabled={areaAvailable() === "text-color-red" || area.available === 0}
        />
      }
      disabled={areaAvailable() === "text-color-red" || area.available === 0}
    ></FormControlLabel>
  </RadioGroup>
</div>

<div className={`mt-auto  flex justify-between ${area.available === 0 ? "text-color-gray" : ""}`}>
  <p className={`areaAvailable()  self-center duration-200 ${areaAvailable() === "text-color-red" ? "text-color-gray" : ""} ${area.available === 0 ? "text-color-gray" : ""} `}>spots left</p>
  <div className="self-center font-sans">
    <span className={` ${areaAvailable()} pr-2.5 text-2xl  font-bold ${area.available === 0 || "text-color-red" ? "text-color-gray" : ""}`}>{area.available}</span>
  </div>
</div>
</section> */
}
