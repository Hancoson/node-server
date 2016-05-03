/**
 * Created by Guoxing.han on 2016-4-28.
 */
import $ from 'jquery';
const Arr = {
    init: () => {
        let arr = [1, 2, 3, 4, 5, 6];
        for (let val of arr) {
            console.log('init：' + val);
        }
    }
};

$(Arr.init);