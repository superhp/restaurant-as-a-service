import React from 'react';
import { Footer } from 'native-base';

export default class OrderTotal extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { children, hide, style } = this.props;
        if (hide) {
            return null;
        }
        return (
            <Footer {...this.props} style={style}>
                {children}
            </Footer>
        );
    }
}