import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
 const Navbar = ()=>{
     //
    return(
            <nav className="stickyyy light-green darken-1">
                <div className="container" style={{display:'flex',flexDirection:'column',width:'100%'}}>
                    <div className="bhjs" style={{ display:'flex', alignSelf:'flex-start',marginLeft:'10%',position:'absolute',justifyContent:'center',marginRight:'30px',width:'200px'}}>
                        <Link to="/" className="brand-logo" style={{display:'flex',width:'180px'}}>Phuchki</Link>
                    </div>
                    <div className='rightso' style={{display:'flex',alignSelf:'flex-end',justifyContent:'left',marginRight:'0px',marginLeft:'30%',width:'220px'}}>
                        <ul className="rightoo" style={{width:'250px',justifyContent:'left'}}>
                            <li><Link to="/">Shop</Link></li>
                            <li><Link to="/cart">My Cart</Link></li>
                            <li><Link to="/cart"><i className="material-icons">shopping_cart</i></Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
    )
}

export default Navbar;