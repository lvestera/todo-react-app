import React, {Component} from 'react';
import AppHeader from '../app-header';
import TodoList from '../todo-list';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';
import './app.css';

export default class App extends Component {

    maxId = 100;

    createTodoItem = (label) => {
        return {
            label: label,
            important: false,
            done: false,
            id: this.maxId++
        }
    };

    state={
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ]
    };

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id===id);
            const nextArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx+1)
            ];

            return {
                todoData: nextArray
            }
        })
    }

    addItem = (text) => {
        this.setState(({todoData, maxId}) => {
            const newItem=this.createTodoItem(text);
            const nextArray= [ ...todoData, newItem];

            return {
                todoData: nextArray
            }
        })
    }

    toggleProperty = (arr, id, propName) => {

        const idx = arr.findIndex((el) => el.id===id);

        const oldObject=arr[idx];

        const object={...oldObject, [propName]: !oldObject[propName]};

        return [
            ...arr.slice(0, idx),
            object,
            ...arr.slice(idx+1)
        ];
    }

    toggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        })
    }

    toggleDone = (id) => {
        this.setState(({todoData}) => {

            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
    }

    render() {
        const {todoData}=this.state;
        const doneCount=todoData.filter((el)=>el.done).length;
        const todoCount=todoData.length-doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel/>
                    <ItemStatusFilter/>
                </div>

                <TodoList
                    todos={todoData}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.toggleImportant}
                    onToggleDone={this.toggleDone}
                />
                <div className="bottom-panel">
                    <ItemAddForm onAddItemClick={this.addItem}/>
                </div>
            </div>
        );
    }
};
