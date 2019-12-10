import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Input from '../Components/Input';


class Register extends Component {
    state = {
                recruiterName: '',
                email: '',
                companyName: '',
                companyCity: '',
                companyState: '',
                recruiterHobbies: [],
                newHobby: '',
                editIndex: null,
                editText: '',
                errorTest: false
            }

    handleChange = (stateKey, value) => {
        this.setState({[stateKey]: value});
    }

    submitData = async () => {
        let data = {
            recruiterName: this.state.recruiterName,
            email: this.state.email,
            companyName: this.state.companyName,
            companyCity: this.state.companyCity,
            companyState: this.state.companyState,
            recruiterHobbies: this.state.recruiterHobbies
        }
        if(data.recruiterName !== '' && data.email !== '' && data.companyName !== '' && data.companyCity !== '' && data.companyState !== '') {
            // save data to db.
            await fetch('/api/users', {
                method: 'POST',
                credentials: 'same-origin', 
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) 
            });

            this.setState({errorText: false})
            this.props.history.push('/complete');
        } else {
            this.setState({errorText: true})
        }

       
    }

    addHobby = (e) => {
        if(this.state.recruiterHobbies.length < 5 && this.state.newHobby !== '') {
            this.setState({recruiterHobbies: [...this.state.recruiterHobbies, this.state.newHobby], newHobby: ''})
        }
    }

    removeHobby = (index) => {
        let temp = this.state.recruiterHobbies;
        temp.splice(index, 1);
        this.setState({recruiterHobbies: temp});
    }

    editHobby = (index) => {
        if(this.state.editIndex === null) {
            this.setState({editIndex: index, editText: this.state.recruiterHobbies[index]});
        }
    }

    completeEdit = () => {
        let temp = this.state.recruiterHobbies;
        temp[this.state.editIndex] = this.state.editText;
        this.setState({recruiterHobbies: temp, editIndex: null, editText: ''});
    }
    
    render() {

        let recruiterHobbies = this.state.recruiterHobbies.map((hobby, i) => {
            if(i !== this.state.editIndex)
            return <div key={i} className='my-auto'>
                <p>{hobby} 
                {
                    this.state.editIndex !== null ? '' : 
                    // Dont want this to show if we are editing.
                    <span>
                        <i onClick={()=>this.editHobby(i)} className="fas fa-edit text-success mx-2"></i>
                        <i onClick={()=>this.removeHobby(i)} className="fas fa-times text-danger"></i>
                    </span>
                }
                </p>
            </div>
            else
            return <div key={i} className="form-row">
                <input className='form-control' onChange={(e)=>this.handleChange('editText', e.target.value)} value={this.state.editText}></input>
                <button onClick={()=>this.completeEdit()} className="btn btn-primary btn-sm mb-2 form-control">Confirm</button>
            </div>
        })

        return (
        <div className="container-fluid h-100 w-100 bg-dark"> 
            <div className='row mx-auto w-75'>
                <div className='mt-5 w-100 bg-light' >
                <h1 className='mt-2 ml-1'>Recruiter Registration</h1>
                {this.state.errorText ? <p className='ml-2 text-danger'>Fill in all fields to register!</p> : ''}
                <div className='mx-2 mb-5'>
                    <form>
                            <Input label='Recruiter Name' value={this.state.recruiterName} handleChange={this.handleChange} stateKey='recruiterName' />
                            <Input label='Email' value={this.state.email} handleChange={this.handleChange} stateKey='email' type='email' />
                            <Input label='Company Name' value={this.state.companyName} handleChange={this.handleChange} stateKey='companyName' />
                            <Input label='Company City' value={this.state.companyCity} handleChange={this.handleChange} stateKey='companyCity' />
                            <Input label='Company State' value={this.state.companyState} handleChange={this.handleChange} stateKey='companyState' />
                            <Input label='Recruiter Hobbies (5 max)' value={this.state.newHobby} handleChange={this.handleChange} stateKey='newHobby' />
                            <button type='button' onClick={this.addHobby} className='btn btn-sm btn-outline-dark mb-2'
                                 disabled={this.state.recruiterHobbies.length < 5 ? false : true}>Add Hobby</button>
                            {recruiterHobbies}
                            <br />
                            <button onClick={()=>this.submitData()} type='button' className='btn btn-warning mt-5'>
                            Sign Up
                            </button>
                      
                    </form>
                   
                </div>
                </div>
                
            </div>
        </div>
        );
    }
}
export default Register;