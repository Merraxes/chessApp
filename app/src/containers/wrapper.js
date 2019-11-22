import React from 'react'
import {Route, Switch, BrowserRouter, Link} from 'react-router-dom'
  import routes from '../routes.js'

export default function Wrapper(){
    return(
        <React.Fragment>
          <BrowserRouter>
            <Switch>
              {routes.map((r,i) => {
                  return r.Component ? (
                    <Route 
                      key={i} 
                      path={r.path} 
                      exact={r.exact}
                      render={p => <r.Component{...p}/>}
                    /> 
                  ) : null;
              })}
             </Switch>
        </BrowserRouter>  
      </React.Fragment>
    );
}