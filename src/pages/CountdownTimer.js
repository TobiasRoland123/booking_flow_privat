import { useState, useEffect, useContext } from "react";
import { BookingInformation } from "./_app";
import Router, { useRouter } from "next/router";
import { Modal } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

export default function CountdownTimer() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    router.push(`/`);
  };
  const [bookingDetails, setBookingDetails] = useContext(BookingInformation);
  const [timeRemaining, setTimeRemaining] = useState({
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      let currentTime = new Date().getTime();
      let distance = bookingDetails.buyTimeout - currentTime;
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval);
        setOpen(!open);
      } else {
        setTimeRemaining({ minutes, seconds });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-10 w-screen bg-color-yellow p-1 text-center">
      <Timeout
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />

      <p
        className="text-2xl text-color-black"
        key={timeRemaining}
      >
        We have reserved your tickets for:
        <span className="font-bold"> {timeRemaining.minutes}:</span>
        <span className="font-bold">
          {timeRemaining.seconds < 10 ? "0" + timeRemaining.seconds : timeRemaining.seconds}
        </span>
      </p>
    </div>
  );
}

function Timeout(props) {
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
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={props.open}>
        <Box sx={style}>
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
          >
            You ran out of time
          </Typography>
          <Typography
            id="transition-modal-description"
            sx={{
              mt: 2,
            }}
          >
            You took too long to finish your booking. Please start over.
          </Typography>
          <div className="mt-10 flex justify-center">
            <Button
              className=" mb-10 h-10 gap-5 place-self-center rounded-none border-2 border-solid border-color-yellow px-6 font-sans font-semibold text-color-yellow hover:bg-color-yellow hover:text-color-black "
              onClick={props.handleClose}
            >
              <span className="pt-1">Try again</span>
            </Button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}
