/**
 * Created by Guoxing.han on 2016-5-9.
 */

const People = class {
    constructor(name) { //构造函数
        this.name = name;
    }

    sayName() {
        console.log(this.name);
    }
}
export {People};