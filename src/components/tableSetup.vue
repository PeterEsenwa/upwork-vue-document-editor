<!--
	This popup is used to setup and add a new table at the current cursor position.
-->
<template>
	<headless-dialog
		:open="isOpen"
		@close="close"
		v-bind="$attrs"
	>
		<dialog-overlay class="dialog-overlay" @click="close"/>
		<dialog-panel class="dialog-panel">
			<form class="form">
				<!--simple form to collect params as seen in TableParams-->
				<div class="form-group">
					<label for="rows" class="form-label">Rows</label>
					<input id="rows" type="number" v-model="options.rows" class="form-input"/>
					<label for="cols" class="form-label">Columns</label>
					<input id="cols" type="number" v-model="options.cols" class="form-input"/>
					<!--<label for="width" class="form-label">Width</label>-->
					<!--<input id="width" type="number" v-model="width" class="form-input"/>-->
					<label for="height" class="form-label">Height</label>
					<input id="height" type="number" v-model="options.height" class="form-input"/>
					<label for="border" class="form-label">Border width</label>
					<input id="border" type="number" v-model="options.border" class="form-input"/>
					<label for="cellpadding" class="form-label">Cell padding</label>
					<input id="cellpadding" type="number" v-model="options.cellPadding" class="form-input"/>
					<label for="cellspacing" class="form-label">Cell spacing</label>
					<input id="cellspacing" type="number" v-model="options.cellSpacing" class="form-input"/>
					<label for="hasColumnHeaders" class="form-label">Has headers</label>
					<input id="hasColumnHeaders" type="checkbox" v-model="options.includeHeaders" class="form-input"/>
				</div>
				<button type="button" class="form-button" @click="doTableInsert">
					{{
						props.existingTable
							? 'Update table'
							: 'Insert table'
					}}
				</button>
			</form>
		</dialog-panel>
	</headless-dialog>
</template>

<script setup lang="ts">
import {Dialog as HeadlessDialog, DialogOverlay, DialogPanel} from '@headlessui/vue';
import TableComponent from "@/components/tableComponent.vue";
import {insertHtmlAtCursor, SelectionAndRange} from "@/utils/insertHTMLStCursor";
import {createApp, onBeforeMount, reactive} from "vue";
import {useVModel} from "@vueuse/core";
import {ExistingTableInfo, TableOptions} from "@/types/TableOptions";

const props = defineProps<{
	modelValue: boolean;
	selectionAndRange: SelectionAndRange | undefined;
	existingTable?: ExistingTableInfo;
}>();

const emit = defineEmits([
	'toggle-table-setup',
	'update-table'
]);

const options = reactive(<TableOptions>{
	rows: 2,
	cols: 2,
	// width: 100,
	height: 100,
	border: 1,
	cellPadding: 10,
	cellSpacing: 0,
	includeHeaders: false
});

onBeforeMount(() => {
	if (props.existingTable?.options) {
		// when editing, we need to set the options to the table we are editing
		
		options.rows = props.existingTable.options.rows;
		options.cols = props.existingTable.options.cols;
		
		// options.width = props.existingTable.options.width;
		options.height = props.existingTable.options.height;
		options.border = props.existingTable.options.border;
		options.cellPadding = props.existingTable.options.cellPadding;
		options.cellSpacing = props.existingTable.options.cellSpacing;
		options.includeHeaders = props.existingTable.options.includeHeaders;
	}
})

const isOpen = useVModel(props, 'modelValue');
const close = () => {
	emit('toggle-table-setup');
};

const doTableInsert = () => {
	if (props.existingTable) {
		// when editing, we need to emit the new options and table key to the parent component
		
		emit('update-table', <ExistingTableInfo>{
			options,
			key: props.existingTable.key
		})
		
		return close();
	}
	
	const instance = createApp(TableComponent, {
		modelValue: options,
	});
	
	insertHtmlAtCursor(instance, props.selectionAndRange);
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
	padding: 2rem;
	border-radius: 0.5rem;
}

.form-label {
	margin-bottom: 0.2em;
	font-size: 1em;
	font-weight: 600;
}

.form-input {
	padding: 0.5em;
	margin-bottom: 0.5em;
	border: 1px solid #aaa;
	border-radius: 0.2em;
	transition: border-color 0.3s ease;
}

.form-input:focus {
	border-color: #188038;
	outline: none;
}

.form-button {
	padding: 0.5em 1em;
	background-color: #188038;
	color: white;
	border: none;
	border-radius: 0.5em;
	cursor: pointer;
	transition: background-color 0.3s ease;
}
</style>
