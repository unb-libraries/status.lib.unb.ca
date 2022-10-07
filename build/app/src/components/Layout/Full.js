import React from "react"
import Container from '../Main/Container';
import Footer from '../Main/Footer';
import Header from '../Main/Header';
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