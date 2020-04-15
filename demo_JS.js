// Called after form input is processed
function aan() {
    // Generate a random client ID
    clientID = "clientID-" + parseInt(Math.random() * 100);

    // Fetch the hostname/IP address and port number from the form
    host = 192.168.137.2;
    port = 1883;

    // Initialize new Paho client connection
    client = new Paho.MQTT.Client(host, Number(port), clientID);
    
    var LED = new Gpio(18, 'out'); //use GPIO pin 4, and specify that it is output
    LED.writeSync(1); //set pin state to 1 (turn LED on)

    
}

// Called when the client connects
function uit() {
    // Generate a random client ID
    clientID = "clientID-" + parseInt(Math.random() * 100);

    // Fetch the hostname/IP address and port number from the form
    host = 192.168.137.2;
    port = 1883
    var LED = new Gpio(18, 'out'); //use GPIO pin 4, and specify that it is output
    LED.writeSync(0); //set pin state to 1 (turn LED on)
}

// Called when the client loses its connection
function onConnectionLost(responseObject) {
    document.getElementById("messages").innerHTML += '<span>ERROR: Connection lost</span><br/>';
    if (responseObject.errorCode !== 0) {
        document.getElementById("messages").innerHTML += '<span>ERROR: ' + +responseObject.errorMessage + '</span><br/>';
    }
}

// Called when a message arrives
function onMessageArrived(message) {
    console.log("onMessageArrived: " + message.payloadString);
    document.getElementById("messages").innerHTML += '<span>Topic: ' + message.destinationName + '  | ' + message.payloadString + '</span><br/>';
}

// Called when the disconnection button is pressed
function startDisconnect() {
    client.disconnect();
    document.getElementById("messages").innerHTML += '<span>Disconnected</span><br/>';
}
