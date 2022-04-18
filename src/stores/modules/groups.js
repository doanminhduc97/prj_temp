import axios from '../../common/api/axios.js'

import { SET_GROUPS } from '../mutation-types'

const state = () => {
  return {
    lstGroups: []
  }
}

const getters = {
  getGroups: state => {
    return state.lstGroups
  }
}

const mutations = {
  [SET_GROUPS] (state, groups) {
    state.lstGroups = groups
  }
}

const actions = {
  async getGroups ({ commit }) {
    let res = await axios.get('/temproject/api/v1/nhomnguoidung/list')
    console.log('res', res.data.lstQtNhomNguoiDung)
    commit("SET_GROUPS", res.data.lstQtNhomNguoiDung)
    return res.data.lstQtNhomNguoiDung
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
