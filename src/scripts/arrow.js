/**
 * Created by Guoxing.han on 2016-5-04.
 */
//import $ from 'jquery';

const Arrow = {
    init: function () {
        console.log(Arrow,this);
        Arrow.addAll(123);
    },
    addAll(pieces) {
        console.log(pieces);
    }
    // addAll: p => {
    //     console.log(p);
    // }
};

Arrow.init();
