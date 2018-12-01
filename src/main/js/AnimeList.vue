<template>
    <el-tree :props="props" node-key="id" :default-expanded-keys="expandedKeys" :highlight-current=true
            @node-click="handleNodeClick" ref="tree" :load="loadNodes" lazy />
</template>

<script>
    // TODO 以下ダミーデータの為、削除する必要あり。
    import dummyData01 from '../../test/resources/2018_04_cour.json';
    import dummyData02 from '../../test/resources/20xx_xx_cour.json';
    export default {
        data: function() {
            return {
                props: {
                    id: 'id',
                    label: 'label',
                    children: 'children',
                    isLeaf: 'isLeaf',
                },
                expandedKeys: null,
            }
        },
        computed: {
            treeNodes() {return this.$store.state.sortedCours},
            currentAnimeListId() {return this.$store.state.animeListId}
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
                    // 画面表示時にdefault-expandedした項目をハイライトする為の記載である。
                    this.$refs.tree.setCurrentKey(node.data.id);

                    let graphRowData = this.pullAndUpdateData(node.data.id);
                    return resolve(graphRowData.animes.map(function(element) {
                        return {id: node.data.id + '-' + element.id, label: element.title, isLeaf: true};
                    }));
                }
            },
            pullAndUpdateData: function(animeId) {
                if (animeId == this.currentAnimeListId) {
                    return this.$store.state.graphRowData;
                }

                // TODO JSONを取得する処理を追加する。
                // ---------------- 検証用 -----------------
                let graphRowData;
                if (animeId == '2018-4') {
                    graphRowData = dummyData01;
                } else {
                    graphRowData = dummyData02;
                }
                // ---------------- 検証用 -----------------
                this.$store.commit('updateGraphRowData', graphRowData);
                this.$store.commit('updateAnimeListId', animeId);
                return graphRowData;
            },
            handleNodeClick: function(node) {
                let delimiterCount = String(node.id).split('-').length - 1;
                // '年'を表すノードがクリックされた場合、画面遷移しない。
                if (delimiterCount === 0) return;
                // '年'-'クール'を表すノードがクリックされた場合、各クールのグラフ表示画面に遷移する。
                if (delimiterCount === 1) {
                    this.$router.push('/term/' + node.id.replace(/-/g, '/'));
                }
                // '年'-'クール'-'animeId'を表すノードがクリックされた場合、各アニメのグラフ表示画面に遷移する。
                if (delimiterCount === 2) {
                    this.$router.push('/detail/' + node.id.split('-')[2]);
                }

                this.pullAndUpdateData(node.id);
            }
        }
    }
</script>
