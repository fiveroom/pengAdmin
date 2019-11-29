import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        adminData: {
            'Token': ''
        }
    },
    mutations: {
        addInfo(state, dataObj) {
            Object.keys(dataObj).forEach(key => {
                state.adminData[key] = dataObj[key]
            })
        }
    },
    actions: {},
    modules: {}
})