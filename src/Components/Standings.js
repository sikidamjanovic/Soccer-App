import React, { Component } from 'react';
import { Container, Row, Col} from 'reactstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chart from '../Components/Chart'
import axios from 'axios'
import '../css/standings.css';
import Skeleton from 'react-loading-skeleton';
import Footer from '../Components/Footer'
var Loader = require('react-loader');
var crests = []

class Standings extends Component {
    constructor(props) {
        super(props)
        this.handleSelect = this.handleSelect.bind(this)
        this.state = {
            competition: '2021',
            data: [],
            standings: [],
            scorers: [],
            loaded: false
        }
    }

    componentDidMount() {
        this.fetchData()
        this.collectCrests()
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if (this.state.competition !== prevState.competition) {
          this.fetchData();
        }
    }

    fetchData(){
        var self = this;
        var header = {
            'Content-Type': 'application/json',
            'X-Auth-Token': '363f304ebcc94151bdad56ea2950eb87' 
        }
        axios.get('https://api.football-data.org/v2/competitions/'+this.state.competition+'/standings', {headers: header})
        .then(function(response){
            self.setState({data: response.data, standings: response.data.standings[0].table})
            self.loadChart()
        },function(respones) {
            console.log('Error')
        })

        axios.get('https://api.football-data.org/v2/competitions/'+this.state.competition+'/scorers', {headers: header})
        .then(function(response){
            self.setState({scorers: response.data, loaded: true})
        },function(respones) {
            console.log('Error')
        })
    }

    loadChart(){
        if(this.state.scorers.hasOwnProperty('scorers')){
            return <Paper><Chart scorers={this.state.scorers.scorers}/></Paper>
        }else{
            return <Skeleton height={300}/>
        }
    }

    handleSelect(event){
        this.setState({competition: event.target.value, loaded: false})
    }

    loadLeague(){
        if(this.state.data.hasOwnProperty('competition')){
            return(
                <div>
                    <h1 className="leagueTitle">{this.state.data.competition.name}</h1>
                    <h1 className="leagueCountry">{this.state.data.competition.area.name} D1</h1>
                </div>
            )
        }else{
            return <Skeleton height={100}/>
        }
    }

    collectCrests(){
        var obj = {}
        for (var i = 0; i < this.state.standings.length; i++) {
            obj["id"] = this.state.standings[i].team.id
            obj["crest"] = this.state.standings[i].team.crestUrl
            crests.push(obj)
        }
    }

    loadTable(){
        var map = Array.from(Array(this.state.standings.length).keys())
        if(this.state.scorers.hasOwnProperty('scorers')){
            return(
                <Paper>
                <Table className="table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">Position</TableCell>
                    <TableCell align="left">Team</TableCell>
                    <TableCell align="center">Wins</TableCell>
                    <TableCell align="center">Draws</TableCell>
                    <TableCell align="center">Losses</TableCell>
                    <TableCell align="center">GP</TableCell>
                    <TableCell align="center">Points</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {map.map(row => (
                    <TableRow key={row.id}>
                        <TableCell align="center">{this.state.standings[row].position}</TableCell>
                        <TableCell align="left">
                            <img className="crest" alt="" src={this.state.standings[row].team.crestUrl}></img>
                            {this.state.standings[row].team.name}
                        </TableCell>
                        <TableCell align="center">{this.state.standings[row].won}</TableCell>
                        <TableCell align="center">{this.state.standings[row].draw}</TableCell>
                        <TableCell align="center">{this.state.standings[row].lost}</TableCell>
                        <TableCell align="center">{this.state.standings[row].playedGames}</TableCell>
                        <TableCell align="center">{this.state.standings[row].points}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
                </Paper>
            )
        }else{
            return <Skeleton height={500}/>
        }
    }

    render() {
        return (
            <div className="standings">
                <div className="loaderOverlay">
                    <Loader color={'#000'} loaded={this.state.loaded}></Loader>
                </div>
                <Container>
                    <Row>
                        <Col sm={{ size: 12, offset: 0}} xs={{ size: 12 }}>
                            {this.loadLeague()}
                            <select value={this.state.competition} onChange={this.handleSelect}>
                            <option value="2021">Premier League</option>
                            <option value="2002">Bundesliga</option>
                            <option value="2015">Ligue 1</option>
                            <option value="2014">La Liga</option>
                            <option value="2019">Serie A</option>
                            </select>
                        </Col>
                    </Row>
                    <Row className="chartContainer">
                        <Col sm={{ size: 12, offset: 0}}>
                            {this.loadChart()}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={{ size: 12, offset: 0}}>
                            {this.loadTable()}
                        </Col>
                    </Row>
                </Container>
                <Footer/>
            </div>
        );
    }
}
export default Standings;
