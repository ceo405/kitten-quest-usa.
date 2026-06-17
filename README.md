# Kitten Quest USA by mewv.ai

Kitten Quest USA is a mewv.ai advocacy game and Codex Community Meetup project for turning a hard question into a transparent, source-backed data workflow:

> How many cats are being born outside every day?

The project is designed as a live Codex demo. Codex can explain the assumptions, update the inputs, rerun the estimate, and help convert the findings into advocacy material for rescue groups, TNR programs, shelters, and local policy conversations.

## What This Project Does

- Tracks the best available public estimates for outdoor, free-roaming, stray, and feral cats.
- Converts reproduction assumptions into an estimated daily number of kittens born outdoors.
- Shows uncertainty honestly by using low, midpoint, and high scenarios.
- Creates advocacy-ready language without hiding the data limits.

## Brand Note

Kitten Quest USA is presented as a mewv.ai project. `mewv.ai TM` is included as a lightweight brand notice for the demo; it is not a legal trademark registration.

## Headline Estimate

Using the included assumptions, the model estimates that roughly:

**55,000 to 217,000 kittens may be born outdoors in the United States every day.**

The midpoint scenario is about:

**114,000 kittens born outdoors per day.**

This is an estimate of births, not surviving kittens. Outdoor kitten mortality can be high, and national cat population counts are uncertain.

## Project Files

- `index.html` is a 90s video game style interactive dashboard.
- `research_brief.md` explains the data logic and source notes.
- `pipeline_design.md` describes the proposed data pipeline.
- `data/assumptions.csv` contains the editable model inputs.
- `src/estimate_births.py` runs the estimate from the assumptions file.
- `meetup_one_pager.md` is a short pitch for the Codex Community Meetup.

## Open The Game

Open `index.html` in a browser. It runs locally with no install step.

The page is now a 5-round U.S. data guessing game. Correct answers reveal randomly selected common cats, and a perfect 5 out of 5 unlocks a rare breed kitten.

## Run The Estimator

From this folder:

```powershell
python src/estimate_births.py
```

Expected output:

```text
low: 55,377 kittens born outdoors per day
mid: 114,148 kittens born outdoors per day
high: 217,479 kittens born outdoors per day
```

## Advocacy Use

This project is not meant to shame communities or flatten a complex welfare issue into a single number. It is meant to help advocates say:

1. We do not have enough local data.
2. The scale is likely much larger than most people imagine.
3. Spay/neuter access, kitten foster networks, shelter diversion, and community cat data collection are measurable interventions.
