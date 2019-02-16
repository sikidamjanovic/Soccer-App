import React, { Component } from 'react';
import axios from 'axios'
import { Link, BrowserRouter } from 'react-router-dom'

class Team extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            matches: []
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData(){
        var self = this;
        var header = {
            'Content-Type': 'application/json',
            'X-Auth-Token': '363f304ebcc94151bdad56ea2950eb87' 
        }
        axios.get('http://api.football-data.org/v2/teams/'+this.props.match.params.id, {headers: header})
        .then(function(response){
            self.setState({data: response.data})
        },function(respones) {
            console.log('Error')
        })

        axios.get('http://api.football-data.org/v2/teams/'+this.props.match.params.id+"/matches/", {headers: header})
        .then(function(response){
            self.setState({matches: response.data})
        },function(respones) {
            console.log('Error')
        })
    }

    render() {
        var data = this.state.data
        var matches = this.state.matches
        var map = []
        var map2 = []

        if(this.state.data.hasOwnProperty("squad")){
            map = Array.from(Array(data.squad.length).keys())
        }

        if(matches.hasOwnProperty("matches")){
            map2 = Array.from(Array(matches.matches.length).keys())
        }

        return (
            <div>
                <img src={data.crestUrl}></img>
                <h1>{data.name}</h1>
                <h2>Founded: {data.founded}</h2>
                <h2>Stadium: {data.venue}</h2>
                <table>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Nationality</th>
                    {map.map(i=>{
                        return(
                        <tr>
                            <td>
                                {data.squad[i].name}
                            </td>
                            <td>{data.squad[i].position}</td>
                            <td>{data.squad[i].nationality}</td>
                        </tr>
                    )})}
                </table>

                <table>
                    <th>Home Team</th>
                    <th>Away Team</th>
                    <th>Date</th>
                    {map2.map(i=>{
                        return(
                            <Link to={{ pathname: `/Match/${matches.matches[i].id}`}}>      
                                <tr>
                                    <td>
                                        {matches.matches[i].homeTeam.name}
                                    </td>
                                    <td>{matches.matches[i].awayTeam.name}</td>
                                    <td>{matches.matches[i].utcDate}</td>
                                </tr>
                            </Link>
                    )})}
                </table>
            </div>
        );
    }
}
export default Team;
