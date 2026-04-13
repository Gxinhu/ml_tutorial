from __future__ import annotations

from dataclasses import dataclass

import matplotlib.pyplot as plt
from torchvision.utils import make_grid

from .config import TrainingConfig


@dataclass
class BatchSummary:
    image_shape: tuple[int, ...]
    label_shape: tuple[int, ...]
    labels: list[int]


class DatasetInspector:
    def __init__(self, config: TrainingConfig, train_loader) -> None:
        self.config = config
        self.train_loader = train_loader

    def inspect_first_batch(self) -> BatchSummary:
        images, labels = next(iter(self.train_loader))
        return BatchSummary(
            image_shape=tuple(images.shape),
            label_shape=tuple(labels.shape),
            labels=labels[:8].tolist(),
        )

    def save_sample_grid(self) -> None:
        self.config.artifacts_dir.mkdir(parents=True, exist_ok=True)
        images, _ = next(iter(self.train_loader))
        grid = make_grid(images[:16], nrow=4, normalize=True)

        plt.figure(figsize=(6, 6))
        plt.imshow(grid.permute(1, 2, 0).squeeze(), cmap="gray")
        plt.axis("off")
        plt.tight_layout()
        plt.savefig(self.config.sample_grid_path)
        plt.close()
        print(f"Saved sample grid to {self.config.sample_grid_path}")
