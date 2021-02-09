import {Container} from "@material-ui/core";
import {ShortInfo} from "./ShortInfo";
import React from "react";
import {routes} from "../api/routes";

type ResourceContainerType = {
  searchValue:string
}

export const ResourceContainer = ({searchValue}:ResourceContainerType) => {

  return (
    <Container>
      {routes.map((rout, index) => {
          return <ShortInfo
            key={rout.endPoint + index}
            endPoint={rout.endPoint}
            value={rout.key}
            searchValue={searchValue}
          />
        })
      }
    </Container>
  )
}