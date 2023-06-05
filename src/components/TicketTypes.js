import { BookingInformation } from "@/pages/_app";
import { useState, useContext, useEffect } from "react";
import { TicketType } from "./TicketType";

export function TicketTypes() {
  // sets default state
  const [bookingDetails, setBookingDetails] = useContext(BookingInformation);
  const [ticketType, setTicketType] = useState("regular");

  // This function is setting the ticket type, as well as making sure the right radio button is chosen
  function pickTicketType(type) {
    setTicketType(type);
  }

  // This function updates the bookingInformation, so that it  also contains the clicked area
  function updateBookingDetails() {
    setBookingDetails((prev) => ({
      ...prev,
      ticketType: ticketType,
    }));
  }

  // This function calls "updateBookingDetails" everytime ticketType is changed
  useEffect(() => {
    updateBookingDetails();
  }, [ticketType]);

  return (
    <>
      <section className="my-10 grid-cols-2 flex-col-reverse sm:grid 	">
        <TicketType // This component is one of the ticketTypes
          ticketType={"Regular"} // Name of TicketType
          typeAddOns={"No goodies added"} // ticket type add ons
          radioValue={"regular"} // type of ticket in lowercase
          selectedValue={ticketType} //value to check radio button
          pickTicketType={pickTicketType} // function to handle change in ticketType
        />
        <TicketType //Same as above
          ticketType={"VIP"}
          typeAddOns={"All the goodies added"}
          radioValue={"vip"}
          selectedValue={ticketType}
          pickTicketType={pickTicketType}
        />
      </section>
    </>
  );
}
