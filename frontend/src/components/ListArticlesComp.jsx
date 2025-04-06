import { useEffect, useRef, useState } from "react"
import ArticleComp from "./ArticleComp"
import { API_href } from "../App.json";

const ListArticlesComp = ({ articles }) => {
    const articlesRef = useRef([]);

    useEffect(() => {
        // Assurez-vous que articlesRef.current est bien un tableau avec des éléments
        // console.log('articlesRef.current:');
        // console.log(articlesRef.current);

        // Vérifiez si le premier élément existe avant d'y accéder
        if (articlesRef.current && articlesRef.current.length > 0 && articlesRef.current[0]) {
            console.log('Hauteur du premier article:', articlesRef.current[0].offsetHeight);
        } else {
            console.log("Le premier élément de la référence n'existe pas encore");
        }

        // Pour afficher la hauteur de tous les articles
        articlesRef.current.forEach((el, index) => {
            if (el) {
                console.log(`Hauteur de l'article ${index}:`, el.offsetHeight);
            }
        });
    }, []); // Ajout de articles comme dépendance

    return (
        <>
            <div className="flex flex-wrap justify-center w-full">
                {articles.map((article, key) => (
                    <ArticleComp
                        art={article}
                        key={key}
                        ref={(el) => {
                            articlesRef.current[key] = el;
                        }}
                    />
                ))}
            </div>
        </>
    )
}

export default ListArticlesComp