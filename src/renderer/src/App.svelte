<script lang="ts">
  import Versions from './components/Versions.svelte'
  import LeftSideBar from './components/LeftSideBar.svelte'
  import electronLogo from './assets/electron.svg'

  import { Router, Link, Route } from "svelte-routing";

  import Dashboard from "./routes/dashboard.svelte";
  import Product from "./routes/product.svelte";

  export let url = "";

</script>

<Router {url}>
  <div class="pt-20 pb-10 w-full">
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/product" component={Product} />
  </div>
</Router>

<LeftSideBar />