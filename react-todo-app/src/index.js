import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css'

const url = 'http://127.0.0.1:9001/tasks'

function ListItem(props) {


    if (props.details.completed === '1') {
        return (
            <div className='to-do-item to-do-item-complete'>
                <h4>To Do: {props.details.task}</h4>
                <h4>COMPLETE!</h4>
            </div>
        )
    } else {
        return (
            <div className='to-do-item' data-key={props.details._id}>
                <h4>To Do: {props.details.task}</h4>
                <button onClick={props.completeItem}>Complete!</button>
            </div>
        )
    }
}

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    })
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            const listItems = this.state.items.map((item, i) =>
                <ListItem completeItem={this.completeItem} key={i} details={item}/>
            )
            return (
                <div>
                    {listItems}
                </div>
            )
        }
    }

    completeItem(e) {
        var key = e.target.parentElement.dataset.key
        var targetUrl = url + '/' + key
        var data = {
            completed: "1"
        }
        fetch(targetUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((result) => this.setState({isLoaded: false}))
    }
}

const headerElement = (
    <div className='container'>
        <h1> 2-DU app </h1>
        <p>Now with 100% more React!</p>
        <h3> Todos in progress </h3>
        <ToDoList />
    </div>
);

ReactDOM.render(headerElement, document.getElementById('root'))