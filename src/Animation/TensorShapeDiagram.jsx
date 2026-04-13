import React from 'react';

const DIAGRAM_MAX_WIDTH = 760;
const IMAGE_BOX = 92;
const VECTOR_WIDTH = 108;
const VECTOR_HEIGHT = 78;
const BATCH_WIDTH = 132;
const BATCH_HEIGHT = 92;
const ARROW_FONT_SIZE = 24;

const gridLineStyle = {
  position: 'absolute',
  background: '#3568d4',
  opacity: 0.9,
};

const TensorShapeDiagram = () => (
  <div
    style={{
      width: '100%',
      maxWidth: DIAGRAM_MAX_WIDTH,
      margin: '0 auto',
      borderRadius: 18,
      border: '1px solid #d8e0ec',
      background: '#f8fbff',
      padding: 14,
      boxSizing: 'border-box',
    }}
  >
    <p style={{ margin: '0 0 8px', color: '#3568d4', fontWeight: 700, fontSize: 18 }}>
      模型看到的不是“图片文件”，而是一个张量
    </p>
    <p style={{ margin: '0 0 14px', color: '#5f6b76', fontSize: 16, lineHeight: 1.4 }}>
      单张图片会变成 {(<> <code>(1, 28, 28)</code> </>)}，一批图片会变成 {(<> <code>(batch, 1, 28, 28)</code> </>)}。
    </p>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 28px 1fr 28px 1.1fr',
        gap: 8,
        alignItems: 'center',
      }}
    >
      <div>
        <div
          style={{
            width: IMAGE_BOX,
            height: IMAGE_BOX,
            borderRadius: 16,
            background: '#eaf1ff',
            border: '2px solid #a9c2ff',
            position: 'relative',
            margin: '0 auto',
          }}
        >
          {[20, 38, 56, 74].map(top => (
            <div
              key={`h-${top}`}
              style={{ ...gridLineStyle, left: 14, right: 14, top, height: 2 }}
            />
          ))}
          {[22, 42, 62].map(left => (
            <div
              key={`v-${left}`}
              style={{ ...gridLineStyle, top: 12, bottom: 12, left, width: 2 }}
            />
          ))}
        </div>
        <p style={{ textAlign: 'center', margin: '8px 0 0', fontWeight: 700, fontSize: 16 }}>
          一张 28×28 灰度图
        </p>
      </div>

      <div style={{ textAlign: 'center', color: '#3568d4', fontSize: ARROW_FONT_SIZE, fontWeight: 700 }}>
        →
      </div>

      <div>
        <div
          style={{
            width: VECTOR_WIDTH,
            height: VECTOR_HEIGHT,
            margin: '0 auto',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 18,
              top: 10,
              width: 30,
              height: VECTOR_HEIGHT - 18,
              borderRadius: 10,
              background: '#ffdca8',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 44,
              top: 10,
              width: 30,
              height: VECTOR_HEIGHT - 18,
              borderRadius: 10,
              background: '#ffe8bf',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 70,
              top: 10,
              width: 18,
              height: VECTOR_HEIGHT - 18,
              borderRadius: 10,
              background: '#fff1d3',
            }}
          />
        </div>
        <p style={{ textAlign: 'center', margin: '4px 0 0', fontWeight: 700, fontSize: 16 }}>
          <code>(1, 28, 28)</code>
        </p>
        <p style={{ textAlign: 'center', margin: '4px 0 0', color: '#5f6b76', fontSize: 14 }}>
          1 个通道，高 28，宽 28
        </p>
      </div>

      <div style={{ textAlign: 'center', color: '#3568d4', fontSize: ARROW_FONT_SIZE, fontWeight: 700 }}>
        →
      </div>

      <div>
        <div
          style={{
            width: BATCH_WIDTH,
            height: BATCH_HEIGHT,
            margin: '0 auto',
            position: 'relative',
          }}
        >
          {[
            { left: 14, top: 10, color: '#d6e4ff' },
            { left: 24, top: 18, color: '#c2d7ff' },
            { left: 34, top: 26, color: '#afcbff' },
          ].map(layer => (
            <div
              key={`${layer.left}-${layer.top}`}
              style={{
                position: 'absolute',
                left: layer.left,
                top: layer.top,
                width: 46,
                height: 62,
                borderRadius: 12,
                background: layer.color,
                border: '1px solid #a9c2ff',
              }}
            />
          ))}
        </div>
        <p style={{ textAlign: 'center', margin: '4px 0 0', fontWeight: 700, fontSize: 16 }}>
          <code>(batch, 1, 28, 28)</code>
        </p>
        <p style={{ textAlign: 'center', margin: '4px 0 0', color: '#5f6b76', fontSize: 14 }}>
          把很多张图片堆成一批一起送进模型
        </p>
      </div>
    </div>
  </div>
);

export default TensorShapeDiagram;
