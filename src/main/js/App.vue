<template>
    <div>
        <div>
            <anime-list />
        </div>
        <div>
            <router-view />
        </div>
    </div>
</template>

<script>
    import AnimeList from './AnimeList.vue';

    export default {
        components: {
            AnimeList
        }
    }
</script>
