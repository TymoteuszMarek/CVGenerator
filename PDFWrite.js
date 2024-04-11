import jsPDF from "jspdf";
import Mathf from "./Mathf";
import Rect from "./Rect";

export default class PDFWrite
{
    /**@type {jsPDF} */
    doc;
    /**@type {string} */
    font = "Helvetica";
    /**@type {number} */
    fontSize = 12;
    /**@type {string} */
    fontStyle = "";
    /**@type {string} */
    textColor = "black";
    /**@type {number} */
    fontMargin = 3;

    /**
     * @param {jsPDF} document 
     */
    constructor(document){
        this.doc = document;
    }

    /**
     * Writes text into the document
     * @param {string} text
     * @param {Rect} rect used for structuring the content of the document
     */
    Write(text, rect){
        let textLines = this.doc.setFont(this.font, this.fontStyle).setFontSize(this.fontSize).splitTextToSize(text, rect.getWritingWidth());
        this.doc.setTextColor(this.textColor);
        console.log(rect);
        textLines.forEach(line => {
            this.doc.text(line, rect.getWritingX(), 20);
            console.log(rect.getWritingY());
            rect.linesHeight += this.fontSize * 0.25 + this.fontMargin;
        });
    }
    /**
     * Writes text into the document
     * @param {string} text 
     * @param {Rect} rect used for structuring the content of the document 
     */
    WriteH1(text, rect){
        const fontSize = 48;

        this.fontSize = fontSize;
        this.fontStyle = "bold";
        this.Write(text, rect)
    }
    /**
     * Writes text into the document
     * @param {string} text 
     * @param {Rect} rect used for structuring the content of the document 
     */
    WriteH2(text, rect){
        const fontSize = 42;

        this.fontSize = fontSize;
        this.fontStyle = "bold";
        this.Write(text, rect)
    }
    /**
     * Writes text into the document
     * @param {string} text 
     * @param {Rect} rect used for structuring the content of the document 
     */
    WriteH3(text, rect){
        const fontSize = 34;

        this.fontSize = fontSize;
        this.fontStyle = "bold";
        this.Write(text, rect)
    }
    /**
     * Writes text into the document
     * @param {string} text 
     * @param {Rect} rect used for structuring the content of the document 
     */
    WriteH4(text, rect){
        const fontSize = 26;

        this.fontSize = fontSize;
        this.fontStyle = "bold";
        this.Write(text, rect)
    }
    /**
     * Writes text into the document
     * @param {string} text 
     * @param {Rect} rect used for structuring the content of the document 
     */
    WriteH5(text, rect){
        const fontSize = 18;

        this.fontSize = fontSize;
        this.fontStyle = "bold";
        this.Write(text, rect)
    }
    /**
     * Writes text into the document
     * @param {string} text 
     * @param {Rect} rect used for structuring the content of the document 
     */
    WriteH6(text, rect){
        const fontSize = 12;

        this.fontSize = fontSize;
        this.fontStyle = "bold";
        this.Write(text, rect)
    }

    /**
     * Draws filled rect
     * @param {Rect} rect 
     * @param {string} color 
     */
    drawRect(rect, color)
    {
        this.doc.setFillColor(color);
        this.doc.rect(rect.getX(), rect.getY(), rect.getWidth(), rect.getHeight(), "f");
    }
    /**
     * Draws filled rect
     * @param {Rect} rect 
     * @param {string} color 
     */
    drawRectOutline(rect, color)
    {
        this.doc.setDrawColor(color);
        this.doc.rect(rect.getX(), rect.getY(), rect.getWidth(), rect.getHeight());
    }
}