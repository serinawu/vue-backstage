export default {
    state: {
        isCollapsed: false,
        tabsList: [
            {
                path: '/home',
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
            state.currentMenu = val;
            const result = state.tabsList.findIndex(item => item.name === val.name);
            if (result === -1) {
                state.tabsList.push(val);
            } else {
                state.currentMenu = null
            }
        },
        closeTag(state, val) {
            const result = state.tabsList.findIndex(item => item.name === val.name );
            state.tabsList.splice(result, 1);
        }
    }
}