import React,{useState, useEffect} from 'react'

function Articles() {
  const [articles, setArticles] = useState(window && window.preloadedArticles);
  
  useEffect(() =>{
    if( window && !window.preloadedArticles){
      console.log('No preloaded articles found, loading from server');
      fetch('/api/articles')
      .then(res => res.json())
      .then(data => setArticles(data))
    }
  },[]);

  return (
    <>
    <div>Articles Page</div>
    {articles && articles.map(article =>
      <div key={article.title}>
        <h3>{article.title}</h3>
        <p>{article.author}</p>
      </div>
      )}
    </>
  )
}

export default Articles;