import './employers-list.css';
import EmployersListItem from '../employers-list-item/employers-list-item';

const EmployersList = ({ data, onDelete, onToggleProp, onChangeSalary }) => {
    const elements = data.map(item => {
        const { id, ...itemProps } = item
        return (
            <EmployersListItem
                key={id}
                {...itemProps}
                onDelete={() => onDelete(id)}
                onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}
                onChangeSalary={(e) => onChangeSalary(id, e.currentTarget.value)} />
        )
    })

    return (
        <ul className="app-list list-goup">
            {elements}
        </ul>
    )
}

export default EmployersList;