import React from 'react';
import Slide from '../Components/RevealComponents/Slide';

const TitleSlide = () => (
  <Slide transition="fade">
    <div className="hero-slide">
      <span className="hero-kicker">深度学习入门</span>
      <h2>深度学习基础与手写数字识别</h2>
      <h4>从神经元、损失函数、反向传播开始，最后过渡到手写数字识别实例</h4>
      <div className="hero-meta">
        <span>胡鑫</span>
        <span>2026.04</span>
      </div>
    </div>
  </Slide>
);

export default TitleSlide;
