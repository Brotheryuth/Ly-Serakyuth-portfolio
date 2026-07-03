import React from 'react'
import './NotFound.css'
import { Link } from 'react-router-dom';

function Notfound() {
  return (
    <>
      <div className="notFound-wrapper">
        <div className="nf-content">
          <img 
            src="https://yuth-portfolio.s3.ap-southeast-1.amazonaws.com/err404.jpg" 
            alt="Pipe down princess meme" 
            className="nf-image"
          />
          <h1 className="nf-code">404</h1>
          <p className="nf-message">
            Whoa there! Pipe down, princess. This page doesn't exist. 
            How about you grab a cup of tea and head back home?
          </p>
          <Link to="/" className="nf-btn">Back Home</Link>
        </div>
      </div>
    </>
  );
}

export default Notfound;
