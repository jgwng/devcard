<script>
    import { onMount } from 'svelte';
    import { svgStore } from '../../../stores/store.js'; 
    import { get } from 'svelte/store';

    let svgDataUrl = '';

    // Subscribe to the svgStore and update svgDataUrl when the store changes
    $: {
        const svgText = $svgStore;
        if (svgText) {
            loadSVGFromStore(svgText);
        }
    }

    // Function to load and display the SVG using the store value
    function loadSVGFromStore(svgText) {
        // Convert the SVG text to a data URL
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
        const svg = svgDoc.querySelector('svg');

        if (svg) {
            const serializer = new XMLSerializer();
            const svgString = serializer.serializeToString(svg);
            const encodedSvg = encodeURIComponent(svgString); // Encode the SVG string
            svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodedSvg}`;
        }
    }

    // Example of setting the store value on mount
    onMount(() => {
        svgStore.set('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" /></svg>');
    });
</script>

<img src={svgDataUrl} alt="SVG as Image" />

<style>
    /* Optional styling */
    img {
        width: 300px;
        height: 300px;
        border: 1px solid #ccc;
        background-color: white;
    }
</style>
