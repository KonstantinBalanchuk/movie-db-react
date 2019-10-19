import React from 'react';
import './index.scss';

class Confirmation extends React.Component {
    state = {
        canceled: false,
        confirmed: false
    };

    hide = () => {
        this.setState({
            canceled: true
        }, this.setStatus);
    };

    confirm = () => {
        this.setState({
            confirmed: true,
            canceled: false
        }, this.setStatus);
    };

    setStatus() {
        this.props.workWithModal(this.state);
    }

    render() {
        return (
            <div className={'modalWindow'}>
                <h1>Are you sure?</h1>
                <div>
                    <button onClick={this.confirm}>Yes, delete movie</button>
                    <button onClick={this.hide}>No</button>
                </div>
            </div>
        )
    }
}

export default Confirmation;