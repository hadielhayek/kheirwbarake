import axios from "axios"


/**
 * 
 * @param {file} file - take an image file and return a filename
 * from multer middleware to be saved in the backend
 */
const uploadImage = async (file) => {
    const formData = new FormData();

    formData.append('image', file);

    console.table(Object.fromEntries(formData))

    try {
        const response = await axios.post('upload/image', formData)

        return { status: response.status, data: response.data }
    }
    catch (err) {
        console.error('image upload error', err)
    }

}

export default uploadImage

