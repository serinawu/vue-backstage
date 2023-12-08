export default {
    state: {
        isCollapsed: false
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapsed = !state.isCollapsed;
        }
    }
}