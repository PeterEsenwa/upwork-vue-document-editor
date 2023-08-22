import {insertHtmlAtCursor} from "@/utils/insertHTMLStCursor";


interface UseImageUploadComposable {
    addImage: () => void;
    sectionImage: () => void;
}

export default (): UseImageUploadComposable => {
    // Create a hidden file input element
    const addImage = () => {
        let fileInput = document.getElementById('fileInput') as HTMLInputElement;

        if (!fileInput) {
            fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.id = 'fileInput';
            fileInput.style.display = 'none';
            document.body.appendChild(fileInput);
        }

        // Trigger the click event on the file input element
        fileInput.click();

        // When file input changes (user has selected a file),
        // read the image file and convert to a base64 string
        fileInput.onchange = (event: Event) => {
            const file = (event.target as HTMLInputElement).files?.[0]; // Get the selected file
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result as string;
                // Assume index is the location where the image tag is to be added
                let index = 0;

                // Check if there is an element at this index
                insertHtmlAtCursor(`<img class="resizable-image" src="${base64String}" alt="User image" width="200px" height="200px">`);
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        }
    }

    const sectionImage = () => {
        let sectionFileInput = document.getElementById('fileInput') as HTMLInputElement;

        if (!sectionFileInput) {
            sectionFileInput = document.createElement('input');
            sectionFileInput.type = 'file';
            sectionFileInput.accept = 'image/*';
            sectionFileInput.id = 'fileInput';
            sectionFileInput.style.display = 'none';
            document.body.appendChild(sectionFileInput);
        }

        // Trigger the click event on the file input element
        sectionFileInput.click();

        // When file input changes (user has selected a file),
        // read the image file and convert to a base64 string
        sectionFileInput.onchange = (event: Event) => {
            const file = (event.target as HTMLInputElement).files?.[0]; // Get the selected file
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result as string;
                // Assume index is the location where the image tag is to be added
                let index = 0;

                // Check if there is an element at this index
                insertHtmlAtCursor(`<img class="resizable-image" src="${base64String}" alt="User image" width="20px" height="20px">`);
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        }
    }

    return {
        addImage,
        sectionImage,
    };
}