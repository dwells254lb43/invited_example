import React, { Component } from 'react';

class Input extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='form-group'>
                <label htmlFor={this.props.stateKey}>{this.props.label}: </label>
                <input className='form-control' id={this.props.stateKey} type={this.props.type ? this.props.type : 'text'} value={this.props.value} onChange={(e)=>this.props.handleChange(this.props.stateKey, e.target.value)}></input> 
            </div> 
        )   
    }
}
export default Input