# 📈 Analysis Tools

This folder contains scripts and data for analyzing and visualizing the Music and Medical Humanities Database.

---

## 📁 Files Overview

| File | Type | Description |
|------|------|-------------|
| `db_analysis.py` | Python | Statistical analysis of database entries |
| `medical-humanities-db-dashboard.jsx` | React | Interactive visualization dashboard |
| `medical_humanities_db.csv` | Data | All DB entries in tabular format |
| `network_data.json` | Data | Cross-reference relationships between entries |

---

## 🐍 db_analysis.py

Python script for comprehensive statistical analysis of the database.

### Dependencies

```bash
pip install pandas matplotlib seaborn
```

### Usage

```bash
python db_analysis.py
```

### Output

The script generates:
- Disease/condition frequency distribution
- Geographic distribution of works
- Genre breakdown
- Course week reference analysis
- Summary statistics

### Sample Output

```
=== Music and Medical Humanities DB Analysis ===

Total Entries: 91
Unique Diseases: 72
Countries Represented: 12

Top 5 Conditions:
  1. Schizophrenia: 6
  2. Tuberculosis: 5
  3. Autism Spectrum Disorder: 4
  ...
```

---

## ⚛️ medical-humanities-db-dashboard.jsx

Interactive React dashboard for exploring the database visually.

### Features

- 📊 **Disease Distribution Chart**: Bar/pie chart of conditions represented
- 🌍 **Geographic Breakdown**: Country-wise distribution of works
- 📅 **Week Reference Heatmap**: Which course weeks were most referenced
- 🔗 **Network Visualization**: Interactive graph of cross-references between entries

### Dependencies

```json
{
  "react": "^18.0.0",
  "recharts": "^2.0.0",
  "d3": "^7.0.0"
}
```

### Integration

```jsx
import MedicalHumanitiesDashboard from './medical-humanities-db-dashboard';

function App() {
  return <MedicalHumanitiesDashboard />;
}
```

### Standalone Usage

You can also run this as a standalone React app:

```bash
npx create-react-app dashboard-app
cp medical-humanities-db-dashboard.jsx dashboard-app/src/
cp medical_humanities_db.csv dashboard-app/public/
cp network_data.json dashboard-app/public/
cd dashboard-app
npm start
```

---

## 📄 medical_humanities_db.csv

Structured export of all 91 database entries in CSV format.

### Columns

| Column | Description |
|--------|-------------|
| `id` | Unique identifier |
| `title` | Work title |
| `composer_artist` | Creator of the work |
| `year` | Year of creation/release |
| `genre` | Musical genre (opera, film score, K-drama OST, etc.) |
| `country` | Country of origin |
| `disease_condition` | Primary disease/condition represented |
| `symptoms_portrayed` | Specific symptoms depicted |
| `course_week` | Related course week (1-15) |
| `student_id` | Contributing student |
| `created_at` | Entry creation date |

### Usage Examples

**Python (pandas)**
```python
import pandas as pd

df = pd.read_csv('medical_humanities_db.csv')

# Filter by condition
schizophrenia = df[df['disease_condition'] == 'Schizophrenia']

# Group by country
by_country = df.groupby('country').size().sort_values(ascending=False)
```

**R**
```r
library(tidyverse)

df <- read_csv('medical_humanities_db.csv')

df %>%
  count(disease_condition, sort = TRUE) %>%
  head(10)
```

---

## 🔗 network_data.json

JSON file containing cross-reference relationships between database entries.

### Structure

```json
{
  "nodes": [
    { "id": "entry_01", "title": "La Bohème", "disease": "Tuberculosis" },
    { "id": "entry_02", "title": "A Beautiful Mind", "disease": "Schizophrenia" }
  ],
  "links": [
    { "source": "entry_01", "target": "entry_15", "type": "same_disease" },
    { "source": "entry_02", "target": "entry_23", "type": "cross_reference" }
  ]
}
```

### Link Types

| Type | Description |
|------|-------------|
| `same_disease` | Entries about the same condition |
| `same_genre` | Entries in the same musical genre |
| `cross_reference` | Explicit reference in student notes |
| `same_country` | Works from the same country |

### Visualization

Use with D3.js force-directed graph:

```javascript
import * as d3 from 'd3';

const data = await fetch('network_data.json').then(r => r.json());

const simulation = d3.forceSimulation(data.nodes)
  .force('link', d3.forceLink(data.links).id(d => d.id))
  .force('charge', d3.forceManyBody())
  .force('center', d3.forceCenter(width / 2, height / 2));
```

---

## 📜 License

These analysis tools are released under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), the same license as the main database.

Feel free to adapt these tools for your own courses or research projects!

---

## 🤝 Contributing

Found a bug or want to add a feature? 
- Open an [Issue](../../issues) to report problems
- Submit a [Pull Request](../../pulls) with improvements

