import store from "./store/index";
import { updateWheel, updateAverage } from "./actions/index";

window.store = store;
window.updateWheel = updateWheel;
window.updateAverage = updateAverage;