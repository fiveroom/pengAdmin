import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        adminData: {
            'Token': ''
        },
        departments: [],
        oldDepartData: {}
    },
    mutations: {
        addInfo(state, dataObj) {
            Object.keys(dataObj).forEach(key => {
                state.adminData[key] = dataObj[key]
            })
        },
        totalData(state, dealData) {
            state.departments = Object.assign([], dealData[0])
            state.oldDepartData = Object.assign({}, dealData[1])
        }
    },
    actions: {},
    modules: {}
})