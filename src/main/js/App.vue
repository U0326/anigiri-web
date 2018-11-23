<template>
    <div>
        <div>
            <cour-navigation />
        </div>
        <div>
            <router-view />
        </div>
    </div>
</template>

<script>
    import CourNavigation from './CourNavigation.vue';

    export default {
        components: {
            CourNavigation
        }
    }
</script>
