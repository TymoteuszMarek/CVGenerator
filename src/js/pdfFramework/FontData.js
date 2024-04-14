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

    /**
     * Creates new StyleData object getting rid of any references
     * @param {FontData} fontData 
     */
    static clone(fontData){
        /**@type {FontData} */
        let result = new FontData();
        result.fontSize = fontData.fontSize;
        result.fontColor = fontData.fontColor;
        result.font = fontData.font;
        result.fontStyle = fontData.fontStyle;
        result.fontMargin = fontData.fontMargin;

        return result;
    }

    toString()
    {
        return `fontSize: ${this.fontSize}, fontColor: ${this.fontColor}, font: ${this.font}, fontStyle: ${this.fontStyle}, fontMargin: ${this.fontMargin}`;
    }
}