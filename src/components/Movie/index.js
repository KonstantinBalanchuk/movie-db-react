import React from 'react';
import './index.scss';
import Confirmation from "../Confirmation";

class Movie extends React.Component {
    state = {
        open: false,
        confirmed: false,
        showInfo: false
    };
    show = () => {
        this.setState({
            open: true
        })
    };

    options = (status) => {
        console.log(status);
        this.setState({
            open: false,
            confirmed: status.confirmed
        }, this.delete);
    };

    delete() {
        if(this.state.confirmed){
            this.props.delMovie()
        }
    }
    toggleClass = () => {
        const currentState = this.state.showInfo;
        this.setState({
            showInfo: !currentState
        });
    };

    render() {
        return (
            <li>
                <div className={'card'}>
                    {!this.state.showInfo ? (
                    <div>
                        <p className={'title'}>{this.props.data.title}</p>
                        <p className={'open-info'} onClick={this.toggleClass}>Show full information</p>
                    </div>) :
                    (
                        <div className="info">
                            <p>Title: <span className={'title'}>{this.props.data.title}</span></p>
                            <p>Release Year: {this.props.data.year}</p>
                            <p>Format: {this.props.data.format}</p>
                            <p>Stars: {this.props.data.stars}</p>
                            <p className={'open-info'} onClick={this.toggleClass}>Hide full information</p>
                        </div>
                    )}
                    {this.state.open && (
                        <Confirmation workWithModal={this.options}/>
                    )}
                    <button onClick={this.show}>Delete</button>
                </div>
            </li>
        );
    }
}

export default Movie;