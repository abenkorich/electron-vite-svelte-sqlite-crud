<script lang="ts">
  import Versions from './components/Versions.svelte'
  import LeftSideBar from './components/LeftSideBar.svelte'
  import electronLogo from './assets/electron.svg'

  import { Router, Route } from "svelte-routing";

  import Dashboard from "./routes/dashboard/dashboard.svelte";
  import Product from "./routes/product/product.svelte";

  export let url = "";

</script>

<Router {url}>
  <div class="pt-20 pb-10 w-full">
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/product" component={Product} />
  </div>
</Router>

<LeftSideBar />