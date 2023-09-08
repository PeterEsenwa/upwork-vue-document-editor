import {computed, ref} from 'vue';

export default () => {
    const temporaryHeaderText = ref<string | undefined>('');
    const temporaryFooterText = ref<string | undefined>('');

    const isHeader = ref(false);

    const toggleHeader = () => {
        isHeader.value = !isHeader.value
    }

    const isFooter = ref(false);

    const toggleFooter = () => {
        isFooter.value = !isFooter.value
    }

    const pageHeaderText = computed<string | undefined>(() => {
        if (isHeader.value === false) {
            return temporaryHeaderText.value
        }
        return temporaryHeaderText.value;
    })

    const pageFooterText = computed<string | undefined>(() => {
        if (isFooter.value === false) {
            return temporaryFooterText.value
        }
        return temporaryFooterText.value;
    })

    const captureContent = () => {
        // capture the input
        if (isHeader.value) {
            temporaryHeaderText.value = document.querySelector('.base-dialog #text-area')?.innerHTML;
            toggleHeader()
        } else if (isFooter.value) {
            temporaryFooterText.value = document.querySelector('.base-dialog #text-area')?.innerHTML;
            toggleFooter()
        }
    }


    return {
        isHeader,
        isFooter,
        toggleHeader,
        toggleFooter,
        temporaryFooterText,
        temporaryHeaderText,
        pageHeaderText,
        pageFooterText,
        captureContent,
    }
}