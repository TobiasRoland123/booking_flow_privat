import Radio from "@mui/material/Radio";
import { BookingInformation } from "@/pages/_app";
import { useContext } from "react";

export function TicketType(props) {
  const price = props.radioValue === "regular" ? 799 : 1299;
  const [bookingDetails, setBookingDetails] = useContext(BookingInformation);
  return (
    <>
      <article
        className={`bg-color-back w-42 m-2.5 flex cursor-pointer flex-col rounded-sm bg-gradient-to-b from-color-opacity-20 to-color-opacity-10 py-4 pl-2 pr-3 
        ${
          props.selectedValue === props.radioValue
            ? "bg-gradient-to-b from-color-teal to-color-purple"
            : ""
        }`}
        onClick={() =>
          props.pickTicketType(props.radioValue)
        } /* makes the card clickable and calls 
        "pickTicketType" from parent component */
      >
        <div className="mr-0 flex justify-between">
          {/* This is the heading of the card */}
          <h3 className={` text-2lg self-center duration-200 `}>{`${props.ticketType}`}</h3>

          <Radio
            checked={props.selectedValue === props.radioValue}
            value={props.radioValue}
            name="radio-buttons"
            sx={{
              //styling for radio button to make it yellow
              m: 0,
              "& .MuiSvgIcon-root": {
                color: "yellow",
                fontSize: 20,

                "& .Mui-checked": {
                  color: "yellow",
                },
                "&.MuiTouchRippe-root": {
                  color: "yellow",
                },
              },
            }}
          />
        </div>
        <div className="mt-2 flex flex-col justify-start">
          {/* This is the explainer text for the card */}
          <p className={`m-0 duration-200 `}>{`${props.ticketType} tickets includes:`}</p>
          {/* <p className={`duration-200 `}>Regular tickets includes:</p> */}
          {props.ticketType === "Regular" ? (
            <div className="flex flex-col">
              <ul className="h-80  pl-5">
                <li className="my-2 list-disc text-color-white">
                  <span className="font-bold">General Entry:</span>{" "}
                  <span className="font-light">
                    access to the festival grounds and can enjoy all the performances and
                    attractions.
                  </span>
                </li>
                <li className="mb-2 list-disc text-color-white">
                  <span className="font-bold">Standard Amenities:</span>{" "}
                  <span className="font-light">
                    Utilize the common facilities, such as regular restrooms, food and beverage
                    vendors
                  </span>
                </li>
                <li className=" mb-2 list-disc text-color-white">
                  <span className="font-bold">Main Stage:</span>{" "}
                  <span className="font-light">
                    Enjoy performances on the main stage, which is the focal point of the festival
                    and showcases the headline acts.in
                  </span>
                </li>
                <li className=" mb-2 list-disc text-color-white">
                  <span className="font-bold">Community Experience:</span>{" "}
                  <span className="font-light">
                    Immerse yourself in the vibrant festival atmosphere, socialize with fellow
                    attendees, and participate in the overall festival experience.
                  </span>
                </li>
                <li className=" mb-10 list-disc text-color-white">
                  <span className="font-bold">General Merchandise:</span>{" "}
                  <span className="font-light">
                    Have the opportunity to purchase festival merchandise and souvenirs available to
                    all attendees
                  </span>
                </li>
              </ul>
              <div className="mt-auto flex justify-between px-5 ">
                <p>Price</p>
                <div className="self-center font-sans">
                  <p className="font-bold">799,-</p>
                </div>
              </div>
            </div>
          ) : (
            <div className=" flex flex-col">
              <ul className="h-80 pl-5">
                <li className="my-2 list-disc text-color-white">
                  <span className="font-bold">Early Entry:</span>{" "}
                  <span className="font-light">
                    VIP ticket holders gains quicker access to the festival grounds.
                  </span>
                </li>
                <li className="mb-2 list-disc text-color-white">
                  <span className="font-bold">Power Banks:</span>{" "}
                  <span className="font-light">
                    Portable phone chargers that can be switched for new fully charged ones during
                    the whole festival.
                  </span>
                </li>
                <li className="mb-2 list-disc text-color-white">
                  <span className="font-bold">VIP Restrooms:</span>{" "}
                  <span className="font-light">
                    Separate, well-maintained restroom facilities exclusive to VIP attendees,
                    reducing wait times and offering a more comfortable and convenient experience.
                  </span>
                </li>
                <li className="mb-2 list-disc text-color-white">
                  <span className="font-bold">VIP Merchendaise:</span>{" "}
                  <span className="font-light">
                    Exclusive festival merchandise and limited edition items specifically for VIP
                    ticket holders to buy.
                  </span>
                </li>
                <li className="mb-10 list-disc text-color-white">
                  <span className="font-bold">VIP Lounge:</span>{" "}
                  <span className="font-light">
                    A dedicated lounge area with comfortable seating, premium food and beverage
                    options, and access to private bars or specialty cocktails.
                  </span>
                </li>
              </ul>
              <div className="mt-auto flex justify-between px-5">
                <p>Price</p>
                <div className="self-center font-sans">
                  <p className="font-bold">1299,-</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
