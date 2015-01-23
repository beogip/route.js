'use strict';

define(['parsePath'], function(parsePath) {

    describe('just checking', function() {

        it('works for app', function() {
            var app = new App(el);
            app.render();

            expect(parsePath("/test/")).toEqual('require.js up and running');
        });

    });

});
