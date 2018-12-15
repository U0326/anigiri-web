<template>
    <div>
        <div>
            <el-button v-if="hasNext" type="primary" icon="el-icon-arrow-left">次のクール</el-button>
            <span>{{ graphTitle }}</span>
            <el-button type="primary">
                    前のクール<i class="el-icon-arrow-right el-icon-right"></i></el-button>
        </div>
        <div>
            <el-radio-group v-model="currentTabLabel" style="margin-bottom: 30px;">
                <el-radio-button v-for="logic in calculateLogics" v-bind:label="logic.label">
                        {{ logic.title }}</el-radio-button>
            </el-radio-group>
        </div>
    </div>
</template>

<script>
    import calculateLogics from './calculate_logics';

    export default {
        data: function() {
            return {
                currentTabLabel: null,
                calculateLogics: null
            }
        },
        mounted: function() {
            this.currentTabLabel = this.$store.state.currentDisplayMethod;
            this.calculateLogics = calculateLogics;
        },
        computed: {
            // TODO 以下動的に取得できるようにする必要がある。
            hasNext: function() {
                return false;
            },
            hasPrev: function() {
                return true;
            },
            graphTitle: function() {
                return this.$store.state.graphTitle;
            }
        },
        watch: {
            currentTabLabel: function() {
                this.$store.commit('updateCurrentDisplayMethod', this.currentTabLabel);
            }
        },
    }
</script>
