from __future__ import annotations

from pathlib import Path

import matplotlib.pyplot as plt
import torch
from PIL import Image, ImageOps
from torch import Tensor
from torch.nn import functional as F
from torchvision import transforms

from .config import TrainingConfig
from .model import DigitCNN


class DigitPredictor:
    def __init__(self, config: TrainingConfig) -> None:
        self.config = config
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model = DigitCNN()
        self.model.load_state_dict(
            torch.load(self.config.model_path, map_location=self.device)
        )
        self.model.to(self.device)
        self.model.eval()
        self.transform = transforms.Compose(
            [
                transforms.ToTensor(),
                transforms.Normalize((0.1307,), (0.3081,)),
            ]
        )

    def preprocess_image(self, image_path: Path) -> Tensor:
        image = Image.open(image_path).convert("L")
        image = ImageOps.invert(image)
        image = image.resize((28, 28))
        tensor = self.transform(image).unsqueeze(0)
        return tensor.to(self.device)

    @torch.no_grad()
    def predict(self, image_path: Path) -> int:
        image_tensor = self.preprocess_image(image_path)
        logits = self.model(image_tensor)
        prediction = logits.argmax(dim=1).item()
        return prediction

    @torch.no_grad()
    def predict_with_probabilities(self, image_path: Path) -> tuple[int, list[float]]:
        image_tensor = self.preprocess_image(image_path)
        logits = self.model(image_tensor)
        probabilities = F.softmax(logits, dim=1).squeeze(0).tolist()
        prediction = int(torch.argmax(logits, dim=1).item())
        return prediction, probabilities

    def save_prediction_preview(self, image_path: Path) -> None:
        prediction, probabilities = self.predict_with_probabilities(image_path)
        image = Image.open(image_path).convert("L")

        top_indices = sorted(
            range(len(probabilities)),
            key=lambda index: probabilities[index],
            reverse=True,
        )[:3]
        top_labels = [str(index) for index in top_indices]
        top_scores = [probabilities[index] for index in top_indices]

        self.config.artifacts_dir.mkdir(parents=True, exist_ok=True)
        figure, axes = plt.subplots(1, 2, figsize=(8, 4))

        axes[0].imshow(image, cmap="gray")
        axes[0].set_title(f"Predicted: {prediction}")
        axes[0].axis("off")

        axes[1].bar(top_labels, top_scores, color="#3568d4")
        axes[1].set_ylim(0.0, 1.0)
        axes[1].set_title("Top probabilities")
        axes[1].set_ylabel("confidence")

        figure.tight_layout()
        figure.savefig(self.config.prediction_plot_path)
        plt.close(figure)
        print(f"Saved prediction preview to {self.config.prediction_plot_path}")
