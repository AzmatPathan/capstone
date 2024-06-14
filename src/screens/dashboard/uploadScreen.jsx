import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useUploadProductImageMutation } from 'your-upload-product-image-mutation-path'; // Replace with your actual mutation import
import { toast } from 'react-toastify'; // Assuming you are using react-toastify for toasts
import Loader from 'your-loader-path'; // Replace with your Loader component import
import FormContainer from 'your-form-container-path'; // Replace with your FormContainer component import

function UploadScreen() {
    const [image, setImage] = useState(null);
    const [isNext, setIsNext] = useState(false);

    const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
            setIsNext(true); // Set isNext to true after successful image upload
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const handleNext = () => {
        // Transition to the next screen
    };

    return (
        <FormContainer>
            {isNext ? (
                <div>
                    <p>Image uploaded successfully!</p>
                    <Button onClick={handleNext}>Next</Button>
                </div>
            ) : (
                <div>
                    <input type="file" accept="image/*" onChange={uploadFileHandler} />
                </div>
            )}
            {loadingUpload && <Loader />}
        </FormContainer>
    );
}

export default UploadScreen;
