/**
 * Created by Guoxing.han on 2016-5-9.
 */
import $ from 'jquery';
import './lib/class';
const Class = {
    init: ()=> {
        let p = new People("Tom");
        p.sayName();
    },
};
$(()=> {
    Class.init();
})