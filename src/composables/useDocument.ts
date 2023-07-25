import { ref, onBeforeUnmount } from 'vue';
import { useRefHistory } from '@vueuse/core'

export default () => {
    const content = ref([]);

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

	const canExport = ref(true)

	const handleEditorEmptyChange = (isEmpty: boolean) => {
		canExport.value = !isEmpty
	}

	return {
		content,
		undo,
		redo,
		canRedo,
		canUndo,
		pauseStackTracking,
		resetStackTracking,

		handleEditorEmptyChange,
		canExport,
	}
}
