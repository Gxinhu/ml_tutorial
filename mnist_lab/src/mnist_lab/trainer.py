from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
import random

import matplotlib.pyplot as plt
import torch
from torch import nn
from torch.optim import Adam
from tqdm import tqdm

from .config import TrainingConfig


@dataclass
class EpochMetrics:
    loss: float
    accuracy: float


class ModelTrainer:
    def __init__(
        self,
        model: nn.Module,
        train_loader,
        val_loader,
        test_loader,
        config: TrainingConfig,
    ) -> None:
        self.model = model
        self.train_loader = train_loader
        self.val_loader = val_loader
        self.test_loader = test_loader
        self.config = config
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.criterion = nn.CrossEntropyLoss()
        self.optimizer = Adam(self.model.parameters(), lr=self.config.learning_rate)
        self.model.to(self.device)
        self.train_history: list[float] = []
        self.val_history: list[float] = []
        self.val_accuracy_history: list[float] = []

    def set_seed(self) -> None:
        random.seed(self.config.seed)
        torch.manual_seed(self.config.seed)
        if torch.cuda.is_available():
            torch.cuda.manual_seed_all(self.config.seed)

    def train_epoch(self) -> EpochMetrics:
        self.model.train()
        total_loss = 0.0
        total_correct = 0
        total_samples = 0

        progress = tqdm(self.train_loader, desc="Training", leave=False)
        for images, labels in progress:
            images, labels = images.to(self.device), labels.to(self.device)
            logits = self.model(images)
            loss = self.criterion(logits, labels)

            self.optimizer.zero_grad()
            loss.backward()
            self.optimizer.step()

            total_loss += loss.item() * labels.size(0)
            total_correct += (logits.argmax(dim=1) == labels).sum().item()
            total_samples += labels.size(0)
            progress.set_postfix(loss=f"{loss.item():.4f}")

        return EpochMetrics(
            loss=total_loss / total_samples,
            accuracy=total_correct / total_samples,
        )

    @torch.no_grad()
    def evaluate(self, data_loader=None) -> EpochMetrics:
        self.model.eval()
        total_loss = 0.0
        total_correct = 0
        total_samples = 0
        evaluation_loader = data_loader or self.val_loader

        for images, labels in evaluation_loader:
            images, labels = images.to(self.device), labels.to(self.device)
            logits = self.model(images)
            loss = self.criterion(logits, labels)

            total_loss += loss.item() * labels.size(0)
            total_correct += (logits.argmax(dim=1) == labels).sum().item()
            total_samples += labels.size(0)

        return EpochMetrics(
            loss=total_loss / total_samples,
            accuracy=total_correct / total_samples,
        )

    def fit(self) -> None:
        self.set_seed()
        self.config.artifacts_dir.mkdir(parents=True, exist_ok=True)

        for epoch in range(1, self.config.epochs + 1):
            train_metrics = self.train_epoch()
            val_metrics = self.evaluate()

            self.train_history.append(train_metrics.loss)
            self.val_history.append(val_metrics.loss)
            self.val_accuracy_history.append(val_metrics.accuracy)

            print(
                f"Epoch {epoch}: "
                f"train_loss={train_metrics.loss:.4f}, "
                f"train_acc={train_metrics.accuracy:.4f}, "
                f"val_loss={val_metrics.loss:.4f}, "
                f"val_acc={val_metrics.accuracy:.4f}"
            )

        self.save_checkpoint()
        self.save_metrics()
        self.plot_curves()

    def save_checkpoint(self) -> None:
        torch.save(self.model.state_dict(), self.config.model_path)
        print(f"Saved model to {self.config.model_path}")

    def save_metrics(self) -> None:
        metrics_report = [
            f"epochs={self.config.epochs}",
            f"learning_rate={self.config.learning_rate}",
            f"final_train_loss={self.train_history[-1]:.4f}",
            f"final_val_loss={self.val_history[-1]:.4f}",
            f"final_val_accuracy={self.val_accuracy_history[-1]:.4f}",
        ]
        self.config.metrics_path.write_text("\n".join(metrics_report), encoding="utf-8")

    def plot_curves(self) -> None:
        epochs = range(1, len(self.train_history) + 1)
        plt.figure(figsize=(8, 5))
        plt.plot(epochs, self.train_history, label="train loss")
        plt.plot(epochs, self.val_history, label="val loss")
        plt.plot(epochs, self.val_accuracy_history, label="val accuracy")
        plt.xlabel("epoch")
        plt.legend()
        plt.tight_layout()
        plt.savefig(self.config.plot_path)
        plt.close()

    def load_checkpoint(self, model_path: Path | None = None) -> None:
        checkpoint_path = model_path or self.config.model_path
        state_dict = torch.load(checkpoint_path, map_location=self.device)
        self.model.load_state_dict(state_dict)
        self.model.to(self.device)

    def evaluate_test(self) -> EpochMetrics:
        return self.evaluate(data_loader=self.test_loader)
