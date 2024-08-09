'use strict';
import {authData, urlMethods} from "../constants/auth";

export let connection;
let id = 1;

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + authData.HAToken,
}

const messages = {
    auth: {
        type: "auth",
        access_token: authData.HAToken
    },
    subscribe_events: {
        id: id,
        type: "subscribe_events",
        event_type: "state_changed"
    },
    subscribe_trigger: {
        id: id,
        type: "subscribe_trigger",
        trigger: {
            platform: "state",
            entity_id: ``,
            from: "off",
            to: "on"
        }
    },
    unsubscribe_events: {
        id: id,
        type: "unsubscribe_events",
        subscription: 18
    },
    ping: {
        "id": id,
        "type": "ping"
    },
    changeState: {
        id: id,
        type: "call_service",
        domain: "switch",
        service: "",
        service_data: {
            entity_id: ""
        }
    }

}

export let sendToHA = (data) => {
    data.id = id++
    connection.send(JSON.stringify(data));
    console.log(JSON.stringify(data));
}


export const createConnection = () => {
    connection = new WebSocket(authData.webSocket);

    connection.onopen = () => {
        connection.send(JSON.stringify(messages.auth));
        sendToHA(messages.subscribe_events);
        setInterval(() => {
            sendToHA(messages.ping)
        }, 10000);

        console.log(messages.auth);
        console.log('WebSocket connection established');
    };

    connection.onerror = (error) => {
        console.error(`WebSocket error: ${JSON.stringify(error)}`);
    };

    connection.onclose = (event) => {
        console.log(`WebSocket connection closed: ${event.code}`);
        // Reconnect after 5 seconds
        setTimeout(createConnection, 5000);
    };

    connection.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(`Received data: ${JSON.stringify(data)}`);
    };

    return connection;
}


export const changeDeviceState = (entity_id, state) => {

    let newMessage = {...messages.changeState}
    newMessage.service = state ? "turn_on" : "turn_off";
    newMessage.service_data = {entity_id: entity_id};

    sendToHA(newMessage)
    console.log('Device state changed' + JSON.stringify(newMessage));
}


export const load = (link, options = {}) => {

    const {
        method = 'GET',
        headers = {},
        body = null,
        responseType = 'json',
        onSuccess,
        onError
    } = options;

    fetch(link, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        body: body ? JSON.stringify(body) : null
    })
        .then(response => {
            if (!response.ok) throw new Error('Error not ok')
            switch (responseType) {
                case 'json':
                    return response.json();
                case 'text':
                    return response.text();
                case 'blob':
                    return response.blob();
                default:
                    return response.json();
            }
        })
        .then(data => {
            if (onSuccess) {
                onSuccess(data);
            }
            return data;
        })
        .catch(error => {
            console.error('Error loading data:', error);
            if (onError) {
                onError(error);
            }
            throw error;
        })
}

export const loadAllData = () => {

    const save = (data) => {
        localStorage.setItem('data', JSON.stringify(data));
        console.log('Data saved to local storage');
    };

    load(authData.urlAllStates, {...urlMethods.getAllData, onSuccess: save});
}