import {Container, TextField} from "@material-ui/core";
import {ShortInfo} from "./ShortInfo";
import React, {ChangeEvent, useEffect, useState} from "react";
import {routes} from "../api/routes";

export const ResourceContainer = () => {
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
    <Container>
      <TextField
        label='input value'
        onChange={onInput}
        value={inputValue}
      />
      {isDisabled
        ? null
        : routes.map((rout, index) => {
          return <ShortInfo
            key={rout.endPoint + index}
            endPoint={rout.endPoint}
            value={rout.key}
            searchValue={inputValue}
          />
        })
      }
    </Container>
  )
}