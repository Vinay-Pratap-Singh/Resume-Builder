import { useState } from "react";
import { jsPDF as JsPDF } from "jspdf";
import html2canvas from "html2canvas";

interface UsePdfDownloadResult {
  generatePDF: (content: HTMLElement) => void;
  pdfData: Blob | null;
  resetPdfData: () => void;
  isGenerating: boolean;
}

const usePdfDownload = (): UsePdfDownloadResult => {
  const [pdfData, setPdfData] = useState<Blob | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async (content: HTMLElement) => {
    setIsGenerating(true);
    // creating the pdf
    const pdf = new JsPDF("p", "mm", "a4");

    // passing jsx component to canvas for image
    const canvas = await html2canvas(content, {
      useCORS: true,
      allowTaint: true,
      logging: false,
      scrollX: 0,
      scrollY: 0,
      width: content.scrollWidth,
    });

    const imageData = canvas.toDataURL("image/png");
    const imageWidth = pdf.internal.pageSize.getWidth() - 20;
    const imageHeight = (canvas.height * imageWidth) / canvas.width;

    // for multiple page pdf
    let remainingHeight = imageHeight;
    while (remainingHeight > 0) {
      pdf.addImage(imageData, "PNG", 10, 10, imageWidth, imageHeight);
      remainingHeight -= imageHeight;

      if (remainingHeight > 0) {
        pdf.addPage();
      }
    }

    setPdfData(pdf.output("blob"));
    setIsGenerating(false);
  };

  // function to reset the pdf data
  const resetPdfData = () => {
    setPdfData(null);
  };

  return { generatePDF, pdfData, resetPdfData, isGenerating };
};

export default usePdfDownload;
