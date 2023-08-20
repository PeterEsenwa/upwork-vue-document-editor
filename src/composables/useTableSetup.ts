import {ref} from "vue";
import {retrieveSelectionAndRange, SelectionAndRange} from "@/utils/insertHTMLStCursor";

export default () => {
	const isTableSetupOpen = ref(false);
	const selectionAndRange = ref<SelectionAndRange>();

	const startTableSetup = () => {
		selectionAndRange.value = retrieveSelectionAndRange();

		isTableSetupOpen.value = true;
	}

	return {
		isTableSetupOpen,
		selectionAndRange,
		startTableSetup,
	}
}
