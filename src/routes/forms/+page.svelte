<script lang="ts">
  import { enhance } from "$app/forms"

  let { form } = $props()
</script>

<form method="post" use:enhance>
  <label for="email">Email</label>
  <input name="email" type="text" />

  <label for="password">Password</label>
  <input name="password" type="password" />

  <button type="submit">Submit</button>

  {#if form}
    <p class="error">{form.errorMessage}</p>
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
