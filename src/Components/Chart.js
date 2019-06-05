import React, {Component} from 'react';
import {HorizontalBar, Line, Pie} from 'react-chartjs-2'

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

    render(){
        let chart = []
        let max = this.props.maxY
        if(this.state.scorers.length > 0){
            const chartData = {
                labels: [this.state.scorers[0].player.name,
                         this.state.scorers[1].player.name, 
                         this.state.scorers[2].player.name,
                         this.state.scorers[3].player.name,
                         this.state.scorers[4].player.name,
                         this.state.scorers[5].player.name,
                         this.state.scorers[6].player.name, 
                         this.state.scorers[7].player.name,
                         this.state.scorers[8].player.name,
                         this.state.scorers[9].player.name],
                datasets:[
                    {
                        label: "Goals this season",
                        data: [
                            this.state.scorers[0].numberOfGoals,
                            this.state.scorers[1].numberOfGoals,
                            this.state.scorers[2].numberOfGoals,
                            this.state.scorers[3].numberOfGoals,
                            this.state.scorers[4].numberOfGoals,
                            this.state.scorers[5].numberOfGoals,
                            this.state.scorers[6].numberOfGoals,
                            this.state.scorers[7].numberOfGoals,
                            this.state.scorers[8].numberOfGoals,
                            this.state.scorers[9].numberOfGoals
                        ],
                        backgroundColor:[
                            'rgb(14, 190, 123)',
                            'rgb(14, 190, 123, 0.5)',
                            'rgb(14, 190, 123, 0.5)',
                            'rgb(14, 190, 123, 0.5)',
                            'rgb(14, 190, 123, 0.5)',
                            'rgb(14, 190, 123, 0.25)',
                            'rgb(14, 190, 123, 0.25)',
                            'rgb(14, 190, 123, 0.25)',
                            'rgb(14, 190, 123, 0.25)',
                            'rgb(14, 190, 123, 0.25)',
                        ]
                    }
                ]
            }
            chart = <HorizontalBar
                        data={chartData}
                        width={100}
                        height={300}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                xAxes: [{
                                ticks: {
                                    max: max,
                                    min: 8,
                                    stepSize: 2
                                }
                                }]
                            },
                        }}
                    />
        }
        
        return (
            <div>
                {chart}
            </div>
        )
    }
}

export default Chart;