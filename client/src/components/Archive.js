import './Archive.scss'
import moment from 'moment'
import { useEffect, useState, useRef  } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Article from './Article'
import Loader from './Loader'
import { fetchNews } from '../utils/api'

const Home = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [ news, setNews ] = useState([])
    const [ currentArticleId, setCurrentArticleId ] = useState(null)
    const [ currentArticleTitle, setCurrentArticleTitle ] = useState('')
    const [ loading, setLoading ] = useState(true)
    const country = location?.state?.country
    const [ showModal, setShowModal ] = useState(false)
    const listContainer = useRef(null)
    const [ continueLoading, setContinueLoading] = useState(true)
    const term = 'bitcoin'

    useEffect(()=> {
        country ? getRelatedNews() : navigate('/')
    }, [])

    const getRelatedNews = (count = 5, offset = news.length)=> {
        setLoading(true)
        const prevNews = news
        fetchNews(term, country, count, offset)
        .then(freshNews => {
            if(!freshNews.length || freshNews.length < count)
                setContinueLoading(false)

            freshNews.length && setNews(prevNews.concat(freshNews))
            setLoading(false)
        })
        .catch(err => console.log(err))
    }

    const resetModal = () => {
        setShowModal(false)
        setCurrentArticleId(null)
        setCurrentArticleTitle('')
    }

    const formatAuthor = author => {
        if (author.includes('http')) {
            const matches = author.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)
            return matches && matches[1]
        }

        return author
    }

    const formatDate = date => {
        const d = new Date(date)
        return d.toISOString().split('T')[0]
    }

    const openModal = async (id, title) => {
        setCurrentArticleId(id)
        setCurrentArticleTitle(title)
        setShowModal(true)
    }

    const onScroll = (e) => {
        const { target: el } = e
        if(el.scrollHeight - el.scrollTop === el.clientHeight && continueLoading) {
           getRelatedNews()
        }
    }

    return (
        <div className="container">
            <div className='archive'>
                <header className="archive__header">
                    <h1>{ country } Bitcoin news Archive</h1>
                </header>
                <main className="archive__list" ref={ listContainer } onScroll={ onScroll }>
                    { loading && <Loader /> }
                    { !!news.length && news.map(item => <div role="button" tabIndex="0" key={ item._id }className="archive__item"  onClick={ () => openModal(item._id, item.title) }>
                        <img src={ item.url_to_image } />
                        <div className="archive__content">
                            <div className='archive__top'>
                                <h2>{ item.title }</h2>
                                { !!item.author && <strong>by: { formatAuthor(item.author) }</strong> }
                                <strong>published: { formatDate(item.published_at) } ({ moment(new Date(item.published_at)).fromNow() })</strong>
                            </div>
                            <p className='archive__description'>{ item.description }</p>
                        </div>

                    </div>) }
                </main>
            </div>
            <footer className='archive-footer'>
                <Link to="/">Go Back</Link>
                <button onClick={ e => getRelatedNews() }>&#8635;</button>
            </footer>
            { showModal && <Article id={ currentArticleId } title={ currentArticleTitle } close={ resetModal } /> }
        </div>
    )
}

export default Home