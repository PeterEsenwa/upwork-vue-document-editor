<template>
	<div
			class="table-component"
			:key="key"
			v-html="tableHTML"
	/>
</template>

<script>
import {nanoid} from "nanoid";
import createHTMLTable from "@/utils/createTable";

export default {
	props: {
		modelValue: Object
	},
	data: function () {
		return {
			key: nanoid(),
		}
	},
	computed: {
		tableHTML() {
			return createHTMLTable({
				rows: this.modelValue.rows ?? 2,
				cols: this.modelValue.cols ?? 2,
				border: this.modelValue.border,
				cellPadding: this.modelValue.cellPadding,
				cellSpacing: this.modelValue.cellSpacing,
				includeHeaders: this.modelValue.includeHeaders
			});
		}
	},
	methods: {
		openEditPopup(e) {
			// prevent the default contextmenu from opening
			e.preventDefault();

			// emit an event to the parent component
			document.dispatchEvent(new CustomEvent('open-table-setup', {
				// send modelValue and key
				detail: {
					options: this.modelValue,
					key: this.key
				}
			}));
		}
	},
	// register a listener for right-click events
	mounted() {
		this.$el.addEventListener('contextmenu', this.openEditPopup);
	},
}
</script>

<style>
td:empty::after{
	content: "\00a0";
}
</style>
