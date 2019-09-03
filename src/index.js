import CVSS from "./lib/index"

const components = [CVSS]
const install = function (vue) {
  if (install.installed) return;
  /*eslint-disable*/
  components.map((component) => {
    vue.component(component.name, component); //component.name 此处使用到组件vue文件中的 name 属性
  });
};

if (typeof window !== 'undefined' && window.Vue) {
   install(window.Vue);
};
  
export default {
  CVSS
}

