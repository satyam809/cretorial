
import React from 'react';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Button } from 'react-bootstrap';


const GenericPdfDownloader = ({rootElementId , downloadFileName}:any) => {

    const downloadPdfDocument = () => {
        const input = document.getElementById(rootElementId)!;
        console.log(input);
        html2canvas(input, {
            onclone: function (clonedDoc) {
                clonedDoc.getElementById(rootElementId)!.style.display = 'block';
            }
            }).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                const imgProps= pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save(`${downloadFileName}.pdf`);
            })
    }
    return <Button className="ms-2"  variant="primary" onClick={downloadPdfDocument}>PDF</Button>

}

export default GenericPdfDownloader;