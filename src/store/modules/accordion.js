export default {
  state: {
    accItems: [
      {
        title: 'Item 1',
        content: 'Lorem ipsum dolor sit amet consectetur.',
        opened: true
      },
      {
        title: 'Item 2',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea!',
        opened: false
      },
      {
        title: 'Item 3',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis natus accusantium?',
        opened: false
      }
    ]
  },
  getters: {
    accItems: s => s.accItems
  },
  mutations: {
    accItemClickHandler(state, item) {
      if (item.opened) {
        item.opened = false
      } else {
        state.accItems.forEach(it => {
          if (it === item) {
            it.opened = true
          } else {
            it.opened = false
          }
        })
      }
    }
  },
  actions: {
    accItemClickHandler({ commit }, item) {
      commit('accItemClickHandler', item)
    }
  }
}
