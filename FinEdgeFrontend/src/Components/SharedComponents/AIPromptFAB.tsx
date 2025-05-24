import { FloatingActionButton } from "@progress/kendo-react-buttons";
import { Popup } from "@progress/kendo-react-popup";
import { xIcon, sparklesIcon } from "@progress/kendo-svg-icons";
import { useRef, useState, ReactNode } from "react";

interface AIPromptFABProps {
  children: ReactNode;
}

const AIPromptFAB = ({ children }: AIPromptFABProps) => {
  const anchorRef = useRef<any>(null);
  const [showAIPrompt, setShowAIPrompt] = useState<boolean>(false);

  const toggleAIPrompt = () => setShowAIPrompt((prev) => !prev);

  return (
    <>
      <FloatingActionButton ref={anchorRef} positionMode="fixed" className="z-999" onClick={toggleAIPrompt}  
        svgIcon={showAIPrompt ? xIcon : sparklesIcon} alignOffset={{ x: 25, y: 25 }} />
      <Popup anchor={anchorRef.current?.element} show={showAIPrompt} 
        popupAlign={{ vertical: "bottom", horizontal: "right" }}
        anchorAlign={{ vertical: "top", horizontal: "left" }}>
        {children}
      </Popup>
    </>
  );
};

export default AIPromptFAB;