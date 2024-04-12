import jsPDF from "jspdf";
import Mathf from "./Mathf";
import Rect from "./Rect";

export default class PDFWrite
{
    /**@type {string} */
    static defaultFont = "Helvetica";
    /**@type {string} */
    static defaultFontColor = "black";
    /**@type {string} */
    static defaultFontStyle = "black";
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
     * @param {number} fontSize
     * @param {string} fontColor
     * @param {string} font
     * @param {string} fontStyle
     * @param {number} fontMargin
     */
    Write(text, rect, fontSize = PDFWrite.defaultFontSize, fontColor = PDFWrite.defaultFontColor, font = PDFWrite.defaultFont, fontStyle = PDFWrite.defaultFontStyle, fontMargin = PDFWrite.defaultFontMargin){
        let textLines = this.doc.setFont(font, fontStyle).setFontSize(fontSize).splitTextToSize(text, rect.getWritingWidth());
        this.doc.setTextColor(fontColor);

        textLines.forEach(line => {
            console.log(line);
            console.log(rect.getWritingX());
            console.log(rect.getWritingY());// + (fontSize * 25.4 / 96));
            this.doc.text(line, rect.getWritingX(), rect.getWritingY());// + (fontSize * 25.4 / 96));
            rect.linesHeight += fontSize * 0.25 + fontMargin;
        });
    }
    /**
     * Writes text into the document
     * @param {string} text 
     * @param {Rect} rect used for structuring the content of the document 
     * @param {string} fontColor
     * @param {string} font
     * @param {number} fontMargin
     */
    WriteH1(text, rect, fontColor = PDFWrite.defaultFontColor, font = PDFWrite.defaultFont, fontMargin = PDFWrite.defaultFontMargin){
        const fontSize = 48;

        this.Write(text, rect, fontSize, fontColor, font, "bold", fontMargin);
    }
    /**
     * Writes text into the document
     * @param {string} text 
     * @param {Rect} rect used for structuring the content of the document 
     * @param {string} fontColor
     * @param {string} font
     * @param {number} fontMargin
     */
    WriteH2(text, rect, fontColor = PDFWrite.defaultFontColor, font = PDFWrite.defaultFont, fontMargin = PDFWrite.defaultFontMargin){
        const fontSize = 42;

        this.Write(text, rect, fontSize, fontColor, font, "bold", fontMargin);
    }
    /**
     * Writes text into the document
     * @param {string} text 
     * @param {Rect} rect used for structuring the content of the document 
     * @param {string} fontColor
     * @param {string} font
     * @param {number} fontMargin
     */
    WriteH3(text, rect, fontColor = PDFWrite.defaultFontColor, font = PDFWrite.defaultFont, fontMargin = PDFWrite.defaultFontMargin){
        const fontSize = 34;

        this.Write(text, rect, fontSize, fontColor, font, "bold", fontMargin);
    }
    /**
     * Writes text into the document
     * @param {string} text 
     * @param {Rect} rect used for structuring the content of the document 
     * @param {string} fontColor
     * @param {string} font
     * @param {number} fontMargin
     */
    WriteH4(text, rect, fontColor = PDFWrite.defaultFontColor, font = PDFWrite.defaultFont, fontMargin = PDFWrite.defaultFontMargin){
        const fontSize = 26;

        this.Write(text, rect, fontSize, fontColor, font, "bold", fontMargin);
    }
    /**
     * Writes text into the document
     * @param {string} text 
     * @param {Rect} rect used for structuring the content of the document 
     * @param {string} fontColor
     * @param {string} font
     * @param {number} fontMargin
     */
    WriteH5(text, rect, fontColor = PDFWrite.defaultFontColor, font = PDFWrite.defaultFont, fontMargin = PDFWrite.defaultFontMargin){
        const fontSize = 18;

        this.Write(text, rect, fontSize, fontColor, font, "bold", fontMargin);
    }
    /**
     * Writes text into the document
     * @param {string} text 
     * @param {Rect} rect used for structuring the content of the document 
     * @param {string} fontColor
     * @param {string} font
     * @param {number} fontMargin
     */
    WriteH6(text, rect, fontColor = PDFWrite.defaultFontColor, font = PDFWrite.defaultFont, fontMargin = PDFWrite.defaultFontMargin){
        const fontSize = 12;

        this.Write(text, rect, fontSize, fontColor, font, "bold", fontMargin);
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