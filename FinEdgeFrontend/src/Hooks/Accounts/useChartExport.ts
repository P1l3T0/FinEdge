import { useRef } from "react";
import { exportPDF, exportSVG, exportImage } from "@progress/kendo-drawing";
import { saveAs } from "@progress/kendo-file-saver";
import { exportVisual } from "@progress/kendo-react-charts";

const useChartExport = () => {
  const chart = useRef(null);

  const onSVGExport = () => {
    const chartVisual = chart.current && exportVisual(chart.current);

    if (chartVisual) {
      exportSVG(chartVisual).then((dataURI) => saveAs(dataURI, "chart.svg"));
    }
  };

  const onPDFExport = () => {
    const chartVisual = chart.current && exportVisual(chart.current);

    if (chartVisual) {
      exportPDF(chartVisual).then((dataURI) => saveAs(dataURI, "chart.pdf"));
    }
  };

  const onImageExport = () => {
    const chartVisual = chart.current && exportVisual(chart.current);

    if (chartVisual) {
      exportImage(chartVisual).then((dataURI) => saveAs(dataURI, "chart.png"));
    }
  };

  return { chart, onPDFExport, onSVGExport, onImageExport };
};

export default useChartExport;
