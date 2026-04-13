# MNIST Lab

一个面向初学者的 `uv + PyTorch` 手写数字识别小项目。

## 快速开始

```bash
cd mnist_lab
uv sync
uv run python -m mnist_lab.main inspect
uv run python -m mnist_lab.main train --epochs 3
uv run python -m mnist_lab.main evaluate
uv run python -m mnist_lab.main predict --image assets/sample_digit.pgm
```

首次执行 `uv sync` 时会下载 `torch` 和 `torchvision`，体积较大，安装时间会明显长于后续命令。

## 目录结构

```text
mnist_lab/
├── pyproject.toml
├── README.md
├── ARTICLE.md
├── assets/
├── artifacts/
└── src/mnist_lab/
    ├── config.py
    ├── data.py
    ├── inspect.py
    ├── model.py
    ├── trainer.py
    ├── predict.py
    └── main.py
```

## 说明

- `assets/` 用来放你想测试的手写数字图片
- `assets/sample_digit.pgm` 是一个可直接演示预测流程的示例图片
- `artifacts/` 会保存模型权重和训练曲线
- `artifacts/sample_grid.png` 会保存一批训练图片的可视化结果
- `artifacts/prediction_preview.png` 会保存单张图片的预测结果图
- `ARTICLE.md` 是逐步讲解代码思路的文章

训练时的推荐口径：

- `train` 用来更新参数
- `val` 用来观察每个 epoch 后的泛化效果
- `test` 只在训练完成后做最终评估
