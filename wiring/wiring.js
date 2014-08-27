
"use strict";

module.exports = function(RED) {
	var wyliodrin = null;
	if (RED.device)
	{
		wyliodrin = require ('wyliodrin');
	}

    function digitalWrite(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
        	wyliodrin.digitalWrite (config.pin, parseInt (msg.payload));
            node.send(null);
        });
    }
    RED.nodes.registerType("digitalwrite",digitalWrite);

    function digitalRead(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        if (this.interval == "on_input")
        {
            this.inputs = 1;
        }
        else
        {
            this.inputs = 0;
        }
        this.on('input', function(msg) {
            node.send({payload: wyliodrin.digitalRead (config.pin)});
        });
    }
    RED.nodes.registerType("digitalread",digitalWrite);
}

