import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useGetResource} from "../api/api";
import {isArray} from "util";
import {Grid, Paper} from "@material-ui/core";
import {useStyles} from "./ShortInfo";

type DetailedInfoType = {
  endPoint: string
}

export const DetailedInfo = React.memo((props: DetailedInfoType) => {

  const id = useParams<{ id: string }>()
  const classes = useStyles();
  const data = useGetResource()
  const [renderData, setRenderData] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    data
      .request(props.endPoint, +id.id)
      .then(res => setRenderData(res))
  }, [])

  const keys = Object.keys(renderData).filter(key => {
    return !isArray(renderData[key])
  })


  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <Grid
        container
        className={classes.root}
        justify={"center"}>

        {data.isLoading
          ? "Loading. Please, wait..."
          : <Paper
            elevation={6}
            style={{width: "max-content", padding: "30px"}}>

            {keys.map((key, index) => {
              return (
                <Paper
                  key={index}
                  style={{margin: "20px 0", padding: "0 10px"}}>
                  <Grid
                    container
                    justify={"space-around"}
                    spacing={2}
                    direction={"row"}>
                    <Grid item>
                      <Paper
                        className={classes.paper}
                        variant={"outlined"}>

                        {key}

                      </Paper>
                    </Grid>
                    <Grid item>
                      <Paper
                        className={classes.paper}
                        variant={"outlined"}>

                        {renderData[key]}

                      </Paper>
                    </Grid>
                  </Grid>
                </Paper>
              )
            })
            }

          </Paper>
        }

      </Grid>
    </div>
  )
})