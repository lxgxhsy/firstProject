import Cookie from "js-cookie"

export default {
    state: {
        isCollapse: false,//导航栏是否折叠
        tabList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            }
        ],//面包屑的数据:点了哪个路由,首页是一定有的
        menu: [],//不同用户的菜单
    },
    mutations: {
        // 修改导航栏展开和收起的方法
        CollapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑的数据
        SelectMenu(state, item) {
            // 如果点击的不在面包屑数据中,则添加
            const index = state.tabList.findIndex(val => val.name === item.name)
            if (index === -1) {
                state.tabList.push(item)
            }
        },
        // 删除tag:删除tabList中对应的item
        closeTag(state, item) {
            // 要删除的是state.tabList中的item
            const index = state.tabList.findIndex(val => val.name === item.name)
            state.tabList.splice(index, 1)
        },
        // 设置不同用户的菜单
        setMenu(state, val) {
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
        },
        // 动态添加路由
        addMenu(state, router) {
            // 判断Cookie
            if (!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu

            const menuArray = []

            // 组装路由
            menu.forEach(item => {
                // 判断是否有子路由
                if (item.children) {
                    item.children = item.children.map(itemm => {
                        itemm.component = () => import(`../Views/${itemm.url}`)
                        return itemm
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../Views/${item.url}`)
                    menuArray.push(item)
                }
            });

            console.log(menuArray, 'menuArray');

            menuArray.forEach(item => {
                router.addRoute('Main', item)
            })
        }
    }
}