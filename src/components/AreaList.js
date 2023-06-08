import { useState, useEffect, useContext } from "react";
import { BookingInformation } from "@/pages/_app";
import { AreaListItem } from "./AreaListItem";

export function AreaList(props) {
  const [chosenArea, setChosenArea] = useState("");
  const [bookingDetails, setBookingDetails] = useContext(BookingInformation);
  const [spotAmount, setSpotAmount] = useState(0);
  // state for modal
  const [open, setOpen] = useState(false);

  // creates functions to handle modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /* This function checks if there is enough available spots for the chosen amount of tickets  */
  function checkTicketAndArea(clickedArea) {
    // checks if you want to have a tent spot for each ticket, or if you are willing to share tent.
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

  useEffect(() => {
    updateBookingInformation();
  }, [spotAmount, /* bookingDetails.ticketAmount,*/ chosenArea]);

  // This function updates the bookingInformation, so that it  also contains the clicked area and amount of spots to reserve
  function updateBookingInformation() {
    console.log(`updateBookingInformation called`);
    console.log(props.chosenArea);
    setBookingDetails((prev) => ({
      ...prev,
      area: chosenArea,
      spotAmount: spotAmount,
    }));
  }

  return (
    <>
      <div className="mx-3 md:mx-0 ">
        <section className="flex flex-col gap-2 sm:grid sm:grid-cols-2 ">
          {/* maps through area, and returns a component for each item.  */}
          {props.areas.map((area) => (
            <AreaListItem
              key={area.area}
              area={area}
              chosenArea={chosenArea}
              setChosenArea={setChosenArea}
              checkTicketAndArea={checkTicketAndArea}
              open={open}
              handleClose={handleClose}
            />
          ))}
        </section>
      </div>
    </>
  );
}
