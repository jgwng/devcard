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

<div class="container">
	<div class="col-sm">
		<button  class="button button-primary" on:click={() => (goto('/image'))}>명함 만들기</button>
	</div>
</div>
