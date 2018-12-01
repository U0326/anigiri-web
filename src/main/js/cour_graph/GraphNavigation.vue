<template>
    <div>
        <div>
            <el-button v-if="hasNext" type="primary" icon="el-icon-arrow-left">次のクール</el-button>
            <span> 2018年第4クール(10月〜12月)のアニメ </span>
            <el-button type="primary">前のクール<i class="el-icon-arrow-right el-icon-right"></i></el-button>
        </div>
        <div>
            <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
                <el-radio-button v-for="logic in calculateLogics" v-bind:label="logic.label">{{ logic.title }}</el-radio-button>
            </el-radio-group>
        </div>
    </div>
</template>

<script>
    import calculateLogics from './calculate_logics';

    export default {
        data: function() {
            return {
                calculateLogics: null,
                tabPosition: null
            }
        },
        mounted: function() {
            this.calculateLogics = calculateLogics;
            this.tabPosition = this.calculateLogics[0].label
        },
        computed: {
            // TODO 以下動的に取得できるようにする必要がある。
            hasNext: function() {
                return false
            },
            hasPrev: function() {
                return true
            }
        },
        watch: {
            tabPosition: function(label) {
                this.$emit('tab-event', label);
            }
        },
    }
</script>
