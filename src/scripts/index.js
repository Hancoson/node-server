/**
 * Created by Guoxing.han on 2016-4-27.
 */
import $ from 'jquery';
const Home = {
    init: () => {
        console.log($);
        let arr = [1, 2, 3, 4, 5, 6];
        for (let val of arr) {
            console.log(val);
        }
    }
};

$(Home.init);