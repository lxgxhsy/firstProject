<template>
    <div class="tabs">
        <!-- closable是否可删除:除了"首页"都可删 -->
        <!-- effect:主题,当前主题是dark,其他事plain -->
        <el-tag v-for="(item, index) in tags" :key="item.path" :closable="item.name !== 'home'"
            :effect="item.name === $route.name ? 'dark' : 'plain'" @click="changeMenu(item)"
            @close="handleClose(item, index)">
            {{ item.label }}
        </el-tag>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    methods: {
        changeMenu(item) {
            this.$router.push({ name: item.name })
        },
        handleClose(item, index) {
            // 删除面包屑数据
            this.$store.commit('closeTag', item)
            // 如果删除的刚好是自己
            if (item.name === this.$route.name) {
                const length = this.tags.length
                // 如果删除的是最后一个:跳到前一个
                if (length === index) {
                    this.$router.push({ name: this.tags[index - 1].name })
                }
                // 不是最后一个:往后一个
                else {
                    this.$router.push({ name: this.tags[index].name })
                }
            }
        }
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabList
        })
    }
}
</script>

<style lang="less" scoped>
.tabs{
    padding: 20px 20px 0 20px;

    .el-tag{
        margin-right: 15px;
        // 鼠标悬停:小手
        cursor: pointer;
    }
}
</style>