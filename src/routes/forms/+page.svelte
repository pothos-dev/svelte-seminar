<script lang="ts">
  import { enhance } from "$app/forms"

  const { data, form } = $props()
  let message = form?.message
</script>

<!-- Progressive Enhancement -->
<form method="post" use:enhance>
  <label for="email">Email</label>
  <input name="email" type="email" />

  <label for="password">Password</label>
  <input name="password" type="password" />

  <button type="submit">Submit</button>

  {#if message}
    <p>{message}</p>
  {/if}
</form>

<style lang="postcss">
  form {
    @apply p-4 max-w-screen-sm w-full mx-auto;
    @apply flex flex-col gap-2;
  }

  .error {
    @apply text-red-500;
  }
</style>
