/*-------------------------------------------*\
   ws.js

  Class constructor to handle our real time subscription
  functions and methods
\*-------------------------------------------*/

import tableDataInstance from '../Components/Table.js'

class WS {

    constructor() {
        this.socket = null
        this.currentSubscriptions = []
        this.socketList = []
        this.resultData = []
    }

    /**
     * CheckSocketConnection
     * 
     * Checks if a socket connection already exists
     * if not creates new
     * 
     * @param {string} endpoint 
     */
    async createSocketConnection(endpoint) {
        let checkSocket = WS.socket;
        if (checkSocket) {
            console.log("already connected")
            return;
        }
        WS.socket = new WebSocket(`ws://localhost:8080/${endpoint}`);


        // Handle any errors that occur.
        WS.socket.onerror = function(error) {
            console.log('WebSocket Error: ' + error);
        };

        // Show a connected message when the WebSocket is opened.
        WS.socket.onopen = function(event) {
            console.table(event)
            console.log("succesfully connected")
            return "succesfully connected";
        };

        WS.socket.onmessage = function(event) {

            var msg = JSON.parse(event.data);

            wsInstance.resultData.push(msg)
            tableDataInstance.addRow(msg)
        };

        // Show a disconnected message when the WebSocket is closed.
        WS.socket.onclose = function(event) {
            console.log('Disconnected from WebSocket.')
        };
    }

    /**
     * handles websocket subscriptions
     * @param{string} points - string of points, seperated by ,
     */
    handleSubscriptions = (points) => {
        wsInstance.resultData.splice(0, wsInstance.resultData.length)
        tableDataInstance.switchDataSource()
        //Unsubscribe to old points
        if (this.currentSubscriptions.length > 0) {

            this.currentSubscriptions.map(point => {
                WS.socket.send(`unsubscribe ${point}`)
                wsInstance.currentSubscriptions.pop();
            })
        }
        if (!points) {
            return console.log("no points sent")
        }
        const arrofPoints = points.split(",")
        //Subscribe to new points
        arrofPoints.map(point => {
            WS.socket.send(`subscribe ${point}`)
            wsInstance.currentSubscriptions.push(point)
            return point
        });


    }


    closeSocket = () => WS.socket.close();

}

const wsInstance = new WS();
Object.freeze(wsInstance);
export default wsInstance;