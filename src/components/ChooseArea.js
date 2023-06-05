import { useEffect, useState } from "react";
import { AreaList } from "./AreaList";
import config from "../../config";
import CircularProgress from "@mui/material/CircularProgress";

export function ChooseArea() {
  const apiUrl = config[process.env.NODE_ENV].apiUrl;
  // Creates variables, and sets default state for area
  const [areas, setAreas] = useState("");

  // fetches the different areas from api, and sets state of area to the fechted data
  useEffect(() => {
    fetch(`${apiUrl}/available-spots`)
      .then((res) => res.json())
      .then((data) => {
        setAreas(data);
      });
  }, []);

  return (
    <>
      <h2 className="mb-5 mt-16 text-center">Choose area</h2>

      {/* if areas is empty, then don't show anything, else show AreaList component.  */}

      {areas === "" ? (
        <div className="grid place-content-center ">
          <CircularProgress sx={{ color: "#F9F01F" }} />
        </div>
      ) : (
        <AreaList areas={areas} />
      )}
    </>
  );
}
