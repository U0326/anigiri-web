<template>
    <el-tree node-key="id" :data="nodes" :default-expanded-keys="[selectedKey]" :highlight-current=true
            @node-click="handleNodeClick" ref="tree" />
</template>

<script>
    // TODO 以下ダミーデータの為、削除する必要あり。
    import dummy_data from '../../test/resources/cours.json'

    export default {
        data: function() {
            return {
                nodes: null,
                selectedKey: null,
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        created: function() {
            // TODO 以下ダミーデータの為、削除する必要あり。
            this.nodes = this.convertToTree(dummy_data);

        },
        mounted: function() {
            this.selectedKey = this.$route.params.year + '-' + this.$route.params.cour;
            this.$refs.tree.setCurrentKey(this.selectedKey);
        },
        watch: {
            selectedKey: function() {
                this.$refs.tree.setCurrentKey(this.selectedKey);
            }
        },
        methods: {
            convertToTree: function(json) {
                let sortedTerm = json.term.sort(function(x, y) {
                    if (x.year < y.year) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
                let nodes = [];
                // TODO 各クールのアニメタイトルの表示は、クリックしたタイミングで取得を行う。
                for (let i = 0; i < sortedTerm.length; i++) {
                    nodes.push({
                        id: sortedTerm[i].year,
                        label: sortedTerm[i].year + '年',
                        children: sortedTerm[i].cours.sort().map(function(element) {
                            return {
                                id: sortedTerm[i].year +'-' + element,
                                label: '第' + element + 'クール(' + (1 + 3 * (element - 1)) + '月〜' +
                                        (3 + 3 * (element - 1)) + '月)'
                            }
                        })
                    });
                }
                return nodes;
            },
            handleNodeClick: function(data) {
                // TODO 個々のアニメ毎の詳細グラフの表示画面へ遷移する。
            }
        }

    }
</script>
