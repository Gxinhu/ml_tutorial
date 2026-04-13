from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path


@dataclass
class TrainingConfig:
    batch_size: int = 64
    learning_rate: float = 1e-3
    epochs: int = 3
    seed: int = 42
    validation_ratio: float = 0.1
    data_dir: Path = Path("data")
    artifacts_dir: Path = Path("artifacts")
    model_name: str = "mnist_cnn.pt"

    @property
    def model_path(self) -> Path:
        return self.artifacts_dir / self.model_name

    @property
    def plot_path(self) -> Path:
        return self.artifacts_dir / "training_curve.png"

    @property
    def metrics_path(self) -> Path:
        return self.artifacts_dir / "metrics.txt"

    @property
    def sample_grid_path(self) -> Path:
        return self.artifacts_dir / "sample_grid.png"

    @property
    def prediction_plot_path(self) -> Path:
        return self.artifacts_dir / "prediction_preview.png"
