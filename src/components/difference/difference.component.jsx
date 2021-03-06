import React from "react";

import DiffrenceItem from "../difference-item/difference-item.component";
import api from "../../apis/api";

import "./difference.styles.scss";

class Difference extends React.Component {
    constructor() {
        super();

        this.state = {
            differences: [],
        };
    }

    componentDidMount() {
        api.get("/differences").then(response =>
            this.setState({ differences: response.data })
        );
    }

    render() {
        const { differences } = this.state;
        return (
            <section id="difference">
                <div className="difference-container">
                    <div className="difference-title">
                        <h2>The SONDORS Difference</h2>
                    </div>
                    <div>
                        <div className="row m-0 p-0">
                            {differences.map(
                                ({ id, ...otherDiffrenceProps }) => (
                                    <DiffrenceItem
                                        key={id}
                                        {...otherDiffrenceProps}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Difference;
