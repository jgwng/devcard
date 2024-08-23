<script>
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { user } from '../../stores/store.js';
    import './styles.css';
    let flipCard = false;
    let svgElement;
    let userInfo = {};

    function handleMouseOver() {
        flipCard = !flipCard;
    }
    let cardElement;
    let imgSrc = ''; // To store the data URL of the image

    // Function to load and display the SVG in the container
    async function loadSVG(src) {
        const response = await fetch(src);
        const svgText = await response.text();
        svgElement.innerHTML = svgText;
        // Apply styles directly to the SVG element
        const svg = svgElement.querySelector('svg');
        if (svg) {
            svg.style.width = '300px';
            svg.style.height = '300px';
			svg.style.backgroundColor = 'transparent';
        }
    }

    onMount(() => {
        loadSVG(`/bust.svg`);
        userInfo = get(user);
        console.log('userInfo : '+ userInfo);
    });
    
    function onSubmit(e) {
        const formData = new FormData(e.target);
        const buttonName = event.submitter.name;
        console.log('buttonName : ' + buttonName);
        console.log('formData : ' + formData);
        const data = {};
        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }
        console.log(data);
        userInfo = data;
  }
</script>

<!-- Image element to display the converted card -->
{#if imgSrc}
    <img src={imgSrc} alt="Converted card" />
{/if}

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
                    <span class="string">{userInfo.title}</span><!--
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

<style>
    /* Colors */
    :root {
        --blue: #29b6f6;
        --green: #9ccc65;
        --purple: #BA68C8;
        --yellow: #FDD835;
        --orange: #f57c00;
        --red: #ef5350;
        --cyan: #4dd0e1;
        --pink: #E91E63;
        --black-dark: #101010;
        --black-light: #2c3e50;
        --bg1: #E91E63;
        --bg2: #9C27B0;
        --white: whitesmoke;
        --monospace: Consolas, "Lucida Console", monospace;
        --card-size: 300px;
    }

    *, *:before, *:after {
        /* box-sizing: border-box; */
        outline: none;
    }


    code {
        font-family: "Lucida Console", Monaco, monospace;
        font-size: 16px;
    }

    .card {
        position: relative;
        width: calc(var(--card-size) * 1.586);
        height: var(--card-size);
        background-color: transparent;
        border: transparent;
    }

    .card-front,
    .card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
        border-radius: 4px;
        box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.4);
        transition: 0.9s cubic-bezier(.25,.8,.25,1);
        backface-visibility: hidden;
        overflow: hidden;
    }
    .card-front:before,
    .card-back:before,
    .card-front:after,
    .card-back:after {
        position: absolute;
    }
    

    .card-front {
        background: linear-gradient(45deg, var(--black-dark), var(--black-light));
    }
    .card-front:after {
        color: rgba(44, 62, 80, 0.94); /* darkened var(--black-light) */
    }

    .card-back {
        background: linear-gradient(-45deg, var(--black-dark), var(--black-light));
        transform: rotateX(180deg);
    }
    .card-back:after {
        color: rgba(44, 62, 80, 0.85); /* darkened var(--black-light) */
    }

    /* Flipping logic based on the `flipCard` state */
    .card-front.flipped {
        transform: rotateX(-180deg);
    }

    .card-back.flipped {
        transform: rotateX(0deg);
    }
    .line-numbers {
        font-family: var(--monospace);
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        margin: 0;
        padding: 0 10px;
        background-color: rgba(255, 255, 255, 0.03);
        font-size: 13px;
        color: white;
    }
    .line-numbers > div {
        padding: 2.5px 0;
        opacity: 0.15;
    }

    code {
        color: var(--white);
    }

    .indent {
        padding-left: 30px;
    }
    .operator {
        color: var(--cyan);
    }
    .string {
        color: var(--green);
    }
    .variable {
        color: var(--purple);
    }
    .property {
        color: var(--red);
    }

    .function {
        color: var(--yellow);
    }
</style>