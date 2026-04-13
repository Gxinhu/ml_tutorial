把你自己写的手写数字图片放在这里。

仓库里已经提供了一个可直接跑预测流程的示例文件：

- `sample_digit.pgm`

推荐要求：

- 图片尽量是黑底白字或白底黑字的单个数字
- 内容尽量居中
- 最终会在代码里自动缩放到 `28x28`

示例运行：

```bash
uv run python -m mnist_lab.main predict --image assets/sample_digit.pgm
```
