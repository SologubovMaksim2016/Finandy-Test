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
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('/api/hello');
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
          console.dir(r);
           

    }) 
    
    // const response = await fetch('/api/data', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ data: this.state }),
    // });
    // debugger;
    // const body = await response.body.json();
    // debugger;
    // 



  };
  
render() {
  
    // console.log(this.state.response)
    console.log(this.state.responseToPost)
    // console.log(this.state.price)
    // console.log(this.state.count)
    // console.log(this.state.summ)
    return (
      <div className="App">
        <header className="App-header">
         
        </header>
        

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

        {/* <form onSubmit={this.handleSubmit} className="container">
        <div>
           <div class="label">
            <strong>Цена: </strong>
          </div>
          <input
            class="input"
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />            
        </div>
        <div>
        <div class="label">
            <strong>Количество: </strong>
          </div>
          <input
            class="input"
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />     
          
        </div>
        <div>
        <div class="label">
            <strong>Сумма: </strong>
          </div>
          <input
          class="input"
          type="text"
          value={this.state.post}
          onChange={e => this.setState({ post: e.target.value })}
        />     
        </div>
       
        <button type="submit">Submit</button>
      </form> */}

        {/* <form onSubmit={this.handleSubmit}>
          <div>
             <label>
              <strong>Цена: </strong>
            </label>
            <input
              type="text"
              value={this.state.post}
              onChange={e => this.setState({ post: e.target.value })}
            />            
          </div>
          <div>
          <label>
              <strong>Количество: </strong>
            </label>
            <input
              type="text"
              value={this.state.post}
              onChange={e => this.setState({ post: e.target.value })}
            />
            
          </div>
          <div>
          <label>
              <strong>Сумма: </strong>
            </label>
            <input
              type="text"
              value={this.state.post}
              onChange={e => this.setState({ post: e.target.value })}
            />
          </div>
         
          <button type="submit">Submit</button>
        </form> */}
       <p style={{color : 'blue'}}><b>{this.state.responseToPost}</b></p>
</div>
    );
  }
}

export default App;