import React from 'react'
import { useState, useEffect } from "react";

export default function Footer() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000); // update every 1 second

    return () => {
      clearInterval(intervalId);
    };
  }, []); // empty dependency array to run only once

  const formattedDate = date.toLocaleString();

  return <>


  <footer class="text-center text-lg-start text-muted mb-0">
  <div className="container-fluid mb-0">
    <section class=" footer-section d-flex justify-content-center justify-content-lg-between p-4">
      <div class="me-5 text-white d-none d-lg-block">
        <span>Get connected with us on social networks:</span>
      </div>
      <div>
        <a href="" class="me-4 text-reset">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="" class="me-4 text-reset">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="" class="me-4 text-reset">
          <i class="fab fa-google"></i>
        </a>
        <a href="" class="me-4 text-reset">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="" class="me-4 text-reset">
          <i class="fab fa-linkedin"></i>
        </a>
        <a href="" class="me-4 text-reset">
          <i class="fab fa-github"></i>
        </a>
      </div>
   </section>
   <section class="">
    <div class="container text-center text-md-start mt-5">
  
      <div class="row mt-3">
       
        <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
         
          <h6 class="text-uppercase fw-bold mb-4">
          <em>Swift Rides</em>
          </h6>
          <p>
          Luxury Guaranteed
          </p>
        </div>
       
        <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
        
          <h6 class="text-uppercase fw-bold mb-4">
            Products
          </h6>
          <p>
            <a href="#!" class="text-reset">Luxury Cars</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Classic & Collectibles</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Power Bikes</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Electric Cars</a>
          </p>
        </div>
       
        {/* <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
         
          <h6 class="text-uppercase fw-bold mb-4">
            Useful links
          </h6>
          <p>
            <a href="#!" class="text-reset">Shortlet Pricing</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Find an Agent</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Careers</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Help</a>
          </p>
        </div>
         */}
        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
        
          <h6 class="text-uppercase fw-bold mb-4">
            Contact
          </h6>
          <p><i class="fas fa-home me-3"></i> Nowhere, NW 1001001, Dome</p>
          <p>
            <i class="fas fa-envelope me-3"></i>
            info@swiftrides.com
          </p>
          <p><i class="fas fa-phone me-3"></i> + 01 487 282 98</p>
          <p><i class="fas fa-print me-3"></i> + 01 487 282 99</p>
        </div>
        
      </div>
   
    </div>
  </section>
  
 
 {/* <p className='text-center'>Current Time And Date: {formattedDate} </p> */}
 <p class="text-center text-white p-4" style={{color: "white"}}>
    © {new Date().getFullYear()} Copyright: SwiftRides.Com
  </p> 
  </div>
  </footer>
  </>
}

