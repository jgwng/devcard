<script>
    import {goto} from '$app/navigation'; 
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { isMobile } from '../stores/store.js';

    function isMobileDevice() {
        return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    onMount(() => {
        isMobile.set(isMobileDevice());
    });
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="container bg">
    <div class="col-sm fixed-bottom">
        <button class="button button-primary" on:click={() => (goto('/image'))}>명함 만들기</button>
    </div>
</div>

<style>
    .bg {
        background-image: url("../bg.png");
        width: auto;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }

    .col-sm.fixed-bottom {
        position: fixed;
        bottom: 0;
        left: 50%;
		padding-left: 12px;
		padding-right: 12px;
        transform: translateX(-50%);
        width: 100%;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 600px;
    }
</style>
