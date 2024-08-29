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
	
	<img src = "./splash_icon.png">
	<div class="content">
        <p class="text">나만의 개성을 담은 명함을 디자인하세요.</p>
        <button class="button button-primary" on:click={() => (goto('/image'))}>새로운 명함 만들기</button>
    </div>
</div>

<style>
    .bg {
        background-color: #EFE9E9;
        width: auto;
		max-width: 600px;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }
	

    .content {
        position: absolute; /* Position absolutely within the container */
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        text-align: center;
        max-width: 600px;
        padding: 0 12px; /* Horizontal padding */
    }

    .text {
        margin-bottom: 0px;
        color: #000;
        font-size: 18px; 
    }

    button.button-primary {
        padding: 12px 24px; /* Adjust button padding if needed */
    }

	img{
		width:240px;
		height: auto;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	
	@media only screen and (max-width: 600px) {
		img{
			width:160px;
		}
	}
</style>
