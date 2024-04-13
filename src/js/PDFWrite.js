import jsPDF from "jspdf";
import Mathf from "./Mathf";
import Rect from "./Rect";
import FontData from "./FontData";

export default class PDFWrite
{
    /**@type {string} */
    static defaultFont = "Helvetica";
    /**@type {string} */
    static defaultFontColor = "black";
    /**@type {string} */
    static defaultFontStyle = "bold";
    /**@type {number} */
    static defaultFontMargin = 3;
    /**@type {number} */
    static defaultFontSize = 12;

    /**@type {jsPDF} */
    doc;

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
     * @param {FontData} fontData
     */
    Write(text, rect, fontData)
    {
        let textLines = this.doc.setFont(fontData.font, fontData.fontStyle).setFontSize(fontData.fontSize).splitTextToSize(text, rect.getWritingWidth());
        this.doc.setTextColor(fontData.fontColor);

        textLines.forEach(line => 
        {
            this.doc.text(line, rect.getWritingX(), rect.getWritingY() + (fontData.fontSize * 25.4 / 96));
            rect.linesHeight += fontData.fontSize * 0.25 + fontData.fontMargin;
        });
    }
    /**
     * Writes text into the document
     * @param {string} text 
     * @param {Rect} rect used for structuring the content of the document
     * @param {string} hType heading tag (/h1, /h2, ..., /h6)
     * @param {FontData} fontData
     */
    WriteH(text, rect, hType, fontData)
    {
        const hTypes = {
            "/h1": new FontData(48, fontData.fontColor, fontData.font, "bold", fontData.fontMargin),
            "/h2": new FontData(42, fontData.fontColor, fontData.font, "bold", fontData.fontMargin),
            "/h3": new FontData(34, fontData.fontColor, fontData.font, "bold", fontData.fontMargin),
            "/h4": new FontData(26, fontData.fontColor, fontData.font, "bold", fontData.fontMargin),
            "/h5": new FontData(18, fontData.fontColor, fontData.font, "bold", fontData.fontMargin),
            "/h6": new FontData(12, fontData.fontColor, fontData.font, "bold", fontData.fontMargin)
        };

        this.Write(text, rect, hTypes[hType]);
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