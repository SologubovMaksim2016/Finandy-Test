import React, { Component } from 'react';



import './App.css';

class App extends Component {
  state = {
    response: '',
    price: '',
    count: '',
    summ: '',
    responseToPost: '',
  };
  
  componentDidMount() {
    this.initData()
      .catch(err =>  this.setState({ responseToPost: err }));
  }
  
  initData = async () => {
    const response = await  fetch('/api/getData', 
      {
          method: 'POST'                 
      }
    )
  .then(r => r.json())
  .then(r => {
    debugger;
    this.setState({ price: r.body.price,  count: r.body.count,  summ: r.body.summ });
  })    
  debugger;
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  
  handleSubmit = async e => {
    e.preventDefault();
    fetch('/api/data', 
      {
          method: 'POST', // *GET, POST, PUT, DELETE, etc. 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: this.state }),                   
      }
    )
    .then(r => r.json())
    .then(r => {
      this.setState({ responseToPost: r.body });
    })    
  };

  
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
                    value={this.state.price}
                    onChange={e => this.setState({ price: e.target.value })}
                    placeholder="Цена"></input>

            <label htmlFor="count">Количество</label>
            <input  type="text" 
                    name="count" 
                    id="count" 
                    value={this.state.count}
                    onChange={e => this.setState({ count: e.target.value })}
                    placeholder="Количество"></input>


            <label htmlFor="summ">Сумма</label>
            <input  type="text" 
                    name="summ" 
                    id="summ" 
                    value={this.state.summ}
                    onChange={e => this.setState({ summ: e.target.value })}
                    placeholder="Сумма"></input>

           <p className="status">{this.state.responseToPost}</p>  {/* выводим ответ от сервера  */}
            <button type="submit">Отправить данные</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;