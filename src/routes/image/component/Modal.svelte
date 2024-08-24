<script>
	export let showModal = false;
	export let images = [];
	export let onImageClick = (image) => {}; // Function to handle image click
	export let selectedImageId = null; // ID of the previously selected image
	export let title = '';
	let dialog;

	$: if (dialog && showModal) dialog.showModal();

	function handleImageClick(image) {
		onImageClick(image);
		dialog.close();
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation>
		<div class="modal-header">
			<div style="margin-bottom:0px;font-size:18px;">{title}</div>
			<button class="close-button" on:click={() => dialog.close()} aria-label="Close">&times;</button>
		</div>
		<div class="grid">
			{#each images as image}
				<div 
					class="grid-item {selectedImageId === image.id ? 'selected' : ''}"
					on:click={() => handleImageClick(image)}
				>
					<img src={image.src} alt={`Image ${image.id}`} />
				</div>
			{/each}
		</div>
	</div>
</dialog>

<style>
	dialog {
		max-width: 480px;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 16px; /* Set padding to 16px */
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 10px;
	}
	.grid-item {
		cursor: pointer;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: border-color 0.3s;
	}
	.grid-item.selected {
		border-color: #007bff; /* Highlight border for selected item */
	}
	.grid-item img {
		max-width: 100%;
		height: auto;
	}
	.grid-item img {
		max-width: 100%;
		height: auto;
	}
	.grid-item:hover {
		background-color: #f0f0f0;
	}
    .modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center; /* Vertically center the items */
		margin-bottom: 16px;
	}
	.close-button {
		background: none;
		border: none;
		font-size: 1.5em;
		line-height: 1;
		cursor: pointer;
		color: #333;
		display: flex;
		align-items: center; /* Vertically center the 'x' inside the button */
	}
	.close-button:hover {
		color: #000;
	}

    @media (max-width: 600px) {
		dialog {
			width: calc(100% - 32px); /* Maintain padding on small screens */
		}
		.grid {
			grid-template-columns: repeat(4, 1fr); /* Adjust grid for smaller screens */
		}
	}
</style>
