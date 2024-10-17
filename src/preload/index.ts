import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: ipcRenderer.send,
    invoke: ipcRenderer.invoke,
    on: ipcRenderer.on
  }
})
