import React, { Component } from 'react';
import { Slide } from '@revealjs/react';
import { $, $$ } from '../Animation/Typeset';
import ManualTool from '../Animation/ManualTool';
import AutoTool from '../Animation/AutoTool';
import ToggleForward from '../Animation/ToggleForward';
import { Element } from 'react-scroll';
import { Box, Typography } from '@mui/material';

/* Assets imports */
import summarySVG from './assets/demo.gif';
import forwardKeySVG from './assets/diagramSVG/forward-key.svg';
import forwardNoKeySVG from './assets/diagramSVG/forward.svg';
import forwardComputationSVG from './assets/diagramSVG/forwardComputation.svg';
import backwardKeySVG from './assets/diagramSVG/backward-key.svg';
import backwardNoKeySVG from './assets/diagramSVG/backward.svg';
import backwardComputationSVG from './assets/diagramSVG/backwardComputation.svg';

const linearModelImage = `${import.meta.env.BASE_URL}image/1219/linear_model.png`;
const exampleDigitImage = `${import.meta.env.BASE_URL}image/1219/example1.png`;

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
            <span className="section-label">Start Here</span>
            <h3>什么是深度学习</h3>
            <div className="intro-grid">
              <div>
                <p className="big-idea">
                  可以先把它理解成: 用大量样本，学一个从输入到输出的函数。
                </p>
                <ul className="soft-list">
                  <li>输入一组数据，模型给出一个预测</li>
                  <li>如果预测错了，就根据误差去调整参数</li>
                  <li>重复很多次后，模型会越来越接近真实规律</li>
                </ul>
              </div>
              <div className="info-card">
                <h6>先不要怕公式</h6>
                <p>这部分最重要的不是推导，而是搞清楚三个角色：</p>
                <ul className="soft-list">
                  <li>输入是什么</li>
                  <li>输出是什么</li>
                  <li>模型如何根据误差调整自己</li>
                </ul>
              </div>
            </div>
          </Slide>

          <Slide>
            <span className="section-label">Neuron</span>
            <h3>从一个神经元开始</h3>
            <div className="intro-grid">
              <div className="formula-card">
                {$$('\\text{neuron}(x) = w_0x + b ')}
                <div className="tip-strip">
                  直觉上看，它就是“输入先乘一个权重 (weight)，再加一个偏置
                  (bias)”，最后得到预测结果。
                </div>
              </div>
              <div className="info-card">
                <h6>怎么记这两个参数</h6>
                <ul className="soft-list">
                  <li>
                    <em style={{ color: weightColor }}>weight</em>:
                    决定输入影响有多大
                  </li>
                  <li>
                    <em style={{ color: biasColor }}>bias</em>:
                    决定整体往上还是往下平移
                  </li>
                  <li>训练就是不断调整它们</li>
                </ul>
              </div>
            </div>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '24px',
              }}
            >
              <img
                width="380px"
                src={linearModelImage}
                alt="linear model"
              />
            </div>
          </Slide>

          <Slide>
            <span className="section-label">Interactive</span>
            <h3>一个神经元如何拟合数据</h3>
            <h5>先用手动调参建立直觉，再讲自动训练会更容易懂</h5>
            <br></br>
            <Element name="structMan">
              <ManualTool />
            </Element>
          </Slide>

          <Slide>
            <span className="section-label">Loss</span>
            <h3>损失函数在做什么</h3>
            <div className="intro-grid">
              <div className="formula-card">
                {$$(
                  '\\text{MSE} = \\frac{1}{J}\\sum_{i = 1}^{J}(\\hat{y_i} - y_i)^2',
                )}
                <div className="tip-strip">
                  可以把损失理解成一个分数。预测越准，这个分数越小。
                </div>
              </div>
              <div className="info-card">
                <h6>先记住这三个点</h6>
                <ul className="soft-list">
                  <li>{$('y')} 是真实值</li>
                  <li>{$('\\hat{y}')} 是预测值</li>
                  <li>训练的目标就是让损失尽量变小</li>
                </ul>
              </div>
            </div>
          </Slide>

          <Slide>
            <span className="section-label">Training Loop</span>
            <h3>训练到底在做什么</h3>
            <h5>把整个过程简化成三步就够了</h5>
            <ul className="soft-list">
              <li>前向传播: 用当前参数做一次预测</li>
              <li>计算损失: 看预测和真实答案差多少</li>
              <li>更新参数: 沿着能让损失下降的方向微调</li>
            </ul>
          </Slide>

          <Slide>
            <span className="section-label">Forward</span>
            <h3>前向传播</h3>
            <h5>就是从输入出发，按照当前参数算出预测值</h5>
            <ToggleForward
              title={<Typography variant="h5">Forward Overview</Typography>}
              noKeySVG={forwardNoKeySVG}
              keySVG={forwardKeySVG}
            />
          </Slide>
          <Slide>
            <span className="section-label">Example</span>
            <h3>前向传播示例</h3>
            <h5>给定输入和参数，先看模型当前会预测成什么</h5>
            <p>
              例如当 {$('x = 2.1')}, 真实值 {$('y = 4')} 时, 先设定
              {$('w = 1')} 和 {$('b = 0')} 来做第一次预测
            </p>
            <img
              src={forwardComputationSVG}
              width="60%"
              alt="forward computation"
            />
          </Slide>

          <Slide>
            <span className="section-label">Backward</span>
            <h3>反向传播</h3>
            <h5>它回答的是：每个参数该往哪里改，才能让误差变小</h5>
            <ul className="soft-list">
              <li>如果某个参数让损失变大, 就往反方向调</li>
              <li>梯度告诉我们: 调整哪个参数更敏感</li>
              <li>反向传播就是高效计算这些梯度的方法</li>
            </ul>
          </Slide>

          <Slide>
            <span className="section-label">Mechanism</span>
            <h3>反向传播示意图</h3>
            <h5>从损失出发，把“谁导致了误差”一步步传回去</h5>
            <ToggleForward
              title={<Typography variant="h5">Backward Overview</Typography>}
              noKeySVG={backwardNoKeySVG}
              keySVG={backwardKeySVG}
            />
            <br />
          </Slide>

          <Slide>
            <span className="section-label">Update</span>
            <h3>参数更新示例</h3>
            <h5>梯度告诉我们方向，学习率决定每一步走多大</h5>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                gap: '24px',
                marginTop: '12px',
              }}
            >
              <div
                style={{
                  width: '360px',
                  flex: '0 0 360px',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  src={backwardComputationSVG}
                  width="100%"
                  alt="backward computation"
                />
              </div>
              <div
                className="compact-math"
                style={{ width: '320px', flex: '0 0 320px' }}
              >
                {$$('\\frac{\\partial \\text{loss}}{\\partial w} = -7.98')}
                {$$('\\frac{\\partial \\text{loss}}{\\partial b} = -3.8')}
                {$$(
                  'w_{new} = w - lr \\cdot \\frac{\\partial \\text{loss}}{\\partial w}',
                )}
                {$$(
                  'b_{new} = b - lr \\cdot \\frac{\\partial \\text{loss}}{\\partial b}',
                )}
              </div>
            </div>

            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                gap: '24px',
                marginTop: '12px',
              }}
            >
              <ul className="soft-list">
                <li>
                  如果设 {$('lr = 0.01')}, 初始 {$('w = 1')}, {$('b = 0')}
                </li>
                <li>那么 {$('w_{new} = 1 - 0.01 \\times (-7.98) = 1.0798')}</li>
                <li>{$('b_{new} = 0 - 0.01 \\times (-3.8) = 0.038')}</li>
                <li>
                  {$('lr')} 越大，每一步改得越多；{$('lr')} 太小，训练会变慢
                </li>
              </ul>
            </div>
          </Slide>

          <Slide>
            <span className="section-label">Optimization</span>
            <h3>梯度下降的直觉</h3>
            <h5>让模型自动重复“预测 → 看误差 → 调参数”</h5>
            <br></br>
            <Element name="structMan">
              <AutoTool />
            </Element>
          </Slide>
          <Slide>
            <span className="section-label">Nonlinearity</span>
            <h3>为什么需要非线性</h3>
            <h5>如果只有直线，模型能表达的模式会非常有限</h5>

            <ul className="soft-list">
              <li>
                如果只做线性求和
                {$$('\\hat{y}=\\sum_j(w_jx_j+d_j)')}
              </li>
              <li>
                加入非线性函数(激活函数)后, 模型才能表示更复杂关系{' '}
                {$$('\\hat{y}=f(\\sum_j(w_jx_j+d_j))')}
              </li>

              <li>
                常见激活函数 {$('f')}
                {$$('\\tanh(x)')}
                {$$('\\text{sigmoid}(x)=\\frac{1}{1+e^{-x}}')}
              </li>
            </ul>
          </Slide>
          <Slide>
            <span className="section-label">Deep</span>
            <h3>多层网络能做什么</h3>
            <h5>层数增加后，模型就能逐步提取更复杂的特征</h5>
            <Box display="flex" justifyContent="center">
              <Box>
                <img alt="summary" src={summarySVG} width="100%" />
              </Box>
            </Box>
          </Slide>
          <Slide>
            <span className="section-label">Next</span>
            <h3>下一部分: 手写数字识别</h3>
            <div className="closing-grid">
              <div className="next-step-box">
                <h5>把刚才的概念放到一个经典任务里</h5>
                <ul className="soft-list">
                  <li>输入是一张图片，本质上是很多像素值</li>
                  <li>输出是 0 到 9 中的一个类别</li>
                  <li>模型会从像素中学会“哪些模式更像某个数字”</li>
                  <li>后面再用代码亲自跑一次识别流程</li>
                </ul>
              </div>
              <Box display="flex" justifyContent="center">
                <img
                  width="380px"
                  src={exampleDigitImage}
                  alt="handwritten digit example"
                />
              </Box>
            </div>
          </Slide>
        </Slide>
      </>
    );
  }
}

export default IntroSlides;
