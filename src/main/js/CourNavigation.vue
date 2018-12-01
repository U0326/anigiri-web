<template>
    <el-tree :props="props" node-key="id" :default-expanded-keys="expandedKeys" :highlight-current=true
            @node-click="handleNodeClick" ref="tree" :load="loadNodes" lazy />
</template>

<script>
    // TODO 以下ダミーデータの為、削除する必要あり。
    import graphRowData from '../../test/resources/2018_04_cour.json'
    export default {
        data: function() {
            return {
                props: {
                    id: 'id',
                    label: 'label',
                    children: 'children',
                    isLeaf: 'isLeaf',
                },
                treeNodes: this.$store.state.sortedCours,
                expandedKeys: null,
            }
        },
        mounted: function() {
            this.expandedKeys = [this.$route.params.year,
                    this.$route.params.year + '-' + this.$route.params.cour];
        },
        methods: {
            loadNodes: function(node, resolve) {
                if (node.level === 0) {
                    return resolve(this.treeNodes.map(function(element) {
                        return {id: element.year, label: element.year + '年'};
                    }));
                }
                if (node.level === 1) {
                    return resolve(this.treeNodes.find(function(element) {
                        return element.year === node.data.id;
                    }).cours.map(function(element) {
                        return {id: node.data.id + '-' + element,
                                label: '第' + element + 'クール(' + (1 + 3 * (element - 1)) + '月〜' +
                                (3 + 3 * (element - 1)) + '月)'};
                    }));
                }
                if (node.level === 2) {
                    // 画面表示時にハイライトを行う為の記載である。
                    this.$refs.tree.setCurrentKey(node.data.id);
                    // TODO 選択したクールのアニメ一覧を取得する処理が必要である。
                    setTimeout(() => {
                        this.$store.commit('updateGraphRowData', graphRowData);
                        return resolve([{id: 1, label: 1, isLeaf: true}, {id: 2, label: 2, isLeaf: true}]);
                    }, 3000);
                }

            },
            handleNodeClick: function(data) {
                // TODO 個々のアニメ毎の詳細グラフの表示画面へ遷移する。
            }
        }

    }
</script>
