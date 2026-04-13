import React, { useMemo, useState } from 'react';
import { Slider } from '@mui/material';

const inputGrid = [
  [1, 3, 2, 0],
  [4, 6, 1, 2],
  [0, 5, 7, 3],
  [2, 1, 4, 8],
];

const cellStyle = {
  width: 40,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #d8e0ec',
  borderRadius: 8,
  fontSize: 16,
  fontWeight: 600,
  color: '#20303c',
  background: '#fff',
};

const poolingWindows = [
  { row: 0, col: 0 },
  { row: 0, col: 2 },
  { row: 2, col: 0 },
  { row: 2, col: 2 },
];

const PoolingDemo = () => {
  const [windowIndex, setWindowIndex] = useState(0);
  const { row, col } = poolingWindows[windowIndex];

  const output = useMemo(() => {
    const pooled = [];
    for (let r = 0; r < 4; r += 2) {
      const pooledRow = [];
      for (let c = 0; c < 4; c += 2) {
        const values = [
          inputGrid[r][c],
          inputGrid[r][c + 1],
          inputGrid[r + 1][c],
          inputGrid[r + 1][c + 1],
        ];
        pooledRow.push(Math.max(...values));
      }
      pooled.push(pooledRow);
    }
    return pooled;
  }, []);

  const activeWindow = [
    [inputGrid[row][col], inputGrid[row][col + 1]],
    [inputGrid[row + 1][col], inputGrid[row + 1][col + 1]],
  ];
  const activeValue = Math.max(...activeWindow.flat());
  const outputRow = row / 2;
  const outputCol = col / 2;

  return (
    <div className="demo-panel">
      <div className="demo-header">
        <p style={{ margin: 0, fontSize: 18 }}>
          池化不会再学习新的参数，它只是从局部窗口里挑出最强的响应。
        </p>
      </div>

      <div className="demo-grid">
        <div>
          <h5 style={{ marginBottom: 10 }}>输入特征图</h5>
          <div className="matrix-grid" style={{ gridTemplateColumns: 'repeat(4, 40px)' }}>
            {inputGrid.map((line, r) =>
              line.map((value, c) => {
                const inWindow = r >= row && r < row + 2 && c >= col && c < col + 2;
                const isMax = inWindow && value === activeValue;
                return (
                  <div
                    key={`${r}-${c}`}
                    style={{
                      ...cellStyle,
                      background: isMax ? '#ffdca8' : inWindow ? '#dfeaff' : '#fff',
                      borderColor: isMax ? '#f0a12b' : inWindow ? '#3568d4' : '#d8e0ec',
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
          <h5 style={{ marginBottom: 10 }}>2×2 Max Pooling</h5>
          <div className="formula-card">
            <p style={{ marginTop: 0 }}>当前窗口:</p>
            <div className="matrix-grid" style={{ gridTemplateColumns: 'repeat(2, 40px)' }}>
              {activeWindow.flat().map((value, index) => (
                <div
                  key={index}
                  style={{
                    ...cellStyle,
                    background: value === activeValue ? '#ffdca8' : '#fff',
                    borderColor: value === activeValue ? '#f0a12b' : '#d8e0ec',
                  }}
                >
                  {value}
                </div>
              ))}
            </div>
            <p style={{ marginBottom: 0, marginTop: 14 }}>
              输出值 = max({activeWindow.flat().join(', ')}) = <strong>{activeValue}</strong>
            </p>
          </div>
        </div>

        <div>
          <h5 style={{ marginBottom: 10 }}>输出特征图</h5>
          <div className="matrix-grid" style={{ gridTemplateColumns: 'repeat(2, 46px)' }}>
            {output.map((line, r) =>
              line.map((value, c) => {
                const active = r === outputRow && c === outputCol;
                return (
                  <div
                    key={`${r}-${c}`}
                    style={{
                      ...cellStyle,
                      width: 46,
                      height: 46,
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
          <div style={{ marginTop: 14 }}>
            <Slider
              min={0}
              max={3}
              step={1}
              value={windowIndex}
              onChange={(_, value) => setWindowIndex(value)}
              valueLabelDisplay="auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolingDemo;
