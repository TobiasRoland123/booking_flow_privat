import { useState, useEffect, useContext } from "react";
import { BookingInformation } from "@/pages/_app";
import { AreaListItem } from "./AreaListItem";
import { Button } from "@mui/material";

// imported for modal.......
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// ..........

export function AreaList(props) {
  const [chosenArea, setChosenArea] = useState("");
  const [bookingDetails, setBookingDetails] = useContext(BookingInformation);
  const [spotAmount, setSpotAmount] = useState(0);
  // const [bookedArea, setBookedArea] = useState("");

  // This variable is only used, to make spotAmount update when ticketAmount is changed
  const [lastChosenArea, setLastChosenArea] = useState("");
  // state for modal
  const [open, setOpen] = useState(false);

  // creates functions to handle modal
  function handleOpen() {
    setOpen(true);
    setChosenArea("");
  }
  // const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  // styling for modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "#000",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  /* This function checks if there is enough available spots for the chosen amount of tickets  */
  function checkTicketAndArea(clickedArea) {
    console.log("clickedArea", clickedArea);
    setLastChosenArea(clickedArea); // checks if you want to have a tent spot for each ticket, or if you are willing to share tent.
    if (bookingDetails.oneTentForEach === true) {
      // Checks if there is enough spots available and sets spotAmount
      bookingDetails.ticketAmount <= clickedArea.available
        ? setSpotAndArea(clickedArea.area, bookingDetails.ticketAmount)
        : handleOpen();
    } else if (bookingDetails.oneTentForEach === false) {
      // Checks if there is enough spots available and sets spotAmount to the highest number of spots available while keeping it from going over ticketAmount.
      if (bookingDetails.ticketAmount <= clickedArea.available) {
        // setSpotAmount(bookingDetails.ticketAmount);
        setSpotAndArea(clickedArea.area, bookingDetails.ticketAmount);
      } else if (bookingDetails.ticketAmount / 3 <= clickedArea.available) {
        // setSpotAmount(area.available);
        setSpotAndArea(clickedArea.area, clickedArea.available);
      } else {
        handleOpen();
      }
    }
  }

  function setSpotAndArea(area, spots) {
    setChosenArea(area);
    setSpotAmount(spots);
  }

  //This useEffect is used to update spotAmount every time that ticketAmount is updated.
  useEffect(() => {
    /*By default lasChosenArea is ""(empty string), so if it has been set to something else, then
    call checkTicketAndArea with lasChosenArea as an argument*/
    lastChosenArea !== "" ? checkTicketAndArea(lastChosenArea) : console.log("lastChosenArea, has not been set");
  }, [bookingDetails.ticketAmount, bookingDetails.oneTentForEach]);

  useEffect(() => {
    updateBookingInformation();
  }, [spotAmount, /* bookingDetails.ticketAmount,*/ chosenArea]);

  // This function updates the bookingInformation, so that it  also contains the clicked area and amount of spots to reserve
  function updateBookingInformation() {
    console.log(`updateBookingInformation called`);

    setBookingDetails((prev) => ({
      ...prev,
      area: chosenArea,
      spotAmount: spotAmount,
    }));
  }

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
              Not enough space on {lastChosenArea.area}
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
      <div className="mx-3 md:mx-0 ">
        <section className="flex flex-col gap-2 sm:grid sm:grid-cols-2 ">
          {/* maps through area, and returns a component for each item.  */}
          {props.areas.map((area) => (
            <AreaListItem
              key={area.area}
              area={area}
              // chosenArea={chosenArea}
              // setChosenArea={setChosenArea}
              checkTicketAndArea={checkTicketAndArea}
              open={open}
              handleClose={handleClose}
            />
          ))}
        </section>
      </div>
      {/* <Button onClick={() => console.log("lastChosenArea", lastChosenArea)}>log lastChosenArea</Button> */}
    </>
  );
}
