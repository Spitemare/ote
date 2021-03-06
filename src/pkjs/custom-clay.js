module.exports = function(minified) {
    var Clay = this;

    Clay.on(Clay.EVENTS.AFTER_BUILD, function() {
        var connection = new WebSocket("wss://liveconfig.fletchto99.com/forward/" + Clay.meta.accountToken + "/" + Clay.meta.watchToken);
        connection.onopen = function() {
            Clay.getAllItems().map( function(item) {
                item.on('change', function() {
                    connection.send(JSON.stringify({id: this.messageKey, value: this.get()}));
                });
            });
        };
    });

};
