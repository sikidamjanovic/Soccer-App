import React, { Component } from 'react';
import { Link, BrowserRouter } from 'react-router-dom'
import axios from 'axios'

class Standings extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: []
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
        axios.get('http://api.football-data.org/v2/competitions/2021/standings', {headers: header})
        .then(function(response){
            self.setState({data: response.data.standings[0].table})
        },function(respones) {
            console.log('Error')
        })
    }

    render() {
        var map = Array.from(Array(this.state.data.length).keys())
        return (
            <div className="App">
                <table>
                    <tr>
                        <th>Team</th>
                        <th>Wins</th>
                        <th>Draws</th>
                        <th>Losses</th>
                        <th>GP</th> 
                        <th>Points</th>
                    </tr>
                    {map.map(i=>{
                        return<tr>
                                <td>
                                    <Link to={{ pathname: `/Team/${this.state.data[i].team.id}`}}>
                                        {this.state.data[i].team.name}
                                    </Link>
                                </td>
                                <td>{this.state.data[i].won}</td>
                                <td>{this.state.data[i].draw}</td>
                                <td>{this.state.data[i].lost}</td>
                                <td>{this.state.data[i].playedGames}</td>
                                <td>{this.state.data[i].points}</td>
                              </tr>
                    })}
                </table>
            </div>
        );
    }
}
export default Standings;
