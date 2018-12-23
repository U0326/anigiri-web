<template>
    <el-tree :props="props" node-key="id" :default-expanded-keys="expandedKeys" :highlight-current=true
            @node-click="handleNodeClick" ref="tree" :load="loadNodes" lazy />
</template>

<script>
    import dummyData01 from '../../../test/resources/2018_04_cour.json';
    import { createCourLabel } from '../util.js';
    export default {
        data: function() {
            return {
                props: { id: 'id', label: 'label', children: 'children', isLeaf: 'isLeaf' },
                expandedKeys: null,
            }
        },
        computed: {
            treeNodes() {return this.$store.state.sortedCours},
            animeListId() {return this.$store.state.animeListId},
        },
        mounted: function() {
            this.expandedKeys = [this.animeListId.split('-')[0],
                    this.animeListId.split('-')[0] + '-' + this.animeListId.split('-')[1]];
        },
        watch: {
            'animeListId': function() {
                this.$refs.tree.setCurrentKey(this.animeListId);
                this.expandedKeys = [this.animeListId.split('-')[0],
                        this.animeListId.split('-')[0] + '-' + this.animeListId.split('-')[1]];
            },
        },
        methods: {
            // ツリー要素の初回表示時のみ実行される処理である。
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
                        return {id: node.data.id + '-' + element, label: createCourLabel(element)}
                    }));
                }
                if (node.level === 2) {
                    // 画面表示時にdefault-expandedした項目をハイライトする為の記載である。
                    this.$refs.tree.setCurrentKey(node.data.id);

                    // TODO JSONを取得する処理を追加する必要がある。
                    let graphRowData = dummyData01;
                    return resolve(graphRowData.animes.map(function(element) {
                        return {id: node.data.id + '-' + element.id, label: element.title, isLeaf: true};
                    }));
                }
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
                    this.$router.push('/detail/' + node.id.replace(/-/g, '/'));
                }
            },
        }
    }
</script>
