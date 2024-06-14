// src/screens/UploadImageScreen.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Button, Card, Col, Container, ProgressBar, Row } from 'react-bootstrap';

const UploadImageScreen = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setImage(file);
            uploadImage(file);
        }
    };

    const uploadImage = (file) => {
        const fakeUploadProgress = () => {
            setProgress((prev) => {
                if (prev >= 100) return 100;
                const nextProgress = prev + 10;
                setTimeout(fakeUploadProgress, 200);
                return nextProgress;
            });
        };
        fakeUploadProgress();
    };

    const handleRemove = () => {
        setImage(null);
        setProgress(0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (image && progress === 100) {
            navigate('/add-equipment', { state: { image } });
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*',
        maxFiles: 1
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
                    <Button variant="primary" onClick={handleSubmit} disabled={!image || progress < 100}>
                        Continue
                    </Button>
                </div>
            </Card>
        </Container>
    );
};

export default UploadImageScreen;
