<script>
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { user,isMobile } from '../../stores/store.js';
    import html2canvas from 'html2canvas';
    import DevCard from './component/devcard.svelte';
    import './cardStyle.css';

    let flipCard = false;
    let svgElement;
    let userInfo = {};
    let imgSrc = ''; // To store the data URL of the captured image
    let showBottomSheet = false; // To control the visibility of the bottom sheet
    let isMobileValue;
    function handleMouseOver() {
        flipCard = !flipCard;
    }
    let cardElement;
    
    
    async function loadSVG(src) {
        const response = await fetch(src);
        const svgText = await response.text();
        svgElement.innerHTML = svgText;

        const svg = svgElement.querySelector('svg');
        if (svg) {
            svg.style.width = '300px';
            svg.style.height = '300px';
			svg.style.backgroundColor = 'transparent';
            const canvas = await html2canvas(cardElement.querySelector('.card-front'), {
                backgroundColor: null, 
                scale: 1, 
                useCORS: true,
                removeContainer: true 
             });
            imgSrc = canvas.toDataURL('image/png');
        }
    }

    onMount(() => {
        loadSVG(`/bust.svg`);
        isMobileValue = get(isMobile);
        if (isMobileValue === null || isMobileValue === undefined) {
            isMobileValue = isMobileDevice();
        }
        userInfo = get(user);
    });
    function isMobileDevice() {
        return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
  
    async function downloadCardAsImage() {
        if (isMobileValue || isMobileDevice()) {
            // Show bottom sheet on mobile
            showBottomSheet = true;
        } else {
            // Proceed with direct image download on non-mobile devices
            const link = document.createElement('a');
            link.href = imgSrc;
            link.download = 'card-front.png';
            link.click();
        }
    }

    function closeBottomSheet() {
        showBottomSheet = false;
    }
</script>


<div class="card" bind:this={cardElement} on:click={handleMouseOver}>
    <div class="card-front" class:flipped={flipCard}>
        <div class="line-numbers">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
        </div>
        <code>
            <span class="variable">const</span> 
            <span class="function">aboutMe</span> 
            <span class="operator" style="padding-left: 0px;">=</span> 
            <span class="operator">&#123;</span> 
            <span>
                <div class="indent">
                    <span class="property">name</span>
                    <span class="operator">:</span> 
                    <span class="string">{userInfo.name}</span><!--
                    --><span class="code" style="padding-left:0px">,</span>
                </div>
                <div class="indent">
                    <span class="property">title</span>
                    <span class="operator">:</span> 
                    <span class="string">{userInfo.position}</span><!--
                    --><span class="code">,</span>
                </div>
                <div class="indent">
                    <span class="property">company</span>
                    <span class="operator">:</span> 
                    <span class="string">{userInfo.company}</span><!--
                    --><span class="code">,</span>
                </div>           
                <div class="indent">
                    <span class="property">contact</span>
                    <span class="operator">:</span> 
                    <span class="operator">&#123;</span> 
                    <span>
                        <div class="indent">
                            <span class="property">email</span>
                            <span class="operator">:</span> 
                            <span class="string">{userInfo.email}</span><!--
                            --><span class="code">,</span>
                        </div>
                        <div class="indent">
                            <span class="property">github</span>
                            <span class="operator">:</span> 
                            <span class="string">{userInfo.github}</span>
                        </div>
                        
                    </span>
                    <span class="operator">&#125;</span> 
                </div>
            </span>
            <span class="operator">&#125;</span>
        </code>
    </div>
    <div class="card-back" class:flipped={flipCard} bind:this={svgElement}>
    </div>
</div>

<DevCard></DevCard>

<div style="padding:24px; 0px;">
    <button class="button button-primary" on:click={downloadCardAsImage}>Download Card as Image</button>
</div>

{#if showBottomSheet}
    <div class="bottom-sheet">
        <div class="bottom-sheet-content">
            <img src={imgSrc} alt="Captured Image" />
            <button class="close-button" on:click={closeBottomSheet}>Close</button>
        </div>
    </div>
{/if}
