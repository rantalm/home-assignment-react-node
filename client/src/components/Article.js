import './Article.scss'

import { useEffect, useState } from "react"
import { fetchArticle } from '../utils/api'

const Article = props => {

    const [ content, setContent ] = useState('')
    
    useEffect(()=> {
        fetchArticle(props.id)
        .then(data => setContent(data.content))
    }, [])

    return <aside className="article">
                <div className="article__inner">
                    <button onClick={ props.close }>&times;</button>
                    <h3>{ props.title }</h3>
                    <p>{ content }</p>
                </div>
            </aside>
}

export default Article