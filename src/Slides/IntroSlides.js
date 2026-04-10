import { React, Component } from 'react';
import Slide from '../Components/RevealComponents/Slide';
import { $, $$ } from '../Animation/Typeset';
import ManualTool from '../Animation/ManualTool';
import AutoTool from '../Animation/AutoTool';
import ToggleForward from '../Animation/ToggleForward';
import { Element } from 'react-scroll';
import {
  Box,
  Typography,
  Grid,
} from '@material-ui/core';

/* Assets imports */
import summarySVG from './assets/summary.svg';
import forwardKeySVG from './assets/diagramSVG/forward-key.svg';
import forwardNoKeySVG from './assets/diagramSVG/forward.svg';
import forwardComputationSVG from './assets/diagramSVG/forwardComputation.svg';
import backwardKeySVG from './assets/diagramSVG/backward-key.svg';
import backwardNoKeySVG from './assets/diagramSVG/backward.svg';
import backwardComputationSVG from './assets/diagramSVG/backwardComputation.svg';
import contourExplain from './assets/contour-explain.svg';
import gdExplain from './assets/gd-explain.svg';

const divStyle = {
  display: 'flex',
  alignItems: 'center',
};
class IntroSlides extends Component {
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

  render() {
    const { weightColor, biasColor, lossColor } = this.state;
    return (
      <>
        <Slide>
          <Slide>
            <h3>深度学习基础</h3>
            <h5>神经网络</h5>
            <p>
              神经网络就是通过调整{' '}
              <em style={{ color: weightColor }}>weight</em> 和
              <em style={{ color: biasColor }}>bias</em> 来使用我们所定义的
              <em style={{ color: lossColor }}>loss</em> 函数逐渐变小直到最小
            </p>
            <p>
              <Grid container spacing={24} alignItems="center">
                <Grid item xs={16}>
                  <Box>
                    {$$(
                      '\\text{MSE} = \\frac{1}{J}\\sum_{i = 1}^{J}(\\hat{y_i} - y_i)^2',
                    )}
                    <Typography variant="body1">
                      <b>Input Variables</b>
                      <br />
                      length of data {$('J')}
                      <br />
                      index {$('i')}
                      <br />
                      predicted values {$('\\hat{y}')}
                      <br />
                      true values {$('y')}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box>
                    {$$('\\text{neuron}(x) = w_0x + b ')}
                    <Typography variant="body1">
                      <b>Neuron as a Function</b>
                      <br />
                      input {$('x')}
                      <br />
                      output {$('\\text{neuron}(x)')}
                      <br />
                      <b>Tunable Parameters</b>
                      <br />
                      weight {$('w_0')}
                      <br />
                      bias {$('b')}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </p>
            <img width="400px" src="image/1219/linear_model.png" />
          </Slide>

          <Slide>
            <h3>深度学习基础</h3>
            <h5>Weight and Bias on One Neuron</h5>
            <br></br>
            <Element name="structMan">
              <ManualTool />
            </Element>
          </Slide>

          <Slide>
            <h3>深度学习基础</h3>
            <h5>反向传播举例</h5>
            <ToggleForward
              title={<Typography variant="h5">Forward Overview</Typography>}
              noKeySVG={forwardNoKeySVG}
              keySVG={forwardKeySVG}
            />
          </Slide>
          <Slide>
            <h3>深度学习基础</h3>
            <h5>反向传播举例</h5>
            <ToggleForward
              title={<Typography variant="h5">Forward Overview</Typography>}
              noKeySVG={forwardNoKeySVG}
              keySVG={forwardKeySVG}
            />
          </Slide>
          <Slide>
            <h3>深度学习基础</h3>
            <h5>反向传播举例</h5>
            <p>
              ({$('x = 2.1')}, {$('y = 4')}), the weight will be {$('w = 1')},
              and the bias will be {$('b = 0')}.
            </p>
            <img
              src={forwardComputationSVG}
              width="60%"
              alt="forward computation"
            />
          </Slide>

          <Slide>
            <h3>深度学习基础</h3>
            <h5>反向传播举例</h5>
            <ToggleForward
              title={<Typography variant="h5">Backward Overview</Typography>}
              noKeySVG={backwardNoKeySVG}
              keySVG={backwardKeySVG}
            />
            <br />
          </Slide>

          <Slide>
            <h3>深度学习基础</h3>
            <img
              src={backwardComputationSVG}
              width="60%"
              alt="backward computation"
            />
            <p>
              {$$('\\frac{\\partial \\text{loss}}{\\partial w} = -7.98')}
              {$$('\\frac{\\partial \\text{loss}}{\\partial b} = -3.8')}
              {$$(
                'w := w - \\text{lr} \\cdot \\frac{\\partial \\text{loss}}{\\partial w} = (1) - (0.01) \\cdot (-7.98) = 1.0798',
              )}
              {$$(
                'b := b - \\text{lr} \\cdot \\frac{\\partial \\text{loss}}{\\partial b} = (0) - (0.01) \\cdot (-3.8) = 0.038 ',
              )}
              {$$('\\text{loss} = ((1.0798)(2.1) + 0.038) - 4)^2 = 2.87')}
            </p>
            <p>{$('lr')} 为学习率是手动指定的</p>
          </Slide>

          <Slide>
            <h3>深度学习基础</h3>
            <h5>Weight and Bias on One Neuron</h5>
            <br></br>
            <Element name="structMan">
              <AutoTool />
            </Element>
          </Slide>
          <Slide>
            <h3>深度学习基础</h3>
            <h5>非线性模型</h5>

            <ul>
              <li>
                相对于使用线性求和
                {$$('\\hat{y}=\\sum_j(w_jx_j+d_j)')}
              </li>
              <li>
                增加一个非线性函数(也被称为激活函数)使得模型非线性化{' '}
                {$$('\\hat{y}=f(\\sum_j(w_jx_j+d_j))')}
              </li>

              <li>
                激活函数 {$('f')}
                {$$('\\tanh(x)')}
                <br></br>
                {$$('\\text{sigmoid}(x)=\\frac{1}{1+e^{-x}}')}
              </li>
            </ul>
          </Slide>
          <Slide>
            <h3>深度学习基础</h3>
            <h5>什么深度学习</h5>
            <Box display="flex" justifyContent="center">
              <Box>
                <img alt="summary" src={summarySVG} width="100%" />
              </Box>
            </Box>
          </Slide>
        </Slide>

      </>
    );
  }
}

export default IntroSlides;
