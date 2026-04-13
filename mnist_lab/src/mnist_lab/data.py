from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
import shutil

import torch
from torch.utils.data import DataLoader, random_split
from torchvision import datasets, transforms

from .config import TrainingConfig


@dataclass
class DatasetBundle:
    train_loader: DataLoader
    val_loader: DataLoader
    test_loader: DataLoader


class MNISTDataModule:
    def __init__(self, config: TrainingConfig) -> None:
        self.config = config
        self.transform = transforms.Compose(
            [
                transforms.ToTensor(),
                transforms.Normalize((0.1307,), (0.3081,)),
            ]
        )

    def build_dataset(self, train: bool, retry: bool = True):
        try:
            return datasets.MNIST(
                root=self.config.data_dir,
                train=train,
                download=True,
                transform=self.transform,
            )
        except RuntimeError as error:
            if retry and "File not found or corrupted" in str(error):
                self.clear_corrupted_download()
                return self.build_dataset(train=train, retry=False)
            raise

    def clear_corrupted_download(self) -> None:
        dataset_root = Path(self.config.data_dir) / "MNIST"
        if dataset_root.exists():
            shutil.rmtree(dataset_root)

    def prepare(self) -> DatasetBundle:
        full_train_dataset = self.build_dataset(train=True)
        test_dataset = self.build_dataset(train=False)
        validation_size = int(len(full_train_dataset) * self.config.validation_ratio)
        train_size = len(full_train_dataset) - validation_size
        generator = torch.Generator().manual_seed(self.config.seed)
        train_dataset, val_dataset = random_split(
            full_train_dataset,
            [train_size, validation_size],
            generator=generator,
        )
        train_loader = DataLoader(
            train_dataset,
            batch_size=self.config.batch_size,
            shuffle=True,
        )
        val_loader = DataLoader(
            val_dataset,
            batch_size=self.config.batch_size,
            shuffle=False,
        )
        test_loader = DataLoader(
            test_dataset,
            batch_size=self.config.batch_size,
            shuffle=False,
        )
        return DatasetBundle(
            train_loader=train_loader,
            val_loader=val_loader,
            test_loader=test_loader,
        )
