<!--
	This popup is used to setup and add a new table at the current cursor position.
-->
<template>
	<headless-dialog
		:open="isOpen"
		@close="close"
		v-bind="$attrs"
	>
		<dialog-overlay class="dialog-overlay"/>
		<dialog-panel class="dialog-panel">
			<form class="form">
				<!--simple form to collect params as seen in TableParams-->
				<div class="form-group">
					<label for="rows">Rows</label>
					<input id="rows" type="number" v-model="options.rows"/>
					<label for="cols">Columns</label>
					<input id="cols" type="number" v-model="options.cols"/>
					<!--<label for="width">Width</label>-->
					<!--<input id="width" type="number" v-model="width"/>-->
					<label for="height">Height</label>
					<input id="height" type="number" v-model="options.height"/>
					<label for="border">Border width</label>
					<input id="border" type="number" v-model="options.border"/>
					<label for="cellpadding">Cell padding</label>
					<input id="cellpadding" type="number" v-model="options.cellPadding"/>
					<label for="cellspacing">Cell spacing</label>
					<input id="cellspacing" type="number" v-model="options.cellSpacing"/>
					<label for="hasColumnHeaders">Has headers</label>
					<input id="hasColumnHeaders" type="checkbox" v-model="options.includeHeaders"/>
				</div>
				<button type="button" @click="doTableInsert">Create</button>
			</form>
		</dialog-panel>
	</headless-dialog>
</template>

<script setup lang="ts">
import {Dialog as HeadlessDialog, DialogOverlay, DialogPanel} from '@headlessui/vue';
import {useVModel} from "@vueuse/core";
import {reactive} from "vue";
import createHTMLTable from "@/utils/createTable";
import {insertHtmlAtCursor, SelectionAndRange} from "@/utils/insertHTMLStCursor";

const props = withDefaults(defineProps<{
	modelValue?: boolean;
	selectionAndRange?: SelectionAndRange;
}>(), {
	modelValue: false,
	selectionAndRange: undefined
});

const emit = defineEmits([
	'update:modelValue',
	'close'
]);

const isOpen = useVModel(props, 'modelValue');

const close = () => {
	isOpen.value = false;
	emit('close');
};

const options = reactive({
	rows: 2,
	cols: 2,
	// width: 100,
	height: 100,
	border: 1,
	cellPadding: 1,
	cellSpacing: 1,
	includeHeaders: false
});

const doTableInsert = () => {
	const table = createHTMLTable(options);
	
	insertHtmlAtCursor(table, props.selectionAndRange);
	
	close();
};
</script>

<style scoped>
.dialog-overlay,
.dialog-panel {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
}

.dialog-overlay {
	background-color: rgba(0, 0, 0, 0.5);
}

.dialog-panel {
	display: flex;
	align-items: center;
	justify-content: center;
}

.form, .form-group {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.form {
	background-color: white;
	padding: 1rem;
	border-radius: 0.5rem;
}
</style>
