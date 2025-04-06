// const { default: axios } = require("axios");

/** */
// import Article from './components/Article.js'
// import axios from 'axios'
//import { useState } from 'react'
//import { render } from 'react-dom'
/*import { Router, Route, browserHistory, IndexRoute  } from 'react-router'*/

const axiosUrl = 'http://localhost/MyShopI/'

let n = 0

const domContainer = document.querySelector('.articles');
const root = ReactDOM.createRoot(domContainer);



//const test = React.createElement('button', {className: 'btn'}, "Bonjour React fusion Babel")
//ReactDOM.render(test, document.querySelector('#appJS2'))
//root.render(test);

const ListArticles = ({ art }) => {
    const [articles, setArticles] = React.useState([])

    React.useEffect(() => {
        fetch(axiosUrl + 'about')
            .then(response => response.json())
            .then(
                data => {
                    setArticles(data)
                }
            )
            .catch(error => console.error('Erreur:', error))
    }, [])
    console.log(articles);

    return (
        <React.Fragment>
            {articles.map((article, key) => <Article art={article} key={key} />)}
        </React.Fragment>
    )
}

function showArticles() {

}


function Compteur() {
    let b = 35
    const [count, setCount] = React.useState(0);

    const handleClick = function (e) {
        console.log('ok')
        e.preventDefault()
        setCount(count + b)
    }

    // return React.createElement('button', { className: 'btn', onclick: handleClick }, 'Bonjour React fusion Babel n°', count)
    return <button onClick={handleClick}>Bonjour React fusion Babel n°{count}</button>
}

const Article = ({ art }) => {
    const location = window.location.href
    const artLink = location + art.id

    const imgLink = location + 'assets/img/articles/' + art.file_name
    return (
        <div className="article animO">
            <div className="art_H">
                <img src={imgLink} alt="Image de l'article" className="art_P" />
            </div>
            <div className="art_D">
                <div className="title">
                    <span className="merch">{art.article}</span>
                    <span className="price"><span>{art.price} FCFA</span></span>
                </div>
                <div className="merch name">
                    <span className="merch lbl">Vendeur :</span>
                    <span>{art.name}</span>
                </div>
                <div className="merch num">
                    <span className="merch lbl">Tél :</span>
                    <span>{art.number}</span>
                </div>
                <div className="merch date">
                    <span className="merch lbl">Ajouté(e) le :</span>
                    <span>{art.date}</span>
                </div>
                <div className="merch date">
                    <span className="merch lbl">Catégorie :</span>
                    <span>{art.content}</span>
                </div>
                <div className="merch date">
                    <span className="merch lbl">État :</span>
                    <span>{art.qty}</span>
                </div>
                {art.qty > 0 && <div className="merch date">
                    <span className="merch">
                        <a href="{artLink}">Ajouter au Panier</a>
                    </span>
                </div>}
            </div>
        </div>
    )
}

root.render(
    <ListArticles />
    //,
    //document.querySelector('#appJS')
)


/*
function render() {
    const lap = React.createElement('h2' , {}, "Bonjour négro n° ", n)
    ReactDOM.render(lap, document.querySelector('#appJS2'))
}
render()
*/

//export default App

/*
function Welcome (props)
{
    return <h1>Bonjour React fusion Babel<h1/>
}

ReactDOM.render(<Welcome/>, document.querySelector('#appJS'))
*/
