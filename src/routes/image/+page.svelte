<script>
	import Modal from './component/modal.svelte';
	import ImgElement from './component/svg_to_img.svelte';
    import { onMount } from 'svelte';
	import { svgStore, isMobile } from '../../stores/store.js';
	import {goto} from '$app/navigation'; 
	import { browser } from "$app/environment";
    import { get } from 'svelte/store';
	export let data;
    let svgElement;
	let svgDataUrl = '';
	let loading = true;

	// Modal visibility state
	let showFacialHairModal = false;
	let showHairstyleModal = false;
	let showAccModal = false;
	let showFaceModal = false;
	let showBodyModal = false;

	// Selected IDs for each category
	let selectedBodyId = null;
	let selectedFacialHairId = null;
	let selectedHairstyleId = null;
	let selectedAccId = null;
	let selectedFaceId = null;

	// Destructure the images data from the props
	let { bodyImages,facialHairImages, hairstyleImages, faceStyleImages, accessoriesStyleImages } = data;

	async function loadSVG(src) {
    loading = true; // Set loading to true before fetching

    try {
        const response = await fetch(src);
        const svgText = await response.text();

        if (svgElement) {
            svgElement.innerHTML = svgText;
            svgStore.set(svgText);

            // Apply styles directly to the SVG element
            const svg = svgElement.querySelector('svg');
            if (svg) {
                // Make sure the SVG scales responsively
                svg.style.width = '240px';
                svg.style.height = '240px';
                svg.style.opacity = '0'; // Start with invisible
                svg.style.transition = 'opacity 0.3s linear, transform 0.3s linear';

                // Trigger the fade-in animation
                requestAnimationFrame(() => {
                    svg.style.opacity = '1';
                    svg.style.transform = 'scale(1)';
                });
            }
        }
    } catch (error) {
        console.error('Error loading SVG:', error);
    } finally {
        loading = false; // Set loading to false after SVG is loaded
    }
}

	async function handleImageClick(image, idPrefix, selectedIdSetter) {
		const response = await fetch(image.src);
		let svgText = await response.text();

		const parser = new DOMParser();
		const svgDoc = parser.parseFromString(svgText, "image/svg+xml");

		const element = svgDoc.querySelector(`[id^="${idPrefix}"]`);

		const poseElement = document.querySelector(`[id^="${idPrefix}"]`);
		if (poseElement && element) {
			poseElement.innerHTML = svgText;
			poseElement.id = element.id;
		}
		
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
	const handleBodyClick = (image) => handleImageClick(image, 'body', id => selectedBodyId = id);

	function onTapMovePage(){
		svgStore.set(svgElement.innerHTML);
		goto('/info');
	}

	function onTapBackPage() {
    	if (browser) window.history.back();
	}
</script>

<div class="option-container">
	<div class="option-top">
		<span>이미지 설정</span>
	</div>
	<div class="svg-container" bind:this={svgElement}></div>
	<div class= "container" style="padding-left:16px;padding-right:16px;">
		<div class="col">
			<button class="button button-list" on:click={() => (showFacialHairModal = true)}>
				수염
			</button>
		</div>
	</div>
	<div class= "container"  style="padding-left:16px;padding-right:16px;">
		<div class="col">
			<button class="button button-list" on:click={() => (showHairstyleModal = true)}>
				헤어스타일
			</button>
		</div>
	</div>
	<div class= "container"  style="padding-left:16px;padding-right:16px;">
		<div class="col">
			<button class="button button-list" on:click={() => (showAccModal = true)}>
				악세서리
			</button>
		</div>
	</div>
	<div class= "container" style="padding-left:16px;padding-right:16px;">
		<div class="col">
			<button class="button button-list" on:click={() => (showFaceModal = true)}>
				표정
			</button>
		</div>
	</div>
	<div class= "container" style="padding-left:16px;padding-right:16px;">
		<div class="col">
			<button class="button button-list" on:click={() => (showBodyModal = true)}>
				상의
			</button>
		</div>
	</div>
</div>

<div class="container">
	<div class="row">
		<div class="col">
			<button class="button button-primary" on:click={onTapBackPage}>페이지 뒤로가기</button>
		</div>
		<div class="col">
			<button class="button button-primary" on:click={onTapMovePage}>페이지 이동</button>
		</div>
	</div>
</div>

{#if showFacialHairModal}
<Modal 
	bind:showModal={showFacialHairModal}
	title="수염 변경"
	images={facialHairImages}
	onImageClick={handleFacialHairClick}
	selectedImageId={selectedFacialHairId}
/>
{/if}

{#if showHairstyleModal}
<Modal 
	bind:showModal={showHairstyleModal}
	title="헤어스타일 변경"
	columns={get(isMobile) ? 5 : 6} 
	images={hairstyleImages}
	onImageClick={handleHairstyleClick}
	selectedImageId={selectedHairstyleId}
/>
{/if}

{#if showAccModal}
<Modal 
	bind:showModal={showAccModal}
	title="악세사리 변경"
	images={accessoriesStyleImages}
	onImageClick={handleAccClick}
	selectedImageId={selectedAccId}
/>
{/if}

{#if showFaceModal}
<Modal 
	bind:showModal={showFaceModal}
	title="얼굴형 변경"
	images={faceStyleImages}
	onImageClick={handleFaceClick}
	selectedImageId={selectedFaceId}
/>
{/if}

{#if showBodyModal}
<Modal 
	bind:showModal={showBodyModal}
	title="상의 변경"
	images={bodyImages}
	onImageClick={handleBodyClick}
	selectedImageId={selectedBodyId}
/>
{/if}





