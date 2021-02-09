import React from "react";
import "./App.css";
import {Container} from "@material-ui/core";
import {BrowserRouter, Route} from "react-router-dom"
import {ResourceContainer} from "./components/ResourceContainer";
import {DetailedInfo} from "./components/DetailedInfo";
import {routes} from "./api/routes";

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Container>
          <>
            <Route exact path="/" render={() => <ResourceContainer/>}/>
            {routes.map(rout => {
              return <Route
                key={rout.endPoint}
                path={`/${rout.endPoint}/:id?`}
                render={() => <DetailedInfo endPoint={rout.endPoint}/>}/>
            })}
          </>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
