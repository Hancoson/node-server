/**
 * Created by Guoxing.han on 2016-5-03.
 */
import $ from 'jquery';
import {utils} from './lib/utils';
const Template = {
    x: 0,
    init: () => {
        Template.context = $('#test');
        Template.Param();
        utils.alert(123, 1, 3);
        Template.test();

    },
    Param: (x = 'a', y = 'b') => {
        Template.context.html(`Lions and ${x} and ${y}! Oh my!`);
    },
    test: (e)=>{
        $('#event').on('click',(event)=>{
            console.log(this,11334,event.currentTarget);
        });
    }
};
Template.init();

const obj = {
    birth: 1990,
    getAge: function () {
        let b = this.birth; // 1990
        let fn = () => new Date().getFullYear() - this.birth; // this指向obj对象
        return fn();
    }
};
obj.getAge(); // 26