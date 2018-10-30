import React, { Component } from 'react';
import ListSentiment from './Hoc/ListSentiment.js';
import { VictoryChart, VictoryStack, VictoryBar } from 'victory';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.subscribeToNewSentiment();
  }
  
  render() {
    const { sentimentList } = this.props;
    const data = sentimentList ? sentimentList.items : [];

    return (
      <div className="App">
        <h1 className="App-Title">
            Facebook messenger sentiment
        </h1>
        <VictoryChart>
          <VictoryStack offset={20}
            colorScale={"qualitative"}
          >
            <VictoryBar horizontal
              data={data.map((item, idx) => 
                ({ x: `User ${idx + 1}`, y: item.positive || 0 }) 
              )}
              style={{
                data: { fill: "#0CCE6B" },
              }}
            />
            <VictoryBar horizontal
              data={data.map((item, idx) => 
                ({ x: `User ${idx + 1}`, y: item.neutral || 0 }) 
              )}
              style={{
                data: { fill: "#17BEBB" },
              }}
            />
            <VictoryBar horizontal
              data={data.map((item, idx) => 
                ({ x: `User ${idx + 1}`, y: item.negative || 0 }) 
              )}
              style={{
                data: { fill: "#D72638" },
              }}
            />

          </VictoryStack>
        </VictoryChart>
      </div>
    );
  }
}

export default ListSentiment(App);
