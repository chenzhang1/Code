//定义食物类
class Food {
    //定义一个属性表示食物所对应的元素
    /* element:HTMLElement; */
    element: HTMLElement;
    // Constructor function to initialize the class instance
    constructor() {
        // Get the HTML element with the id 'food'
        this.element = document.getElementById('food')!;
    }

    // Getter function to return the X coordinate (offsetLeft) of the 'food' element
    get X() {
        return this.element.offsetLeft;
    }

    // Getter function to return the Y coordinate (offsetTop) of the 'food' element
    get Y() {
        return this.element.offsetTop;
    }

    // Function to change the position of the 'food' element randomly
    change() {
        // Generate a random top position
        let top = Math.round(Math.random() * 29) * 10;
        // Generate a random left position
        let left = Math.round(Math.random() * 29) * 10;
        // Set the top and left positions of the 'food' element to the generated values
        this.element.style.top = top + 'px';
        this.element.style.left = left + 'px';
    }
}
export default Food;