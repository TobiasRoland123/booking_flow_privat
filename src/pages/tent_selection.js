import { useContext, useState, useEffect } from "react";
import { TentCounter } from "@/components/TentCounter";
import { BookingInformation } from "@/pages/_app";
import "material-symbols";
import Head from "next/head";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import { Button } from "@mui/material";
import Router, { useRouter } from "next/router";
import CountdownTimer from "./CountdownTimer";
import Drawer from "@/components/PriceDrawer";

export default function TentSelection() {
  const router = useRouter();
  // set default state

  const [twoPersonTentNum, setTwoPersonTentNum] = useState(0);
  const [threePersonTentNum, setThreePersonTentNum] = useState(0);
  const [twoPersonTentPrivatNum, setTwoPersonTentPrivatNum] = useState(0);
  const [threePersonTentPrivatNum, setThreePersonTentPrivatNum] = useState(0);
  const [bookingDetails, setBookingDetails] = useContext(BookingInformation);
  const [totalTentCount, setTotalTentCount] = useState(0);
  const [spotsLeft, setSpotsLeft] = useState(bookingDetails.spotAmount - totalTentCount);
  // state for modal
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    updateTotalTentCount();
    updateSpotsLeft();
  }, [bookingDetails, totalTentCount]);

  function updateTotalTentCount() {
    setTotalTentCount(
      twoPersonTentNum + threePersonTentNum + twoPersonTentPrivatNum + threePersonTentPrivatNum
    );
  }

  function updateSpotsLeft() {
    setSpotsLeft(bookingDetails.spotAmount - totalTentCount);
  }

  function addOrSubtractTent(action, size, type) {
    if (action && spotsLeft <= 0) {
      handleOpen();
    } else {
      if (type === "privat") {
        if (size === 2) {
          action
            ? setTwoPersonTentPrivatNum(old => old + 1)
            : setTwoPersonTentPrivatNum(old => old - 1);
        } else if (size === 3) {
          action
            ? setThreePersonTentPrivatNum(old => old + 1)
            : setThreePersonTentPrivatNum(old => old - 1);
        }
      } else if (type === "foofest") {
        if (size === 2) {
          action ? setTwoPersonTentNum(old => old + 1) : setTwoPersonTentNum(old => old - 1);
        } else if (size === 3) {
          action ? setThreePersonTentNum(old => old + 1) : setThreePersonTentNum(old => old - 1);
        }
      }
    }
  }

  useEffect(() => {
    updateBookingDetails();
  }, [twoPersonTentNum, threePersonTentNum, twoPersonTentPrivatNum, threePersonTentPrivatNum]);

  /*This function updates bookingDetails, by setting state to the new values of "ticketAmount" and oneTentForEach*/
  function updateBookingDetails() {
    setBookingDetails(prev => ({
      ...prev,

      foofestTents: { twoPersonTent: twoPersonTentNum, threePersonTent: threePersonTentNum },
      privateTents: {
        twoPersonTentPrivat: twoPersonTentPrivatNum,
        threePersonTentPrivat: threePersonTentPrivatNum,
      },
    }));
  }

  function nextPage() {
    router.push(bookingDetails.oneTentForEach ? `/contact_information` : `/contact_information`);
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

  return (
    <>
      <Head>
        <title> Foofest | Pick Tents</title>
      </Head>
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
              id="transition-modal-title"
              variant="h6"
              component="h2"
            >
              You ran out of spots
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{
                mt: 2,
              }}
            >
              You have ran out of tent spots, if you want to fit more peope then buy or bring bigger
              tents
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
      <CountdownTimer />
      <section>
        <h2 className="mt-48 text-center">Tent Setup</h2>

        <article className="mt-5 grid place-content-center">
          <p>
            You have{" "}
            <span
              className={spotsLeft <= 0 ? "font-bold text-color-red" : "font-bold text-color-white"}
            >
              {spotsLeft}
            </span>{" "}
            spots left to use
          </p>
          <p></p>
        </article>

        <div>
          {bookingDetails.campSetUp ? (
            ""
          ) : (
            <article className="mx-1 mb-12 mt-12 max-w-full rounded-sm bg-gradient-to-b from-color-opacity-20 to-color-opacity-10 px-8 pt-8 md:mx-auto md:max-w-2xl ">
              <h3 className="text-center">Bring your own tent</h3>
              <p className="mt-3 grid place-content-center opacity-75">
                How many tents do you bring yourself?
              </p>
              <div className="mt-6 flex flex-col  ">
                <TentCounter
                  size={2}
                  PersonInTentNum={twoPersonTentPrivatNum}
                  addOrSubtractTent={addOrSubtractTent}
                  type={"privat"}
                />
                <TentCounter
                  size={3}
                  PersonInTentNum={threePersonTentPrivatNum}
                  addOrSubtractTent={addOrSubtractTent}
                  type={"privat"}
                />
              </div>
            </article>
          )}

          <article className="mx-1 mt-8 max-w-full rounded-sm bg-gradient-to-b from-color-opacity-20 to-color-opacity-10 px-8 pt-8 md:mx-auto md:max-w-2xl">
            <h3 className="text-center">Buy tents from FooFest</h3>
            {/* <h3 className="mt-4 text-center text-base text-color-white">We'll set up your tents for you, so can enjoy the full festival experience without any hassle.</h3> */}
            <p className="mt-3 grid place-content-center opacity-75">
              How many tents do you want to buy?
            </p>
            <div className="mt-6 flex flex-col  ">
              <TentCounter
                size={2}
                PersonInTentNum={twoPersonTentNum}
                addOrSubtractTent={addOrSubtractTent}
                price={299}
                type={"foofest"}
              />
              <TentCounter
                size={3}
                PersonInTentNum={threePersonTentNum}
                addOrSubtractTent={addOrSubtractTent}
                price={399}
                type={"foofest"}
              />
            </div>
          </article>
        </div>
        <div className="mb-16 mt-10 flex justify-center">
          <Button
            className=" mb-10 h-10 gap-5 place-self-center rounded-none border-2 border-solid border-color-yellow px-6 font-sans font-semibold text-color-yellow hover:bg-color-yellow hover:text-color-black "
            onClick={nextPage}
          >
            <span className="pt-1">Next step</span>{" "}
            <span className="material-symbols-outlined">arrow_forward</span>
          </Button>
        </div>

        {/* --------- these buttons is for testing  -------------- */}
        {/* <button
          className="m-5 bg-color-white p-5"
          onClick={() => {
            console.log(`This is bookingDetails: `, bookingDetails);
          }}
        >
          Log bookingDetails
        </button> */}
        {/*
        <button
          className="m-5 bg-color-white p-5"
          onClick={() => {
            console.log(`This is bookingDetails: `, bookingDetails.tents);
          }}
        >
          Log tents
        </button>

        <button onClick={() => console.log(spotsLeft)}> se spotsleft</button> */}
      </section>
      <div className={`fixed bottom-0 left-0 right-0  `}>
        <Drawer />
      </div>
    </>
  );
}
