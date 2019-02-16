import React, { Component } from 'react';
import { Link, BrowserRouter } from 'react-router-dom'
import axios from 'axios'

class Match extends Component {

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
        axios.get('http://api.football-data.org/v2/matches/'+this.props.match.params.id, {headers: header})
        .then(function(response){
            self.setState({data: response.data})
        },function(respones) {
            console.log('Error')
        })
    }

    render() {
        return (
            <div>
                Hey
            </div>
        );
    }
}
export default Match;
