import {Ref} from "vue";

export default (content: Ref<never[]>) => {
    const downloadJson = () => {
        const fileName = 'file.json';

        // generate JSON
        const contentJson = JSON.stringify(content.value);

        // Create a Blob instance representing the data as a UTF-8 string
        const blob = new Blob([contentJson], {type: 'text/plain;charset=utf-8'});

        // Create a link element
        const link = document.createElement('a');
        // Set the download attribute with the filename
        link.download = fileName;
        // Create a URL to the blob and set it as the link's href
        link.href = URL.createObjectURL(blob);
        // Append the link to the body
        document.body.appendChild(link);
        // Simulate a click to download the file
        link.click();
        // Remove the link from the body
        document.body.removeChild(link);
    }

    return {
        downloadJson
    }
};