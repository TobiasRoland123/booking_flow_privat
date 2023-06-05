import { TicketAmountPicker } from "./TicketAmountPicker";

export default function ChooseAmount() {
  return (
    <>
      <div className="rounded-2 max-w-full md:mx-0">
        <div className="grid place-content-center bg-gradient-to-b from-color-opacity-20 to-color-opacity-10 p-8">
          <h2 className="serif m-0 text-center">Amount</h2>
          <TicketAmountPicker />
        </div>
      </div>
    </>
  );
}
