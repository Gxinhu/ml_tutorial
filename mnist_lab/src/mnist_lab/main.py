from __future__ import annotations

import argparse
from pathlib import Path

from .config import TrainingConfig
from .data import MNISTDataModule
from .inspect import DatasetInspector
from .model import DigitCNN
from .predict import DigitPredictor
from .trainer import ModelTrainer


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Beginner-friendly MNIST lab")
    subparsers = parser.add_subparsers(dest="command", required=True)

    train_parser = subparsers.add_parser("train", help="train the CNN model")
    train_parser.add_argument("--epochs", type=int, default=3)
    train_parser.add_argument("--batch-size", type=int, default=64)
    train_parser.add_argument("--learning-rate", type=float, default=1e-3)

    evaluate_parser = subparsers.add_parser("evaluate", help="evaluate saved model")
    evaluate_parser.add_argument("--batch-size", type=int, default=64)

    inspect_parser = subparsers.add_parser("inspect", help="inspect MNIST batch")
    inspect_parser.add_argument("--batch-size", type=int, default=16)

    predict_parser = subparsers.add_parser("predict", help="predict one image")
    predict_parser.add_argument("--image", type=Path, required=True)
    predict_parser.add_argument(
        "--no-save-preview",
        action="store_true",
        help="skip saving the prediction preview figure",
    )

    return parser


def build_config(args: argparse.Namespace) -> TrainingConfig:
    config = TrainingConfig()
    if hasattr(args, "epochs"):
        config.epochs = args.epochs
    if hasattr(args, "batch_size"):
        config.batch_size = args.batch_size
    if hasattr(args, "learning_rate"):
        config.learning_rate = args.learning_rate
    return config


def train_command(config: TrainingConfig) -> None:
    data_module = MNISTDataModule(config)
    datasets = data_module.prepare()
    trainer = ModelTrainer(
        model=DigitCNN(),
        train_loader=datasets.train_loader,
        val_loader=datasets.val_loader,
        test_loader=datasets.test_loader,
        config=config,
    )
    trainer.fit()


def evaluate_command(config: TrainingConfig) -> None:
    data_module = MNISTDataModule(config)
    datasets = data_module.prepare()
    trainer = ModelTrainer(
        model=DigitCNN(),
        train_loader=datasets.train_loader,
        val_loader=datasets.val_loader,
        test_loader=datasets.test_loader,
        config=config,
    )
    trainer.load_checkpoint()
    metrics = trainer.evaluate_test()
    print(f"test_loss={metrics.loss:.4f}, test_accuracy={metrics.accuracy:.4f}")


def predict_command(
    config: TrainingConfig,
    image_path: Path,
    save_preview: bool = True,
) -> None:
    predictor = DigitPredictor(config)
    result, probabilities = predictor.predict_with_probabilities(image_path)
    print(f"Predicted digit: {result}")
    print(f"Top confidence: {max(probabilities):.4f}")
    if save_preview:
        predictor.save_prediction_preview(image_path)


def inspect_command(config: TrainingConfig) -> None:
    data_module = MNISTDataModule(config)
    datasets = data_module.prepare()
    inspector = DatasetInspector(config, datasets.train_loader)
    summary = inspector.inspect_first_batch()
    print(f"images.shape={summary.image_shape}")
    print(f"labels.shape={summary.label_shape}")
    print(f"first_labels={summary.labels}")
    inspector.save_sample_grid()


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()
    config = build_config(args)

    if args.command == "train":
        train_command(config)
    elif args.command == "evaluate":
        evaluate_command(config)
    elif args.command == "inspect":
        inspect_command(config)
    elif args.command == "predict":
        predict_command(config, args.image, save_preview=not args.no_save_preview)


if __name__ == "__main__":
    main()
