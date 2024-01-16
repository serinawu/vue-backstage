export default {
    state: {
        isCollapsed: false,
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首頁',
                icon: 'HomeFilled'
            }
        ],
        currentMenu: null
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapsed = !state.isCollapsed;
        },
        selectMenu(state, val) {
            if(val.name !== 'home') {
                state.currentMenu = val
                const result = state.tabsList.findIndex(item => item.name === val.name)
                if (result !== -1) {
                    state.tabsList.push(val)
                }
            } else {
                state.currentMenu = null
            }
        }
    }
}