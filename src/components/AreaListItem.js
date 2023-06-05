import { BookingInformation } from "@/pages/_app";
import { useContext, useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
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
  // state for modal
  const [open, setOpen] = useState(false);

  // state for reserved spots
  const [spotAmount, setSpotAmount] = useState(0);

  // creates functions to handle modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /* This function checks if there is enough available spots for the chosen amount of tickets  */
  function checkTicketAndArea() {
    // checks if you want to have a tent spot for each ticket, or if you are willing to share tent.
    if (bookingDetails.oneTentForEach === true) {
      // Checks if there is enough spots available and sets spotAmount
      bookingDetails.ticketAmount <= area.available ? setSpotAmount(bookingDetails.ticketAmount) : handleOpen();
    } else if (bookingDetails.oneTentForEach === false) {
      // Checks if there is enough spots available and sets spotAmount to the highest number of spots available while keeping it from going over ticketAmount.
      if (bookingDetails.ticketAmount <= area.available) {
        setSpotAmount(bookingDetails.ticketAmount);
      } else if (bookingDetails.ticketAmount / 3 <= area.available) {
        setSpotAmount(area.available);
      } else {
        handleOpen();
      }
    }
  }

  // styling for modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#000",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    if (area.available > 0) {
      updateBookingInformation();
    }
  }, [spotAmount, bookingDetails.ticketAmount]);

  // This function updates the bookingInformation, so that it  also contains the clicked area and amount of spots to reserve
  function updateBookingInformation() {
    // console.log(`updateBookingInformation called`);
    setBookingDetails((prev) => ({
      ...prev,
      area: area.area,
      spotAmount: spotAmount,
    }));
  }

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
      return (bookingDetails.ticketAmount < 3 && availableSpots > bookingDetails.ticketAmount) || bookingDetails.ticketAmount / 3 <= availableSpots ? colorClass + " text-color-green" : "text-color-red";
    }
  }

  // const areaStatus = areaAvailable(area, bookingDetails);
  // const areaClass = areaStatus.class + (areaStatus.available ? "" : " text-color-gray");
  return (
    <>
      {/* modal from mui */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              className="font-sans"
              id="transition-modal-title"
              variant="h6"
              component="h2"
            >
              Not enough space on {area.area}
            </Typography>
            <Typography
              className="font-sans"
              id="transition-modal-description"
              sx={{
                mt: 2,
              }}
            >
              Choose another area or adjust the amount of tickets to match the available number of spots.
            </Typography>
            <div className="mt-10 flex justify-center">
              <Button
                className=" mb-10 h-10 gap-5 place-self-center rounded-none border-2 border-solid border-color-yellow px-6 font-sans font-semibold text-color-yellow hover:bg-color-yellow hover:text-color-black "
                onClick={handleClose}
              >
                <span className="pt-1">Close</span>
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>

      <section
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
      </section>
    </>
  );
}
