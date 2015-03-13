angular.module('markdown', ['ngSanitize'])
    .provider('markdown', function () {
        var opts = {};
        return {
            config: function (newOpts) {
                opts = newOpts;
            },
            $get: function () {
                return new Showdown.converter(opts);
            }
        };
    })
    .filter('markdown', ['markdown', function (markdown) {
        return function (text) {
            if(text == null) text = '';
            var html = markdown.makeHtml(text);
            return html;
        };
    }]);
