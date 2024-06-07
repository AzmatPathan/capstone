import React from "react";

const Footer = () => {
  return (
    <div className="element-footer bg-white">
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-3 mb-4">
            <div className="row mt-3">
              <div className="col-12">
                <img className="images img-fluid" alt="Images" src="images/telusImage.png" />
              </div>
            </div>
            <div className="social-icons d-flex justify-content-start gap-2">
              <i className="fab fa-facebook-f fa-lg text-dark"></i>
              <i className="fab fa-twitter fa-lg text-dark"></i>
              <i className="fab fa-google fa-lg text-dark"></i>
              <i className="fab fa-instagram fa-lg text-dark"></i>
            </div>
          </div>
          <div className="col-lg-3 mb-4">
            <div className="items">
              <div className="text-wrapper">Topic</div>
              <div className="div">Page</div>
              <div className="div">Page</div>
              <div className="div">Page</div>
            </div>
          </div>
          <div className="col-lg-3 mb-4">
            <div className="items">
              <div className="text-wrapper">Topic</div>
              <div className="div">Page</div>
              <div className="div">Page</div>
              <div className="div">Page</div>
            </div>
          </div>
          <div className="col-lg-3 mb-4">
            <div className="items">
              <div className="text-wrapper">Topic</div>
              <div className="div">Page</div>
              <div className="div">Page</div>
              <div className="div">Page</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
