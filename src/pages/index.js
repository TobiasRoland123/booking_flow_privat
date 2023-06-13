import { useState, useContext, useEffect } from "react";
import { BookingInformation } from "./_app";
import ChooseAmount from "@/components/ChooseAmount";
import { ChooseArea } from "../components/ChooseArea";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import "material-symbols";
import Drawer from "@/components/PriceDrawer";
import config from "../../config";
import { TicketAmountPicker } from "@/components/TicketAmountPicker";

// imported for modal.......
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// ..........

export default function AreaAndAmount(props) {
  // States
  const apiUrl = config[process.env.NODE_ENV].apiUrl;
  /* creates state for our useContext "BookingInformation" that wraps around the hole app */
  const [bookingDetails, setBookingDetails] = useContext(BookingInformation);
  const [countdownTime, setCountdownTime] = useState(null);
  const router = useRouter();

  // state for modal
  const [open, setOpen] = useState(false);

  // creates functions to handle modal
  function handleOpen() {
    setOpen(true);
  }
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

  async function reserveTickets() {
    const payload = { area: bookingDetails.area, amount: bookingDetails.spotAmount };

    const response = await fetch(`${apiUrl}/reserve-spot`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const json = await response.json();
    console.log(json);
    updateBookingDetails(json.id);
    await startBookingTimer();

    router.push(`/ticket_type_and_add_on`);
  }
  async function startBookingTimer() {
    const updatedCountdownTime = countdownTime + new Date().getTime() + 300000;
    await setCountdownTime(updatedCountdownTime);
    setBookingDetails((prev) => ({
      ...prev,
      buyTimeout: updatedCountdownTime,
    }));
  }

  function updateBookingDetails(reservation_id) {
    setBookingDetails((prev) => ({
      ...prev,
      reservation_id,
    }));
  }

  return (
    <main>
      <h1 className="mx-4 mt-10 text-center"> Purchase ticket</h1>
      <p className="mx-auto my-10 max-w-2xl">
        With the mesmerizing <strong>Northern Lights</strong> as your backdrop, get ready to lose yourself to the beats of the
        loudest music that's sure to get your heart racing.
      </p>
      <div className="mx-auto max-w-3xl">
        {/* component, that lets user choose amount of tickets */}
        <ChooseAmount />

        {/* Component, that lets user choose area, based on amount of tickets */}
        <ChooseArea />
      </div>
      {/* button for testing, just logs bookingDetails */}

      <div className=" grid place-content-center">
        {/* Used to log the booking information to make sure the correct data is logged for the further flow */}
        <button
          className="m-5 cursor-not-allowed bg-color-white p-5"
          onClick={() => {
            console.log(`This is bookingDetails: `, bookingDetails);
          }}
        >
          Log bookingDetails
        </button>
      </div>

      <div className=" mb-16 mt-10 flex justify-center">
        {bookingDetails.ticketAmount === 0 || bookingDetails.area === "" ? (
          <Button
            className=" mb-10 h-10 cursor-not-allowed gap-5 place-self-center rounded-none border-2 border-solid border-color-gray bg-color-gray px-6 font-sans font-semibold text-color-black hover:bg-color-gray"
            onClick={handleOpen}
          >
            <span className="pt-1">Next step</span> <span className="material-symbols-outlined">arrow_forward</span>
          </Button>
        ) : (
          <Button
            className=" mb-10 h-10 gap-5 place-self-center rounded-none border-2 border-solid border-color-yellow px-6 font-sans font-semibold text-color-yellow hover:bg-color-yellow hover:text-color-black "
            onClick={reserveTickets}
          >
            <span className="pt-1">Next step</span> <span className="material-symbols-outlined">arrow_forward</span>
          </Button>
        )}
      </div>

      <div className={`fixed bottom-0 left-0 right-0 `}>
        <Drawer />
      </div>
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
            {bookingDetails.ticketAmount === 0 ? (
              <Typography
                className="font-sans"
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                You are trying to order 0 tickets!
              </Typography>
            ) : (
              <Typography
                className="font-sans"
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                You have not chosen an area!
              </Typography>
            )}

            {bookingDetails.ticketAmount === 0 ? (
              <Typography
                className="font-sans"
                id="transition-modal-description"
                sx={{
                  mt: 2,
                }}
              >
                In order for us to reserve your tickets we need you to pick how many tickets you need
              </Typography>
            ) : (
              <Typography
                className="font-sans"
                id="transition-modal-description"
                sx={{
                  mt: 2,
                }}
              >
                In order for us to reserve your tickets we need you to pick an area with enough space for your group
              </Typography>
            )}

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
    </main>
  );
}
