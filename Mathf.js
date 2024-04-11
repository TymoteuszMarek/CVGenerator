export default class Mathf
{
    /**
     * Clamps value in min - max range
     * @param {number} min
     * @param {number} max 
     * @param {number} value min <= value <= max
     */
    static clamp(min, max, value){
        if (value < min) value = min;
        else if (value > max) value = max;

        return value;
    }
    /**
     * Clamps value in 0 - 1 range
     * @param {number} value 0 <= value <= 1
     */
    static clamp01(value){
        if (value < 0) value = min;
        else if (value > 1) value = max;

        return value;
    }
    /**
     * Linear interpolation between a and b
     * @param {number} a min value
     * @param {number} b max value
     * @param {number} t interpolation factor 0 - 1 range
     * @returns {number} clamped value
     */
    static lerp(a, b, t){
        let value = (a * (1.0 - t)) + (b * t);
        return this.clamp(a, b, value);
    }
}