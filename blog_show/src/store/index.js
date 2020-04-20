import Vue from 'vue'
import VueX from 'vuex'
import getters from "./getters";

Vue.use(VueX);

const modulesFiles = require.context('./modules', true, /\.js$/);

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // $1--$9 是RegExp 自带的，只要放生了匹配就会有。代表的是分组，即小括号里面的小正则捕获到的内容。
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
    const value = modulesFiles(modulePath);
    modules[moduleName] = value.default;
    return modules;
}, {});

const store = new VueX.Store({
    state: {
        currentUser: window.localStorage.getItem('user') === null ? '' : JSON.parse(window.localStorage.getItem('user'))
    },
    mutations: {
        login(state, user) {
            state.currentUser = user;
            window.localStorage.setItem("user", JSON.stringify(user));
        },
        logout(state) {
            state.currentUser = [];
            window.localStorage.removeItem('user');
        }
    },
    modules,
    getters,
});

export default store;