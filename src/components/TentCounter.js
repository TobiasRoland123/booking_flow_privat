import { BookingInformation } from "@/pages/_app";
import Button from "@mui/material/Button";
import { useContext, useState, useEffect } from "react";

export function TentCounter(props) {
  return (
    <>
      <div className="my-4">
        <p className="m-0 text-center font-semibold underline underline-offset-4 ">
          {`${props.size} Person tent`} <span className="font-bold">{`${props.price !== 0 && props.price !== undefined ? props.price + ",-" : ""}`}</span>
        </p>

        <div className="flex items-center	 justify-center">
          {props.PersonInTentNum === 0 ? (
            <Button
              disabled={true}
              className="rounded-2 h-14 place-self-center border-2 border-solid  border-color-gray bg-color-gray font-sans text-5xl font-bold  text-color-blue focus:border-color-yellow md:text-3xl"
            >
              <span class="material-symbols-outlined">remove</span>
            </Button>
          ) : (
            <Button
              className="rounded-2 h-14 place-self-center border-2 border-solid border-color-yellow font-sans text-5xl font-bold text-color-blue focus:border-color-yellow  md:text-3xl "
              variant="contained"
              style={{ backgroundColor: "yellow" }}
              onClick={() => props.addOrSubtractTent(false, props.size, props.type)} /* this button subtracts one from ticketAmount */
            >
              <span class="material-symbols-outlined">remove</span>
            </Button>
          )}

          <p className="mx-16 my-8 text-5xl font-bold">{props.PersonInTentNum}</p>

          <Button
            className="rounded-2 h-14 place-self-center border-2 border-solid border-color-yellow font-sans text-5xl font-bold text-color-blue focus:border-color-yellow  md:text-3xl "
            variant="text"
            sx={{
              backgroundColor: "yellow",
              "&:focus": {
                color: "yellow",
                backgroundColor: "gray",
              },
            }}
            onClick={() => props.addOrSubtractTent(true, props.size, props.type)} /* this button adds one to ticketAmount */
          >
            <span class="material-symbols-outlined">add</span>
          </Button>
        </div>
      </div>
    </>
  );
}
