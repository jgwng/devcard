<script>
    import { onMount } from 'svelte';
    
    let svgElement;
    
    

    // Function to load and display the SVG in the container
    async function loadSVG(src) {
        const response = await fetch(src);
        const svgText = await response.text();
        svgElement.innerHTML = svgText;
        const svg = svgElement.querySelector('svg');
        if (svg) {
            svg.style.width = '208px';
            svg.style.height = '278px';
            svg.style.display= "grid";
            svg.style.placeItems = 'center';
        }
    }
    onMount(() => {
		loadSVG(`/bust.svg`);
	});
</script>

<div class="card">
    <div class="card-avatar" bind:this={svgElement}>
    </div>
    
    <div class="card-details">
       <div class="name">Saitama</div>
       <div class="occupation">Hero</div>
     
       <div class="skills">
          <span class="value">Immeasurable Physical Prowess, Supernatural Reflexes and Senses, Invulnerability, Indomitable Will, Enhanced Fighting Skill</span>
       </div>
    </div>
 </div>
 <style>
    * {
    box-sizing: border-box;
}

:root {
    --background: white;
    --primary: #ff1ead;
    --secondary: #1effc3;
    --card-size: 300px;
}

.card { 
    width: calc(var(--card-size) * 1.586);
    height: var(--card-size);
    border-radius: 0.75rem;
    box-shadow: 0 22px 70px 4px rgba(0,0,0,0.56), 0 0 0 1px rgba(0, 0, 0, 0.3);
    background: white;
    display: grid;
    grid-template-columns: 40% auto;
    color: black;
    gap: 16px;
    align-items: center;
    will-change: transform;
    transition: transform 0.25s cubic-bezier(0.4, 0.0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.card:hover {
    transform: scale(1.1);
    box-shadow: 0 32px 80px 14px rgba(0,0,0,0.36), 0 0 0 1px rgba(0, 0, 0, 0.3);
}

.card-details {
    padding: 1rem;
}

.name {
    font-size: 2.5rem;
}

.occupation {
    font-weight: 600;
    color: var(--primary);
    font-size: 1.5rem;
}

.card-avatar {
    display: grid;
    place-items: center;
}

.skills {
    display: flex;
    flex-direction: column;
    margin-top: 0.75rem;
}

.skills .value {
    margin-top: 0.15rem;
    font-size: 0.75rem;
    line-height: 1.25rem;
}

 </style>