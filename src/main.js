import './main.css';
import {createApp} from "vue";
import App from './App.vue';

// insert a script that will try to attach to running Electron Vue Devtools. 
// see docs/vue-devtools.md for more information.
const devTools = document.createElement("script");
devTools.src = "http://localhost:8098";
document.head.append(devTools);

createApp(App).mount("#app");
