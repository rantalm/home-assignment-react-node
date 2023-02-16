import axios from  'axios'

const baseUrl = 'http://localhost:5500/api/news'

/**
 * 
 * @param { String } term 
 * @param { String } country 
 * @param { Number } count 
 * @param { number } offset 
 * 
 * @returns { Promise } 
 */

export const fetchNews = (term, country, count = 5, offset = 0) => {
    
    return new Promise(async (resolve, reject) => {
        try {
           const res = await axios.get(`${baseUrl}/${term}/${country}`, {
            params: {
                offset,
                count
            }})

           resolve(res.data)
        } catch(err) {
            reject(err)
        }
    })
}

/**
 * @param { String } term 
 * 
 * @returns { Promise } 
 */
export const fetchArticle = id => {

    return new Promise(async (resolve, reject) => {
        try {
           const res = await axios.get(`${baseUrl}/${id}`)
           resolve(res.data)
        } catch(err) {
            reject(err)
        }
    })
}