import { Stepper } from "@progress/kendo-react-layout";
import { trackChangesIcon, userIcon } from "@progress/kendo-svg-icons";

const MyStepper = ({ value }: { value: number }) => {
  const iconsWithLabel = [
    { svgIcon: userIcon },
    { svgIcon: trackChangesIcon },
  ];

  return (
    <>
      <Stepper value={value} items={iconsWithLabel} />
    </>
  )
}

export default MyStepper;