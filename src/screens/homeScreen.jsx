import React from 'react';
import mainImage from 'C:/Users/User/Documents/Cloud_Computing_Sem2/capstone/capstone_frontend/src/mainimage.png';
import secondImage from 'C:/Users/User/Documents/Cloud_Computing_Sem2/capstone/capstone_frontend/src/main2_image.png';
import './homeScreen.css';

const HomeScreen = () => {
    return (
    
        <div className="home-screen">
            <main className="landing-page">
                <div className="content-wrapper">
                    <div className="image-wrapper position-relative">
                        <img src={mainImage} alt="Main Image" className="main-image" />
                        <div className="overlay-text">
                            <div><h1>Telus ITMS</h1></div>
                            <div className="additional-text">TELUS maintains an extensive inventory of HVAC equipment across its facilities.</div>
                            <div className="additional-text">Our advanced mobile app leverages Computer Vision to efficiently capture data from equipment nameplates.</div>
                        </div>
                    </div>
                    <div className="image-wrapper">
                        <img src={secondImage} alt="Second Image" className="second-image" />
                    </div>
                </div>
            </main>
</div>
        
    );
};
export default HomeScreen;


