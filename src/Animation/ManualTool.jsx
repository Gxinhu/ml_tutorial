/*
	Donny Bertucci: @xnought
	Summary:
		This file is designed to generate the component for the manial linear scatter exercise
*/
import { Card, CardContent, Slider, Button } from '@mui/material';
import React, { Component } from 'react';
import { ScatterPlot } from './exports';
import { $ } from './Typeset';
import * as tf from '@tensorflow/tfjs';

class LinearScatter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: -0.82,
      bias: -0.02,
      loss: 0,
      domain: [],
      range: [],
      line: [],
      show: false,
      width: 400,
      biasColor: '#FFA500',
      weightColor: '#56A8C7',
      lossColor: 'red',
    };
  }

  loss(y, yPred, len) {
    const outputLoss = tf.tidy(() => {
      const yTensor = tf.tensor(y);
      const yPredTensor = tf.tensor(yPred);
      return (
        (1 / (2 * len)) *
        tf.sum(tf.pow(tf.sub(yPredTensor, yTensor), 2)).dataSync()[0]
      );
    });
    return outputLoss;
  }

  computeLine(weight, bias, domain) {
    const line = (x) => weight * x + bias;
    const output = new Array(domain.length);
    for (let i = 0; i < domain.length; i++) {
      output[i] = line(domain[i]);
    }
    return output;
  }

  range(start, stop, increment) {
    const array = [];
    for (let i = start; i <= stop; i += increment) array.push(i);
    return array;
  }

  dataGenerator() {
    const initDomain = this.range(-1, 1, 0.1);
    const initRange = this.computeLine(0.65, -0.3, initDomain);
    const initLine = this.computeLine(
      this.state.weight,
      this.state.bias,
      initDomain,
    );
    const loss = this.loss(initRange, initLine, initRange.length);
    this.setState({
      domain: initDomain,
      range: initRange,
      line: initLine,
      loss,
    });
  }

  componentDidMount() {
    this.dataGenerator();
  }

  render() {
    const {
      domain,
      range,
      bias,
      weight,
      line,
      loss,
      show,
      width,
      weightColor,
      biasColor,
      lossColor,
    } = this.state;
    const panelWidth = 320;
    const gap = 60;
    const totalWidth = width + panelWidth + gap;

    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: `${totalWidth}px`,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            margin: '0 auto',
            gap: `${gap}px`,
          }}
        >
          <div
            style={{
              width: `${width}px`,
              flex: `0 0 ${width}px`,
              display: 'flex',
              justifyContent: 'flex-start',
              filter: `blur(${show ? 0 : 25}px)`,
            }}
          >
            <ScatterPlot
              width={width}
              height={width}
              padding={0}
              start={-1}
              stop={1}
              X={domain}
              y={range}
              yhat={line}
              id={69}
              select={-1}
              duration={0}
            />
          </div>

          <div
            style={{ width: `${panelWidth}px`, flex: `0 0 ${panelWidth}px` }}
          >
            <Card variant="outlined">
              <CardContent>
                <p style={{ fontSize: 16, lineHeight: 1.45 }}>
                  手动调整 <em style={{ color: weightColor }}> weight </em> 和{' '}
                  <em style={{ color: biasColor }}> bias </em>从而使得{' '}
                  <em style={{ color: lossColor }}> loss </em> 为 0
                </p>
                <Slider
                  style={{ color: weightColor }}
                  value={weight}
                  onChange={(e, n) => {
                    const newLine = this.computeLine(n, bias, domain);
                    const newLoss = this.loss(range, newLine, range.length);
                    this.setState({
                      weight: n,
                      line: newLine,
                      loss: newLoss,
                    });
                  }}
                  min={-1}
                  step={0.01}
                  max={1}
                  valueLabelDisplay="auto"
                  size="small"
                />
                <Slider
                  style={{ color: biasColor }}
                  value={bias}
                  onChange={(e, n) => {
                    const newLine = this.computeLine(weight, n, domain);
                    const newLoss = this.loss(range, newLine, range.length);
                    this.setState({
                      bias: n,
                      line: newLine,
                      loss: newLoss,
                    });
                  }}
                  min={-1}
                  step={0.01}
                  valueLabelDisplay="auto"
                  max={1}
                  size="small"
                />

                <p style={{ fontSize: 16, lineHeight: 1.45 }}>
                  {$('\\text{neuron}(x) = ')}
                  <em style={{ color: weightColor }}>{$(`${weight}`)}</em>
                  {$('x + ')}
                  <em style={{ color: biasColor }}>{$(`${bias}`)}</em>
                </p>
                <p
                  style={{
                    fontSize: 16,
                    lineHeight: 1.45,
                    wordBreak: 'break-word',
                  }}
                >
                  <i style={{ color: lossColor }}>loss</i>
                  {$(` = \\frac{1}{J}\\sum_{i = 1}^J (\\hat{y_i} - y_i)^2 =`)}
                  <em style={{ color: lossColor }}>
                    {' '}
                    {$(`${loss.toFixed(7)}`)}
                  </em>
                </p>

                <Button
                  size="small"
                  variant="outlined"
                  style={{
                    borderColor: '#175676',
                    color: '#175676',
                  }}
                  onClick={() => {
                    this.setState({ show: !show });
                  }}
                >
                  Click to Reveal Graph
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default LinearScatter;
