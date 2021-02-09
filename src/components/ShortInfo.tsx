import {responseDataType, useGetResource} from "../api/api"
import React, {useEffect, useState} from "react";
import {createStyles, Grid, makeStyles, Paper, Theme} from "@material-ui/core";
import {NavLink} from "react-router-dom";

type ShortInfoPropsType = {
  endPoint: string
  value: string
  searchValue: string
}

type peopleType = {
  [key: string]: string
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: 30,
    },
    paper: {
      height: 30,
      minWidth: 200,
      padding: "10px 10px",
    },
  }),
);


export const ShortInfo = React.memo((props: ShortInfoPropsType) => {
    const data = useGetResource()
    const classes = useStyles();
    const [renderData, setRenderData] = useState<Array<peopleType> | null>(null)

    useEffect(() => {
      data
        .request(props.endPoint)
        .then((res: responseDataType) => setRenderData([...res.results]))
    }, [])

    const stringHandler = (str: string, template: string) => {
      let arr = []
      if (str.indexOf(template, 0) > -1) {
        arr = str.split(template)
        return (
          arr.map((i, index) => {
            if (index === arr.length - 1) {
              return <span>{i}</span>
            } else {
              return <>
                <span>{i}</span>
                <span><b>{template}</b></span>
              </>
            }
          }))
      } else {
        return str
      }
    }

    return (
      <div style={{display: "flex", justifyContent: "center"}}>
        <Grid
          container className={classes.root}
          justify={"center"}>

          {data.isLoading
            ? "Loading. Please, wait..."
            : <Paper
              elevation={6}
              style={{width: "max-content", padding: "30px"}}>

              {renderData?.map((i, index) => {
                return (
                  <NavLink
                    key={index}
                    to={`/${props.endPoint}/${index + 1}`}>
                    <Paper style={{margin: "20px 0", padding: "0 10px"}}>
                      <Grid
                        container
                        justify={"space-around"}
                        spacing={2}
                        direction={"row"}>
                        <Grid item>
                          <Paper
                            className={classes.paper}
                            variant={"outlined"}>

                            {stringHandler(i[props.value], props.searchValue)}

                          </Paper>
                        </Grid>
                        <Grid item>
                          <Paper
                            className={classes.paper}
                            variant={"outlined"}>

                            {props.endPoint}

                          </Paper>
                        </Grid>
                      </Grid>
                    </Paper>
                  </NavLink>
                )
              })
              }
            </Paper>
          }

        </Grid>
      </div>
    )
  }
)
