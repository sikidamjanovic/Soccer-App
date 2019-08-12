import React, {Component} from 'react';
import {HorizontalBar} from 'react-chartjs-2'

class Chart extends Component{
    constructor(props){
        super(props);
        this.state = {
            scorers: [],
            xmin: 0
        }
    }

    componentDidMount(){
        this.setState({scorers: this.props.scorers})
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if (this.props.scorers !== prevProps.scorers) {
            this.setState({scorers: this.props.scorers})
        }
    }

    renderChart(){

        let scorers = this.state.scorers
        let max = this.props.maxY
        let dGreen = 'rgb(14, 190, 123)'
        let mGreen = 'rgb(14, 190, 123, 0.5)'
        let lGreen = 'rgb(14, 190, 123, 0.25)'

        if(scorers.length > 0){
            const chartData = {
                labels: [
                    scorers[0].player.name, scorers[1].player.name,
                    scorers[2].player.name, scorers[3].player.name,
                    scorers[4].player.name, scorers[5].player.name,
                    scorers[6].player.name, scorers[7].player.name,
                    scorers[8].player.name, scorers[9].player.name
                ],
                datasets:[{
                    label: "Goals this season",
                    data: [
                        scorers[0].numberOfGoals, scorers[1].numberOfGoals,
                        scorers[2].numberOfGoals, scorers[3].numberOfGoals,
                        scorers[4].numberOfGoals, scorers[5].numberOfGoals,
                        scorers[6].numberOfGoals, scorers[7].numberOfGoals,
                        scorers[8].numberOfGoals, scorers[9].numberOfGoals
                    ],
                    backgroundColor:[
                        // Dark green for top scorer
                        dGreen, 
                        // Medium green for contenders
                        mGreen, mGreen, 
                        mGreen, mGreen, 
                        // Light green for bottom half of list
                        lGreen, lGreen,
                        lGreen, lGreen, lGreen
                    ]
                }]
            }
            return(
                <HorizontalBar
                data={chartData}
                width={100}
                height={300}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{
                            ticks: {
                                max: max,
                                min: 0,
                                stepSize: 2
                            }
                        }]
                    },
                }}
                />
            )
        }
    }

    render(){        
        return (
            <div>
                {this.renderChart()}
            </div>
        )
    }
}

export default Chart;