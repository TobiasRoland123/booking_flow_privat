import { useState, useContext, useEffect } from "react";
import { BookingInformation } from "./_app";
import ChooseAmount from "@/components/ChooseAmount";
import { ChooseArea } from "../components/ChooseArea";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { TicketTypes } from "../components/TicketTypes";
import { CampAddOns } from "@/components/CampAddOns";
import "material-symbols";
import Drawer from "@/components/PriceDrawer";
import CountdownTimer from "./CountdownTimer";

export default function TicketTypeAndAddOn() {
  const [bookingDetails, setBookingDetails] = useContext(BookingInformation);
  const [twoPersonTentNum, setTwoPersonTentNum] = useState(0);

  const router = useRouter();
  function loginfo() {
    console.log(bookingDetails);
  }

  function nextPage() {
    router.push(bookingDetails.oneTentForEach ? `/contact_information` : `/tent_selection`);
  }

  useEffect(() => {
    updateTwoPersonTentNum();
  }, []);

  useEffect(() => {
    updateBookingDetails();
  }, [twoPersonTentNum]);

  function updateTwoPersonTentNum() {
    bookingDetails.oneTentForEach
      ? setTwoPersonTentNum(bookingDetails.ticketAmount)
      : setTwoPersonTentNum(0);
  }

  /*This function updates bookingDetails, by setting state to the new values of "ticketAmount" and oneTentForEach*/
  function updateBookingDetails() {
    setBookingDetails(prev => ({
      ...prev,
      foofestTents: { twoPersonTent: twoPersonTentNum, threePersonTent: 0 },
      privateTents: { twoPersonTentPrivat: 0, threePersonTentPrivat: 0 },
    }));
  }
  return (
    <>
      <CountdownTimer />

      <main className="m-auto max-w-4xl">
        <h2 className="mx-4 mt-48 text-center">
          {/* {" "}
          {bookingInformation.ticketAmount > 1 ? "Regular og VIP tickets" : "Regular or VIP ticket"} */}
          Choose ticket type
        </h2>

        <TicketTypes />
        <section className="mx-3 bg-gradient-to-b from-color-opacity-20 to-color-opacity-10 pb-5 pt-10">
          <h2 className="text-center">Camp Setup</h2>

          <CampAddOns></CampAddOns>

          {/* <Button onClick={loginfo}> logbookingINformation</Button> */}
        </section>
        <div className="m-10 mb-20 flex justify-center">
          <Button
            className=" mb-10 h-10 gap-5 place-self-center rounded-none border-2 border-solid border-color-yellow px-6 font-sans font-semibold text-color-yellow hover:bg-color-yellow hover:text-color-black "
            onClick={nextPage}
          >
            <span className="pt-1">Next step</span>{" "}
            <span className="material-symbols-outlined">arrow_forward</span>
          </Button>
        </div>
        <div className={`fixed bottom-0 left-0 right-0 `}>
          <Drawer />
        </div>
      </main>
    </>
  );
}
