import type { App, Directive } from "vue";
import copy from "./modules/copy";
import waterMarker from "./modules/waterMarker";
import draggable from "./modules/draggable";
import debounce from "./modules/debounce";
import throttle from "./modules/throttle";
import resizeObserver from "./modules/resize-observer";

// 指令集合
const directivesList: { [key: string]: Directive } = {
  copy,
  waterMarker,
  draggable,
  debounce,
  throttle,
  resizeObserver
};

const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach(key => {
      app.directive(key, directivesList[key]);
    });
  }
};

export default directives;
