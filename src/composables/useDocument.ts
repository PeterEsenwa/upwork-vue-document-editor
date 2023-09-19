import {ref, onBeforeUnmount, markRaw} from 'vue';
import { useRefHistory } from '@vueuse/core'
import TableComponent from "@/components/tableComponent.vue";

export default () => {
    const content = ref([
		{ template: markRaw(TableComponent), props: {
				rows: 2,
				cols: 2,
				// width: 100,
				height: 100,
				border: 1,
				cellPadding: 10,
				cellSpacing: 0,
				includeHeaders: false
			} }
	]);

	const {
		canRedo,
		canUndo,
		undo,
		redo,
		pause: pauseStackTracking,
		reset: resetStackTracking,
	} = useRefHistory(
		content,
		{
			capacity: 1000,
			deep: true
		},
	)

	const redoUndoListener = (e: KeyboardEvent) => {
		if (e.ctrlKey && e.key === 'z') {
			e.preventDefault();
			undo();
		}

		if (e.ctrlKey && e.key === 'y') {
			e.preventDefault();
			redo();
		}
	};

	document.addEventListener('keydown', redoUndoListener)

	onBeforeUnmount(() => {
		document.removeEventListener('keydown', redoUndoListener);
	})

	return {
		content,
		undo,
		redo,
		canRedo,
		canUndo,
		pauseStackTracking,
		resetStackTracking,
	}
}
