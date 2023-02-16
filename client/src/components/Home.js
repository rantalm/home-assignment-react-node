import './Home.scss'
import { Link } from 'react-router-dom'

const Home = () => {
    const countries = [ 'United States', 'China', 'Canada' ]
    return (
        <div>
            <header className='home-header'>
                <h1>Welcom to --- Global Bitcoin News Archive</h1>
                <p>Please select country to view its archive</p>
            </header>
            
            <ul className='countries'>
                { countries.map(country => <li key={ country }>
                    <Link to="archive" state={ { country } } className='country'>
                        <div className='country__item'>
                            <strong>{ country }</strong>
                            <img src={ `https://countryflagsapi.com/png/${ country }` } crossOrigin="anonymous"/>
                        </div>
                    </Link>
                </li>) }
            </ul>
    </div>
    )
}


export default Home