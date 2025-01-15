# DnD Travel Calculator

The DnD Travel Calculator is a useful tool for Dungeons & Dragons players to calculate travel time based on various factors. The website can be run locally and does not require a server as there is no backend.
The link to the Calculator is https://datengeist.github.io/DnDTravelCalculator/src/

## Installation

1. Clone the Git repository:
    ```bash
    git clone https://github.com/Datengeist/DnDTravelCalculator.git
    ```
2. Open the `index.html` file in the `src` folder in your preferred web browser.

## Usage

### Input Fields

- **Travel Time per Day (in hours)**: Enter the number of hours traveled per day.
- **Travel Type**: Choose the mode of transportation (e.g., on foot, horse, carriage).
- **Travel Speed**: Select the travel speed (slow, normal, fast, or custom).
- **Terrain**: Select the different terrains traveled on and enter the corresponding values in percentages or kilometers.

### Calculation

1. Fill in all required input fields.
2. Click the “Calculate” button.
3. The results will be displayed below the button, including the total travel time and the need for DC Constitution saving throws.

## Features

- **Dark Mode**: The website supports a dark mode, which is enabled by default.
- **Cumulative Distance**: If a terrain occurs more frequently, both length inputs can be separated by ‘+’ and the length will be calculated for both parts.
- **Travel Type and Speed**: Calculation of travel time based on travel type and speed.
- **Terrain**: Consideration of different terrains with individual modifiers.
- **Transparency**: Modifiers are either written directly or can be seen by hovering over the respective element.
- **DC Constitution Saving Throws**: Determination of the need for saving throws on longer journeys.
