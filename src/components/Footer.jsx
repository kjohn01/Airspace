import React from 'react';

const Footer = () => (
  <div className="bg-dark text-center text-white py-2">
    &copy;
    {' '}
    {new Date().getFullYear()}
    {' '}
    Author:
    <a className="text-white" href="https://johnwang.tw"> Ting-Hsien Wang </a>
    <br />
    Icons made by
    {' '}
    <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a>
    {' '}
    from
    {' '}
    <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
  </div>
);

export default Footer;
