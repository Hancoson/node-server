/**
 * Created by Guoxing.han on 2016-5-03.
 */
import $ from 'jquery';
const Template = {
    init: () => {
        let context = $('#test'),
            x=1,
            y=2;

        context.html(`Ceci n'est pas une chaine ${x}.`);

    }
};
$(Template.init);