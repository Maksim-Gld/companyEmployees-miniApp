import { Component } from 'react';

import AppFilter from '../app-filter/app-filter';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { name: 'Jonh C.', salary: 800, increase: true, rise: true, id: 1 },
                { name: 'Alex M.', salary: 3000, increase: false, rise: false, id: 2 },
                { name: 'Carl W.', salary: 5000, increase: false, rise: false, id: 3 }
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({ data }) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({ data }) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({ data }) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return { ...item, [prop]: !item[prop] }
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1;
        });
    }

    onUpdateSearch = (term) => {
        this.setState({ term: term });
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'more1k':
                return items.filter(item => item.salary > 1000);
            default:
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({ filter });
    }

    onChangeSalary = (id, salary) => {
        const regExp = /\*|[a-zA-Z]|%|#|&|[.,]|\$/g;
        let newSalary = 0;
        this.setState(({ data }) => ({
            data: data.map(item => {
                console.log('data: ' + data);
                if (item.id === id) {
                    newSalary = salary.replace(regExp, '');
                    return { ...item, salary: newSalary }
                }
                return item;
            })
        }))
    }

    render() {
        const { data, term, filter } = this.state;
        const employers = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return (
            <div className="app" >
                <AppInfo
                    employers={employers}
                    increased={increased} />

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
                </div>

                <EmployersList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    onChangeSalary={this.onChangeSalary} />
                <EmployersAddForm
                    //data={this.state.data}
                    onAdd={this.addItem} />
            </div>
        );
    }
}

export default App;