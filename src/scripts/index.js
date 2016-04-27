/**
 * Created by Guoxing.han on 2016-4-27.
 */
import $ from 'jquery';
const Home = {
    init: () => {
        console.log($);
        this.initDome();
    }
};
$.extend(Home, {
    initDome: () => {
        console.log(123)
    }
});

$(Home.init);