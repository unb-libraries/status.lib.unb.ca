import React from "react"
import Footer from '../UI/Footer';
import Header from '../UI/Header';

const Full = (props) => {
  return (
    <React.Fragment>
      <Header />
      <div id="main" className="container">
        <h1>Systems & Services</h1>
        <noscript>You need to enable JavaScript to run this app.</noscript>
          {props.children}
      </div>
      <Footer />

    </React.Fragment>
  )  
}

export default Full