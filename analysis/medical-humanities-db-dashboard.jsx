import React, { useState, useMemo } from 'react';

// Database entries extracted from student markdown files (91 entries)
const databaseEntries = [
  {
    "filename": "ahn-soobin.md",
    "title": "Ureureung Kwak-Kwak-Kwak",
    "year": 2020,
    "genre": "Music",
    "disease": "",
    "icd_code": "F41.1",
    "composer": "Stella Jang",
    "country": "Korea",
    "student": "Ahn Soobin",
    "funeral_music": "“Everything” by The Black Skirts",
    "cross_references": [
      "Jung Yunjin"
    ],
    "week_references": [],
    "themes": [
      "piano",
      "death",
      "inner world",
      "empathy",
      "hope",
      "romanticism",
      "overcoming",
      "memory"
    ],
    "youtube_urls": [
      "https://youtu.be/G9IP9rjxSE0",
      "https://youtu.be/MXY08fPiqdA"
    ],
    "funeral_music_url": "https://youtu.be/G9IP9rjxSE0"
  },
  {
    "filename": "an-yeeun.md",
    "title": "Symphony No.4 in a minor, Op.63",
    "year": 1910,
    "genre": "Classical Music",
    "disease": "Laryngeal cancer",
    "icd_code": "2C23",
    "composer": "Jean Sibelius",
    "country": "Finland",
    "student": "An Yeeun",
    "funeral_music": "Liszt’s Consolation No. 3",
    "cross_references": [
      "Jeon Junwoo"
    ],
    "week_references": [
      3,
      12,
      14,
      7
    ],
    "themes": [
      "death",
      "inner world",
      "healing",
      "terminal illness",
      "hope",
      "isolation",
      "dissonance",
      "repetition"
    ],
    "youtube_urls": [
      "https://youtu.be/SbPIqimhf78",
      "https://youtu.be/HjeF99_ocfM"
    ],
    "funeral_music_url": "https://youtu.be/SbPIqimhf78"
  },
  {
    "filename": "bae-minseok.md",
    "title": "PerfectBlue",
    "year": 1997,
    "genre": "Film",
    "disease": "Dissociative Identity Disorder",
    "icd_code": "6B64",
    "composer": "",
    "country": "Japan",
    "student": "Bae Minseok",
    "funeral_music": "Here with you",
    "cross_references": [
      "Woo Seunghun"
    ],
    "week_references": [],
    "themes": [
      "death",
      "identity",
      "trauma",
      "dissonance",
      "silence",
      "pain",
      "film score"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=yyaI-OGhfKE",
      "https://www.youtube.com/watch?v=v5pbT16G4lU",
      "https://www.youtube.com/watch?v=nBvynO9LY54"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=yyaI-OGhfKE"
  },
  {
    "filename": "baek-jaehyuk.md",
    "title": "Boléro",
    "year": 1928,
    "genre": "Orchestral Music",
    "disease": "Obsessive-Compulsive Disorder",
    "icd_code": "6b20",
    "composer": "",
    "country": "France",
    "student": "Baek Jaehyuk",
    "funeral_music": "River Flows in You",
    "cross_references": [
      "Huh Hoyoung"
    ],
    "week_references": [
      10,
      3,
      5
    ],
    "themes": [
      "death",
      "inner world",
      "memory",
      "rhythm",
      "opera",
      "love",
      "repetition",
      "communication"
    ],
    "youtube_urls": [
      "https://youtu.be/alBQFJjniV0",
      "https://www.youtube.com/watch?v=7maJOI3QMu0"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=7maJOI3QMu0"
  },
  {
    "filename": "baek-seungjae.md",
    "title": "Forrest gump",
    "year": 1994,
    "genre": "Film",
    "disease": "Mild intellectual development disorder",
    "icd_code": "6A00.0",
    "composer": "",
    "country": "USA",
    "student": "Baek Seungjae",
    "funeral_music": "Ballerina by Yehezkel Raz",
    "cross_references": [
      "Bae Minseok"
    ],
    "week_references": [
      11,
      5,
      7
    ],
    "themes": [
      "piano",
      "death",
      "inner world",
      "hope",
      "beauty",
      "identity",
      "memory",
      "trauma"
    ],
    "youtube_urls": [
      "https://youtu.be/lTcIZ8z1eVA",
      "https://youtu.be/IkdI27KtA-U"
    ],
    "funeral_music_url": "https://youtu.be/IkdI27KtA-U"
  },
  {
    "filename": "byeon-hyejung.md",
    "title": "CODA",
    "year": 2021,
    "genre": "Film",
    "disease": "hearing loss",
    "icd_code": "MB20",
    "composer": "",
    "country": "USA",
    "student": "Byeon Hyejung",
    "funeral_music": "“Both sides now”",
    "cross_references": [
      "Choi Myeonghyeon"
    ],
    "week_references": [
      3,
      12,
      5
    ],
    "themes": [
      "piano",
      "death",
      "inner world",
      "sensory disability",
      "overcoming",
      "family",
      "love",
      "silence"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=qlTEAXcKssg",
      "https://www.youtube.com/watch?v=BzYnNdJhZQw"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=BzYnNdJhZQw&list=RDBzYnNdJhZQw&start_radio=1"
  },
  {
    "filename": "chang-minha.md",
    "title": "Me Before You",
    "year": 2016,
    "genre": "Film",
    "disease": "General paralysis",
    "icd_code": "8B61.0",
    "composer": "",
    "country": "UK",
    "student": "Chang Minha",
    "funeral_music": "“Wawa”",
    "cross_references": [
      "Kim Junho"
    ],
    "week_references": [
      5
    ],
    "themes": [
      "death",
      "beauty",
      "memory",
      "love",
      "pain",
      "film score"
    ],
    "youtube_urls": [
      "https://youtu.be/6ga1olx5c_Q",
      "https://youtu.be/H_z63kWV-80"
    ],
    "funeral_music_url": "https://youtu.be/6ga1olx5c_Q"
  },
  {
    "filename": "cheong-yunho.md",
    "title": "Extraordinary Attorney Woo",
    "year": 2022,
    "genre": "Drama",
    "disease": "Autism Spectrum Disorder",
    "icd_code": "F84.0",
    "composer": "",
    "country": "Korea",
    "student": "Cheong Yunho",
    "funeral_music": "“Tree”",
    "cross_references": [],
    "week_references": [
      2,
      12,
      5
    ],
    "themes": [
      "piano",
      "death",
      "inner world",
      "genius",
      "hope",
      "overcoming",
      "memory",
      "rhythm"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=cHkDZ1ekB9U",
      "https://www.youtube.com/watch?v=a8HyGir3Ot8"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=cHkDZ1ekB9U&list=RDcHkDZ1ekB9U&start_radio=1"
  },
  {
    "filename": "choi-hyunseok.md",
    "title": "Ludwig van Beethoven, Symphony No. 9 in D minor, Op. 125 ('Choral')",
    "year": 1824,
    "genre": "Music",
    "disease": "Hearing Impairment",
    "icd_code": "H90.3",
    "composer": "",
    "country": "Germany",
    "student": "Choi Hyunseok",
    "funeral_music": "Moonlight Sonata, 1st Movement",
    "cross_references": [
      "Choi Myeonghyeon"
    ],
    "week_references": [],
    "themes": [
      "piano",
      "death",
      "inner world",
      "sensory disability",
      "hope",
      "romanticism",
      "overcoming",
      "beauty"
    ],
    "youtube_urls": [
      "https://youtu.be/oqnKwesvSGQ",
      "https://youtu.be/1XT4T9b7Q4w"
    ],
    "funeral_music_url": "https://youtu.be/oqnKwesvSGQ"
  },
  {
    "filename": "choi-issac.md",
    "title": "La Traviata",
    "year": 1853,
    "genre": "Opera",
    "disease": "Tuberculosis",
    "icd_code": "1B12",
    "composer": "",
    "country": "Italy",
    "student": "Choi Issac",
    "funeral_music": "Pie Jesu",
    "cross_references": [
      "Ki Hayoon"
    ],
    "week_references": [
      2,
      3,
      12,
      14
    ],
    "themes": [
      "piano",
      "death",
      "inner world",
      "hope",
      "romanticism",
      "beauty",
      "rhythm",
      "opera"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=OOvyjk8qgRQ",
      "https://www.youtube.com/watch?v=ug9gWXlyuDs"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=OOvyjk8qgRQ"
  },
  {
    "filename": "choi-junwon.md",
    "title": "Daily Dose of Sunshine",
    "year": 2023,
    "genre": "Drama",
    "disease": "Bipolar Disorder, Delusional Disorder, Social Anxiety Disorder, Panic Disorder, Depression, etc.",
    "icd_code": "F31 (Bipolar Affective Disorder), F20 (Schizophrenia and other psychotic disorders), F40 (Phobic anxiety disorders), F41 (Other anxiety disorders), F32 (Depressive episodes)",
    "composer": "",
    "country": "Korea",
    "student": "Choi Junwon",
    "funeral_music": "lullaby",
    "cross_references": [
      "Bae Minseok"
    ],
    "week_references": [],
    "themes": [
      "death",
      "inner world",
      "mood disorder",
      "hope",
      "overcoming",
      "dissonance",
      "pain",
      "film score"
    ],
    "youtube_urls": [
      "https://youtu.be/rMaeNxPsDm8",
      "https://youtu.be/aepREwo5Lio"
    ],
    "funeral_music_url": "https://youtu.be/aepREwo5Lio"
  },
  {
    "filename": "choi-myeonghyeon.md",
    "title": "Piano Sonata No. 14 in C-sharp minor, “Moonlight Sonata”",
    "year": 1801,
    "genre": "Music",
    "disease": "Deafness",
    "icd_code": "AB52",
    "composer": "Ludwig van Beethoven",
    "country": "Germany",
    "student": "Choi Myeonghyeon",
    "funeral_music": "\"My way\"",
    "cross_references": [
      "Choi Hyunseok"
    ],
    "week_references": [
      3,
      12,
      5
    ],
    "themes": [
      "piano",
      "death",
      "inner world",
      "sensory disability",
      "empathy",
      "hope",
      "overcoming",
      "memory"
    ],
    "youtube_urls": [
      "https://youtu.be/qQzdAsjWGPg",
      "https://youtu.be/uTjOXAzUTQA"
    ],
    "funeral_music_url": "https://youtu.be/qQzdAsjWGPg"
  },
  {
    "filename": "choi-yoonseo.md",
    "title": "A Beautiful Mind",
    "year": 2001,
    "genre": "Film",
    "disease": "Schizophrenia",
    "icd_code": "F20",
    "composer": "",
    "country": "USA",
    "student": "Choi Yoonseo",
    "funeral_music": "눈사람",
    "cross_references": [
      "Kim Jieun"
    ],
    "week_references": [
      8,
      13,
      5,
      14
    ],
    "themes": [
      "communication",
      "piano",
      "death",
      "overcoming",
      "opera",
      "isolation",
      "genius",
      "inner world"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=gPNu9OIj4Zo",
      "https://www.youtube.com/watch?v=eamiiuUmVz8"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=gPNu9OIj4Zo&list=RDgPNu9OIj4Zo&start_radio=1"
  },
  {
    "filename": "cui-yuqing.md",
    "title": "Me before you",
    "year": 2016,
    "genre": "Film",
    "disease": "General paralysis",
    "icd_code": "G82.5",
    "composer": "",
    "country": "UK",
    "student": "Cui Yuqing",
    "funeral_music": "ghostin",
    "cross_references": [
      "Choi Issac"
    ],
    "week_references": [
      12,
      5,
      14
    ],
    "themes": [
      "death",
      "inner world",
      "empathy",
      "hope",
      "romanticism",
      "beauty",
      "memory",
      "rhythm"
    ],
    "youtube_urls": [
      "https://youtu.be/Rr7V4acsT2Y",
      "https://youtu.be/H_z63kWV-80"
    ],
    "funeral_music_url": "https://youtu.be/Rr7V4acsT2Y"
  },
  {
    "filename": "han-junryul.md",
    "title": "Kill me heal me",
    "year": 2015,
    "genre": "Drama",
    "disease": "Dissociative identity disorder",
    "icd_code": "6B64",
    "composer": "",
    "country": "Korea",
    "student": "Han Junryul",
    "funeral_music": "환청",
    "cross_references": [
      "Bae Minseok"
    ],
    "week_references": [],
    "themes": [
      "death",
      "inner world",
      "identity",
      "rhythm",
      "hallucination",
      "communication",
      "repetition",
      "pain"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=yROjTblMPag",
      "https://www.youtube.com/watch?v=tVoE9_eN8TE"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=yROjTblMPag&list=RDyROjTblMPag&start_radio=1"
  },
  {
    "filename": "huh-hoyoung.md",
    "title": "Symphonie Fantastique (Op. 14, 1830)",
    "year": 1830,
    "genre": "Classical Music",
    "disease": "Obsessive–compulsive personality disorder",
    "icd_code": "6D10",
    "composer": "",
    "country": "France",
    "student": "Huh Hoyoung",
    "funeral_music": "Auditory Hallucination",
    "cross_references": [
      "Han Junryul"
    ],
    "week_references": [],
    "themes": [
      "death",
      "inner world",
      "hope",
      "identity",
      "love",
      "dissonance",
      "hallucination",
      "orchestra"
    ],
    "youtube_urls": [
      "https://youtu.be/iIn_1_XDuBM",
      "https://youtu.be/YjJvpSS4SMM",
      "https://youtu.be/AEXJKQ8b1gM"
    ],
    "funeral_music_url": "https://youtu.be/LRrsW8-TkQ0"
  },
  {
    "filename": "jang-ayeong.md",
    "title": "Phantom",
    "year": 1991,
    "genre": "Musical",
    "disease": "Craniofacial deformity",
    "icd_code": "Q87.8",
    "composer": "Andrew Lloyd Webber",
    "country": "Korea",
    "student": "Jang Ayeong",
    "funeral_music": "Bravo, My Life!",
    "cross_references": [
      "Jeon Eunsu"
    ],
    "week_references": [],
    "themes": [
      "death",
      "inner world",
      "healing",
      "hope",
      "identity",
      "memory",
      "love",
      "isolation"
    ],
    "youtube_urls": [
      "https://youtu.be/QXzxqiLmxFQ",
      "https://youtu.be/EBDxEHzidx0"
    ],
    "funeral_music_url": "https://youtu.be/QXzxqiLmxFQ"
  },
  {
    "filename": "jang-daehyeok.md",
    "title": "The Pianist",
    "year": 2002,
    "genre": "Film",
    "disease": "PTSD",
    "icd_code": "F43.1",
    "composer": "",
    "country": "France/Poland",
    "student": "Jang Daehyeok",
    "funeral_music": "“The Reason”",
    "cross_references": [
      "Song Jungbin"
    ],
    "week_references": [
      10,
      11,
      5,
      14
    ],
    "themes": [
      "piano",
      "death",
      "healing",
      "inner world",
      "empathy",
      "hope",
      "identity",
      "memory"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=jHfQCfUTlXE",
      "https://www.youtube.com/watch?v=fV4DiAyExN0"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=fV4DiAyExN0&list=RDfV4DiAyExN0&start_radio=1"
  },
  {
    "filename": "jang-hyojin.md",
    "title": "A beautiful Mind",
    "year": 2001,
    "genre": "Film",
    "disease": "Schizophrenia",
    "icd_code": "F20-F29",
    "composer": "",
    "country": "USA",
    "student": "Jang Hyojin",
    "funeral_music": "\"River Flows in You\"",
    "cross_references": [
      "Cheong Yunho"
    ],
    "week_references": [
      3,
      12,
      5,
      7
    ],
    "themes": [
      "piano",
      "death",
      "healing",
      "inner world",
      "psychosis",
      "hope",
      "beauty",
      "memory"
    ],
    "youtube_urls": [
      "https://youtu.be/tICApgIuotw",
      "https://youtu.be/7maJOI3QMu0"
    ],
    "funeral_music_url": "https://youtu.be/7maJOI3QMu0"
  },
  {
    "filename": "jang-jihyeon.md",
    "title": "A Beautiful Mind",
    "year": 2001,
    "genre": "Film",
    "disease": "paranoid schizophrenia",
    "icd_code": "6A20.Z",
    "composer": "",
    "country": "USA",
    "student": "Jang Jihyeon",
    "funeral_music": "All Love Can Be",
    "cross_references": [
      "Jang Daehyeok"
    ],
    "week_references": [],
    "themes": [
      "piano",
      "death",
      "inner world",
      "genius",
      "psychosis",
      "empathy",
      "beauty",
      "rhythm"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=tICApgIuotw",
      "https://www.youtube.com/watch?v=R2kW65xtIW8"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=R2kW65xtIW8&list=RDR2kW65xtIW8&start_radio=1"
  },
  {
    "filename": "jang-minsun.md",
    "title": "La Traviata",
    "year": 0,
    "genre": "Opera",
    "disease": "Tuberculosis",
    "icd_code": "1B10",
    "composer": "",
    "country": "Italy",
    "student": "Jang Minsun",
    "funeral_music": "Mahler’s Symphony No. 5",
    "cross_references": [
      "Ki Hayoon"
    ],
    "week_references": [
      10,
      12,
      5
    ],
    "themes": [
      "death",
      "inner world",
      "healing",
      "hope",
      "beauty",
      "sublime",
      "memory",
      "rhythm"
    ],
    "youtube_urls": [],
    "funeral_music_url": ""
  },
  {
    "filename": "jeon-eunsu.md",
    "title": "Wonder",
    "year": 2017,
    "genre": "Film",
    "disease": "Treacher Collins Syndrome",
    "icd_code": "Q75.4",
    "composer": "",
    "country": "USA",
    "student": "Jeon Eunsu",
    "funeral_music": "“Goodbye, My Summer”",
    "cross_references": [
      "Choi Junwon"
    ],
    "week_references": [
      1,
      2,
      12
    ],
    "themes": [
      "piano",
      "death",
      "healing",
      "inner world",
      "empathy",
      "hope",
      "overcoming",
      "memory"
    ],
    "youtube_urls": [
      "https://youtu.be/CT69UaBUydA",
      "https://youtu.be/tKERw3_ked0"
    ],
    "funeral_music_url": "https://youtu.be/tKERw3_ked0"
  },
  {
    "filename": "jeon-junwoo.md",
    "title": "Film Sound of Meta",
    "year": 2019,
    "genre": "Musical",
    "disease": "Hearing impairment",
    "icd_code": "AB51",
    "composer": "",
    "country": "Korea",
    "student": "Jeon Junwoo",
    "funeral_music": "사운드 오브 메탈",
    "cross_references": [
      "Ahn Soobin"
    ],
    "week_references": [],
    "themes": [
      "death",
      "inner world",
      "healing",
      "sensory disability",
      "hope",
      "identity",
      "memory",
      "rhythm"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=VFOrGkAvjAE",
      "https://www.youtube.com/watch?v=Q70VjGBYtRM"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=Q70VjGBYtRM&list=RDQ70VjGBYtRM&start_radio=1"
  },
  {
    "filename": "ji-dain2.md",
    "title": "Marathon",
    "year": 2005,
    "genre": "Film",
    "disease": "autism spectrum disorder",
    "icd_code": "6A02",
    "composer": "",
    "country": "Korea",
    "student": "Ji Dain2",
    "funeral_music": "One More Time",
    "cross_references": [
      "Bae Minseok"
    ],
    "week_references": [],
    "themes": [
      "death",
      "healing",
      "genius",
      "hope",
      "romanticism",
      "overcoming",
      "sublime",
      "memory"
    ],
    "youtube_urls": [
      "https://youtu.be/6nM9hL95LzA",
      "https://youtu.be/OgEwJ8a1OoY"
    ],
    "funeral_music_url": "https://youtu.be/OgEwJ8a1OoY"
  },
  {
    "filename": "jung-hochan.md",
    "title": "Memento",
    "year": 2000,
    "genre": "Film",
    "disease": "Amnesia",
    "icd_code": "F04, R41.3",
    "composer": "",
    "country": "USA",
    "student": "Jung Hochan",
    "funeral_music": "작품 안에 있는 음악을 보면",
    "cross_references": [
      "Kim Yongbin"
    ],
    "week_references": [
      12,
      5
    ],
    "themes": [
      "piano",
      "death",
      "inner world",
      "hope",
      "beauty",
      "identity",
      "memory",
      "rhythm"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=5dTyWNwfnZc",
      "https://www.youtube.com/watch?v=b-j07BRzq1g"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=5dTyWNwfnZc&list=RD5dTyWNwfnZc&start_radio=1"
  },
  {
    "filename": "jung-junhyeong.md",
    "title": "Forrest Gump",
    "year": 1994,
    "genre": "Film",
    "disease": "intellectual disability",
    "icd_code": "F71",
    "composer": "",
    "country": "USA",
    "student": "Jung Junhyeong",
    "funeral_music": "Ludovico Einaudi’s Nuvole Bianche",
    "cross_references": [
      "Baek Seungjae"
    ],
    "week_references": [
      1,
      10,
      3
    ],
    "themes": [
      "piano",
      "death",
      "inner world",
      "empathy",
      "hope",
      "romanticism",
      "overcoming",
      "memory"
    ],
    "youtube_urls": [
      "https://youtu.be/VUCI-1vIbUo",
      "https://youtu.be/bOvuwNyhcqI"
    ],
    "funeral_music_url": "https://youtu.be/VUCI-1vIbUo"
  },
  {
    "filename": "jung-yunjin.md",
    "title": "Listen before i go",
    "year": 2019,
    "genre": "Pop",
    "disease": "Depression",
    "icd_code": "F32",
    "composer": "",
    "country": "USA",
    "student": "Jung Yunjin",
    "funeral_music": "\"See you again\"",
    "cross_references": [
      "Ahn Soobin"
    ],
    "week_references": [
      2,
      12
    ],
    "themes": [
      "piano",
      "inner world",
      "death",
      "healing",
      "mood disorder",
      "hope",
      "romanticism",
      "love"
    ],
    "youtube_urls": [
      "https://youtu.be/OuFr0C3rvw8",
      "https://youtu.be/_ogDymI9BKM"
    ],
    "funeral_music_url": "https://youtu.be/_ogDymI9BKM"
  },
  {
    "filename": "kang-nuri.md",
    "title": "Requiem for a dream",
    "year": 2000,
    "genre": "Film",
    "disease": "Mental and behavioral disorders due to psychoactive substance use",
    "icd_code": "6C4G.2Z",
    "composer": "",
    "country": "USA",
    "student": "Kang Nuri",
    "funeral_music": "«River Flows in You»",
    "cross_references": [
      "Baek Jaehyuk"
    ],
    "week_references": [
      10,
      3,
      5
    ],
    "themes": [
      "piano",
      "death",
      "healing",
      "inner world",
      "hope",
      "overcoming",
      "identity",
      "memory"
    ],
    "youtube_urls": [
      "https://youtu.be/7maJOI3QMu0",
      "https://youtu.be/4I-GGTCV0K0"
    ],
    "funeral_music_url": "https://youtu.be/7maJOI3QMu0"
  },
  {
    "filename": "kang-taeyoung.md",
    "title": "The Hunchback of Notre Dame",
    "year": 1996,
    "genre": "Film",
    "disease": "Kyphosis,Craniofacial anomalies",
    "icd_code": "M40,Q75.9",
    "composer": "",
    "country": "USA",
    "student": "Kang Taeyoung",
    "funeral_music": "<Isn’t She Lovely>",
    "cross_references": [
      "Kim Seonghwi"
    ],
    "week_references": [
      3,
      12,
      5
    ],
    "themes": [
      "death",
      "inner world",
      "hope",
      "identity",
      "memory",
      "rhythm",
      "love",
      "opera"
    ],
    "youtube_urls": [
      "https://youtu.be/jdIP2xmDqx0",
      "https://www.youtube.com/watch?v=oE56g61mW44"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=oE56g61mW44"
  },
  {
    "filename": "ki-hayoon.md",
    "title": "Les Misérables",
    "year": 2012,
    "genre": "Film",
    "disease": "Pulmonary Tuberculosis",
    "icd_code": "A15.0",
    "composer": "",
    "country": "UK",
    "student": "Ki Hayoon",
    "funeral_music": "판틴의 노래 <I Dreamed a Dream>",
    "cross_references": [
      "Choi Issac"
    ],
    "week_references": [
      3,
      12,
      13,
      14
    ],
    "themes": [
      "piano",
      "death",
      "healing",
      "hope",
      "rhythm",
      "infectious disease",
      "dissonance",
      "silence"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=I-bAtFgei_E",
      "https://www.youtube.com/watch?v=yqX6fX6SOFM"
    ],
    "funeral_music_url": ""
  },
  {
    "filename": "kim-chaewon.md",
    "title": "The Book of Henry",
    "year": 2017,
    "genre": "Film",
    "disease": "brain tumour",
    "icd_code": "C71",
    "composer": "",
    "country": "USA",
    "student": "Kim Chaewon",
    "funeral_music": "사운드트랙 재생 목록",
    "cross_references": [
      "An Yeeun"
    ],
    "week_references": [
      10,
      12,
      5,
      7
    ],
    "themes": [
      "communication",
      "repetition",
      "piano",
      "death",
      "family",
      "narrative medicine",
      "genius",
      "inner world"
    ],
    "youtube_urls": [
      "https://youtu.be/XfLziwOCfMk",
      "https://youtu.be/-Bxpm0EmOMU"
    ],
    "funeral_music_url": "https://youtu.be/-Bxpm0EmOMU"
  },
  {
    "filename": "kim-chanmi.md",
    "title": "Winterreise",
    "year": 1827,
    "genre": "Song Cycle",
    "disease": "depression and existential despair",
    "icd_code": "F32.9",
    "composer": "Schubert",
    "country": "Austria",
    "student": "Kim Chanmi",
    "funeral_music": "Adagio for Strings",
    "cross_references": [
      "Jung Yunjin"
    ],
    "week_references": [],
    "themes": [
      "piano",
      "death",
      "healing",
      "inner world",
      "mood disorder",
      "hope",
      "romanticism",
      "beauty"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=nyDTPuaFCDg",
      "https://www.youtube.com/watch?v=v1vq0EaPRY8",
      "https://www.youtube.com/watch?v=izQsgE0L450"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=izQsgE0L450"
  },
  {
    "filename": "kim-gunwoo.md",
    "title": "A Beautiful Mind",
    "year": 2001,
    "genre": "Film",
    "disease": "Schizophrenia",
    "icd_code": "F20-F29",
    "composer": "James Horner",
    "country": "USA",
    "student": "Kim Gunwoo",
    "funeral_music": null,
    "cross_references": [
      "Han Junryul"
    ],
    "week_references": [],
    "themes": [
      "death",
      "inner world",
      "genius",
      "psychosis",
      "hope",
      "overcoming",
      "beauty",
      "identity"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=kG4MKyq6jOU"
    ],
    "funeral_music_url": ""
  },
  {
    "filename": "kim-harin.md",
    "title": "Gombo Taryeong",
    "year": 0,
    "genre": "Traditional Korean",
    "disease": "Smallpox",
    "icd_code": "B03",
    "composer": "Lee Hyeon-ik",
    "country": "Korea",
    "student": "Kim Harin",
    "funeral_music": "“Flash” (“Jumadeung”) by WOODZ",
    "cross_references": [
      "Shin Sejong"
    ],
    "week_references": [
      1,
      2,
      5
    ],
    "themes": [
      "death",
      "inner world",
      "hope",
      "overcoming",
      "beauty",
      "memory",
      "rhythm",
      "opera"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=gbftgRNPTx4",
      "https://www.youtube.com/watch?v=gpYq0e7V3BA"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=gbftgRNPTx4"
  },
  {
    "filename": "kim-janghyeon.md",
    "title": "Fidelio",
    "year": 1805,
    "genre": "Opera",
    "disease": "Sensorineural hearing loss, bilateral",
    "icd_code": "H90.3",
    "composer": "",
    "country": "Germany",
    "student": "Kim Janghyeon",
    "funeral_music": "Joe Hisaishi - Spring",
    "cross_references": [],
    "week_references": [],
    "themes": [
      "piano",
      "death",
      "inner world",
      "sensory disability",
      "hope",
      "overcoming",
      "beauty",
      "identity"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=sm7hGCSkhTE",
      "https://www.youtube.com/watch?v=_7jTnc-LUg0"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=_7jTnc-LUg0&list=RD_7jTnc-LUg0&start_radio=1"
  },
  {
    "filename": "kim-jieun.md",
    "title": "Pierrot Lunaire",
    "year": 1912,
    "genre": "Music",
    "disease": "Schizophrenia",
    "icd_code": "F20.0",
    "composer": "",
    "country": "Austria",
    "student": "Kim Jieun",
    "funeral_music": "I Love You So",
    "cross_references": [
      "Baek Jaehyuk"
    ],
    "week_references": [],
    "themes": [
      "death",
      "inner world",
      "psychosis",
      "hope",
      "overcoming",
      "beauty",
      "memory",
      "trauma"
    ],
    "youtube_urls": [
      "https://youtu.be/NwFVSclD_uc",
      "https://youtu.be/F6nyy7G9MDA"
    ],
    "funeral_music_url": "https://youtu.be/NwFVSclD_uc"
  },
  {
    "filename": "kim-junho.md",
    "title": "Extraordinary Attorney Woo",
    "year": 2022,
    "genre": "Drama",
    "disease": "Autism Spectrum Disorder",
    "icd_code": "F84.0",
    "composer": "",
    "country": "Korea",
    "student": "Kim Junho",
    "funeral_music": "John Lennon’s Imagine",
    "cross_references": [
      "Lee Yubin",
      "Cheong Yunho"
    ],
    "week_references": [
      1,
      10,
      2
    ],
    "themes": [
      "death",
      "inner world",
      "hope",
      "romanticism",
      "overcoming",
      "beauty",
      "identity",
      "violin"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=LPZDKf29IRs",
      "https://www.youtube.com/watch?v=YkgkThdzX-8"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=YkgkThdzX-8&list=RDYkgkThdzX-8&start_radio=1"
  },
  {
    "filename": "kim-lanhee.md",
    "title": "Jekyll & Hyde",
    "year": 1990,
    "genre": "Musical",
    "disease": "",
    "icd_code": "F44.81",
    "composer": "",
    "country": "USA",
    "student": "Kim Lanhee",
    "funeral_music": "Dvořák’s Humoresque",
    "cross_references": [
      "Yu Jonghun"
    ],
    "week_references": [],
    "themes": [
      "death",
      "inner world",
      "hope",
      "identity",
      "rhythm",
      "love",
      "communication",
      "repetition"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=qWW4E4aCsAA",
      "https://www.youtube.com/watch?v=Eg6a9YA9YEs"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=Eg6a9YA9YEs"
  },
  {
    "filename": "kim-nayeon.md",
    "title": "Beautiful Mind",
    "year": 2002,
    "genre": "Film",
    "disease": "Paranoid Schizophrenia",
    "icd_code": "F20.0",
    "composer": "James Horner",
    "country": "USA",
    "student": "Kim Nayeon",
    "funeral_music": "\"Aranguez Concerto Movement 2\"",
    "cross_references": [
      "Han Junryul",
      "Jang Hyojin"
    ],
    "week_references": [],
    "themes": [
      "communication",
      "piano",
      "death",
      "opera",
      "isolation",
      "genius",
      "inner world",
      "beauty"
    ],
    "youtube_urls": [
      "https://youtu.be/eamiiuUmVz8",
      "https://youtu.be/ekznnxaGzNU"
    ],
    "funeral_music_url": "https://youtu.be/ekznnxaGzNU"
  },
  {
    "filename": "kim-nayoung.md",
    "title": "Me Before You",
    "year": 2016,
    "genre": "Film",
    "disease": "quadriplegic",
    "icd_code": "8D20.10",
    "composer": "",
    "country": "UK",
    "student": "Kim Nayoung",
    "funeral_music": "맥스 주리(Max Jury)의 *Numb* (2016)",
    "cross_references": [
      "Lee Inhye"
    ],
    "week_references": [],
    "themes": [
      "piano",
      "death",
      "inner world",
      "hope",
      "memory",
      "rhythm",
      "love",
      "isolation"
    ],
    "youtube_urls": [
      "https://youtu.be/wEifN-65-h8",
      "https://youtu.be/eNznPGirzfg"
    ],
    "funeral_music_url": "https://youtu.be/wEifN-65-h8"
  },
  {
    "filename": "kim-seonghwi.md",
    "title": "The Man Who Laugh",
    "year": 2018,
    "genre": "Musical",
    "disease": "Assault by another person",
    "icd_code": "PE30.0",
    "composer": "",
    "country": "USA",
    "student": "Kim Seonghwi",
    "funeral_music": "“Fly Me to the Moon.”",
    "cross_references": [
      "Jang Ayeong"
    ],
    "week_references": [],
    "themes": [
      "death",
      "healing",
      "empathy",
      "hope",
      "memory",
      "opera",
      "love",
      "family"
    ],
    "youtube_urls": [
      "https://youtu.be/_SdJlsk7DZo",
      "https://youtu.be/FtH8mo8QmOE",
      "https://youtu.be/Y2rDb4Ur2dw"
    ],
    "funeral_music_url": "https://youtu.be/Y2rDb4Ur2dw"
  },
  {
    "filename": "kim-seongjun.md",
    "title": "La travita",
    "year": 1853,
    "genre": "Opera",
    "disease": "tuberculosis",
    "icd_code": "1B10.0",
    "composer": "",
    "country": "Italy",
    "student": "Kim Seongjun",
    "funeral_music": "\"Addio, del passato\" (Farewell to the Past).",
    "cross_references": [
      "Jang Jihyeon"
    ],
    "week_references": [],
    "themes": [
      "piano",
      "death",
      "inner world",
      "hope",
      "overcoming",
      "beauty",
      "sublime",
      "memory"
    ],
    "youtube_urls": [
      "https://youtu.be/P1xlHHcxI50",
      "https://youtu.be/NidYfctcJmw"
    ],
    "funeral_music_url": "https://youtu.be/P1xlHHcxI50"
  },
  {
    "filename": "kim-seonkwon.md",
    "title": "Philadelphia",
    "year": 1993,
    "genre": "Film",
    "disease": "AIDS",
    "icd_code": "8A45.0Y",
    "composer": "",
    "country": "USA",
    "student": "Kim Seonkwon",
    "funeral_music": "www.youtube.com/watch?v=DwRHwKZSu-w",
    "cross_references": [
      "Kim Seongjun"
    ],
    "week_references": [
      1,
      3,
      12,
      13,
      14
    ],
    "themes": [
      "death",
      "inner world",
      "healing",
      "hope",
      "love",
      "opera",
      "silence",
      "family"
    ],
    "youtube_urls": [
      "https://youtu.be/PwFFx_Y2AbA"
    ],
    "funeral_music_url": "https://youtu.be/PwFFx_Y2AbA"
  },
  {
    "filename": "kim-shin.md",
    "title": "Rain man",
    "year": 1988,
    "genre": "Film",
    "disease": "Autism",
    "icd_code": "6A02.Y",
    "composer": "",
    "country": "USA",
    "student": "Kim Shin",
    "funeral_music": "Don't Worry, My Dear - Lee Juck",
    "cross_references": [],
    "week_references": [],
    "themes": [
      "piano",
      "death",
      "healing",
      "inner world",
      "empathy",
      "hope",
      "beauty",
      "identity"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=oRhjzp0BmEA",
      "https://www.youtube.com/watch?v=Dic27EnDDls"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=Dic27EnDDls"
  },
  {
    "filename": "kim-yeongseong.md",
    "title": "The Theory of Everything",
    "year": 2014,
    "genre": "Film",
    "disease": "ALS",
    "icd_code": "8B60.0",
    "composer": "Jóhann Jóhannsson",
    "country": "UK",
    "student": "Kim Yeongseong",
    "funeral_music": "Cantata BWV 208: No.9",
    "cross_references": [
      "Yoon Youngsik"
    ],
    "week_references": [],
    "themes": [
      "piano",
      "death",
      "hope",
      "beauty",
      "memory",
      "rhythm",
      "opera",
      "love"
    ],
    "youtube_urls": [
      "https://youtu.be/HmKVjv8jDuA",
      "https://youtu.be/NiXNY2GwDak",
      "https://youtu.be/xt3DEuw0wjM"
    ],
    "funeral_music_url": "https://youtu.be/xt3DEuw0wjM"
  },
  {
    "filename": "kim-yeonju.md",
    "title": "Rent",
    "year": 2005,
    "genre": "Film",
    "disease": "HIV/AIDS vacuolar myelopathy",
    "icd_code": "8A45.0Y",
    "composer": "Jonathan Larson",
    "country": "USA",
    "student": "Kim Yeonju",
    "funeral_music": "A Beautiful Mind",
    "cross_references": [
      "Jang Jihyeon"
    ],
    "week_references": [
      3,
      12,
      5
    ],
    "themes": [
      "piano",
      "death",
      "healing",
      "hope",
      "overcoming",
      "beauty",
      "memory",
      "rhythm"
    ],
    "youtube_urls": [
      "https://youtu.be/7mdHYSX7jbU",
      "https://youtu.be/UvyHuse6buY"
    ],
    "funeral_music_url": "https://youtu.be/7mdHYSX7jbU"
  },
  {
    "filename": "kim-yeryeong.md",
    "title": "Me Before You",
    "year": 2016,
    "genre": "Film",
    "disease": "general paralysis",
    "icd_code": "I-10",
    "composer": "",
    "country": "UK",
    "student": "Kim Yeryeong",
    "funeral_music": null,
    "cross_references": [],
    "week_references": [],
    "themes": [
      "death",
      "inner world",
      "empathy",
      "hope",
      "beauty",
      "rhythm",
      "love",
      "isolation"
    ],
    "youtube_urls": [
      "https://youtu.be/FGdaSDwKPG8",
      "https://youtu.be/v-5jAM0Zt4w"
    ],
    "funeral_music_url": ""
  },
  {
    "filename": "kim-yongbin.md",
    "title": "Still Alice",
    "year": 2014,
    "genre": "Film",
    "disease": "Alzheimer’s disease",
    "icd_code": "",
    "composer": "",
    "country": "USA",
    "student": "Kim Yongbin",
    "funeral_music": "영화 스틸 앨리스에서 가장 인상적인 순간 중 하나는",
    "cross_references": [
      "Kim Zia"
    ],
    "week_references": [],
    "themes": [
      "piano",
      "death",
      "inner world",
      "empathy",
      "hope",
      "identity",
      "memory",
      "cognitive decline"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=iIn_1_XDuBM",
      "https://www.youtube.com/watch?v=4x0as8T6REw"
    ],
    "funeral_music_url": ""
  },
  {
    "filename": "kim-yunchae.md",
    "title": "Coda",
    "year": 2021,
    "genre": "Film",
    "disease": "Deaf",
    "icd_code": "AB50(congenital hearing impairment), AB51(acquired hearing impairment)",
    "composer": "Sian Heder",
    "country": "USA",
    "student": "Kim Yunchae",
    "funeral_music": "보수동쿨러 Bosudong Cooler-0308",
    "cross_references": [
      "Byeon Hyejung"
    ],
    "week_references": [
      2,
      12,
      5
    ],
    "themes": [
      "death",
      "sensory disability",
      "empathy",
      "hope",
      "identity",
      "family",
      "communication",
      "silence"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=GKevHTbVsbQ",
      "https://www.youtube.com/watch?v=WHhbac6PVqs"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=WHhbac6PVqs&list=RDWHhbac6PVqs&start_radio=1"
  },
  {
    "filename": "kim-zia.md",
    "title": "A Moment to Remember",
    "year": 2004,
    "genre": "Film",
    "disease": "early-onset Alzheimer’s disease",
    "icd_code": "F00.0",
    "composer": "",
    "country": "Korea",
    "student": "Kim Zia",
    "funeral_music": "Another Day of Sun",
    "cross_references": [
      "Kim Yongbin"
    ],
    "week_references": [
      11,
      3,
      12,
      5
    ],
    "themes": [
      "piano",
      "death",
      "inner world",
      "empathy",
      "hope",
      "identity",
      "memory",
      "cognitive decline"
    ],
    "youtube_urls": [
      "https://youtu.be/7CVfTd-_qbc",
      "https://youtu.be/9tk6j8PUzD4"
    ],
    "funeral_music_url": "https://youtu.be/7CVfTd-_qbc"
  },
  {
    "filename": "kwon-dohyun.md",
    "title": "Dear Evan Hansen",
    "year": 2016,
    "genre": "Musical",
    "disease": "Social anxiety",
    "icd_code": "F40.1",
    "composer": "",
    "country": "USA",
    "student": "Kwon Dohyun",
    "funeral_music": "Good Luck to You",
    "cross_references": [
      "Kim Chanmi"
    ],
    "week_references": [
      1,
      3,
      12,
      5
    ],
    "themes": [
      "piano",
      "death",
      "healing",
      "inner world",
      "empathy",
      "hope",
      "overcoming",
      "rhythm"
    ],
    "youtube_urls": [
      "https://youtu.be/U6dTSMCqlp4",
      "https://youtu.be/kfnMvo87fQU"
    ],
    "funeral_music_url": "https://youtu.be/U6dTSMCqlp4"
  },
  {
    "filename": "kwon-doyeon.md",
    "title": "La Bohème",
    "year": 1896,
    "genre": "Opera",
    "disease": "Tuberculosis",
    "icd_code": "1B10.0",
    "composer": "",
    "country": "Italy",
    "student": "Kwon Doyeon",
    "funeral_music": "My Way",
    "cross_references": [
      "Choi Issac"
    ],
    "week_references": [],
    "themes": [
      "death",
      "inner world",
      "empathy",
      "hope",
      "romanticism",
      "memory",
      "rhythm",
      "opera"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=GI5TovjByB0",
      "https://www.youtube.com/watch?v=mEptCT9rf-o",
      "https://www.youtube.com/watch?v=qQzdAsjWGPg"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=qQzdAsjWGPg&list=RDqQzdAsjWGPg&start_radio=1"
  },
  {
    "filename": "kwon-hyoeun.md",
    "title": "Midnight Sun",
    "year": 2018,
    "genre": "Film",
    "disease": "xeroderma pigmentosum",
    "icd_code": "LD27.1",
    "composer": "",
    "country": "USA",
    "student": "Kwon Hyoeun",
    "funeral_music": "In Paradisum",
    "cross_references": [
      "Kim Yeongseong"
    ],
    "week_references": [
      2,
      12,
      5,
      14
    ],
    "themes": [
      "piano",
      "death",
      "healing",
      "empathy",
      "hope",
      "isolation",
      "love",
      "repetition"
    ],
    "youtube_urls": [
      "https://youtu.be/C0OaHg-xxyw",
      "https://youtu.be/6-i1ESIRKdA"
    ],
    "funeral_music_url": "https://youtu.be/6-i1ESIRKdA"
  },
  {
    "filename": "kye-heeseng.md",
    "title": "Philadelphia",
    "year": 1993,
    "genre": "Film",
    "disease": "AIDS",
    "icd_code": "8A45.0Y",
    "composer": "",
    "country": "USA",
    "student": "Kye Heeseng",
    "funeral_music": null,
    "cross_references": [
      "Kim Yunchae"
    ],
    "week_references": [],
    "themes": [
      "death",
      "inner world",
      "empathy",
      "identity",
      "sublime",
      "love",
      "opera",
      "silence"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=DwRHwKZSu-w"
    ],
    "funeral_music_url": ""
  },
  {
    "filename": "lee-ahhyun.md",
    "title": "A Beautiful Mind",
    "year": 2001,
    "genre": "Film",
    "disease": "Schizophrenia",
    "icd_code": "F20",
    "composer": "",
    "country": "USA",
    "student": "Lee Ahhyun",
    "funeral_music": "Knees",
    "cross_references": [
      "Jang Daehyeok"
    ],
    "week_references": [
      11,
      3,
      12,
      5
    ],
    "themes": [
      "piano",
      "death",
      "healing",
      "genius",
      "psychosis",
      "hope",
      "beauty",
      "trauma"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=LJS7Igvk6ZM",
      "https://www.youtube.com/watch?v=SfeaTW4bcAw"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=SfeaTW4bcAw"
  },
  {
    "filename": "lee-hayeon.md",
    "title": "everything i wanted",
    "year": 2019,
    "genre": "Pop",
    "disease": "depression",
    "icd_code": "F32",
    "composer": "Billie Eilish",
    "country": "USA",
    "student": "Lee Hayeon",
    "funeral_music": "기억을 걷는 시간",
    "cross_references": [
      "Jung Yunjin"
    ],
    "week_references": [
      3,
      12,
      5,
      14
    ],
    "themes": [
      "piano",
      "death",
      "inner world",
      "mood disorder",
      "empathy",
      "hope",
      "memory",
      "rhythm"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=EgBJmlPo8Xw",
      "https://www.youtube.com/watch?v=0bTCIbyvBBc"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=0bTCIbyvBBc&list=RD0bTCIbyvBBc&start_radio=1"
  },
  {
    "filename": "lee-inhye.md",
    "title": "Me Before You",
    "year": 2016,
    "genre": "Film",
    "disease": "Disability",
    "icd_code": "G82.2",
    "composer": "",
    "country": "UK",
    "student": "Lee Inhye",
    "funeral_music": "Photograph",
    "cross_references": [
      "Lee Jaehyuk"
    ],
    "week_references": [
      3,
      5,
      7
    ],
    "themes": [
      "piano",
      "death",
      "inner world",
      "genius",
      "hope",
      "overcoming",
      "beauty",
      "memory"
    ],
    "youtube_urls": [
      "https://youtu.be/nSDgHBxUbVQ",
      "https://youtu.be/JGPgxoIPY6Q"
    ],
    "funeral_music_url": "https://youtu.be/JGPgxoIPY6Q"
  },
  {
    "filename": "lee-jaehyuk.md",
    "title": "The Theory of Everything",
    "year": 2014,
    "genre": "Film",
    "disease": "ALS",
    "icd_code": "G12.21",
    "composer": "",
    "country": "UK",
    "student": "Lee Jaehyuk",
    "funeral_music": "'What A Wonderful World'",
    "cross_references": [
      "Yoon Youngsik",
      "Kim Yeongseong"
    ],
    "week_references": [
      11,
      3,
      14
    ],
    "themes": [
      "piano",
      "death",
      "healing",
      "inner world",
      "genius",
      "hope",
      "overcoming",
      "beauty"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=H9gFLkNdHvA",
      "https://www.youtube.com/watch?v=rBrd_3VMC3c"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=rBrd_3VMC3c&list=RDrBrd_3VMC3c&start_radio=1"
  },
  {
    "filename": "lee-jaemin.md",
    "title": "An speakable secret",
    "year": 2007,
    "genre": "Film",
    "disease": "asthma",
    "icd_code": "ICD10 J45",
    "composer": "",
    "country": "Taiwan",
    "student": "Lee Jaemin",
    "funeral_music": "Wherever you are",
    "cross_references": [],
    "week_references": [
      3,
      12,
      5
    ],
    "themes": [
      "piano",
      "death",
      "healing",
      "inner world",
      "empathy",
      "hope",
      "trauma",
      "rhythm"
    ],
    "youtube_urls": [
      "https://youtu.be/qs4Q4cQxyU4",
      "https://youtu.be/Oa3CeM15Yyk"
    ],
    "funeral_music_url": "https://youtu.be/qs4Q4cQxyU4"
  },
  {
    "filename": "lee-jaewi.md",
    "title": "Miracle in Cell No.7",
    "year": 2013,
    "genre": "Film",
    "disease": "",
    "icd_code": "F.84.0",
    "composer": "",
    "country": "Korea",
    "student": "Lee Jaewi",
    "funeral_music": null,
    "cross_references": [],
    "week_references": [],
    "themes": [
      "healing",
      "hope",
      "overcoming",
      "memory",
      "family",
      "love",
      "silence",
      "film score"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=TlmunBzDNjM",
      "https://www.youtube.com/watch?v=k4V3Mo61fJM"
    ],
    "funeral_music_url": ""
  },
  {
    "filename": "lee-jehyeon.md",
    "title": "Joker",
    "year": 2019,
    "genre": "Film",
    "disease": "Schizophrenia",
    "icd_code": "6A20.00",
    "composer": "",
    "country": "USA",
    "student": "Lee Jehyeon",
    "funeral_music": "Air on the G String",
    "cross_references": [
      "Park Hyungjin"
    ],
    "week_references": [
      3,
      12,
      7
    ],
    "themes": [
      "death",
      "inner world",
      "healing",
      "psychosis",
      "hope",
      "beauty",
      "identity",
      "memory"
    ],
    "youtube_urls": [
      "https://youtu.be/GMkmQlfOJDk",
      "https://youtu.be/8z5-Wum2enQ"
    ],
    "funeral_music_url": "https://youtu.be/GMkmQlfOJDk"
  },
  {
    "filename": "lee-jimin.md",
    "title": "Symphony No. 9 in D minor, Op. 125",
    "year": 0,
    "genre": "Music",
    "disease": "Hearing impairment",
    "icd_code": "H91.90",
    "composer": "Ludwing van Beethoven",
    "country": "Germany",
    "student": "Lee Jimin",
    "funeral_music": "'I' Novel",
    "cross_references": [
      "Byeon Hyejung"
    ],
    "week_references": [],
    "themes": [
      "death",
      "inner world",
      "sensory disability",
      "hope",
      "overcoming",
      "beauty",
      "sublime",
      "memory"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=7-a1d0VY6NA",
      "https://www.youtube.com/watch?v=payms8xKibc"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=payms8xKibc&list=RDpayms8xKibc&start_radio=1"
  },
  {
    "filename": "lee-sera.md",
    "title": "La Traviata",
    "year": 1853,
    "genre": "Opera",
    "disease": "Tuberculosis",
    "icd_code": "1B10",
    "composer": "Giuseppe Fortunino Francesco Verdi (Italy)",
    "country": "Italy",
    "student": "Lee Sera",
    "funeral_music": "Symphony No. 2, 3rd Movement",
    "cross_references": [
      "Kwon Doyeon"
    ],
    "week_references": [
      2,
      3,
      12
    ],
    "themes": [
      "death",
      "inner world",
      "empathy",
      "hope",
      "romanticism",
      "beauty",
      "memory",
      "rhythm"
    ],
    "youtube_urls": [
      "https://youtu.be/ulCn9LokbTY",
      "https://youtu.be/bfozlHuZD3c",
      "https://youtu.be/Do4Ei7Cio2g"
    ],
    "funeral_music_url": "https://youtu.be/ulCn9LokbTY"
  },
  {
    "filename": "lee-taeho.md",
    "title": "Shutter Island",
    "year": 2010,
    "genre": "Film",
    "disease": "schizophrenia",
    "icd_code": "6A20",
    "composer": "",
    "country": "USA",
    "student": "Lee Taeho",
    "funeral_music": "영화에 사용된 주요 음악 중 하나",
    "cross_references": [
      "Yu Jonghun"
    ],
    "week_references": [
      8,
      3,
      7
    ],
    "themes": [
      "death",
      "inner world",
      "identity",
      "memory",
      "trauma",
      "opera",
      "dissonance",
      "repetition"
    ],
    "youtube_urls": [
      "https://youtu.be/kQ6PrQP7Y7Q",
      "https://youtu.be/MlZOFIRC9HA"
    ],
    "funeral_music_url": "https://youtu.be/MlZOFIRC9HA"
  },
  {
    "filename": "lee-yubin.md",
    "title": "Good Doctor",
    "year": 2013,
    "genre": "Drama",
    "disease": "Autism Spectrum Disorder (ASD), Savant Syndrome",
    "icd_code": "F84.0~F84.9",
    "composer": "",
    "country": "Korea",
    "student": "Lee Yubin",
    "funeral_music": "\"Gustav Mahler's Symphony No. 5 Movement 4, \"Adagieto\"",
    "cross_references": [],
    "week_references": [],
    "themes": [
      "piano",
      "death",
      "inner world",
      "genius",
      "hope",
      "overcoming",
      "beauty",
      "memory"
    ],
    "youtube_urls": [
      "https://youtu.be/SV9AR9v--_g",
      "https://youtu.be/75YmlDR92UQ"
    ],
    "funeral_music_url": "https://youtu.be/75YmlDR92UQ"
  },
  {
    "filename": "li-qinrui.md",
    "title": "Jekyll Hyde",
    "year": 1990,
    "genre": "Musical",
    "disease": "DID",
    "icd_code": "JH-CONF-001",
    "composer": "",
    "country": "USA",
    "student": "Li Qinrui",
    "funeral_music": "Disturbed Spring",
    "cross_references": [
      "Noh Hyunwoo"
    ],
    "week_references": [],
    "themes": [
      "death",
      "inner world",
      "hope",
      "beauty",
      "identity",
      "rhythm",
      "isolation",
      "dissonance"
    ],
    "youtube_urls": [
      "https://youtu.be/A5ZWtVZafIs",
      "https://youtu.be/5D6g_74SF9I",
      "https://youtu.be/uOWSnKwS7Ok"
    ],
    "funeral_music_url": "https://youtu.be/A5ZWtVZafIs"
  },
  {
    "filename": "lim-wooseong.md",
    "title": "그것만이 내세상",
    "year": 2018,
    "genre": "Film",
    "disease": "Autism Spectrum Disorder (ASD), Savant Syndrome",
    "icd_code": "F84.0~F84.9",
    "composer": "",
    "country": "Korea",
    "student": "Lim Wooseong",
    "funeral_music": "차이콥스키의 Piano Concerto No.1 in B-flat minor, Op.23의 1악장",
    "cross_references": [
      "Kim Junho"
    ],
    "week_references": [
      11
    ],
    "themes": [
      "piano",
      "death",
      "inner world",
      "genius",
      "romanticism",
      "overcoming",
      "rhythm",
      "violin"
    ],
    "youtube_urls": [
      "https://youtu.be/84ZjHNUjktA",
      "https://youtu.be/NLJ3jwuMY2k",
      "https://youtu.be/GSe8vg4YWkY"
    ],
    "funeral_music_url": ""
  },
  {
    "filename": "luo-cuiyao.md",
    "title": "Twilight",
    "year": 2008,
    "genre": "Film",
    "disease": "Depressive disorder",
    "icd_code": "F32- Depressive episode",
    "composer": "",
    "country": "USA",
    "student": "Luo Cuiyao",
    "funeral_music": "'To Be By Your Side'",
    "cross_references": [
      "Yun Jueun"
    ],
    "week_references": [
      10,
      3
    ],
    "themes": [
      "piano",
      "death",
      "mood disorder",
      "romanticism",
      "beauty",
      "identity",
      "love",
      "isolation"
    ],
    "youtube_urls": [
      "https://youtu.be/0spuYf3xHjw",
      "https://youtu.be/P0v9vd4JEeo"
    ],
    "funeral_music_url": "https://youtu.be/P0v9vd4JEeo"
  },
  {
    "filename": "namkoong-yul.md",
    "title": "The Classic",
    "year": 2003,
    "genre": "Film",
    "disease": "blindness",
    "icd_code": "H53",
    "composer": "",
    "country": "Korea",
    "student": "Namkoong Yul",
    "funeral_music": "<You Worked Hard Today, Too>",
    "cross_references": [
      "Jang Daehyeok"
    ],
    "week_references": [],
    "themes": [
      "death",
      "sensory disability",
      "hope",
      "memory",
      "trauma",
      "rhythm",
      "love",
      "family"
    ],
    "youtube_urls": [
      "https://youtu.be/U3e4AOd-DzE",
      "https://youtu.be/ySJbEqPXYOs"
    ],
    "funeral_music_url": "https://youtu.be/U3e4AOd-DzE"
  },
  {
    "filename": "noh-hyunwoo.md",
    "title": "Joker",
    "year": 2019,
    "genre": "Film",
    "disease": "Pseudobulbar Affect (PBA) & Schizophrenia Spectrum Disorder",
    "icd_code": "F20.0",
    "composer": "",
    "country": "USA",
    "student": "Noh Hyunwoo",
    "funeral_music": "Memories",
    "cross_references": [
      "Han Junryul"
    ],
    "week_references": [],
    "themes": [
      "death",
      "inner world",
      "psychosis",
      "hope",
      "beauty",
      "identity",
      "memory",
      "rhythm"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=SlPhMPnQ58k",
      "https://www.youtube.com/watch?v=VdfgiEQeceM"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=SlPhMPnQ58k"
  },
  {
    "filename": "oh-sehyun.md",
    "title": "Rachmaninoff piano concerto no.2",
    "year": 1901,
    "genre": "Piano Concerto",
    "disease": "Depression",
    "icd_code": "6A70.4",
    "composer": "",
    "country": "Russia",
    "student": "Oh Sehyun",
    "funeral_music": "\"Love has gone\"",
    "cross_references": [
      "Jung Yunjin"
    ],
    "week_references": [],
    "themes": [
      "piano",
      "death",
      "healing",
      "mood disorder",
      "overcoming",
      "beauty",
      "memory",
      "trauma"
    ],
    "youtube_urls": [
      "https://youtu.be/Ikbj54iFTdw",
      "https://youtu.be/aNMlq-hOIoc"
    ],
    "funeral_music_url": "https://youtu.be/Ikbj54iFTdw"
  },
  {
    "filename": "park-jeongeun.md",
    "title": "The Pianist",
    "year": 2002,
    "genre": "Film",
    "disease": "PTSD",
    "icd_code": "F43.1",
    "composer": "",
    "country": "France/Poland",
    "student": "Park Jeongeun",
    "funeral_music": "Merry Christmas Mr. Lawrence",
    "cross_references": [],
    "week_references": [
      10,
      12,
      13
    ],
    "themes": [
      "piano",
      "death",
      "healing",
      "inner world",
      "empathy",
      "hope",
      "overcoming",
      "trauma"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=A8zO2KX_VVU",
      "https://www.youtube.com/watch?v=1OZDaRhHHyM"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=1OZDaRhHHyM&list=RD1OZDaRhHHyM&start_radio=1"
  },
  {
    "filename": "park-juhyeon.md",
    "title": "Your lie in april",
    "year": 2014,
    "genre": "Animation",
    "disease": "Leukemia",
    "icd_code": "C91",
    "composer": "",
    "country": "Japan",
    "student": "Park Juhyeon",
    "funeral_music": "Frank Ocean's Pink + White",
    "cross_references": [
      "Jang Minsun"
    ],
    "week_references": [],
    "themes": [
      "piano",
      "death",
      "healing",
      "inner world",
      "genius",
      "hope",
      "overcoming",
      "trauma"
    ],
    "youtube_urls": [
      "https://youtu.be/uzS3WG6__G4",
      "https://youtu.be/dIbeazAlxM4"
    ],
    "funeral_music_url": "https://youtu.be/uzS3WG6__G4"
  },
  {
    "filename": "park-yongjin.md",
    "title": "Mal-aton",
    "year": 2005,
    "genre": "Film",
    "disease": "Autism Spectrum Disorder",
    "icd_code": "F84.0",
    "composer": "",
    "country": "Korea",
    "student": "Park Yongjin",
    "funeral_music": "달려라 초원",
    "cross_references": [
      "Jeon Eunsu"
    ],
    "week_references": [
      2,
      12,
      7
    ],
    "themes": [
      "death",
      "inner world",
      "empathy",
      "hope",
      "overcoming",
      "beauty",
      "identity",
      "memory"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=cBiqltuGT88",
      "https://www.youtube.com/watch?v=6nM9hL95LzA"
    ],
    "funeral_music_url": ""
  },
  {
    "filename": "rho-taegang.md",
    "title": "marathon",
    "year": 2005,
    "genre": "Film",
    "disease": "",
    "icd_code": "",
    "composer": "",
    "country": "Korea",
    "student": "Rho Taegang",
    "funeral_music": "The Rain Is Pouring Down",
    "cross_references": [
      "Kim Shin"
    ],
    "week_references": [],
    "themes": [
      "piano",
      "death",
      "inner world",
      "hope",
      "overcoming",
      "beauty",
      "rhythm",
      "violin"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=an4ySOlsUMY",
      "https://www.youtube.com/watch?v=YVt3sbRuESo"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=an4ySOlsUMY&list=RDan4ySOlsUMY&start_radio=1"
  },
  {
    "filename": "seong-taehyun.md",
    "title": "The King's speech",
    "year": 2010,
    "genre": "Film",
    "disease": "Stuttering",
    "icd_code": "F98.5",
    "composer": "Beethoven",
    "country": "UK",
    "student": "Seong Taehyun",
    "funeral_music": "Schubert - Death and the Maiden (String Quartet No. 14) - 2. Andante con moto",
    "cross_references": [
      "Baek Seungjae"
    ],
    "week_references": [
      3,
      10,
      2,
      12
    ],
    "themes": [
      "death",
      "inner world",
      "healing",
      "hope",
      "overcoming",
      "beauty",
      "sublime",
      "memory"
    ],
    "youtube_urls": [
      "https://youtu.be/PPLIw64rLJc",
      "https://www.youtube.com/watch?v=EiGBYgAymi8"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=EiGBYgAymi8&list=RDEiGBYgAymi8&start_radio=1"
  },
  {
    "filename": "shin-donghyeon.md",
    "title": "The Diving Bell and the Butterfly",
    "year": 2007,
    "genre": "Film",
    "disease": "Locked-in Syndrome",
    "icd_code": "JB64.3",
    "composer": "",
    "country": "France",
    "student": "Shin Donghyeon",
    "funeral_music": "Kim Dong-ryul – Thanks",
    "cross_references": [
      "Woo Seunghun"
    ],
    "week_references": [],
    "themes": [
      "violin",
      "communication",
      "repetition",
      "piano",
      "death",
      "overcoming",
      "isolation",
      "narrative medicine"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=fztkUuunI7g",
      "https://www.youtube.com/watch?v=OHJle2J3RTA"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=OHJle2J3RTA&list=RDOHJle2J3RTA&start_radio=1"
  },
  {
    "filename": "shin-sejong.md",
    "title": "The Hunchback of Notre Dame",
    "year": 1996,
    "genre": "Musical",
    "disease": "Kyphosis",
    "icd_code": "M40.2",
    "composer": "",
    "country": "USA",
    "student": "Shin Sejong",
    "funeral_music": "“Eunha”",
    "cross_references": [
      "Jang Ayeong"
    ],
    "week_references": [
      10,
      11,
      5
    ],
    "themes": [
      "death",
      "inner world",
      "healing",
      "genius",
      "empathy",
      "hope",
      "beauty",
      "sublime"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=3AnTqOIgPr0",
      "https://www.youtube.com/watch?v=UP3ir0jE4pw"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=UP3ir0jE4pw"
  },
  {
    "filename": "song-jungbin.md",
    "title": "Iron Man 3",
    "year": 2013,
    "genre": "Film",
    "disease": "Post-traumatic stress disorder (PTSD)",
    "icd_code": "6B40",
    "composer": "",
    "country": "USA",
    "student": "Song Jungbin",
    "funeral_music": "Arvo Pärt - Spiegel im Spiegel (1978)",
    "cross_references": [
      "Jang Daehyeok"
    ],
    "week_references": [
      10,
      11,
      12,
      13,
      14
    ],
    "themes": [
      "piano",
      "death",
      "healing",
      "inner world",
      "empathy",
      "hope",
      "overcoming",
      "beauty"
    ],
    "youtube_urls": [
      "https://youtu.be/G9TK-HOLMbs",
      "https://www.youtube.com/watch?v=TJ6Mzvh3XCc"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=TJ6Mzvh3XCc"
  },
  {
    "filename": "woo-seunghun.md",
    "title": "OMORI",
    "year": 2020,
    "genre": "Game",
    "disease": "Dissociative Identity Disorder (DID)",
    "icd_code": "6B64",
    "composer": "",
    "country": "USA",
    "student": "Woo Seunghun",
    "funeral_music": "음율-잠행",
    "cross_references": [
      "Bae Minseok"
    ],
    "week_references": [
      10,
      12,
      13,
      14
    ],
    "themes": [
      "death",
      "inner world",
      "healing",
      "empathy",
      "overcoming",
      "identity",
      "memory",
      "trauma"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=mzgYj_qCHLg",
      "https://www.youtube.com/watch?v=uglu9q0Hhxo"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=uglu9q0Hhxo&list=RDuglu9q0Hhxo&start_radio=1"
  },
  {
    "filename": "woo-yerin.md",
    "title": "La Traviata",
    "year": 1853,
    "genre": "Opera",
    "disease": "Tuberculosis of lung",
    "icd_code": "A15.2",
    "composer": "",
    "country": "Italy",
    "student": "Woo Yerin",
    "funeral_music": "'Don’t Stop Me Now'",
    "cross_references": [
      "Xu Yangyang"
    ],
    "week_references": [
      5
    ],
    "themes": [
      "death",
      "healing",
      "empathy",
      "hope",
      "memory",
      "rhythm",
      "love",
      "opera"
    ],
    "youtube_urls": [
      "https://youtu.be/Vt5gFBP9s-w",
      "https://youtu.be/HgzGwKwLmgM"
    ],
    "funeral_music_url": "https://youtu.be/HgzGwKwLmgM"
  },
  {
    "filename": "xu-yangyang.md",
    "title": "La Boheme",
    "year": 1896,
    "genre": "Opera",
    "disease": "TB",
    "icd_code": "",
    "composer": "",
    "country": "Italy",
    "student": "Xu Yangyang",
    "funeral_music": "the third movement of Rachmaninoff’s Symphony No. 2",
    "cross_references": [
      "Kwon Doyeon",
      "Woo Yerin"
    ],
    "week_references": [
      1,
      11,
      5
    ],
    "themes": [
      "death",
      "romanticism",
      "beauty",
      "memory",
      "opera",
      "love",
      "repetition",
      "pain"
    ],
    "youtube_urls": [
      "https://youtu.be/hfgrXm1t69c",
      "https://youtu.be/yTagFD_pkNo"
    ],
    "funeral_music_url": "https://youtu.be/hfgrXm1t69c"
  },
  {
    "filename": "yoo-minwoo.md",
    "title": "Keys to the Heart",
    "year": 2018,
    "genre": "Film",
    "disease": "Savant Syndrome",
    "icd_code": "6A02.Z",
    "composer": "",
    "country": "Korea",
    "student": "Yoo Minwoo",
    "funeral_music": "Panorama by Lee Chan-hyuk",
    "cross_references": [
      "Rho Taegang"
    ],
    "week_references": [],
    "themes": [
      "piano",
      "death",
      "healing",
      "inner world",
      "hope",
      "memory",
      "rhythm",
      "love"
    ],
    "youtube_urls": [
      "https://youtu.be/Y7C8qIpo7Dg",
      "https://www.youtube.com/watch?v=jiQyA9bMHjc"
    ],
    "funeral_music_url": "https://youtu.be/Y7C8qIpo7Dg"
  },
  {
    "filename": "yoon-jungwon.md",
    "title": "Cancer",
    "year": 2006,
    "genre": "Music",
    "disease": "Cancer",
    "icd_code": "2A20",
    "composer": "",
    "country": "USA",
    "student": "Yoon Jungwon",
    "funeral_music": "\"Merry-Go-Round of Life\"",
    "cross_references": [
      "An Yeeun"
    ],
    "week_references": [
      2,
      12,
      5
    ],
    "themes": [
      "piano",
      "death",
      "healing",
      "inner world",
      "terminal illness",
      "empathy",
      "hope",
      "romanticism"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=f7SS57LFPco",
      "https://www.youtube.com/watch?v=wc2s9skF_58"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=f7SS57LFPco"
  },
  {
    "filename": "yoon-youngsik.md",
    "title": "The Theory of Everything",
    "year": 2014,
    "genre": "Film",
    "disease": "ALS",
    "icd_code": "8B60.0",
    "composer": "Jóhann Jóhannsson",
    "country": "UK",
    "student": "Yoon Youngsik",
    "funeral_music": "〈Domestic Pressures〉",
    "cross_references": [
      "Park Hyungjin"
    ],
    "week_references": [
      13,
      5,
      14
    ],
    "themes": [
      "piano",
      "death",
      "empathy",
      "hope",
      "rhythm",
      "love",
      "dissonance",
      "silence"
    ],
    "youtube_urls": [
      "https://youtu.be/HFskQSdoT5k",
      "https://youtu.be/O1p3wXe0MCw"
    ],
    "funeral_music_url": "https://youtu.be/O1p3wXe0MCw"
  },
  {
    "filename": "youn-songmin.md",
    "title": "Me Before You",
    "year": 2016,
    "genre": "Film",
    "disease": "general paralysis",
    "icd_code": "MB5Z",
    "composer": "",
    "country": "UK",
    "student": "Youn Songmin",
    "funeral_music": "a day in the 21st century",
    "cross_references": [
      "Chang Minha"
    ],
    "week_references": [],
    "themes": [
      "death",
      "empathy",
      "hope",
      "memory",
      "isolation",
      "orchestra",
      "pain",
      "film score"
    ],
    "youtube_urls": [
      "https://youtu.be/dCLui1QOlUk",
      "https://youtu.be/V0lw3qylVfY"
    ],
    "funeral_music_url": "https://youtu.be/dCLui1QOlUk"
  },
  {
    "filename": "yu-hwisang.md",
    "title": "Recipe for Farewell",
    "year": 2022,
    "genre": "Drama",
    "disease": "Malignant neoplasm of colon",
    "icd_code": "2B90",
    "composer": "",
    "country": "Korea",
    "student": "Yu Hwisang",
    "funeral_music": "“Under Sunset”",
    "cross_references": [
      "Lee Jaehyuk"
    ],
    "week_references": [],
    "themes": [
      "death",
      "inner world",
      "healing",
      "hope",
      "overcoming",
      "rhythm",
      "love",
      "repetition"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=kBjrIE6AX-w",
      "https://www.youtube.com/watch?v=Gig7MHxXddI"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=Gig7MHxXddI&list=RDGig7MHxXddI&start_radio=1"
  },
  {
    "filename": "yu-jonghun.md",
    "title": "Joker",
    "year": 2019,
    "genre": "Film",
    "disease": "personality disorder",
    "icd_code": "F60.2",
    "composer": "",
    "country": "USA",
    "student": "Yu Jonghun",
    "funeral_music": "To life",
    "cross_references": [
      "Kwon Dohyun"
    ],
    "week_references": [
      11,
      12,
      7
    ],
    "themes": [
      "death",
      "inner world",
      "empathy",
      "hope",
      "identity",
      "memory",
      "rhythm",
      "opera"
    ],
    "youtube_urls": [
      "https://www.youtube.com/watch?v=0kUPSYm8pNE",
      "https://www.youtube.com/watch?v=BBY4zUFxUjA",
      "https://youtu.be/BBY4zUFxUjA"
    ],
    "funeral_music_url": "https://www.youtube.com/watch?v=0kUPSYm8pNE&list=RD0kUPSYm8pNE&start_radio=1"
  },
  {
    "filename": "yun-jueun.md",
    "title": "The Pianist",
    "year": 2002,
    "genre": "Film",
    "disease": "Major Depressive Disorder",
    "icd_code": "F32",
    "composer": "",
    "country": "France/Poland",
    "student": "Yun Jueun",
    "funeral_music": "\"Just Life\" (Geureoke Saraganeun Geot) by Huh Hoy-kyung.",
    "cross_references": [
      "Ki Hayoon"
    ],
    "week_references": [
      12,
      5,
      14
    ],
    "themes": [
      "piano",
      "death",
      "inner world",
      "mood disorder",
      "empathy",
      "hope",
      "romanticism",
      "beauty"
    ],
    "youtube_urls": [
      "https://youtu.be/1Qtr8TznwNI",
      "https://youtu.be/6zuvYqr7w94"
    ],
    "funeral_music_url": "https://youtu.be/1Qtr8TznwNI"
  },
  {
    "filename": "zhang-yijin.md",
    "title": "La Traviata",
    "year": 1852,
    "genre": "Opera",
    "disease": "TB",
    "icd_code": "",
    "composer": "",
    "country": "Italy",
    "student": "Zhang Yijin",
    "funeral_music": "'Waiting'",
    "cross_references": [
      "Woo Yerin"
    ],
    "week_references": [
      2,
      11
    ],
    "themes": [
      "death",
      "inner world",
      "romanticism",
      "overcoming",
      "love",
      "opera",
      "isolation",
      "orchestra"
    ],
    "youtube_urls": [
      "https://youtu.be/_6C5-abCx6g",
      "https://youtu.be/afhAqMeeQJk"
    ],
    "funeral_music_url": "https://youtu.be/_6C5-abCx6g"
  },
  {
    "filename": "zheng-mingzhu.md",
    "title": "Madama Butterfly",
    "year": 1904,
    "genre": "Opera",
    "disease": "Depression and Suicide",
    "icd_code": "F32/X84",
    "composer": "",
    "country": "Italy",
    "student": "Zheng Mingzhu",
    "funeral_music": "“That’s Okay”",
    "cross_references": [
      "Jang Minsun"
    ],
    "week_references": [
      16,
      12,
      13,
      14
    ],
    "themes": [
      "death",
      "inner world",
      "healing",
      "mood disorder",
      "hope",
      "beauty",
      "family",
      "love"
    ],
    "youtube_urls": [
      "https://youtu.be/j2aQ_NqeTNw",
      "https://www.youtube.com/watch?v=IYrbdiee9SU"
    ],
    "funeral_music_url": "https://youtu.be/j2aQ_NqeTNw"
  }
];

// Disease category mapping for analysis
const diseaseCategories = {
  "Neurodevelopmental": ["Autism", "ASD", "Savant", "Intellectual"],
  "Mood Disorders": ["Depression", "Bipolar", "Anxiety"],
  "Psychotic Disorders": ["Schizophrenia", "Psychosis", "Dissociative"],
  "Neurological": ["Alzheimer", "Dementia", "ALS", "Paralysis", "Parkinson"],
  "Infectious": ["Tuberculosis", "AIDS", "HIV"],
  "Sensory": ["Hearing", "Deaf", "Blind", "Vision"],
  "Physical": ["Kyphosis", "Cancer", "Quadriplegia"]
};

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedGenre, setSelectedGenre] = useState('all');

  // Analytics calculations
  const analytics = useMemo(() => {
    const diseaseCount = {};
    const genreCount = {};
    const countryCount = {};
    const centuryCount = {};
    const themeCount = {};
    
    databaseEntries.forEach(entry => {
      // Disease counting
      const diseases = entry.disease.split(',').map(d => d.trim());
      diseases.forEach(d => {
        if (d) diseaseCount[d] = (diseaseCount[d] || 0) + 1;
      });
      
      // Genre counting
      genreCount[entry.genre] = (genreCount[entry.genre] || 0) + 1;
      
      // Country counting
      countryCount[entry.country] = (countryCount[entry.country] || 0) + 1;
      
      // Century counting
      if (entry.year > 0) {
        const century = Math.floor(entry.year / 100) + 1;
        const centuryLabel = `${century}th Century`;
        centuryCount[centuryLabel] = (centuryCount[centuryLabel] || 0) + 1;
      }
      
      // Theme counting
      (entry.themes || []).forEach(t => {
        themeCount[t] = (themeCount[t] || 0) + 1;
      });
    });
    
    return { diseaseCount, genreCount, countryCount, centuryCount, themeCount };
  }, []);

  // Network data
  const networkData = useMemo(() => {
    const nodes = new Set();
    const edges = [];
    
    databaseEntries.forEach(entry => {
      nodes.add(entry.title);
      (entry.cross_references || []).forEach(ref => {
        if (ref) {
          nodes.add(ref);
          edges.push({ from: entry.title, to: ref });
        }
      });
    });
    
    return { nodes: Array.from(nodes), edges };
  }, []);

  // Week references
  const weekData = useMemo(() => {
    const weeks = {};
    databaseEntries.forEach(entry => {
      (entry.week_references || []).forEach(week => {
        if (!weeks[week]) weeks[week] = [];
        weeks[week].push(entry.title);
      });
    });
    return weeks;
  }, []);

  // Filtered entries
  const filteredEntries = useMemo(() => {
    return databaseEntries.filter(entry => {
      const matchesSearch = !searchTerm || 
        entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (entry.composer || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (entry.themes || []).some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCountry = selectedCountry === 'all' || entry.country === selectedCountry;
      const matchesGenre = selectedGenre === 'all' || entry.genre === selectedGenre;
      
      return matchesSearch && matchesCountry && matchesGenre;
    });
  }, [searchTerm, selectedCountry, selectedGenre]);

  const StatCard = ({ title, value, color, icon }) => (
    <div style={{
      background: `linear-gradient(135deg, ${color}15, ${color}05)`,
      border: `1px solid ${color}30`,
      borderRadius: '12px',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '28px', marginBottom: '8px' }}>{icon}</div>
      <div style={{ fontSize: '24px', fontWeight: 'bold', color }}>{value}</div>
      <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>{title}</div>
    </div>
  );

  const BarChart = ({ data, title, color, limit = 10 }) => {
    const sortedData = Object.entries(data).sort((a, b) => b[1] - a[1]).slice(0, limit);
    const maxValue = Math.max(...sortedData.map(d => d[1]));
    return (
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ marginBottom: '12px', color: '#333', fontSize: '14px' }}>{title}</h4>
        {sortedData.map(([label, value]) => (
          <div key={label} style={{ marginBottom: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '2px' }}>
              <span style={{ maxWidth: '70%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
              <span>{value}</span>
            </div>
            <div style={{ background: '#eee', borderRadius: '4px', height: '16px', overflow: 'hidden' }}>
              <div style={{
                width: `${(value / maxValue) * 100}%`,
                height: '100%',
                background: `linear-gradient(90deg, ${color}, ${color}aa)`,
                borderRadius: '4px',
                transition: 'width 0.3s'
              }} />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '8px', color: '#1a1a2e' }}>
          🎵 Medical Humanities Music Database
        </h1>
        <p style={{ color: '#666', fontSize: '14px' }}>
          질병과 장애, 고통의 음악학 | {databaseEntries.length} Works from Hanyang University
        </p>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { id: 'overview', label: '📊 Overview', color: '#2196F3' },
          { id: 'browse', label: '📚 Browse', color: '#4CAF50' },
          { id: 'network', label: '🔗 Network', color: '#9C27B0' },
          { id: 'weeks', label: '📅 Weeks', color: '#FF9800' },
          { id: 'funeral', label: '🕯️ Funeral', color: '#607D8B' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              background: activeTab === tab.id ? tab.color : '#f0f0f0',
              color: activeTab === tab.id ? 'white' : '#333',
              fontWeight: activeTab === tab.id ? 'bold' : 'normal',
              fontSize: '13px',
              transition: 'all 0.2s'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '24px' }}>
            <StatCard title="Total Works" value={databaseEntries.length} color="#2196F3" icon="🎬" />
            <StatCard title="Diseases" value={Object.keys(analytics.diseaseCount).length} color="#E91E63" icon="🏥" />
            <StatCard title="Countries" value={Object.keys(analytics.countryCount).length} color="#4CAF50" icon="🌍" />
            <StatCard title="Cross-refs" value={networkData.edges.length} color="#9C27B0" icon="🔗" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div style={{ background: 'white', padding: '16px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <BarChart data={analytics.diseaseCount} title="Top Diseases" color="#E91E63" limit={12} />
            </div>
            <div style={{ background: 'white', padding: '16px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <BarChart data={analytics.countryCount} title="By Country" color="#4CAF50" />
            </div>
            <div style={{ background: 'white', padding: '16px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <BarChart data={analytics.genreCount} title="By Genre" color="#2196F3" />
            </div>
            <div style={{ background: 'white', padding: '16px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <BarChart data={analytics.centuryCount} title="By Century" color="#FF9800" />
            </div>
          </div>

          <div style={{ marginTop: '20px', background: 'white', padding: '16px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h4 style={{ marginBottom: '12px', fontSize: '14px' }}>🏷️ Theme Cloud</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {Object.entries(analytics.themeCount).sort((a, b) => b[1] - a[1]).slice(0, 25).map(([theme, count]) => (
                <span key={theme} style={{
                  background: `hsl(${Math.random() * 360}, 70%, 90%)`,
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: `${10 + Math.min(count, 8)}px`,
                  cursor: 'pointer'
                }}>
                  {theme} ({count})
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Browse Tab */}
      {activeTab === 'browse' && (
        <div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="🔍 Search title, disease, composer, theme..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ flex: 1, minWidth: '200px', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '13px' }}
            />
            <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '13px' }}>
              <option value="all">All Countries</option>
              {Object.keys(analytics.countryCount).sort().map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '13px' }}>
              <option value="all">All Genres</option>
              {Object.keys(analytics.genreCount).sort().map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>
            Showing {filteredEntries.length} of {databaseEntries.length} entries
          </div>

          <div style={{ display: 'grid', gap: '12px', maxHeight: '600px', overflowY: 'auto' }}>
            {filteredEntries.map((entry, idx) => (
              <div key={idx} 
                style={{
                  background: 'white',
                  padding: '14px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                  borderLeft: `4px solid ${entry.country === 'Korea' ? '#e74c3c' : entry.country === 'USA' ? '#3498db' : '#27ae60'}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 6px 0', fontSize: '15px' }}>
                      <a href={`https://github.com/hskye79/medicalhumanitiesmusic-2025-2/blob/main/${entry.filename}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ 
                          color: '#333', 
                          textDecoration: 'none',
                          borderBottom: '1px solid transparent',
                          transition: 'border-color 0.2s'
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.borderBottom = '1px solid #333'; }}
                        onMouseOut={(e) => { e.currentTarget.style.borderBottom = '1px solid transparent'; }}
                      >
                        {entry.title}
                      </a>
                      <span style={{ fontWeight: 'normal', color: '#888' }}> ({entry.year || 'N/A'})</span>
                    </h3>
                    <p style={{ margin: '0 0 4px 0', color: '#666', fontSize: '12px' }}>
                      <strong>Disease:</strong> {entry.disease || 'N/A'} 
                      {entry.icd_code && <span style={{ background: '#e3f2fd', padding: '1px 5px', borderRadius: '3px', fontSize: '10px', marginLeft: '6px' }}>ICD: {entry.icd_code}</span>}
                    </p>
                    <p style={{ margin: '0 0 4px 0', color: '#666', fontSize: '12px' }}>
                      <strong>Composer:</strong> {entry.composer || 'N/A'} | <strong>Genre:</strong> {entry.genre} | <strong>Country:</strong> {entry.country}
                    </p>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '6px' }}>
                      {(entry.themes || []).slice(0, 5).map(theme => (
                        <span key={theme} style={{ background: '#f5f5f5', padding: '2px 6px', borderRadius: '4px', fontSize: '10px' }}>{theme}</span>
                      ))}
                    </div>
                    {/* YouTube Links */}
                    {(entry.youtube_urls || []).length > 0 && (
                      <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                        {entry.youtube_urls.slice(0, 3).map((url, i) => (
                          <a key={i} 
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              background: '#ff0000',
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '10px',
                              textDecoration: 'none',
                              fontWeight: 'bold'
                            }}>
                            ▶ Watch {i + 1}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '11px', color: '#999', minWidth: '80px' }}>
                    {entry.student}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Network Tab */}
      {activeTab === 'network' && (
        <div>
          <div style={{ background: '#f8f9fa', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>🔗 Cross-Reference Network</h4>
            <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
              {networkData.nodes.length} nodes connected by {networkData.edges.length} cross-references
            </p>
          </div>
          
          <div style={{ display: 'grid', gap: '12px', maxHeight: '500px', overflowY: 'auto' }}>
            {databaseEntries.filter(e => (e.cross_references || []).length > 0).map((entry, idx) => (
              <div key={idx} style={{ background: 'white', padding: '12px', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
                <div style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '6px' }}>{entry.title}</div>
                <div style={{ fontSize: '11px', color: '#666' }}>
                  {(entry.cross_references || []).map((ref, i) => (
                    <span key={i} style={{ display: 'inline-block', background: '#e8f5e9', padding: '2px 8px', borderRadius: '4px', margin: '2px' }}>
                      → {ref}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weeks Tab */}
      {activeTab === 'weeks' && (
        <div>
          <div style={{ background: '#fff3e0', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>📅 Course Week References</h4>
            <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
              Tracking how students integrate course concepts into their analyses
            </p>
          </div>
          
          {Object.entries(weekData).sort((a, b) => a[0] - b[0]).map(([week, titles]) => (
            <div key={week} style={{ background: 'white', padding: '12px', borderRadius: '8px', marginBottom: '10px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
              <div style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '8px', color: '#FF9800' }}>
                Week {week} ({titles.length} entries)
              </div>
              <div style={{ fontSize: '11px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {titles.map((title, i) => (
                  <span key={i} style={{ background: '#fff3e0', padding: '3px 8px', borderRadius: '4px' }}>{title}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Funeral Music Tab */}
      {activeTab === 'funeral' && (
        <div>
          <div style={{ background: '#eceff1', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>🕯️ Funeral Music Playlist</h4>
            <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
              Personal reflections on mortality through music choices
            </p>
          </div>
          
          <div style={{ display: 'grid', gap: '10px', maxHeight: '600px', overflowY: 'auto' }}>
            {databaseEntries.filter(e => e.funeral_music).map((entry, idx) => (
              <div key={idx} 
                style={{ 
                  background: 'white', 
                  padding: '12px', 
                  borderRadius: '8px', 
                  boxShadow: '0 1px 4px rgba(0,0,0,0.1)', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center'
                }}
              >
                <div style={{ flex: 1 }}>
                  <a href={`https://github.com/hskye79/medicalhumanitiesmusic-2025-2/blob/main/${entry.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      fontWeight: 'bold', 
                      fontSize: '13px',
                      color: '#333',
                      textDecoration: 'none',
                      borderBottom: '1px solid transparent',
                      transition: 'border-color 0.2s'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.borderBottom = '1px solid #333'; }}
                    onMouseOut={(e) => { e.currentTarget.style.borderBottom = '1px solid transparent'; }}
                  >
                    {entry.funeral_music}
                  </a>
                  <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>chosen by {entry.student}</div>
                </div>
                {entry.funeral_music_url && (
                  <a href={entry.funeral_music_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: '#ff0000',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap'
                    }}>
                    ▶ Listen
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ marginTop: '30px', textAlign: 'center', padding: '16px', borderTop: '1px solid #eee', color: '#999', fontSize: '11px' }}>
        Medical Humanities Music Database | Hanyang University | 질병과 장애, 고통의 음악학 | {databaseEntries.length} entries
      </div>
    </div>
  );
}

export default App;
