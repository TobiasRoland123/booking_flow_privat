import { AreaListItem } from "./AreaListItem";

export function AreaList(props) {
  return (
    <>
      <div className="mx-3 md:mx-0 ">
        <section className="flex flex-col gap-2 sm:grid sm:grid-cols-2 ">
          {/* maps through area, and returns a component for each item.  */}
          {props.areas.map((area) => (
            <AreaListItem key={area.area} area={area} />
          ))}
        </section>
      </div>
    </>
  );
}
