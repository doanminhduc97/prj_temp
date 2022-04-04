import axios from '../../common/api/axios.js'

import { SET_USERS } from '../mutation-types'

const state = () => {
  return {
    users: []
  }
}

const getters = {
  getUsers: state => {
    return state.users
  }
}

const mutations = {
  [SET_USERS] (state, users) {
    state.users = users
  }
}

const actions = {
  async setUsers ({ commit }) {
    let res = await axios.get('/temproject/api/v1/nhomnguoidung/list')
    console.log('res', res.data.lstQtNhomNguoiDung)
    commit("SET_USERS", res.data.lstQtNhomNguoiDung)
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
