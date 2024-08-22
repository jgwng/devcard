<script>
	import Modal from './component/Modal.svelte';
	import ImgElement from './component/svg_to_img.svelte';
    import { onMount } from 'svelte';
	import { svgStore } from '../../stores/store.js'; 
	export let data;
    let svgElement;
	let svgDataUrl = '';

	// Modal visibility state
	let showFacialHairModal = false;
	let showHairstyleModal = false;
	let showAccModal = false;
	let showFaceModal = false;

	// Selected IDs for each category
	let selectedFacialHairId = null;
	let selectedHairstyleId = null;
	let selectedAccId = null;
	let selectedFaceId = null;

	// Destructure the images data from the props
	let { facialHairImages, hairstyleImages, faceStyleImages, accessoriesStyleImages } = data;

	// Function to load and display the SVG in the container
    async function loadSVG(src) {
        const response = await fetch(src);
        const svgText = await response.text();
        svgElement.innerHTML = svgText;
		svgStore.set(svgText);
        // Apply styles directly to the SVG element
        const svg = svgElement.querySelector('svg');
        if (svg) {
            svg.style.width = '300px';
            svg.style.height = '300px';
            // svg.style.padding = '16px';
            svg.style.border = '1px solid #ccc';
			svg.style.backgroundColor = 'white';
        }
    }

	// Common function to handle image click and update the respective SVG element
	async function handleImageClick(image, idPrefix, selectedIdSetter) {
		const response = await fetch(image.src);
		let svgText = await response.text();

		// Create a DOM parser to parse the SVG string
		const parser = new DOMParser();
		const svgDoc = parser.parseFromString(svgText, "image/svg+xml");

		// Find the element with an ID starting with the specified prefix
		const element = svgDoc.querySelector(`[id^="${idPrefix}"]`);

		// Insert the modified SVG into the poseElement
		const poseElement = document.querySelector(`[id^="${idPrefix}"]`);
		if (poseElement && element) {
			poseElement.innerHTML = svgText;
			poseElement.id = element.id;
		}
		svgStore.set(svgElement.innerHTML);
		// Update the selected ID
		selectedIdSetter(image.id);
	}

	onMount(() => {
		loadSVG(`/bust.svg`);
	});

	// Handlers for each category using the common handler function
	const handleFacialHairClick = (image) => handleImageClick(image, 'facial-hair', id => selectedFacialHairId = id);
	const handleHairstyleClick = (image) => handleImageClick(image, 'head', id => selectedHairstyleId = id);
	const handleAccClick = (image) => handleImageClick(image, 'accessories', id => selectedAccId = id);
	const handleFaceClick = (image) => handleImageClick(image, 'face', id => selectedFaceId = id);
</script>

<style>
    .svg-container {
        display: flex;
        align-items: center;
        justify-content: center;
		margin-top: 20px;
    }

</style>

<button on:click={() => (showFacialHairModal = true)}>Show Facial Hair Modal</button>
<button on:click={() => (showHairstyleModal = true)}>Show Hairstyle Modal</button>
<button on:click={() => (showAccModal = true)}>Show Acc Modal</button>
<button on:click={() => (showFaceModal = true)}>Show Face Modal</button>

<Modal 
	bind:showModal={showFacialHairModal}
	title="얼굴 형태 변경"
	images={facialHairImages}
	onImageClick={handleFacialHairClick}
	selectedImageId={selectedFacialHairId}
/>

<Modal 
	bind:showModal={showHairstyleModal}
	title="헤어스타일 변경"
	images={hairstyleImages}
	onImageClick={handleHairstyleClick}
	selectedImageId={selectedHairstyleId}
/>

<Modal 
	bind:showModal={showAccModal}
	title="악세사리 변경"
	images={accessoriesStyleImages}
	onImageClick={handleAccClick}
	selectedImageId={selectedAccId}
/>

<Modal 
	bind:showModal={showFaceModal}
	title="얼굴형 변경"
	images={faceStyleImages}
	onImageClick={handleFaceClick}
	selectedImageId={selectedFaceId}
/>

<div class="svg-container" bind:this={svgElement}></div>

<!-- <ImgElement></ImgElement> -->


