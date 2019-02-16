import React from 'react'
import Standings from './Components/Standings'
import Team from './Components/Team'
import Match from './Components/Match'
import { Route, Switch, Redirect } from 'react-router-dom'

export const Routes = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/Standings" component={Standings}/>
                <Route exact path="/">
                    <Redirect to="/Standings"/>
                </Route>
                <Route path="/Team/:id" component={Team}/>
                <Route path="/Match/:id" component={Match}/>
            </Switch>
        </div>
    )
}