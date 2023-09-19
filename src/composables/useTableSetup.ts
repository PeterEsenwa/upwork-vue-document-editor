import {ref} from "vue";
import {retrieveSelectionAndRange, SelectionAndRange} from "@/utils/insertHTMLStCursor";
import {ExistingTableInfo, TableOptions} from "@/types/TableOptions";

export default () => {
	const existingTableInfo = ref<ExistingTableInfo>()

	const isTableSetupOpen = ref(false);
	const selectionAndRange = ref<SelectionAndRange>();
	const startTableSetup = (
		tableInfo?: ExistingTableInfo,
	) => {
		selectionAndRange.value = retrieveSelectionAndRange();

		existingTableInfo.value = tableInfo;

		isTableSetupOpen.value = true;
	}

	const toggleTableSetup = () => {
		isTableSetupOpen.value = !isTableSetupOpen.value

		if (!isTableSetupOpen.value) {
			existingTableInfo.value = undefined;
		}
	}

	return {
		existingTableInfo,
		isTableSetupOpen,
		selectionAndRange,
		startTableSetup,
		toggleTableSetup,
	}
}
