import '~/scss/layouts/_header.scss';

import { useState } from 'react';

import popupImage from '../assets/images/Popup Image.jpg';

function Header() {
     const [show, setShow] = useState(false);

     const handleShow = () => setShow(true);

     const handleClose = () => {
          setShow(false);
     };

     return <header className="container-fluid header">Header</header>;
}

export default Header;
