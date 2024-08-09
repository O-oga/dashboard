'use strict';

export const authData = {
    HAToken : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI2NWQ5NDExZjczYzM0YjZmYjVhOGY0MmIzZjYwNWQ5YiIsImlhdCI6MTcyMDk2MDExMiwiZXhwIjoyMDM2MzIwMTEyfQ.1cDJcsgalMYlVVP9ABWVXLrP6SBSq-g0X3IlcS8DhHM',
    // HAToken : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI4NjI2ZTQ4MDc4ZmQ0ZDgyOGRlNDc4NmI2YmIwYzFmMyIsImlhdCI6MTcyMzIwNjAyMywiZXhwIjoyMDM4NTY2MDIzfQ.Wux_1y_qm36cOcZT4bQjWlronEKtEPbp4sGjZ4oH4H0',
    urlAllStates: 'https://homeassistant.kupimon.party/api/states',
    webSocket: 'wss://homeassistant.kupimon.party/api/websocket',
    DBTocken: '191f73e5a35e23dde45b9db8f4f5ca8823d2203c4a20a00976b45add15725e04'
}

export const urlMethods = {
    getAllData: {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authData.HAToken}`,
            'Content-Type': 'application/json',
        },
        responseType: 'json',
        body: null
    },
    post: {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${authData.HAToken}`,
            'Content-Type': 'application/json',
        },
        body: '{entity_id": "switch.socket_server}'}
}
