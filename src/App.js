import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "./redux/user/user.selectors";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import Footer from "./components/footer/footer.component";
import ProductPage from "./pages/product/product.component";
import CheckoutPage from './pages/checkout/checkout.component';
import SignInAndSignUp from "./pages/signin-and-signup/signin-and-signup.component";
import { setCurrentUser } from "./redux/user/user.actions";

import "./App.css";

class App extends React.Component {

    unsubscribeFromAuth = null;

    componentDidMount() {
        const { setCurrentUser } = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot(snapShot => {
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data()
                    })
                })
            } else {
                setCurrentUser(userAuth);
            }
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div className="App">
                <Header />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/product/:bikeId" component={ProductPage} />
                    <Route path="/checkout" component={CheckoutPage} />
                    <Route path="/authentication" render={() => this.props.currentUser ? (<Redirect to="/" />) : (<SignInAndSignUp />)} />
                </Switch>
                <Footer />
            </div>
        )
    }
}


const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);