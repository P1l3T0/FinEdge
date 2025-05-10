import { useCallback, useRef } from "react";
import { exportPDF, exportSVG, exportImage } from "@progress/kendo-drawing";
import { saveAs } from "@progress/kendo-file-saver";
import { SankeyHandle } from "@progress/kendo-react-charts";

const useSankeyExport = () => {
  const sankey = useRef<SankeyHandle>(null);

  const onPDFExport = useCallback(() => {
    if (sankey.current) {
      exportPDF(sankey.current.exportVisual()).then((result) => saveAs(result, "sankey.pdf"));
    }
  }, []);

  const onSVGExport = useCallback(() => {
    if (sankey.current) {
      exportSVG(sankey.current.exportVisual()).then((result) => saveAs(result, "sankey.svg"));
    }
  }, []);

  const onImageExport = useCallback(() => {
    if (sankey.current) {
      exportImage(sankey.current.exportVisual()).then((result) => saveAs(result, "sankey.png"));
    }
  }, []);

  return { sankey, onPDFExport, onSVGExport, onImageExport };
};

export default useSankeyExport;