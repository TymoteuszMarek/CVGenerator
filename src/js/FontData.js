import PDFWrite from "./PDFWrite";

export default class FontData
{
    /**@type {number} */
    fontSize = PDFWrite.defaultFontSize;
    /**@type {string} */
    fontColor = PDFWrite.defaultFontColor;
    /**@type {string} */
    font = PDFWrite.defaultFont;
    /**@type {string} */
    fontStyle = PDFWrite.defaultFontStyle;
    /**@type {number} */
    fontMargin = PDFWrite.defaultFontMargin;

    constructor(fontSize = PDFWrite.defaultFontSize, fontColor = PDFWrite.defaultFontColor, font = PDFWrite.defaultFont, fontStyle = PDFWrite.defaultFontStyle, fontMargin = PDFWrite.defaultFontMargin)
    {
        this.fontSize = fontSize;
        this.fontColor = fontColor;
        this.font = font;
        this.fontStyle = fontStyle;
        this.fontMargin = fontMargin;
    }

    toString()
    {
        return `fontSize: ${this.fontSize}, fontColor: ${this.fontColor}, font: ${this.font}, fontStyle: ${this.fontStyle}, fontMargin: ${this.fontMargin}`;
    }
}