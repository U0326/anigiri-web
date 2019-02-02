<template>
    <el-tree v-loading="treeLoading" :props="props" node-key="id" :default-expanded-keys="expandedKeys"
    :highlight-current=true @node-click="handleNodeClick" ref="tree" :load="loadNodes" lazy accordion />
</template>

<script>
    import { createCourLabel, retrieveJson } from '../util.js';
    export default {
        data: function() {
            return {
                treeLoading: true,
                props: { id: 'id', label: 'label', children: 'children', isLeaf: 'isLeaf' },
                expandedKeys: null
            }
        },
        computed: {
            treeNodes() {return this.$store.state.allCours},
            animeListId() {return this.$store.state.animeListId},
            currentIds() {return this.animeListId.split('-')},
        },
        watch: {
            'animeListId': function() {
                // 初回表示の場合は何もしない。
                if (!this.treeNodes) return;
                this.expandedKeys = [this.currentIds[0], this.currentIds[0] + '-' + this.currentIds[1]];
                this.$refs.tree.setCurrentKey(this.animeListId);
            },
        },
        methods: {
            loadNodes: async function(node, resolve) {
                // 初回表示の場合
                if (!this.treeNodes) {
                    this.$store.commit('updateAllCours', await retrieveJson('/cours', 'cours'));
                    this.treeLoading = false;
                }
                // 現在のノードが"ルート"の場合
                if (node.level === 0) {
                    // 年の表示が完了した後に以下実行する。
                    this.$nextTick(function() {
                        this.expandedKeys = [this.currentIds[0]];
                    });
                    return resolve(this.treeNodes.map(function(element) {
                        return {id: element.year, label: element.year + '年'};
                    }));
                }
                // 現在のノードが"年"の場合
                if (node.level === 1) {
                    // クールの表示が完了した後に以下実行する。
                    this.$nextTick(function() {
                        this.expandedKeys = [this.currentIds[0],
                                this.currentIds[0] + '-' + this.currentIds[1]];
                        this.$refs.tree.setCurrentKey(this.animeListId);
                    });
                    return resolve(this.treeNodes.find(function(element) {
                        return element.year === node.data.id;
                    }).cours.map(function(element) {
                        return {id: node.data.id + '-' + element, label: createCourLabel(element)}
                    }));
                }
                // 現在のノードが"クール"の場合
                if (node.level === 2) {
                    let loadingIds = node.data.id.split('-');
                    let animeList = await retrieveJson(
                            '/cour/animeList/' + loadingIds[0] + '/' + loadingIds[1], 'animeList');
                    // 各アニメの表示が完了した後に以下実行する。
                    this.$nextTick(function() {
                        this.$refs.tree.setCurrentKey(this.animeListId);
                    });
                    return resolve(animeList.animes.map((element) => {
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
                    this.$router.push('/cour/' + node.id.replace(/-/g, '/'));
                }
                // '年'-'クール'-'animeId'を表すノードがクリックされた場合、各アニメのグラフ表示画面に遷移する。
                if (delimiterCount === 2) {
                    this.$router.push('/detail/' + node.id.replace(/-/g, '/'));
                }
            },
        }
    }
</script>
