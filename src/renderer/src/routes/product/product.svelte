<script lang="ts">
  import { navigate } from 'svelte-routing'
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    TableSearch,
    Pagination,
    Button,
    Modal,
    Label,
    Input,
    Checkbox,
    Breadcrumb,
    BreadcrumbItem
  } from 'flowbite-svelte'

  export const tableColumns = [
    'ID',
    'Ref',
    'Image',
    'Nom commercial',
    'Matière Active',
    'Formulation',
    'Concentration',
    'Categorie',
    'Famille',
    'Fabricant',
    'Représentant',
    'Fournisseur',
    'Actions'
  ]

  let product_data = [];
  
  window.api.getAllProducts()

  window.electron.ipcRenderer.on('getAllProductsResponse', (event, response) => {
    const { products, message } = response

    console.log('getAllProductsResponse', message)

    // Example: Populate product list on initial load
    console.table(products)
    product_data = products
  })

  // product form
  import ProductForm from './ProductForm.svelte'

  // Form Modal
  let formModal = false;

  // Search and filters
  let searchName = ''
  $: filteredItems = product_data.filter(
    (product) => product.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1
  )

  // Pagination section
  let pages = [{ name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }, { name: '5' }]
  const previous = () => {
    alert('Previous btn clicked. Make a call to your server to fetch data.')
  }
  const next = () => {
    alert('Next btn clicked. Make a call to your server to fetch data.')
  }
  const handleClick = () => {
    alert('Page clicked')
  }
</script>

<main class="p-4 sm:ml-64">
  <ProductForm showModal={formModal}/>
  <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
    <div class="text-sm breadcrumbs font-medium text-gray-900">
      <Breadcrumb aria-label="Default breadcrumb example">
        <BreadcrumbItem href="/dashboard" home>Dashboard</BreadcrumbItem>
        <BreadcrumbItem href="/product">Products</BreadcrumbItem>
        <BreadcrumbItem>Product List</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <h2 class="text-2xl font-bold mt-8 mb-4">Product List</h2>
    <button
      on:click={() => (formModal = !formModal)}
      type="button"
      data-modal-target="crud-modal"
      data-modal-toggle="crud-modal"
      class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Add Product
    </button>

    <TableSearch placeholder="Search by maker name" hoverable={true} bind:inputValue={searchName}>
      <TableHead>
        <TableHeadCell><Checkbox /></TableHeadCell>
        {#each tableColumns as column}
          <TableHeadCell>{column}</TableHeadCell>
        {/each}
      </TableHead>
      <TableBody tableBodyClass="divide-y">
        {#each filteredItems as product}
          <TableBodyRow>
            <TableHeadCell class="!p-4">
              <Checkbox />
            </TableHeadCell>
            <TableBodyCell>
              {product.id}
            </TableBodyCell>
            <TableBodyCell>
              <img src={product.image} alt="Avatar Tailwind CSS Component" />
            </TableBodyCell>
            <TableBodyCell>
              {product.name}
            </TableBodyCell>
            <TableBodyCell>
              {product.quantity}
            </TableBodyCell>
            <TableBodyCell>
              {product.cost}
            </TableBodyCell>
            <TableBodyCell>
              {product.price}
            </TableBodyCell>
            <TableBodyCell>
              {product.category_id}
            </TableBodyCell>
            <TableBodyCell>
              {product.supplier_id}
            </TableBodyCell>
            <TableBodyCell>
              {product.date}
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </TableSearch>

    <Pagination
      {pages}
      on:previous={previous}
      on:next={next}
      on:click={handleClick}
      class="my-10 center"
    />
  </div>
</main>
