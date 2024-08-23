<script>
		import {goto} from '$app/navigation'; 
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<button on:click={() => (goto('/image'))}>Show Face Modal</button>