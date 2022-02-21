// For storing reusable, generic logic

function post(endpoint, body) {
    axios
        .post(endpoint, body, global.config)
        .then(
            response => {
                console.log(response.data);
                if (this.props.additionalRegisterFuncOnSave) {
                    this.props.additionalRegisterFuncOnSave();
                }
            }
        )
        .catch(
            error => {
                console.log(error)
            }
        )
}

function get(endpoint) {
    axios
        .get(endpoint, global.config)
        .then(
            response => {
                console.log(response.data);
                this.setState({ currentUserData: response.data });
                console.log(this.state.currentUserData)
            }
        )
        .catch(
            // TODO: On 404, block all access to app until register is complete
            error => console.log(error.response.data.code)
        )
}

function put(endpoint, body) {
    axios
        // function put(endpoint, body) {
        // return axios.put(endpoint, body, global.config)
        // }
        .put(endpoint, body, global.config)
        .then(
            response => {
                console.log(response.data);
                this.setState({ currentUserData: response.data });
            }
        )
        .catch(
            error => {
                console.log(error)
            }
        )
}