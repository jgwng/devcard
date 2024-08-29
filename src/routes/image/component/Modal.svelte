<script>
    import { onMount } from 'svelte';

    export let showModal = false;
    export let images = [];
    export let onImageClick = (image) => {}; // Function to handle image click
    export let selectedImageId = null; // ID of the previously selected image
    export let title = '';
    export let columns = 4;

    function handleImageClick(image) {
        onImageClick(image);
        close();
    }

    function close() {
        showModal = false;
    }
</script>

<!-- Modal Structure -->
{#if showModal}
    <div class="modal-overlay" on:click={close}>
        <div class="modal-content" on:click|stopPropagation>
            <div class="modal-header">
                <div class="modal-title">{title}</div>
                <button class="close-button" on:click={close} aria-label="Close">&times;</button>
            </div>
            <div class="grid" style={`grid-template-columns: repeat(${columns}, 1fr);`}>
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
    </div>
{/if}

<style>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    .modal-content {
        background: white;
        border-radius: 0.2em;
        padding: 16px;
        max-width: 480px;
        width: 90%;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        position: relative;
    }
    .modal-title{
        margin-bottom:0px;
        font-size:18px;
        font-family: 'Dosis';
    }

    .grid {
        display: grid;
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
        align-items: center;
        padding-right:0px !important;
    }

    .close-button:hover {
        color: #000;
    }

    @media (max-width: 600px) {
        .modal-content {
            width: 100%; /* Adjust width for smaller screens */
            max-width: 300px; /* Limit the max-width on small screens */
        }
    }
</style>
