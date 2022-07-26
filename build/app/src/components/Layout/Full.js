import React from "react"
import Container from "../UI/Container";
import Footer from '../UI/Footer';
import Header from '../UI/Header';

const Full = (props) => {
  return (
    <React.Fragment>
      <Header />
      <Container>
        <h1>Systems & Services</h1>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        {props.children}
      </Container>
      <Footer />
    </React.Fragment>
  )  
}

export default Full