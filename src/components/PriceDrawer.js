import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BookingInformation } from "@/pages/_app";
import { useContext, useState, useEffect } from "react";
export default function PriceDrawer() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookingDetails, setBookingDetails] = useContext(BookingInformation);
  const ticketPrice = bookingDetails.ticketType === "regular" ? 799 : 1299;
  const greenCampPrice = bookingDetails.greenCamp ? 249 : 0;
  const campSetUpPrice = bookingDetails.campSetUp ? 399 : 0;
  const twoPersonTentPrice = 299;
  const threePersonTentPrice = 399;
  const [foofestTents, setFoofestTents] = useState({ twoPersonTent: 0, threePersonTent: 0 });

  // console.log("foofest tents", foofestTents?.twoPersonTent);

  // useEffect that updates the total price everytime bookingDetail change
  useEffect(() => {
    updateTotalPrice();
  }, [bookingDetails]);

  // this function adds to totalPrice for each ticket
  function updateTotalPrice() {
    setTotalPrice(
      ticketPrice * bookingDetails.ticketAmount +
        greenCampPrice * bookingDetails.ticketAmount +
        campSetUpPrice +
        twoPersonTentPrice * (bookingDetails.foofestTents?.twoPersonTent || 0) + //chatGPT helped with this line
        twoPersonTentPrice * (bookingDetails.foofestTents?.threePersonTent || 0) //chatGPT helped with this line
    );
  }

  /* makes sure that bookingDetails is updated everytime either  "ticketAmount" or "oneTentForEach" changes */
  useEffect(() => {
    updateBookingDetails();
  }, [totalPrice]);

  /*This function updates bookingDetails, by setting state to the new values of "ticketAmount" and oneTentForEach*/
  function updateBookingDetails() {
    setBookingDetails((prev) => ({
      ...prev,
      totalPrice,
    }));
  }

  return (
    <div>
      <Accordion className=" bg-color-gray">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="rotate-180 fill-color-white" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="font-regular text-lg text-color-white">
            Total: <span className="font-bold">{bookingDetails.totalPrice} ,-</span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className=" font-light text-color-white">
            {`${bookingDetails.ticketAmount}x ${bookingDetails.ticketType} Tickets ${ticketPrice},-`}
            {/* lineBreak */}
            {greenCampPrice !== 0 ? <br></br> : ""}
            {greenCampPrice !== 0 ? `${bookingDetails.ticketAmount}x GreenCamp ${greenCampPrice},-` : ""}
            {/* lineBreak */}
            {campSetUpPrice !== 0 ? <br></br> : ""}
            {campSetUpPrice !== 0 ? `1x Camp set up ${campSetUpPrice},-` : ""}

            {/* lineBreak */}
            {bookingDetails.privateTents && bookingDetails.privateTents.twoPersonTentPrivat ? <br></br> : ""}
            {/* checks if both bookingDetails.foofestTens 
            and bookingDetails.foofestTents.twoPersonTent is defined.  */}
            {bookingDetails.privateTents && bookingDetails.privateTents.twoPersonTentPrivat
              ? `${bookingDetails.privateTents.twoPersonTentPrivat}x 2 person tent free,-`
              : ""}
            {/* lineBreak */}
            {bookingDetails.privateTents && bookingDetails.privateTents.threePersonTentPrivat ? <br></br> : ""}
            {/* checks if both bookingDetails.foofestTens 
            and bookingDetails.foofestTents.twoPersonTent is defined.  */}
            {bookingDetails.privateTents && bookingDetails.privateTents.threePersonTentPrivat
              ? `${bookingDetails.privateTents.threePersonTentPrivat}x 3 person tent free,-`
              : ""}

            {/* lineBreak */}
            {bookingDetails.foofestTents && bookingDetails.foofestTents.twoPersonTent ? <br></br> : ""}
            {/* checks if both bookingDetails.foofestTens 
            and bookingDetails.foofestTents.twoPersonTent is defined.  */}
            {bookingDetails.foofestTents && bookingDetails.foofestTents.twoPersonTent
              ? `${bookingDetails.foofestTents.twoPersonTent}x 2 person tent ${twoPersonTentPrice},-`
              : ""}
            {/* lineBreak */}
            {bookingDetails.foofestTents && bookingDetails.foofestTents.threePersonTent ? <br></br> : ""}
            {/* checks if both bookingDetails.foofestTens 
            and bookingDetails.foofestTents.twoPersonTent is defined.  */}
            {bookingDetails.foofestTents && bookingDetails.foofestTents.threePersonTent
              ? `${bookingDetails.foofestTents.threePersonTent}x 3 person tent ${threePersonTentPrice},-`
              : ""}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
