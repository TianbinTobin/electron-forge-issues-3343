import { ipcRenderer } from 'electron';

const appManagerAPI = {
  getServerUrl() {
    console.log('window:get-server-url');
  },
  getSystemInfo() {
    console.log('window:get-system-info');
  },
  getVersionInfo() {
    console.log('window:get-version-info');
  },
  getSystemLang() {
    console.log('window:get-system-lang');
  },
  platform: {
    isWin: process.platform === 'win32',
    isMac: process.platform === 'darwin',
    isLinux: process.platform === 'linux',
  },
};

// contextBridge.exposeInMainWorld('appManagerAPI', appManagerAPI);

appManagerAPI.getServerUrl();

ipcRenderer.on(
  'postMessage',
  (_event, message: { message: string; data?: unknown }) => {
    window.postMessage(message, '*');
  }
);
