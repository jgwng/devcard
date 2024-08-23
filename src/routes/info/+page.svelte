<script>
    import { get } from 'svelte/store';
    import { user } from '../../stores/store.js';
    import { onMount } from 'svelte';
    import './styles.css';
    import { goto } from '$app/navigation';

    let userInfo = {};

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
        console.log('userInfo : ' + userInfo);
    });
</script>


<form class="form" on:submit|preventDefault={onSubmit}>
    <div class="flex-column">
      <label for="name">이름</label>
      <div class="inputForm">
        <input placeholder="Enter your Email" class="input" type="text" name='name' bind:value={userInfo.name}>
      </div>
    </div>
    <div class="flex-column">
        <label for="title">직책</label>
        <div class="inputForm">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 32 32" height="20"><g data-name="Layer 3" id="Layer_3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g></svg>
          <input placeholder="Enter your Email" class="input" type="text" name='title' bind:value={userInfo.title}>
        </div>
    </div>
    <div class="flex-column">
        <label for="company">회사</label>
        <div class="inputForm">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 32 32" height="20"><g data-name="Layer 3" id="Layer_3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g></svg>
          <input placeholder="Enter your Email" class="input" type="text" name='company' bind:value={userInfo.company}>
        </div>
    </div>
    <div class="flex-column">
        <label for="email">이메일</label>
        <div class="inputForm">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 32 32" height="20"><g data-name="Layer 3" id="Layer_3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g></svg>
          <input placeholder="Enter your Email" class="input" type="text" name='email' bind:value={userInfo.email}>
        </div>
    </div>
    <div class="flex-column">
        <label for="github">깃허브</label>
        <div class="inputForm">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 32 32" height="20"><g data-name="Layer 3" id="Layer_3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g></svg>
          <input placeholder="Enter your Email" class="input" type="text" name='github'  bind:value={userInfo.github}>
        </div>
    </div>
    <button type="submit" name="button2" class="button-submit">데이터 변경</button>
</form>
