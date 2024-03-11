<script lang="ts">
  import { page } from "$app/stores"
</script>

Oh no!
<p>{$page.error?.message}</p>
