<script lang="ts">
    import type { ActionData } from './$types';

    let { form }: { form: ActionData } = $props();
</script>

<form action="?/signup" method="post">
    <input id="email" name="email" placeholder="Email" type="email" />
    <input id="password" name="password" placeholder="Password" type="password" />
    <input id="name" name="name" placeholder="Name" type="text" />
    <button type="submit">Sign up</button>
    {#if form?.missing}<p class="error">{form?.errorMessage}</p>{/if}
</form>
