import React, {Fragment} from 'react';


class MainForm extends React.Component {

    handleSubmit = this.props.handleSubmit

    render() { 
        return (
            <div className="App">
                <div className="container">
                <h2>Создать запрос</h2>
                <form onSubmit={this.handleSubmit}>

                    <label htmlFor="price">Цена</label>
                    <input  type="text" 
                            name="price" 
                            id="price" 
                            value={this.props.data.inputs.price}
                            autocomplete="off"
                            onChange={e =>{
                                // this.props.changePrice( e.target.value )
                                return this.props.recalculate(e.target.name, e.target.value)
                            }}
                            placeholder="Цена"></input>

                    <label htmlFor="count">Количество</label>
                    <input  type="text" 
                            name="count" 
                            id="count" 
                            value={this.props.data.inputs.count}
                            autocomplete="off"
                            onChange={e =>{
                                // this.props.changeCount( e.target.value )
                                return this.props.recalculate(e.target.name, e.target.value)
                            }}
                            placeholder="Количество"></input>


                    <label htmlFor="summ">Сумма</label>
                    <input  type="text" 
                            name="summ" 
                            id="summ" 
                            value={this.props.data.inputs.summ}
                            autocomplete="off"
                            onChange={e =>{
                                // this.props.changeSumm( e.target.value )
                                return this.props.recalculate(e.target.name, e.target.value)
                            }}
                            placeholder="Сумма"></input>

                <p className="status">{this.props.data.responceText}</p>
                <button type="submit">Отправить данные</button>
                </form>
                </div>
            </div>
        );
    }     
}

export default MainForm;

