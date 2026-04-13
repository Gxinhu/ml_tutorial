import React, { useMemo, useState } from 'react';
import { Button, ButtonGroup, Slider } from '@mui/material';

const inputGrid = [
  [0, 0, 1, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 1, 1, 1, 0],
];

const kernels = {
  vertical: {
    label: '竖线检测',
    values: [
      [-1, 2, -1],
      [-1, 2, -1],
      [-1, 2, -1],
    ],
  },
  horizontal: {
    label: '横线检测',
    values: [
      [-1, -1, -1],
      [2, 2, 2],
      [-1, -1, -1],
    ],
  },
  blur: {
    label: '平滑',
    values: [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
  },
};

const cellStyle = {
  width: 34,
  height: 34,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #d8e0ec',
  fontSize: 15,
  fontWeight: 600,
  borderRadius: 8,
  background: '#fff',
  color: '#20303c',
};

const ConvolutionDemo = () => {
  const [kernelKey, setKernelKey] = useState('vertical');
  const [position, setPosition] = useState(0);
  const kernel = kernels[kernelKey].values;
  const row = Math.floor(position / 3);
  const col = position % 3;

  const output = useMemo(() => {
    const results = [];
    for (let r = 0; r < 3; r += 1) {
      const currentRow = [];
      for (let c = 0; c < 3; c += 1) {
        let total = 0;
        for (let kr = 0; kr < 3; kr += 1) {
          for (let kc = 0; kc < 3; kc += 1) {
            total += inputGrid[r + kr][c + kc] * kernel[kr][kc];
          }
        }
        currentRow.push(total);
      }
      results.push(currentRow);
    }
    return results;
  }, [kernel]);

  const activeWindow = inputGrid
    .slice(row, row + 3)
    .map(line => line.slice(col, col + 3));

  const activeValue = output[row][col];

  return (
    <div
      style={{
        width: '100%',
        border: '1px solid #d8e0ec',
        borderRadius: 16,
        padding: 20,
        background: '#f8fbff',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          marginBottom: 16,
          flexWrap: 'wrap',
        }}
      >
        <p style={{ margin: 0, fontSize: 18 }}>
          拖动位置，观察 3x3 卷积核如何在 5x5 图像上滑动并生成输出特征图。
        </p>
        <ButtonGroup size="small" variant="outlined">
          {Object.entries(kernels).map(([key, value]) => (
            <Button
              key={key}
              variant={key === kernelKey ? 'contained' : 'outlined'}
              onClick={() => setKernelKey(key)}
            >
              {value.label}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.3fr 0.8fr 1fr',
          gap: 18,
          alignItems: 'start',
        }}
      >
        <div>
          <h5 style={{ marginBottom: 10 }}>输入图像</h5>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 34px)',
              gap: 5,
            }}
          >
            {inputGrid.map((line, r) =>
              line.map((value, c) => {
                const inWindow = r >= row && r < row + 3 && c >= col && c < col + 3;
                return (
                  <div
                    key={`${r}-${c}`}
                    style={{
                      ...cellStyle,
                      background: inWindow ? '#dfeaff' : value ? '#3568d4' : '#fff',
                      color: inWindow ? '#20303c' : value ? '#fff' : '#7b8794',
                      borderColor: inWindow ? '#3568d4' : '#d8e0ec',
                    }}
                  >
                    {value}
                  </div>
                );
              }),
            )}
          </div>
        </div>

        <div>
          <h5 style={{ marginBottom: 10 }}>卷积核</h5>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 34px)',
              gap: 5,
            }}
          >
            {kernel.map((line, r) =>
              line.map((value, c) => (
                <div
                  key={`${r}-${c}`}
                  style={{
                    ...cellStyle,
                    background: '#eef4ff',
                    borderColor: '#a9c2ff',
                  }}
                >
                  {value}
                </div>
              )),
            )}
          </div>

          <div style={{ marginTop: 16, fontSize: 18, lineHeight: 1.45 }}>
            <p style={{ margin: 0 }}>
              当前窗口位置: 第 {row + 1} 行，第 {col + 1} 列
            </p>
            <p style={{ margin: '10px 0 0' }}>
              当前输出值: <strong>{activeValue}</strong>
            </p>
          </div>
        </div>

        <div>
          <h5 style={{ marginBottom: 10 }}>输出特征图</h5>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 40px)',
              gap: 6,
            }}
          >
            {output.map((line, r) =>
              line.map((value, c) => {
                const active = r === row && c === col;
                return (
                  <div
                    key={`${r}-${c}`}
                    style={{
                      ...cellStyle,
                      width: 40,
                      height: 40,
                      background: active ? '#ffdca8' : '#fff',
                      borderColor: active ? '#f0a12b' : '#d8e0ec',
                    }}
                  >
                    {value}
                  </div>
                );
              }),
            )}
          </div>
          <div style={{ marginTop: 16 }}>
            <Slider
              min={0}
              max={8}
              step={1}
              value={position}
              onChange={(_, value) => setPosition(value)}
              valueLabelDisplay="auto"
            />
          </div>
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <h5 style={{ marginBottom: 10 }}>当前窗口内的乘加计算</h5>
        <div
          style={{
            padding: 14,
            borderRadius: 12,
            background: '#fff',
            border: '1px solid #d8e0ec',
            fontSize: 16,
            lineHeight: 1.5,
          }}
        >
          {activeWindow
            .flatMap((line, r) =>
              line.map((value, c) => `${value}×${kernel[r][c]}`),
            )
            .join(' + ')}
          {' = '}
          <strong>{activeValue}</strong>
        </div>
      </div>
    </div>
  );
};

export default ConvolutionDemo;
