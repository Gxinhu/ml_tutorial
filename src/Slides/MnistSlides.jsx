import React from 'react';
import { Slide } from '@revealjs/react';
import { $, $$ } from '../Animation/Typeset';
import Bash from '../Components/Highlight/Bash';
import Python from '../Components/Highlight/Python';
import ConvolutionDemo from '../Animation/ConvolutionDemo';
import PoolingDemo from '../Animation/PoolingDemo';
import TensorShapeDiagram from '../Animation/TensorShapeDiagram';
import MnistPipelineDiagram from '../Animation/MnistPipelineDiagram';

const uvCode = `git clone https://gitee.com/huxin2023/mnist_lab
cd mnist_lab
uv sync
uv run python -m mnist_lab.main inspect
uv run python -m mnist_lab.main train --epochs 3
uv run python -m mnist_lab.main predict --image assets/sample_digit.pgm`;

const inspectCode = `images.shape = (16, 1, 28, 28)
labels.shape = (16,)
first_labels = [5, 0, 4, 1, 9, 2, 1, 3]`;

const dataCode = `class MNISTDataModule:
    def __init__(self, config: TrainingConfig) -> None:
        self.config = config
        self.transform = transforms.Compose(
            [
                transforms.ToTensor(),
                transforms.Normalize((0.1307,), (0.3081,)),
            ]
        )

    def prepare(self) -> DatasetBundle:
        full_train_dataset = self.build_dataset(train=True)
        test_dataset = self.build_dataset(train=False)
        train_dataset, val_dataset = random_split(full_train_dataset, [54000, 6000])
        train_loader = DataLoader(train_dataset, batch_size=self.config.batch_size, shuffle=True)
        val_loader = DataLoader(val_dataset, batch_size=self.config.batch_size, shuffle=False)
        test_loader = DataLoader(test_dataset, batch_size=self.config.batch_size, shuffle=False)
        return DatasetBundle(train_loader=train_loader, val_loader=val_loader, test_loader=test_loader)`;

const modelCode = `class DigitCNN(nn.Module):
    def __init__(self, num_classes: int = 10) -> None:
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(1, 16, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2),
            nn.Conv2d(16, 32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2),
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(32 * 7 * 7, 128),
            nn.ReLU(),
            nn.Linear(128, num_classes),
        )

    def forward(self, images: torch.Tensor) -> torch.Tensor:
        features = self.features(images)
        return self.classifier(features)`;

const trainCode = `class ModelTrainer:
    def fit(self) -> None:
        for epoch in range(self.config.epochs):
            for images, labels in self.train_loader:
                images, labels = images.to(self.device), labels.to(self.device)
                logits = self.model(images)
                loss = self.criterion(logits, labels)

                self.optimizer.zero_grad()
                loss.backward()
                self.optimizer.step()`;

const logCode = `Epoch 1: train_loss=0.4120, train_acc=0.8741, val_loss=0.1338, val_acc=0.9587
Epoch 2: train_loss=0.1084, train_acc=0.9671, val_loss=0.0801, val_acc=0.9748
Epoch 3: train_loss=0.0732, train_acc=0.9772, val_loss=0.0607, val_acc=0.9811`;

const predictCode = `Predicted digit: 0
Top confidence: 0.9342
Saved prediction preview to artifacts/prediction_preview.png`;

const MnistSlides = () => (
  <Slide>
    <Slide>
      <span className="section-label">MNIST</span>
      <h3>手写数字识别到底在做什么</h3>
      <div className="intro-grid">
        <div className="info-card">
          <h6>任务定义</h6>
          <ul className="soft-list">
            <li>输入: 一张 {$('28 \\times 28')} 的灰度图片</li>
            <li>输出: 0 到 9 中的一个类别</li>
            <li>本质: 从像素矩阵到数字类别的映射</li>
          </ul>
        </div>
        <div className="formula-card">
          {$$(
            '\\text{image} \\rightarrow \\text{neural network} \\rightarrow \\text{class probabilities}',
          )}
          <div className="tip-strip">
            图片先经过特征提取，再输出每个数字的概率，概率最大的类别就是模型预测结果。
          </div>
        </div>
      </div>
    </Slide>

    <Slide>
      <span className="section-label">Basics</span>
      <h3>先认识模型看到的数据长什么样</h3>
      <div className="mnist-visual-layout">
        <div className="info-card">
          <h6>一张图片</h6>
          <ul className="soft-list">
            <li>大小是 {$('28 \\times 28')}</li>
            <li>每个位置都是一个像素值</li>
            <li>MNIST 是灰度图，所以只有 1 个通道</li>
          </ul>
        </div>
        <div className="formula-card">
          {$$('\\text{one image} \\Rightarrow (1, 28, 28)')}
          {$$('\\text{one batch} \\Rightarrow (\\text{batch}, 1, 28, 28)')}
        </div>
      </div>
      <br></br>
      <div className="visual-card">
        <TensorShapeDiagram />
      </div>
    </Slide>

    <Slide>
      <span className="section-label">Terms</span>
      <h3>几个必须先听懂的术语</h3>
      <div className="intro-grid">
        <div className="info-card">
          <h6>数据相关</h6>
          <ul className="soft-list">
            <li>{$('pixel')}: 图片里的一个小格子</li>
            <li>{$('channel')}: 图像通道，灰度图是 1，彩色图通常是 3</li>
            <li>{$('label')}: 这张图真正对应的数字答案</li>
          </ul>
        </div>
        <div className="info-card">
          <h6>训练相关</h6>
          <ul className="soft-list">
            <li>{$('batch')}: 一次送进模型的一小批图片</li>
            <li>{$('epoch')}: 把整个训练集完整看过一遍</li>
            <li>{$('\\text{learning rate}')}: 每次更新参数时走多大一步</li>
          </ul>
        </div>
      </div>
    </Slide>

    <Slide>
      <span className="section-label">Why CNN</span>
      <h3>为什么卷积网络适合做图像识别</h3>
      <ul className="soft-list">
        <li>图片不是普通表格数据，像素之间有空间邻近关系</li>
        <li>卷积核会在局部区域滑动，捕捉边缘、拐角、笔画等特征</li>
        <li>前面层提取简单特征，后面层组合成更复杂的数字形状</li>
      </ul>
      <div className="formula-card" style={{ marginTop: 18 }}>
        {$$(
          '\\text{local patch} \\otimes \\text{kernel} \\rightarrow \\text{feature map}',
        )}
      </div>
    </Slide>

    <Slide>
      <span className="section-label">Convolution</span>
      <h3>交互式理解卷积</h3>
      <h5>看卷积核如何在局部区域滑动，并把结果写入输出特征图</h5>
      <ConvolutionDemo />
    </Slide>

    <Slide>
      <span className="section-label">Pooling</span>
      <h3>再看一次池化在做什么</h3>
      <h5>池化会缩小尺寸，同时尽量保留“最强响应”</h5>
      <PoolingDemo />
    </Slide>

    <Slide>
      <span className="section-label">Pipeline</span>
      <h3>完整识别流程</h3>
      <div className="visual-card" style={{ marginBottom: 10 }}>
        <MnistPipelineDiagram />
      </div>
      <div className="intro-grid">
        <div className="info-card">
          <h6>训练阶段</h6>
          <ol className="soft-list">
            <li>读入图片和标签</li>
            <li>前向传播得到预测</li>
            <li>计算交叉熵损失</li>
            <li>反向传播更新参数</li>
          </ol>
        </div>
        <div className="info-card">
          <h6>推理阶段</h6>
          <ol className="soft-list">
            <li>给模型一张新图片</li>
            <li>输出 10 个类别分数</li>
            <li>取分数最高的类别作为答案</li>
          </ol>
        </div>
      </div>
    </Slide>

    <Slide>
      <span className="section-label">Code</span>
      <h3>实操前先看工程结构</h3>
      <p>
        下面这套代码使用 uv 管理环境，使用 PyTorch
        编写，适合初学者从零开始跟读。
      </p>
      <Bash code={uvCode} />
      <div className="tip-strip" style={{ marginTop: 18 }}>
        第一次执行 uv sync 会下载 PyTorch，体积较大，首次安装比后续运行慢很多。
      </div>
    </Slide>

    <Slide>
      <span className="section-label">Inspect</span>
      <h3>先用 inspect 看清楚输入数据</h3>
      <Bash code={inspectCode} />
      <ul className="soft-list">
        <li>{$('16')} 表示当前批里有 16 张图片</li>
        <li>中间的 {$('1')} 表示灰度图只有 1 个通道</li>
        <li>最后两个 {$('28, 28')} 表示图片高度和宽度</li>
      </ul>
    </Slide>

    <Slide>
      <span className="section-label">Data</span>
      <h3>为什么要单独构建 DataModule</h3>
      <div className="intro-grid">
        <div className="info-card">
          <h6>它负责什么</h6>
          <ul className="soft-list">
            <li>下载数据集</li>
            <li>把图片转换成 Tensor</li>
            <li>做标准化等预处理</li>
            <li>返回训练集、验证集、测试集的 DataLoader</li>
          </ul>
        </div>
        <div className="info-card">
          <h6>为什么值得单独拆出来</h6>
          <ul className="soft-list">
            <li>训练代码就不用一边训练一边管数据读取细节</li>
            <li>数据预处理逻辑集中在一个地方，更容易检查和修改</li>
            <li>后面如果换数据集或改 batch size，影响范围更小</li>
          </ul>
        </div>
      </div>
      <div className="tip-strip" style={{ marginTop: 18 }}>
        简单说，DataModule
        的作用就是把“数据怎么准备好”这件事从训练流程里独立出来。
      </div>
    </Slide>

    <Slide>
      <span className="section-label">Split</span>
      <h3>为什么还要再划分验证集</h3>
      <div className="intro-grid">
        <div className="info-card">
          <h6>三部分各自做什么</h6>
          <ul className="soft-list">
            <li>训练集: 真正参与参数更新</li>
            <li>验证集: 每个 epoch 后检查当前模型表现</li>
            <li>测试集: 训练完成后再做最终评估</li>
          </ul>
        </div>
        <div className="info-card">
          <h6>为什么不能一直看测试集</h6>
          <ul className="soft-list">
            <li>如果训练中反复看测试集，测试集就不再独立</li>
            <li>你会不知不觉根据测试结果去调整模型</li>
            <li>
              更规范的做法是训练时看 {$('val_{acc}')}，最后才报告{' '}
              {$('test_{acc}')}
            </li>
          </ul>
        </div>
      </div>
    </Slide>

    <Slide>
      <span className="section-label">Data Code</span>
      <h3>DataModule 代码示例</h3>
      <h5>先定义统一预处理，再划分 train / val / test 三部分</h5>
      <Python code={dataCode} />
    </Slide>

    <Slide>
      <span className="section-label">Model</span>
      <h3>模型结构示例</h3>
      <h5>前两层卷积负责提取图像特征，后面的线性层负责分类</h5>
      <Python code={modelCode} />
    </Slide>

    <Slide>
      <span className="section-label">Order</span>
      <h3>为什么顺序通常是 Conv2d → 激活函数 → 池化</h3>
      <div className="intro-grid">
        <div className="info-card">
          <h6>Step 1: Conv2d</h6>
          <ul className="soft-list">
            <li>先用卷积核扫描局部区域</li>
            <li>把边缘、笔画、局部形状提取出来</li>
            <li>这一步得到的是原始特征响应</li>
          </ul>
        </div>
        <div className="info-card">
          <h6>Step 2: ReLU</h6>
          <ul className="soft-list">
            <li>给网络加入非线性能力</li>
            <li>负值通常被压成 0，保留更有意义的正响应</li>
            <li>没有激活函数，多层卷积叠起来也不够灵活</li>
          </ul>
        </div>
      </div>
      <div className="intro-grid" style={{ marginTop: 14 }}>
        <div className="info-card">
          <h6>Step 3: MaxPool2d</h6>
          <ul className="soft-list">
            <li>在已经激活后的特征图上做下采样</li>
            <li>缩小尺寸，减少后续计算量</li>
            <li>尽量保留局部区域里最强的响应</li>
          </ul>
        </div>
        <div className="formula-card">
          {$$(
            '\\text{Conv2d} \\rightarrow \\text{ReLU} \\rightarrow \\text{MaxPool2d}',
          )}
          <div className="tip-strip" style={{ marginTop: 12 }}>
            先提特征，再通过非线性筛出有效响应，最后再压缩尺寸，这个顺序最符合直觉，也最常见。
          </div>
        </div>
      </div>
    </Slide>

    <Slide>
      <span className="section-label">Train</span>
      <h3>训练循环示例</h3>
      <h5>核心就是前向传播、反向传播和参数更新</h5>
      <Python code={trainCode} />
    </Slide>

    <Slide>
      <span className="section-label">Metrics</span>
      <h3>训练日志应该怎么看</h3>
      <Bash code={logCode} />
      <ul className="soft-list">
        <li>train_loss 越低，说明模型在训练集上的错误越少</li>
        <li>train_acc 越高，说明模型在训练集上分对的比例越高</li>
        <li>训练阶段最该盯的是 val_acc，它更适合反映当前泛化情况</li>
        <li>如果训练集越来越好，但验证集不升反降，通常说明开始过拟合</li>
      </ul>
    </Slide>

    <Slide>
      <span className="section-label">Predict</span>
      <h3>预测阶段会输出什么</h3>
      <Bash code={predictCode} />
      <ul className="soft-list">
        <li>模型先输出 10 个类别分数，再转成概率</li>
        <li>Predicted digit 是概率最大的那个类别</li>
        <li>Top confidence 越接近 1，说明模型越确定</li>
      </ul>
    </Slide>

    <Slide>
      <span className="section-label">Practice</span>
      <h3>接下来要做什么</h3>
      <ul className="soft-list">
        <li>先运行代码，训练一个最基础的 CNN 模型</li>
        <li>先观察训练准确率和验证准确率如何变化</li>
        <li>再看卷积层学到的局部特征和最终预测结果</li>
        <li>最后再回到代码，理解每个类各自负责什么</li>
      </ul>
    </Slide>
  </Slide>
);

export default MnistSlides;
