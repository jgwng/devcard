<script>
    import { get } from 'svelte/store';
    import { user } from '../../stores/store.js';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let userInfo = {};
        // Define the fields in a JSON object
    const fields = [
        { name: 'name', label: '이름', placeholder: 'Enter your Name' },
        { name: 'position', label: '직책', placeholder: 'Enter your Position' },
        { name: 'company', label: '회사', placeholder: 'Enter your Company' },
        { name: 'email', label: '이메일', placeholder: 'Enter your Email' },
        { name: 'github', label: 'Github', placeholder: 'Enter your Github URL' }
    ];
    function clearInput(fieldName) {
        userInfo[fieldName] = '';
    }

    function onTapBackPage() {
        if (browser) window.history.back();
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

    onMount(() => {
        userInfo = get(user);
    });
</script>

<form on:submit|preventDefault={onSubmit} style="padding-left:16px;padding-right:16px;">
    <div class="option-container">
        <div class="option-top">
            <span>정보 입력</span>
        </div>
        <div class="container" style="padding-left:12px;padding-right:12px;padding-top:16px; padding-bottom:32px;">
            {#each fields as { name, label, placeholder }}
                <div class="flex-column">
                    <label for={name}>{label}</label>
                    <div class="inputForm">
                        <input
                            type="text"
                            class="input"
                            placeholder={placeholder}
                            name={name}
                            bind:value={userInfo[name]}
                        />
                        <span class="clear-icon" on:click={() => clearInput(name)}>&#x2715;</span>
                    </div>
                </div>
            {/each}
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col">
                <button class="button button-primary" on:click={onTapBackPage}>페이지 뒤로가기</button>
            </div>
            <div class="col">
                <button type="submit" class="button button-primary">페이지 이동</button>
            </div>
        </div>
    </div>
</form>
