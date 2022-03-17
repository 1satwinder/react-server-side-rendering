import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import path from "path";
import fs from "fs";
import Home from "./src/pages/Home";
import { StaticRouter } from "react-router-dom";
import App from "./src/App";
import {InitialDataContext} from './InitialDataContext';

global.window={};

const app = express();

app.use(express.static("./build", { index: false }));

const articles = [
  {title: 'Article 1', author: 'satwinder'},
  {title: 'Article 2', author: 'talwinder'},
  {title: 'Article 3', author: 'john'},
]

app.get('/api/articles', (req, res) => {
   const loadedArticles = articles;
   res.json(loadedArticles); 
})

app.get("/*", async (req, res) => {

  const contextObj = { _isServerSide: true, _requests: [], _data: {}}
  const reactApp = renderToString(
    <InitialDataContext.Provider value={contextObj}>
      <StaticRouter log={req.url}><App/></StaticRouter>
    </InitialDataContext.Provider>  
  );
  
  await Promise.all(contextObj._requests);
  contextObj._isServerSide = false;
  delete contextObj._requests;

  const templateFile = path.resolve("./build/index.html");
  console.log(templateFile);
  fs.readFile(templateFile, "utf8", (err, data) => {
    if (err) {
      console.log("In If")
      return res.status(500).send(err);
    }
    
    const loadedArticles = articles;
    return res.send(
        data.replace('<div id="root"></div>', `<script>{window.preloadedArticles = ${JSON.stringify(loadedArticles)}}</script><div id="root">${reactApp}</div>`)
      );
    
  });
});

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
