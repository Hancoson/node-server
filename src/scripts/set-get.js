// Created by Guoxing.han on 2016-5-5.
import $ from 'jquery';
const Set = {
    num : 2,
    init: function () {
        this.label = 3;
        console.log(this.num)
    },
    get label() {
        return this.num;
    },
    set label(s) {
        this.num = s;
    }
};

$(()=>{
    Set.init();
})