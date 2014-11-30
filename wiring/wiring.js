
"use strict";

module.exports = function(RED) {
	var wyliodrin = null;
	if (RED.device)
	{
		wyliodrin = require ('wyliodrin');
	}

    if (!RED.wyliodrin) RED.wyliodrin = {};

    if (!RED.wyliodrin.pinModes) RED.wyliodrin.pinModes = [];

    function digitalWrite(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
            if (RED.wyliodrin.pinModes[config.pin] !== wyliodrin.OUTPUT)
            {
                wyliodrin.pinMode (parseInt(config.pin), wyliodrin.OUTPUT);    
            }
        	wyliodrin.digitalWrite (parseInt(config.pin), parseInt (msg.payload));
            node.send(null);
        });
    }
    RED.nodes.registerType("digitalwrite",digitalWrite);

    function digitalRead(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        // if (this.interval == "on_input")
        // {
        //     this.inputs = 1;
        // }
        // else
        // {
        //     this.inputs = 0;
        // }
        this.on('input', function(msg) {
            node.send({payload: wyliodrin.digitalRead (parseInt(config.pin))});
        });
    }
    RED.nodes.registerType("digitalread",digitalRead);

    function analogWrite(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
            // if (RED.wyliodrin.pinModes[config.pin] !== wyliodrin.OUTPUT)
            // {
            //     wyliodrin.pinMode (parseInt(config.pin), wyliodrin.OUTPUT);    
            // }
            wyliodrin.analogWrite (parseInt(config.pin), parseInt (msg.payload));
            node.send(null);
        });
    }
    RED.nodes.registerType("analogwrite",analogWrite);

    function analogRead(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        // if (this.interval == "on_input")
        // {
        //     this.inputs = 1;
        // }
        // else
        // {
        //     this.inputs = 0;
        // }
        this.on('input', function(msg) {
            node.send({payload: wyliodrin.analogRead (parseInt(config.pin))});
        });
    }
    RED.nodes.registerType("analogread",analogRead);
}

