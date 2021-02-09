import React, {ChangeEvent, useEffect, useState} from "react";
import "./App.css";
import {Container, TextField} from "@material-ui/core";
import {BrowserRouter, Route} from "react-router-dom"
import {ResourceContainer} from "./components/ResourceContainer";
import {DetailedInfo} from "./components/DetailedInfo";
import {routes} from "./api/routes";

function App() {
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [inputValue, setInputValue] = useState<string>("")

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(() => e.target.value)
  }

  useEffect(() => {
    if (inputValue.length >= 3) {
      setIsDisabled(false)
    } else if (inputValue.length < 3) {
      setIsDisabled(true)
    }
  }, [inputValue])
  return (
    <BrowserRouter>
      <div className="App">

        <TextField
          label='input value'
          onChange={onInput}
          value={inputValue}
        />

        <Container>

          <>
            {isDisabled
              ? null
              : <>
                <Route
                  exact path="/"
                  render={() => <ResourceContainer searchValue={inputValue}/>}/>
                {routes.map(rout => {
                  return <Route
                    key={rout.endPoint}
                    path={`/${rout.endPoint}/:id?`}
                    render={() => <DetailedInfo endPoint={rout.endPoint}/>}/>
                })}
              </>
            }
          </>

        </Container>

      </div>
    </BrowserRouter>
  );
}

export default App;
