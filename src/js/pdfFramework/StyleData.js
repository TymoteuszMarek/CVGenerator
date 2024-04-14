export default class StyleData
{
    /**@type {number} */
    topPadding = 0;
    /**@type {number} */
    leftPadding = 0;
    /**@type {number} */
    rightPadding = 0;
    /**@type {number} */
    downPadding = 0;
    /**@type {string} */
    backgroundColor = "white"
    /**
     * Syntax: {thicness(doc unit)} {color(hex / word)}
     * @type {string} 
    */
    border = "";
    /**@type {number} */
    borderRadius = 0;

    constructor(backgroundColor = "white", borderRadius = 0, border = "")
    {
        this.backgroundColor = backgroundColor;
        this.borderRadius = borderRadius;
        this.border = border;
    }

    /**
     * Sets padding in all four dimentions
     * @param {number} padding 
     */
    setPadding(padding){
        this.topPadding = padding;
        this.leftPadding = padding;
        this.rightPadding = padding;
        this.downPadding = padding;
    }
    /**
     * Sets padding in x axis
     * @param {number} padding 
     */
    setHorizontalPadding(padding){
        this.leftPadding = padding;
        this.rightPadding = padding;
    }
    /**
     * Sets padding in y axis
     * @param {number} padding 
     */
    setVericalPadding(padding){
        this.topPadding = padding;
        this.downPadding = padding;
    }

    /**
     * Creates new StyleData object getting rid of any references
     * @param {StyleData} styleData object to clone
     */
    static clone(styleData)
    {
        /**@type {StyleData} */
        let result = new StyleData();
        result.backgroundColor = styleData.backgroundColor;
        result.border = styleData.border;
        result.borderRadius = styleData.borderRadius;
        result.downPadding = styleData.downPadding;
        result.topPadding = styleData.topPadding;
        result.leftPadding = styleData.leftPadding;
        result.rightPadding = styleData.rightPadding;

        return result;
    }

    /**
     * Returns object created from border property string
     */
    getBorderObject(){
        let properties = this.border.split(" ");

        return {
            thicness: properties[0],
            color: properties[1]
        }
    }
}