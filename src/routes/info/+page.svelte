<script>
    import { get } from 'svelte/store';
    import { user } from '../../stores/store.js';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let userInfo = {};
    let name = '';

    function clearInput() {
        name= '';
    }

    function onSubmit(e) {
        e.preventDefault(); // Prevent the form from submitting normally

        const formData = new FormData(e.target);
        const data = {};
        let firstEmptyField = null;

        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
            if (!value.trim() && !firstEmptyField) {
                firstEmptyField = key;
            }
        }
        if (firstEmptyField) {
            // If an empty field was found, focus it
            const inputElement = e.target.querySelector(`input[name='${firstEmptyField}']`);
            if (inputElement) {
                inputElement.focus();
            }
        } else {
            console.log('Form submitted successfully with:', data);
            user.set(data);
            goto('/card');
        }
    }

    
    onMount(()=> {
        userInfo = get(user);
        var element = document.querySelector('input[name=name]');
        element.focus();
        console.log('userInfo : ' + userInfo);
    });
</script>

<form class="form" on:submit|preventDefault={onSubmit}>
    <div class="flex-column">
        <label for="name">이름</label>
        <div class="inputForm">
            <input
                type="text"
                class="input"
                placeholder="Enter your Email"
                name="name"
                bind:value={userInfo.name}
            />
            <span class="clear-icon" on:click={() => (userInfo.name = '')}>&#x2715;</span>
        </div>
    </div>
    <div class="flex-column">
        <label for="position">직책</label>
        <div class="inputForm">
            <input
                type="text"
                class="input"
                placeholder="Enter your Email"
                name="position"
                bind:value={name}
            />
            <span class="clear-icon" on:click={() => (userInfo.position = '')}>&#x2715;</span>
        </div>
    </div>
    <div class="flex-column">
        <label for="company">회사</label>
        <div class="inputForm">
            <input
                type="text"
                class="input"
                placeholder="Enter your Email"
                name="company"
                bind:value={userInfo.company}
            />
            <span class="clear-icon" on:click={() => (userInfo.company = '')}>&#x2715;</span>
        </div>
    </div>
    <div class="flex-column">
        <label for="email">이메일</label>
        <div class="inputForm">
            <input
                type="text"
                class="input"
                placeholder="Enter your Email"
                name="email"
                bind:value={userInfo.email}
            />
            <span class="clear-icon" on:click={() => (userInfo.email = '')}>&#x2715;</span>
        </div>
    </div>
    <div class="flex-column">
        <label for="github">Github</label>
        <div class="inputForm">
            <input
                type="text"
                class="input"
                placeholder="Enter your Email"
                name="email"
                bind:value={userInfo.github}
            />
            <span class="clear-icon" on:click={() => (userInfo.github = '')}>&#x2715;</span>
        </div>
    </div>
    <button type="submit" class="button button-primary">데이터 변경</button>
</form>    

