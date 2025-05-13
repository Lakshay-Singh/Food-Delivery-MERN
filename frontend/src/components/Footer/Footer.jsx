import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets';

const Footer = () => {

  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>

        <div className='footer-content-left'>
            <img src={assets.logo} />
            <p>Explore a world of culinary delights right at your fingertips. From gourmet dishes to comfort classics, satisfy your cravings with ease. With our user-friendly interface and seamless ordering process, indulging in your favorite meals has never been easier. Whether you're craving a hearty meal for one or catering for a crowd, we've got you covered. Join us in savoring the convenience and deliciousness of online food ordering.</p>
            <div className='footer-social-icons'>
                <img src={assets.facebook_icon}/>
                <img src={assets.twitter_icon}/>
                <img src={assets.linkedin_icon}/>
            </div>
        </div>

        <div className='footer-content-center'>
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>

        <div className='footer-content-right'>
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91 9200189000</li>
                <li>service.cont@gmail.com</li>
            </ul>
        </div>

      </div>
      <hr/>
      <p className='footer-copyright'>Copyright 2024 © Wopper.com - All Rights Reserved.</p>
    </div>
  )
}

export default Footer;
