import { FloatingActionButton } from "@progress/kendo-react-buttons";
import { Popup } from "@progress/kendo-react-popup";
import { xIcon, sparklesIcon } from "@progress/kendo-svg-icons";
import { useRef, useState } from "react";
import CategoryAIPrompt from "./CategoryAIPrompt";

const CategoryFAB = () => {
  const anchorRef = useRef<any>(null);
  const [showAIPrompt, setShowAIPrompt] = useState<boolean>(false);

  const toggleAIPrompt = () => {
    setShowAIPrompt(!showAIPrompt);
  };

  return (
    <>
      <FloatingActionButton ref={anchorRef} positionMode="absolute" 
        onClick={toggleAIPrompt} svgIcon={showAIPrompt ? xIcon : sparklesIcon}
        alignOffset={{ x: 50, y: 50 }}/>
      <Popup anchor={anchorRef.current?.element} show={showAIPrompt} 
        popupAlign={{ vertical: "top", horizontal: "right" }}
        anchorAlign={{ vertical: "bottom", horizontal: "left" }}>
        <CategoryAIPrompt />
      </Popup>
    </>
  );
};

export default CategoryFAB;
