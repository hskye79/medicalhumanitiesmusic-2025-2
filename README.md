# 🎵 Music and Medical Humanities Database

[![License: CC BY-SA 4.0](https://licensebuttons.net/l/by-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-sa/4.0/)

An open-source database exploring how music represents disease, disability, suffering, and death across cultures and genres.

**Created by 97 students** of the course *"Musicology of Disease, Disability, and Suffering"* (질병과 장애, 고통의 음악학) at Hanyang University, Seoul, Korea — Fall 2025.

---

## 📖 About This Project

This database is the collaborative outcome of a **Project-Based Learning (PBL)** course that integrates musicology with medical humanities. Students analyzed how various art forms—opera, film scores, K-dramas, classical music, and popular songs—represent human experiences of illness, disability, pain, and mortality.

### Why Open Source?

In March 2025, NYU's LitMed (Literature, Arts and Medicine Database), which had accumulated over 3,400 entries across 20+ years, was suddenly discontinued. This experience highlighted the vulnerability of closed platforms and the importance of sustainable, community-owned academic resources.

This project adopts **GitHub** as its platform to ensure:
- 🔄 **Sustainability** — Distributed version control eliminates single points of failure
- 🔓 **Openness** — Anyone can fork, modify, and build upon this work
- 📜 **Transparency** — Complete history of contributions is permanently preserved
- 🎓 **Digital Literacy** — Students gain hands-on experience with Markdown and collaborative coding workflows

---

## 📊 Project Statistics

| Metric | Count |
|--------|------:|
| Database Entries | **91** |
| Total Commits | **2,225** |
| Pull Requests | **687** |
| Issues (Peer Feedback) | **377** |
| Unique Diseases/Conditions | **72** |
| Countries Represented | **12** |
| Contributing Students | **97** |

### Top Represented Conditions
1. Schizophrenia (6 entries)
2. Tuberculosis
3. Autism Spectrum Disorder
4. Blindness
5. Depression

### Geographic Distribution
- 🇺🇸 United States: 39.6%
- 🇰🇷 South Korea: 19.8%
- 🇬🇧 United Kingdom: 12.1%
- Others: France, Germany, Italy, Austria, Japan, etc.

---

## 📁 Database Entry Format

Each database entry (`*.md`) includes:
- **Basic Information**: Title, composer/artist, year, genre, country
- **Medical Context**: Disease/condition represented, symptoms portrayed
- **Musical Analysis**: How music embodies or represents the condition
- **Cultural Context**: Historical and social background
- **Funeral Music**: Music the student wishes to be played at their own funeral and why
- **Course Week Reference**: Related lecture topic

---

## 📈 Analysis Tools

The `analysis/` folder contains tools for exploring and visualizing the database:

| File | Description |
|------|-------------|
| `db_analysis.py` | Python script for statistical analysis of DB entries |
| `medical-humanities-db-dashboard.jsx` | Interactive React dashboard for data exploration |
| `medical_humanities_db.csv` | All DB entries in CSV format for easy import |
| `network_data.json` | Cross-reference network data for visualization |

### Running the Analysis

```bash
# Install dependencies
pip install pandas matplotlib

# Run analysis
python analysis/db_analysis.py
```

---

## 🎯 Learning Objectives

This course was designed as an **IC-PBL (Industry-Coupled Project-Based Learning)** and **AI × HYQ (Hanyang Questions)** class, applying the Compass QBL (Question-Based Learning) model.

Students developed from **Big Questions** to **Future Questions** through four stages:
1. Initial exploration (Week 12)
2. Peer feedback integration — *largest growth: +17.4%* (Week 13)
3. Refinement (Week 14)
4. Final submission (Week 15)

### Course Learning Goals
1. Analyze how music represents human experiences of disease, disability, suffering, and death
2. Conduct interdisciplinary research integrating medical humanities and musicology
3. Articulate perspectives on "humanness" in the posthuman era
4. **Critically utilize generative AI** for information discovery and verification (AI Literacy)

---

## 🔍 How to Use This Database

### For Researchers
- Browse the repository for analyzed works
- Use GitHub's search to find specific diseases, genres, or countries
- Fork the repository to build upon this foundation

### For Educators
- Adapt the templates for your own courses
- Reference the peer feedback model (Issues/PRs) for collaborative learning
- Use as a case study for open-source pedagogy

### For Students
- Explore diverse representations of illness in music
- Learn academic research methods through real examples
- Understand how to document and verify AI-assisted research

---

## 🤝 Contributing

This database welcomes contributions! You can:

1. **Report errors**: Open an Issue to flag inaccuracies
2. **Suggest additions**: Propose new entries via Pull Request
3. **Fork and extend**: Create your own version for different contexts

---

## 📜 License

This project is licensed under the **Creative Commons Attribution-ShareAlike 4.0 International License** ([CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)).

You are free to:
- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material for any purpose

Under the following terms:
- **Attribution** — You must give appropriate credit
- **ShareAlike** — Derivatives must use the same license

---

## 📬 Contact

**Course Instructor**  
Hee Seng Kye, Ph.D.  
Associate Professor of Musicology  
Director, Music Research Center  
College of Music, Hanyang University  
Seoul, Korea

---

## 🙏 Acknowledgments

- **97 students** of Fall 2025 who collaboratively built this database
- **Hanyang University** for pedagogical support
- The legacy of **NYU LitMed** (2000–2024), whose discontinuation inspired this open-source approach

---

<p align="center">
<i>"Music gives a soul to the universe, wings to the mind, flight to the imagination, and life to everything."</i><br/>
—Plato
</p>
