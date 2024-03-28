import './app-info.css';

const AppInfo = ({ employers, increased }) => {
    return (
        <div className="app-info">
            <h1>Employers of company</h1>
            <h2>Total employers: {employers}</h2>
            <h2>Salary bonus: {increased}</h2>
        </div>
    )
}

export default AppInfo;