import axios from 'axios';

axios.defaults.withCredentials = true;
const isLocalServer = false;
const serverIP = isLocalServer ? 'http://127.0.0.1:3000' : 'https://shorteningurl-eh4konhfta-de.a.run.app';

export { isLocalServer, serverIP };
