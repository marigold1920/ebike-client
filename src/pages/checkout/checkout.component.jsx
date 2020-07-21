import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { checkout } from "../../redux/cart/cart.actions";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import api from "../../apis/api";

import {
    selectCartItems,
    selectCartTotal,
} from "../../redux/cart/cart.selectors";

import "./checkout.styles.scss";

class CheckoutPage extends React.Component {
    state = {
        customerName: "",
        customerEmail: "",
        customerAddress: "",
        phone: "",
        note: "",
    };

    renderShowCartItem = (cartItems, total) => (
        <div className="col-lg-7 col-md-12">
            <div className="checkout-page">
                <div className="checkout-page">
                    <div className="checkout-header">
                        <div className="header-block">
                            <span>Product</span>
                        </div>
                        <div className="header-block">
                            <span>Name</span>
                        </div>
                        <div className="header-block">
                            <span>Quantity</span>
                        </div>
                        <div className="header-block">
                            <span>Price</span>
                        </div>
                        <div className="header-block">
                            <span>Remove</span>
                        </div>
                    </div>
                    {cartItems.map(cartItem => (
                        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                    ))}
                    <div className="total">
                        <span>TOTAL: ${total}</span>
                    </div>
                </div>
            </div>
        </div>
    );

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = event => {
        const {
            customerName,
            phone,
            customerAddress,
            customerEmail,
            note,
        } = this.state;
        const { currentUser, cartItems } = this.props;
        const uid = currentUser ? currentUser.id : null;
        event.preventDefault();
        api.post("/invoices", {
            customerName,
            phone,
            customerAddress,
            customerEmail,
            note,
            uid: uid,
            bikes: cartItems,
        }).then(response => this.props.checkout());
    };

    renderPaymentInfo = () => (
        <div className="col-lg-5 col-md-12 payment-info">
            <h2>Payment Info</h2>
            <form onSubmit={this.handleSubmit}>
                <div className="basic">
                    <FormInput
                        handleChange={this.handleChange}
                        label="Your Name"
                        name="customerName"
                        type="text"
                        value={this.state.customerName}
                        required
                    />
                    <FormInput
                        handleChange={this.handleChange}
                        label="Phone"
                        name="phone"
                        type="text"
                        value={this.state.phone}
                        required
                    />
                </div>

                <FormInput
                    handleChange={this.handleChange}
                    label="Email"
                    name="customerEmail"
                    type="mail"
                    value={this.state.customerEmail}
                    required
                />
                <FormInput
                    handleChange={this.handleChange}
                    label="Address"
                    name="customerAddress"
                    type="text"
                    value={this.state.customerAddress}
                    required
                />
                <FormInput
                    handleChange={this.handleChange}
                    label="Note"
                    name="note"
                    type="text"
                    value={this.state.note}
                    area
                />
                <CustomButton>Send</CustomButton>
            </form>
        </div>
    );

    render() {
        const { cartItems, total } = this.props;
        return (
            <div className="container-fluid w-85">
                <div className="row">
                    {this.renderShowCartItem(cartItems, total)}
                    {this.renderPaymentInfo()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal,
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
    checkout: () => dispatch(checkout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
