import React from "react";
import './Footer.css';
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
              <i className="fab fa-instagram fa-lg text-dark"></i>
            </div>
          </div>
          <div className="col-lg-3 mb-4">
            <div className="items">
              <div className="text-wrapper bold-text">COMPANY</div>
              <div className="div"><a href="https://www.telus.com/en/about?linktype=ge-footer" className="custom-link">About Us</a>
              </div>
              <div className="div"><a href="https://www.telus.com/en/about/careers?linktype=ge-footer" className="custom-link">Careers</a>
              </div>
              <div className="div"><a href="https://www.telus.com/en/about/media-hub?linktype=ge-footer" className="custom-link">Media</a>
              </div>
            </div>
          </div>
          <div className="col-lg-3 mb-4">
            <div className="items">
              <div className="text-wrapper bold-text">HELP</div>
              <div className="div"><a href="https://www.telus.com/en/about/accessibility?linktype=ge-footer" className="custom-link">Accessibility</a>
              </div>
              <div className="div"><a href="https://www.telus.com/en/on/outages?INTCMP=VAN_status&linktype=ge-footer" className="custom-link">TELUS Service Status</a>
              </div>
              <div className="div"><a href="https://forum.telus.com/t5/Home/ct-p/EN?linktype=ge-footer" className="custom-link">Community Forum</a>
              </div>
            </div>
          </div>
          <div className="col-lg-3 mb-4">
            <div className="items">
              <div className="text-wrapper bold-text">OTHER TELUS PROPERTIES</div>
              <div className="div"><a href="https://example.com/social-impact" className="custom-link">Social Impact</a>
              </div>
              <div className="div"><a href="https://www.telus.com/en" className="custom-link">TELUS Digital</a>
              </div>
              <div className="div"><a href="https://www.telus.com/en/about/procurement?linktype=ge-footer" className="custom-link">TELUS Procurement</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Footer;

