import React from 'react'
import Standings from './Components/Standings'
import { Route, Switch, Redirect } from 'react-router-dom'

export const Routes = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/Standings" component={Standings}/>
                <Route exact path="/">
                    <Redirect to="/Standings"/>
                </Route>
            </Switch>
        </div>
    )
}