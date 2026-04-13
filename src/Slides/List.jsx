import React from 'react';
import Slide from '../Components/RevealComponents/Slide';

const List = () => (
  <Slide>
    <span className="section-label">Agenda</span>
    <h3>今天只抓住四件事</h3>
    <ul className="agenda-list">
      <li>深度学习到底在做什么</li>
      <li>神经元、损失函数、反向传播</li>
      <li>为什么需要非线性和多层网络</li>
      <li>手写数字识别任务怎么理解</li>
      <li>卷积网络的基本思想与代码实操</li>
    </ul>
  </Slide>
);

export default List;
