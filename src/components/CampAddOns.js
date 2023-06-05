import { useContext, useState, useEffect } from "react";
import { CampSetUp } from "./CampSetUp";
import { GreenCamp } from "./GreenCmap";

import { BookingInformation } from "@/pages/_app";
export function CampAddOns() {
  const [bookingDetails, setBookingDetails] = useContext(BookingInformation);

  return (
    <>
      <GreenCamp />
      <CampSetUp />
    </>
  );
}
