import { contextBridge, ipcRenderer } from 'electron';

const desktopManagerApi = {
  version: '1.0.0',
  features: {
    webviewTag: true,
    mas: Boolean(process.mas),
  },
  init() {
    console.log('on-init');
  },
  login(userInfo: string) {
    console.log('on-login', userInfo);
  },
  logout() {
    console.log('on-logout');
  },
  closeView() {
    console.log('on-close');
  },
  setLang(lang: string) {
    console.log('set-lang', { lang });
  },
  setTitle(title: string) {
    console.log('set-title', { title });
  },
  openFile(
    fileKey: string,
    title: string,
    config: { query: { [key: string]: string } }
  ) {
    console.log('open-file', { fileKey, title, config });
  },
  homePage_updateFileInfo(fileKey: string) {
    console.log('update-homepage-file', { fileKey });
  },
  initClientVersion(data: { version: string; time: string }) {
    console.log('update-client-version', data);
  },
  requestRemoteURL(url: string) {
    console.log('requestRemoteURL', url);
  },
  getSystemInfo() {
    console.log('view:get-system-info');
  },
};

contextBridge.exposeInMainWorld('desktopManagerApi', desktopManagerApi);

ipcRenderer.on(
  'postMessage',
  (_, message: { message: string; data?: unknown }) => {
    window.postMessage(message, '*');
  }
);
