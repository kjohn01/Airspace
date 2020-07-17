import React from 'react';

const Footer = () => (
  <div className="fixed-bottom bg-dark text-center text-white py-2">
    &copy;
    {' '}
    {new Date().getFullYear()}
    {' '}
    Author:
    <a className="text-white" href="https://johnwang.tw"> Ting-Hsien Wang </a>
  </div>
);

export default Footer;
