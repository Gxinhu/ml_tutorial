import React from 'react';

const StageCard = ({ title, subtitle, children, color = '#eaf1ff', border = '#a9c2ff' }) => (
  <div
    style={{
      borderRadius: 18,
      border: `2px solid ${border}`,
      background: color,
      padding: 12,
      minHeight: 138,
      boxSizing: 'border-box',
    }}
  >
    <div style={{ minHeight: 72, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {children}
    </div>
    <p style={{ margin: '8px 0 0', fontWeight: 700, textAlign: 'center', fontSize: 16 }}>{title}</p>
    <p style={{ margin: '4px 0 0', color: '#5f6b76', fontSize: 14, textAlign: 'center' }}>{subtitle}</p>
  </div>
);

const Bar = ({ height, color }) => (
  <div
    style={{
      width: 28,
      height,
      borderRadius: 8,
      background: color,
    }}
  />
);

const MnistPipelineDiagram = () => (
  <div
    style={{
      width: '100%',
      maxWidth: 800,
      margin: '0 auto',
      borderRadius: 18,
      border: '1px solid #d8e0ec',
      background: '#f8fbff',
      padding: 14,
      boxSizing: 'border-box',
    }}
  >
    <p style={{ margin: '0 0 12px', color: '#3568d4', fontWeight: 700, fontSize: 18, lineHeight: 1.35 }}>
      一张手写数字图片进入 CNN 后，会先提特征，再压缩尺寸，最后输出类别概率
    </p>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gap: 20,
        alignItems: 'stretch',
      }}
    >
      <StageCard title="输入图片" subtitle="28×28 灰度图">
        <div
          style={{
            width: 70,
            height: 70,
            borderRadius: 14,
            background: '#ffffff',
            border: '2px solid #3568d4',
            display: 'grid',
            placeItems: 'center',
            color: '#3568d4',
            fontSize: 36,
            fontWeight: 700,
          }}
        >
          0
        </div>
      </StageCard>

      <StageCard
        title="卷积层"
        subtitle="找边缘、笔画、局部形状"
        color="#fff8e8"
        border="#f0c66a"
      >
        <div style={{ display: 'flex', gap: 10 }}>
          {['#ffdca8', '#ffe4b4', '#fff0d0'].map((tone, index) => (
            <div
              key={tone}
              style={{
                width: 26,
                height: 60,
                borderRadius: 10,
                background: tone,
                transform: `translateY(${index * -5}px)`,
              }}
            />
          ))}
        </div>
      </StageCard>

      <StageCard
        title="池化层"
        subtitle="保留强响应，降低尺寸"
        color="#f4f8ff"
        border="#b8cbf7"
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 22px)',
            gap: 5,
            padding: 8,
            borderRadius: 12,
            background: '#d6e4ff',
          }}
        >
          {['#3568d4', '#88afff', '#a9c2ff', '#3568d4'].map((tone, index) => (
            <div
              key={`${tone}-${index}`}
              style={{
                width: 22,
                height: 22,
                borderRadius: 8,
                background: tone,
              }}
            />
          ))}
        </div>
      </StageCard>

      <StageCard
        title="全连接层 + 输出"
        subtitle="判断更像 0,1,2... 里的哪一个"
        color="#fbfdff"
        border="#d8e0ec"
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
          <Bar height={48} color="#e7eef9" />
          <Bar height={64} color="#c2d7ff" />
          <Bar height={42} color="#9cbeff" />
          <Bar height={80} color="#3568d4" />
        </div>
      </StageCard>
    </div>
  </div>
);

export default MnistPipelineDiagram;
