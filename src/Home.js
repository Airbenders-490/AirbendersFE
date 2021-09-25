import React from 'react';

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            data: "test",
        }
    }

    change(x) {
        return x*10;
    }

    render() {
        return <h1>This is a test.</h1>
    }
}