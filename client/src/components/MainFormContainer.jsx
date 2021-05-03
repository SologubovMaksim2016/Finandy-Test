import React from 'react';
import MainForm from './MainForm';
import {connect} from "react-redux";
import {
    changePriceAC, 
    changeCountAC,   
    changeSummAC,   
    initClientDataAC,   
    errorTextAC,   
    recalculateAC,   
} from '../store/redusers/Reduser';

class MainFormContainer extends React.Component {
          
    componentDidMount() {
        this.initData().catch(err => console.log(err));
    }
    
    initData = async () => {        
        const response = await  fetch('/api/getData', { method: 'POST' })
        .then(r => r.json())
        .then(r => this.props.initClientData( r.body ))
    };   

    handleSubmit = async e => {
        e.preventDefault();
        fetch('/api/data', 
          {
              method: 'POST', // *GET, POST, PUT, DELETE, etc. 
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ data: this.props.data }),                   
          }
        )
        .then(r => r.json())
        .then(r => {
            this.props.errorText({ responceText: r.body })
        })    
    }; 
    
    render() {
        return  <MainForm          
                    data = {this.props.data}
                    initClientData={this.props.initClientData}
                    changePrice={this.props.changePrice}
                    changeCount={this.props.changeCount}                     
                    changeSumm={this.props.changeSumm}                     
                    recalculate ={this.props.recalculate}  
                    handleSubmit = {this.handleSubmit}                   
                /> 
        }
    }

    let mapStateToProps = (state) => {
        return {       
            data: state.data,        
        }
    }
    let mapDispatchToProps = (dispatch) => {
        return {
            initClientData: (data) => dispatch(initClientDataAC(data)), 
            changePrice: (value) => dispatch(changePriceAC(value)), 
            changeCount: (value) => dispatch(changeCountAC(value)), 
            changeSumm: (value) => dispatch(changeSummAC(value)),
            errorText: (err) => dispatch(errorTextAC(err)), 
            recalculate: (name, value) => dispatch(recalculateAC(name, value)), 
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(MainFormContainer);

