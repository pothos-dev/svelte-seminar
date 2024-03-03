<script lang="ts">
  import { superForm } from "sveltekit-superforms"

  let { data, form: formAction } = $props()
  let { form, errors, enhance } = superForm(formAction?.form ?? data.form)
</script>

<form method="post" use:enhance>
  <label for="email">Email</label>
  <input name="email" type="text" bind:value={$form.email} />

  <label for="password">Password</label>
  <input name="password" type="password" bind:value={$form.password} />
  {#if $errors.password}
    <p class="error">{$errors.password}</p>
  {/if}

  <label for="age">Age</label>
  <input name="age" type="number" bind:value={$form.age} />
  {#if $errors.age}
    <p class="error">{$errors.age}</p>
  {/if}

  <div class="flex flex-row gap-2">
    <input name="subscribe" type="checkbox" bind:checked={$form.subscribe} />
    <label for="subscribe">Subscribe to Mewsletter</label>
  </div>
  <button type="submit">Submit</button>
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
