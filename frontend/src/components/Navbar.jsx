import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Navbar() {
    const { user, logoutUser } = useContext(AuthContext);

    return (
        <nav style={{ padding: '10px', background: '#eee', marginBottom: '20px' }}>
            <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
            
            {user ? (
                <>
                    <Link to="/cart" style={{ marginRight: '10px' }}>Keranjang</Link>
                    <Link to="/orders" style={{ marginRight: '10px' }}>Pesanan Saya</Link>
                    <span style={{ marginRight: '10px' }}>Halo, {user.username}</span>
                    <button onClick={logoutUser}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
                    <Link to="/register" style={{ marginRight: '10px' }}>Register</Link>
                </>
            )}
        </nav>
    );
}

export default Navbar;