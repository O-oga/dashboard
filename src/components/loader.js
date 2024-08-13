'use strict';

export let connection;
let id = 1;
let date = new Date();
const pendingRequests = new Map();
export let url = ``;

const messages = {
    auth: {
        type: "auth",
        access_token: ''
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
        "type": "ping",
        // timestamp: null
    },
    getHistory: {
        type: "history/history_during_period",
        id: id,
        start_time: "2023-01-01T00:00:00Z",
        end_time: "2024-12-31T23:59:59Z",
        entity_ids: ["sensor.voltage", "sensor.current_ma"],
        minimal_response: false,
        significant_changes_only: false
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
    data.id = id++;

    // if (data.type === 'ping') {
    //     data.timestamp = Date.now();
    // }

    return new Promise((resolve, reject) => {
        pendingRequests.set(data.id, {resolve, reject});
        connection.send(JSON.stringify(data));
        console.log('Sent data:', data);
    });
}

export const pushAuthData = (link, token) => {
    let HAAuth = {};
    HAAuth.url = link;
    HAAuth.token = token;
    localStorage.setItem('HAAuth', JSON.stringify(HAAuth))
}

export const getAuthData = () => {
    return JSON.parse(localStorage.getItem('HAAuth'));
}

let handleMessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(`Received data: ${JSON.stringify(data)}`);

    if (data.type === "auth_required") {

        return;
    }

    if (data.id && pendingRequests.has(data.id)) {
        const {resolve, reject} = pendingRequests.get(data.id);
        pendingRequests.delete(data.id);
        if (data.type === 'pong') {
            resolve(data);
        } else if (data.success) {
            resolve(data);
        } else {
            reject(data);
        }
    } else if (data.type === 'event') {
        handleEvent(data.event);
    } else {
        // other
        console.log('Unexpected message:', data);
    }
}

function handleEvent(event) {
    if (event.event_type === 'state_changed') {
        console.log('State changed:', event.data);
        // add logic...
    }
}

let sendAuthMessage = (token) => {
    return new Promise((resolve, reject) => {
        const authHandler = (message) => {
            const data = JSON.parse(message.data);
            if (data.type === 'auth_ok') {
                connection.removeEventListener('message', authHandler);
                resolve();
            } else if (data.type === 'auth_invalid') {
                connection.removeEventListener('message', authHandler);
                reject(new Error('Authentication failed'));
            }
        };

        connection.addEventListener('message', authHandler);

        let newAuthMessage = {...messages.auth}
        newAuthMessage.access_token = token;

        connection.send(JSON.stringify(newAuthMessage));

        console.log('Sent auth message' + JSON.stringify(newAuthMessage));
    });
}

function setupHeartbeat() {
    setInterval(() => {
        sendToHA(messages.ping)
            .then(() => console.log('Ping successful'))
            .catch(error => console.error('Ping failed:', error));
    }, 10000);
}

let subscribeToEvents = () => {
    sendToHA(messages.subscribe_events)
        .then(() => console.log('Subscribed to events'))
        .catch(error => console.error('Failed to subscribe to events:', error));
}

export const createConnection = (url, token) => {
    return new Promise((resolve, reject) => {
        connection = new WebSocket(url);

        connection.onopen = () => {
            console.log('WebSocket connection established');

            sendAuthMessage(token)
                .then(() => {
                    console.log('Authentication successful');
                    setupHeartbeat();
                    subscribeToEvents();
                    resolve(connection);
                })
                .catch((error) => {
                    console.error('Authentication failed:', error);
                    connection.close();
                    reject(error);
                });
        };

        connection.onerror = (error) => {
            console.error(`WebSocket error: ${JSON.stringify(error)}`);
            reject(error);
        };

        connection.onclose = (event) => {
            console.log(`WebSocket connection closed: ${event.code}`);
            // Reconnect after 5 seconds
            let newAuthData = getAuthData();
            if (newAuthData) {
                setTimeout(() => createConnection(newAuthData.url, newAuthData.token).then(resolve).catch(reject), 5000);
            }
        };

        connection.onmessage = handleMessage;
    });
};


export const changeDeviceState = async (entity_id, state) => {

    let newMessage = {...messages.changeState}
    newMessage.service = state ? "turn_on" : "turn_off";
    newMessage.service_data = {entity_id: entity_id};

    try {
        const response = await sendToHA(newMessage);
        console.log('Device state changed successfully:', response);
        return response;
    } catch (error) {
        console.error('Failed to change device state:', error);
        throw error;
    }
}


// export const load = (link, options = {}) => {
//
//     const {
//         method = 'GET',
//         headers = {},
//         body = null,
//         responseType = 'json',
//         onSuccess,
//         onError
//     } = options;
//
//     fetch(link, {
//         method,
//         headers: {
//             'Content-Type': 'application/json',
//             ...headers
//         },
//         body: body ? JSON.stringify(body) : null
//     })
//         .then(response => {
//             if (!response.ok) throw new Error('Error not ok')
//             switch (responseType) {
//                 case 'json':
//                     return response.json();
//                 case 'text':
//                     return response.text();
//                 case 'blob':
//                     return response.blob();
//                 default:
//                     return response.json();
//             }
//         })
//         .then(data => {
//             if (onSuccess) {
//                 onSuccess(data);
//             }
//             return data;
//         })
//         .catch(error => {
//             console.error('Error loading data:', error);
//             if (onError) {
//                 onError(error);
//             }
//             throw error;
//         })
// }
//
// export const loadAllData = () => {
//
//     const save = (data) => {
//         localStorage.setItem('data', JSON.stringify(data));
//         console.log('Data saved to local storage');
//     };
//
//     load(authData.urlAllStates, {...urlMethods.getAllData, onSuccess: save});
// }