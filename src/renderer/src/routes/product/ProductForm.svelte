<script>
  import { Alert } from 'flowbite-svelte'
  import { InfoCircleSolid } from 'flowbite-svelte-icons'
  import { fly } from 'svelte/transition'

  import {
    Button,
    Modal,
    Label,
    Input,
    Checkbox,
    Breadcrumb,
    BreadcrumbItem
  } from 'flowbite-svelte'

  let response = ''
  let color = 'green'

  export let showModal = false

  const productData = {
    productId: null,
    name: '',
    brand: '',
    model: '',
    cost: 1,
    price: 1,
    quantity: 0,
    description: ''
  }

  let saving = false

  const handleSubmit = (e) => {
    saving = true
    console.log('productData: ', productData)

    if (productData.id > 0) {
      // Update existing product
      api.updateProduct(productData.id, productData)
    } else {
      // Add new product
      api.addProduct(productData)
    }
  }

  window.electron.ipcRenderer.on('addProductResponse', (event, response) => {
    saving = false
    const { message } = response
    console.log('addProductResponse Recieved', message)
    response = message
  })

  let uploading = false
</script>

<Alert border {color} dismissable class="hidden">
  <InfoCircleSolid slot="icon" class="w-5 h-5" />
  {response}
</Alert>

<Modal bind:open={showModal} size="lg" autoclose={false} class="w-full mt-14">

  <section class="">
    <div class="py-8 px-4 mx-auto lg:py-16">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2>
      <form on:submit|preventDefault={handleSubmit}>
        <div class="grid gap-6 sm:grid-cols-3 sm:grid-rows-5 sm:gap-4">
          <!-- Image -->
          <div class="row-span-2">
            <Label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Image</Label>
            <div class="flex items-center justify-center w-full">
              <Label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="mb-2 text-xs text-center text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p class="text-xs text-center text-gray-500 dark:text-gray-400">SVG, PNG, JPG</p>
                </div>
                <Input id="dropzone-file" type="file" class="hidden" />
              </Label>
            </div>
          </div>
          <!-- Name -->
          <div class="sm:col-span-2 h-16">
            <Label for="name" class="3">Product Name</Label>
            <Input
              type="text"
              bind:value={productData.nom_commercial}
              placeholder="Nom Commercial"
              required={true}
              size="sm"
            />
            <Input type="hidden" bind:value={productData.id} />
          </div>
          <!-- Brand -->
          <div class="w-full h-16">
            <Label for="brand" class="">Brand</Label>
            <Input
              type="text"
              bind:value={productData.brand}
              placeholder="Product brand"
              required={true}
              size="sm"
            />
          </div>
          <!-- Model -->
          <div class="w-full h-16">
            <Label for="model" >Model</Label
            >
            <Input
              type="text"
              bind:value={productData.model}
              placeholder="Product model"
              required={true}
              size="sm"
            />
          </div>
          <!-- Qunatity -->
          <div class="w-full">
            <Label
              for="quantity"
              class="">Quantity</Label
            >
            <Input
              type="number"
              bind:value={productData.quantity}
              placeholder="10"
              required={true}
              size="sm"
            />
          </div>
          <!-- Weight -->
          <div class="w-full">
            <Label
              for="item-weight"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Weight(kg)/ Volume(l)</Label
            >
            <Input
              type="number"
              bind:value={productData.weight}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="12"
              required={true}
            />
          </div>
          <!-- cost -->
          <div class="w-full">
            <Label for="cost" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Cost</Label
            >
            <Input
              type="number"
              bind:value={productData.cost}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="$2999"
              required={true}
            />
          </div>
          <!-- price -->
          <div class="w-full">
            <Label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Price</Label
            >
            <Input
              type="number"
              bind:value={productData.price}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="$2999"
              required={true}
            />
          </div>
          <!-- category -->
          <div class="w-full">
            <Label
              for="category"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</Label
            >
            <select
              bind:value={productData.category}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option>--Select category--</option>
            </select>
          </div>
          <!-- Famille -->
          <div class="w-full">
            <Label
              for="supplier"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Famille</Label
            >
            <select
              bind:value={productData.supplier}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option>--Select supplier--</option>
            </select>
          </div>
          <!-- supplier -->
          <div class="w-full">
            <Label
              for="supplier"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Supplier</Label
            >
            <select
              bind:value={productData.supplier}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option>--Select supplier--</option>
            </select>
          </div>
          <!-- description  -->
          <div class="sm:col-span-3">
            <Label
              for="description"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Description</Label
            >
            <textarea
              bind:value={productData.description}
              rows="8"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Your description here"
            ></textarea>
          </div>
        </div>
      </form>
    </div>
  </section>
  <svelte:fragment slot="footer">
    <Button on:click={handleSubmit}>I accept</Button>
    <Button on:click={() => (showModal = false)} color="alternative">Cancel</Button>
  </svelte:fragment>
</Modal>
