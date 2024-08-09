'use strict';

const { InfluxDB, Point } = require('@influxdata/influxdb-client');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;




const url = 'http://192.168.1.33:8086'
const token = '541yEymLYNXY6SAwxC6n5bbNnX-5Vq_mMkGrylpF1gYn19fo1LZ6vgyRwFMQwI49gpjhi_FRh1Pm6c_mW6tZBA=='
const org = `valerii`
const bucket = `HomeAssistant`

const client = new InfluxDB({url, token})

const set = () => {
    let writeClient = client.getWriteApi(org, bucket, 'ns')

    for (let i = 0; i < 5; i++) {
        let point = new Point('measurement1')
            .tag('tagname1', 'tagvalue1')
            .intField('field1', i)

        void setTimeout(() => {
            writeClient.writePoint(point)
        }, i * 1000) // separate points by 1 second

        void setTimeout(() => {
            writeClient.flush()
        }, 5000)
    }
}

const get = () => {
 //    let queryClient = client.getQueryApi(org)
 //    let fluxQuery = `from(bucket: "HomeAssistant")
 // |> range(start: -10m)
 // |> filter(fn: (r) => r._measurement == "measurement1")`
 //
 //    queryClient.queryRows(fluxQuery, {
 //        next: (row, tableMeta) => {
 //            const tableObject = tableMeta.toObject(row)
 //            console.log(tableObject)
 //        },
 //        error: (error) => {
 //            console.error('\nError', error)
 //        },
 //        complete: () => {
 //            console.log('\nSuccess')
 //        },
 //    })

    let queryClient = client.getQueryApi(org)
    let fluxQuery = `from(bucket: "HomeAssistant")
 |> range(start: -10m)
 |> filter(fn: (r) => r._measurement == "measurement1")
 |> mean()`

    queryClient.queryRows(fluxQuery, {
        next: (row, tableMeta) => {
            const tableObject = tableMeta.toObject(row)
            console.log(tableObject)
        },
        error: (error) => {
            console.error('\nError', error)
        },
        complete: () => {
            console.log('\nSuccess')
        },
    })
}

const mean = () => {

}

get();