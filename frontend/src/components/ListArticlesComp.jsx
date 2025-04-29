import { useEffect, useRef, useState } from "react"
import ArticleComp from "./ArticleComp"
import { API_href } from "../App.json";

const ListArticlesComp = ({ articles, controller }) => {
    return (
        <>
            <div className="flex flex-wrap justify-center w-full gap-2 mb-3">
                {articles.map((article, key) => (
                    <ArticleComp
                        art={article}
                        key={key}
                        controller={controller}
                    />
                ))}
            </div>
        </>
    )
}

export default ListArticlesComp