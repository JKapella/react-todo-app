import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css'


function ListItem(props) {
    return (
        <div key={props.details._id}>
            <h4>{props.details.task}</h4>
            <button>Complete!</button>
        </div>
    )
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
        fetch('http://127.0.0.1:9001/tasks')
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
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
            console.log(this.state)
            const listItems = this.state.items.map((item, i) =>
                <ListItem key={i} details={item}/>
            )
            return (
                <div>
                    {listItems}
                </div>
            )
        }
    }
}

const headerElement = (
    <div>
        <h1> App, but now with React! </h1>
        <h3> Todos in progress </h3>
        <ToDoList />
    </div>
);

ReactDOM.render(headerElement, document.getElementById('root'))