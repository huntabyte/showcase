<script>
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Input, Modal } from '$lib/components';

	export let form;
	export let data;
	let emailModalOpen;
	let usernameModalOpen;
	let loading;

	$: emailModalOpen = false;
	$: usernameModalOpen = false;
	$: loading = false;

	const submitUpdateEmail = () => {
		loading = true;
		emailModalOpen = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					emailModalOpen = false;
					break;
				case 'error':
					break;
				default:
					await applyAction(result);
			}
			loading = false;
		};
	};

	const submitUpdateUsername = () => {
		loading = true;
		usernameModalOpen = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					break;
				case 'error':
					break;
				default:
					await applyAction(result);
			}
			loading = false;
			usernameModalOpen = false;
		};
	};
</script>

<div class="flex flex-col w-full h-full space-y-12">
	<div class="w-full">
		<h3 class="text-2xl font-medium">Change Email</h3>
		<div class="divider" />
		<Modal label="change-email" checked={emailModalOpen}>
			<span slot="trigger" class="btn btn-primary">Change Email</span>
			<h3 slot="heading">Change Your Email</h3>
			<form action="?/updateEmail" method="POST" class="space-y-2" use:enhance={submitUpdateEmail}>
				<Input
					id="email"
					type="email"
					label="Enter your new email address"
					required={true}
					value={form?.data?.email}
					disabled={loading}
					errors={form?.errors?.email}
				/>
				<button type="submit" class="btn btn-primary w-full" disabled={loading}
					>Change my email</button
				>
			</form>
		</Modal>
	</div>
	<div class="w-full">
		<h3 class="text-2xl font-medium">Change Username</h3>
		<div class="divider mb-0.5" />
		<Input id="username" label="Username" value={data?.user?.username} disabled />
		<Modal label="change-username" checked={usernameModalOpen}>
			<span slot="trigger" class="btn btn-primary">Change Username</span>
			<h3 slot="heading">Change Your Username</h3>
			<form
				action="?/updateUsername"
				method="POST"
				class="space-y-2"
				use:enhance={submitUpdateUsername}
			>
				<Input
					id="username"
					type="text"
					label="Enter your new username"
					required={true}
					value={form?.data?.username}
					errors={form?.errors?.username}
					disabled={loading}
				/>
				<button type="submit" class="btn btn-primary w-full" disabled={loading}
					>Change my username</button
				>
			</form>
		</Modal>
	</div>
</div>
