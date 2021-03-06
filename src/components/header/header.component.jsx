import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCartHidden } from "../../redux/cart/cart.selectors";

import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

import "./header.styles.scss";
import Logo from "../../assets/INTENSELOGO.webp";

const Header = ({ currentUser, hidden }) => (
    <div className="header">
        <nav className="container navbar navbar-expand-lg navbar-dark">
            <Link className="navbar-brand" to="/">
                <img src={Logo} alt="Logo" />
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
            >
                <ul className="navbar-nav ml-lg-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/collections/apparel">
                            Apparel & Gear
                        </Link>
                    </li>
                    {currentUser ? (
                        <li className="nav-item">
                            <Link className="nav-link" to="/orders">
                                Your Purchase
                            </Link>
                        </li>
                    ) : null}
                    {currentUser ? (
                        <li className="nav-item">
                            <div
                                className="nav-link"
                                onClick={() => auth.signOut()}
                            >
                                Sign Out
                            </div>
                        </li>
                    ) : (
                        <li className="nav-item" onClick={signInWithGoogle}>
                            <div className="nav-link">Sign In</div>
                        </li>
                    )}
                    <li className="nav-item">
                        <div className="nav-link">
                            <CartIcon />
                            {hidden ? null : <CartDropdown />}
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header);
