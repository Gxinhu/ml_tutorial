import React from 'react';
import Slide from '../Components/RevealComponents/Slide';

const List = () => (
  <Slide>
    <ul>
      <li style={{ fontSize: 40 }}>深度学习基本介绍</li>
      <li style={{ fontSize: 40 }}>PINN (Physical Informed Neural Network)</li>
      <li style={{ fontSize: 40 }}>深度学习在CFD中的典型应用（代理模型）</li>
    </ul>
  </Slide>
);

export default List;
