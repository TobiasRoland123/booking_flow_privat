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

export default function AreaAndAmount(props) {
  // States
  const apiUrl = config[process.env.NODE_ENV].apiUrl;
  /* creates state for our useContext "BookingInformation" that wraps around the hole app */
  const [bookingDetails, setBookingDetails] = useContext(BookingInformation);
  const [countdownTime, setCountdownTime] = useState(null);
  const router = useRouter();
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
    setBookingDetails(prev => ({
      ...prev,
      buyTimeout: updatedCountdownTime,
    }));
  }

  function updateBookingDetails(reservation_id) {
    setBookingDetails(prev => ({
      ...prev,
      reservation_id,
    }));
  }

  return (
    <main>
      <h1 className="mx-4 mt-10 text-center"> Purchase ticket</h1>
      <p className="mx-auto my-10 max-w-2xl">
        With the mesmerizing <strong>Northern Lights</strong> as your backdrop, get ready to lose
        yourself to the beats of the loudest music that's sure to get your heart racing.
      </p>
      <div className="mx-auto max-w-3xl">
        {/* component, that lets user choose amount of tickets */}
        <ChooseAmount />

        {/* Component, that lets user choose area, based on amount of tickets */}
        <ChooseArea />
      </div>
      {/* button for testing, just logs bookingDetails */}

      {/* <div className=" grid place-content-center"> */}
      {/* Used to log the booking information to make sure the correct data is logged for the further flow */}
      {/* <button
          className="m-5 bg-color-white p-5"
          onClick={() => {
            console.log(`This is bookingDetails: `, bookingDetails);
          }}
        >
          Log bookingDetails
        </button>
      </div> */}

      <div className=" mb-16 mt-10 flex justify-center">
        {bookingDetails.ticketAmount === 0 ? (
          <Button
            disabled={true}
            className=" mb-10 h-10 gap-5 place-self-center rounded-none border-2 border-solid border-color-gray bg-color-gray px-6 font-sans font-semibold text-color-black hover:bg-color-yellow hover:text-color-black "
            onClick={reserveTickets}
          >
            <span className="pt-1">Next step</span>{" "}
            <span className="material-symbols-outlined">arrow_forward</span>
          </Button>
        ) : (
          <Button
            className=" mb-10 h-10 gap-5 place-self-center rounded-none border-2 border-solid border-color-yellow px-6 font-sans font-semibold text-color-yellow hover:bg-color-yellow hover:text-color-black "
            onClick={reserveTickets}
          >
            <span className="pt-1">Next step</span>{" "}
            <span className="material-symbols-outlined">arrow_forward</span>
          </Button>
        )}
      </div>

      <div className={`fixed bottom-0 left-0 right-0 `}>
        <Drawer />
      </div>
    </main>
  );
}
