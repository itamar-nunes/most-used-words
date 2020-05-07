const { ipcMain } = require('electron')

// import { pathsToRows } from './pathsToRows.js'
const pathsToRows = require('./pathsToRows.js')

ipcMain.on('processSubtitles', (event, paths) => {

    pathsToRows(paths)
        .then(rows => console.log(rows))
        .then(() => {
            event.reply('processSubtitles', [
                { name: "i", amount: 1234 },
                { name: "you", amount: 900 },
                { name: "he", amount: 853 },
            ])
        })
})