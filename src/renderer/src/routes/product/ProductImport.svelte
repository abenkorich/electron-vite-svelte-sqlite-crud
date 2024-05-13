<!-- App.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';

    let fileInput;
  
    async function handleUpload() {
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        //const response = await uploadFile(formData); // Function to upload file to server
        api.importProducts(formData);
        //console.log(formData); // Log server response
    } catch (error) {
        console.error(error); // Log any errors
    }
}

let fileData = "";


async function handleFileInput(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    console.log('formData', formData.get('file')); 
    api.importProducts(formData);
}
    
  </script>
  
  <input type="file" bind:files={fileInput} class="hidden"/>
  <input type="file" accept=".xlsx" on:change={handleFileInput} />
  <button class="hidden" on:click={handleUpload}>Upload</button>