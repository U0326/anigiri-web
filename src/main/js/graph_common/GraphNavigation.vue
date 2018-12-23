<template>
    <div>
        <div>
            <el-button v-if="hasNext" type="primary" icon="el-icon-arrow-left">次へ</el-button>
            <span>{{ graphTitle }}</span>
            <el-button v-if="hasPrev" type="primary">前へ
                    <i class="el-icon-arrow-right el-icon-right" /></el-button>
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
            // TODO 今後機能追加を行う。
            hasNext: function() {
                return false;
            },
            hasPrev: function() {
                return false;
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
