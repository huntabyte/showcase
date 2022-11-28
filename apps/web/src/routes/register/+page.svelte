<script>
	import { Input } from '$lib/components';
	export let form;
</script>

<div class="flex flex-col items-center h-full w-full">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Register for an account
	</h2>
	<p class="text-center mt-1">
		Or <a href="/login" class="text-primary font-medium hover:cursor-pointer hover:underline"
			>sign in</a
		> if you already have an account.
	</p>
	<form action="?/register" method="POST" class="flex flex-col items-center space-y-2 w-full pt-4">
		<Input id="name" label="Name" value={form?.data?.name} errors={form?.errors?.name} />
		<Input
			type="email"
			id="email"
			label="Email"
			value={form?.data?.email}
			errors={form?.errors?.email}
		/>
		<Input type="password" id="password" label="Password" errors={form?.errors?.password} />
		<Input
			type="password"
			id="passwordConfirm"
			label="Confirm Password"
			errors={form?.errors?.passwordConfirm}
		/>
		<div class="w-full max-w-lg pt-2">
			<button type="submit" class="btn btn-primary w-full">Register</button>
		</div>
	</form>
</div>
