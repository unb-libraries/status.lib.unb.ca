import React from "react"
import Container from "../UI/Container";
import Footer from '../UI/Footer';
import Header from '../UI/Header';
import classes from './Full.module.css'

const Full = (props) => {
  return (
    <div className={classes.main}>
      <Header />
      <Container>
        <h1>Systems & Services</h1>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        {props.children}
      </Container>
      <Footer />
    </div>
  )  
}

export default Full