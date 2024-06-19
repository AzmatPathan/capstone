import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Button, Card, Container, ProgressBar } from 'react-bootstrap';
import { useUploadFileMutation } from '../../slices/uploadSlice';
import { toast } from 'react-toastify';

const UploadImageScreen = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const [uploadFile, { isLoading, isSuccess, isError, error, data }] = useUploadFileMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success('File uploaded successfully');
            navigate('/add-equipment', { state: { image, fileUrl: data.fileUrl } });
        } else if (isError) {
            const errorMessage = error?.data?.message || error.message || 'Upload failed';
            console.error('Upload error:', error);
            toast.error(errorMessage);
        }
    }, [isSuccess, isError, error, data, navigate, image]);

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setImage(file);
            setProgress(0);
        }
    };

    const handleRemove = () => {
        setImage(null);
        setProgress(0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (image) {
            let uploadProgress;
            try {
                uploadProgress = setInterval(() => {
                    setProgress((prev) => (prev < 100 ? prev + 10 : 100));
                }, 200);

                await uploadFile(image).unwrap();
                clearInterval(uploadProgress);
                setProgress(100);
            } catch (error) {
                console.error('Upload submission error:', error);
                clearInterval(uploadProgress);
                setProgress(0);
            }
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*',
        maxFiles: 1,
    });

    return (
        <Container fluid className="d-flex align-items-center justify-content-center min-vh-100">
            <Card style={{ width: '500px' }} className="p-4">
                <h2 className="text-center mb-4">Upload Your File</h2>
                <div
                    {...getRootProps()}
                    className="border p-5 text-center"
                    style={{ border: '2px dashed #cccccc', cursor: 'pointer' }}
                >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the files here ...</p>
                    ) : (
                        <p>Drop your files here or click to browse from your computer</p>
                    )}
                </div>
                {image && (
                    <div className="mt-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{image.name}</strong>
                                <p>{(image.size / 1024).toFixed(2)} KB</p>
                            </div>
                            <Button variant="outline-danger" onClick={handleRemove}>
                                <i className="fa fa-trash"></i>
                            </Button>
                        </div>
                        <ProgressBar now={progress} label={`${progress}%`} />
                    </div>
                )}
                <div className="mt-3 d-flex justify-content-between">
                    <Button variant="secondary" onClick={() => navigate('/dashboard')}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit} disabled={!image || isLoading}>
                        {isLoading ? 'Uploading...' : 'Continue'}
                    </Button>
                </div>
            </Card>
        </Container>
    );
};

export default UploadImageScreen;
