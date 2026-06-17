from __future__ import annotations

import csv
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ASSUMPTIONS_PATH = ROOT / "data" / "assumptions.csv"


def estimate_daily_births(row: dict[str, str]) -> float:
    outdoor_population = float(row["outdoor_cat_population"])
    female_share = float(row["female_share"])
    breeding_age_share = float(row["breeding_age_female_share"])
    intact_share = float(row["intact_breeding_female_share"])
    litters_per_year = float(row["litters_per_year"])
    kittens_per_litter = float(row["kittens_per_litter"])

    annual_births = (
        outdoor_population
        * female_share
        * breeding_age_share
        * intact_share
        * litters_per_year
        * kittens_per_litter
    )
    return annual_births / 365


def main() -> None:
    with ASSUMPTIONS_PATH.open(newline="", encoding="utf-8") as file:
        for row in csv.DictReader(file):
            births = estimate_daily_births(row)
            print(f"{row['scenario']}: {births:,.0f} kittens born outdoors per day")


if __name__ == "__main__":
    main()

