"""
Medical Humanities Music Database - Research Analysis Tools
=============================================================
Updated with 91 student entries from Hanyang University course:
"Musicology of Disease, Disability, and Pain" (질병과 장애, 고통의 음악학)

Usage Examples:
    python db_analysis.py --analyze diseases
    python db_analysis.py --network
    python db_analysis.py --export csv
"""

import re
import json
from collections import defaultdict
from dataclasses import dataclass, field
from typing import List, Dict, Optional

# ============================================================
# COMPLETE DATABASE (91 entries)
# ============================================================

SAMPLE_ENTRIES = [
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
        "cross_references": ["Jung Yunjin"],
        "week_references": [],
        "themes": ["piano", "death", "inner world", "empathy", "hope", "romanticism", "overcoming", "memory"],
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
        "cross_references": ["Jeon Junwoo"],
        "week_references": [3, 12, 14, 7],
        "themes": ["death", "inner world", "healing", "terminal illness", "hope", "isolation", "dissonance", "repetition"],
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
        "cross_references": ["Woo Seunghun"],
        "week_references": [],
        "themes": ["death", "identity", "trauma", "dissonance", "silence", "pain", "film score"],
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
        "cross_references": ["Huh Hoyoung"],
        "week_references": [10, 3, 5],
        "themes": ["death", "inner world", "memory", "rhythm", "opera", "love", "repetition", "communication"],
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
        "cross_references": ["Bae Minseok"],
        "week_references": [11, 5, 7],
        "themes": ["piano", "death", "inner world", "hope", "beauty", "identity", "memory", "trauma"],
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
        "cross_references": ["Choi Myeonghyeon"],
        "week_references": [3, 12, 5],
        "themes": ["piano", "death", "inner world", "sensory disability", "overcoming", "family", "love", "silence"],
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
        "cross_references": ["Kim Junho"],
        "week_references": [5],
        "themes": ["death", "beauty", "memory", "love", "pain", "film score"],
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
        "week_references": [2, 12, 5],
        "themes": ["piano", "death", "inner world", "genius", "hope", "overcoming", "memory", "rhythm"],
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
        "cross_references": ["Choi Myeonghyeon"],
        "week_references": [],
        "themes": ["piano", "death", "inner world", "sensory disability", "hope", "romanticism", "overcoming", "beauty"],
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
        "cross_references": ["Ki Hayoon"],
        "week_references": [2, 3, 12, 14],
        "themes": ["piano", "death", "inner world", "hope", "romanticism", "beauty", "rhythm", "opera"],
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
        "cross_references": ["Bae Minseok"],
        "week_references": [],
        "themes": ["death", "inner world", "mood disorder", "hope", "overcoming", "dissonance", "pain", "film score"],
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
        "cross_references": ["Choi Hyunseok"],
        "week_references": [3, 12, 5],
        "themes": ["piano", "death", "inner world", "sensory disability", "empathy", "hope", "overcoming", "memory"],
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
        "cross_references": ["Kim Jieun"],
        "week_references": [8, 13, 5, 14],
        "themes": ["communication", "piano", "death", "overcoming", "opera", "isolation", "genius", "inner world"],
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
        "cross_references": ["Choi Issac"],
        "week_references": [12, 5, 14],
        "themes": ["death", "inner world", "empathy", "hope", "romanticism", "beauty", "memory", "rhythm"],
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
        "cross_references": ["Bae Minseok"],
        "week_references": [],
        "themes": ["death", "inner world", "identity", "rhythm", "hallucination", "communication", "repetition", "pain"],
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
        "cross_references": ["Han Junryul"],
        "week_references": [],
        "themes": ["death", "inner world", "hope", "identity", "love", "dissonance", "hallucination", "orchestra"],
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
        "cross_references": ["Jeon Eunsu"],
        "week_references": [],
        "themes": ["death", "inner world", "healing", "hope", "identity", "memory", "love", "isolation"],
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
        "cross_references": ["Song Jungbin"],
        "week_references": [10, 11, 5, 14],
        "themes": ["piano", "death", "healing", "inner world", "empathy", "hope", "identity", "memory"],
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
        "cross_references": ["Cheong Yunho"],
        "week_references": [3, 12, 5, 7],
        "themes": ["piano", "death", "healing", "inner world", "psychosis", "hope", "beauty", "memory"],
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
        "cross_references": ["Jang Daehyeok"],
        "week_references": [],
        "themes": ["piano", "death", "inner world", "genius", "psychosis", "empathy", "beauty", "rhythm"],
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
        "cross_references": ["Ki Hayoon"],
        "week_references": [10, 12, 5],
        "themes": ["death", "inner world", "healing", "hope", "beauty", "sublime", "memory", "rhythm"],
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
        "cross_references": ["Choi Junwon"],
        "week_references": [1, 2, 12],
        "themes": ["piano", "death", "healing", "inner world", "empathy", "hope", "overcoming", "memory"],
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
        "cross_references": ["Ahn Soobin"],
        "week_references": [],
        "themes": ["death", "inner world", "healing", "sensory disability", "hope", "identity", "memory", "rhythm"],
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
        "cross_references": ["Bae Minseok"],
        "week_references": [],
        "themes": ["death", "healing", "genius", "hope", "romanticism", "overcoming", "sublime", "memory"],
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
        "cross_references": ["Kim Yongbin"],
        "week_references": [12, 5],
        "themes": ["piano", "death", "inner world", "hope", "beauty", "identity", "memory", "rhythm"],
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
        "cross_references": ["Baek Seungjae"],
        "week_references": [1, 10, 3],
        "themes": ["piano", "death", "inner world", "empathy", "hope", "romanticism", "overcoming", "memory"],
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
        "cross_references": ["Ahn Soobin"],
        "week_references": [2, 12],
        "themes": ["piano", "inner world", "death", "healing", "mood disorder", "hope", "romanticism", "love"],
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
        "cross_references": ["Baek Jaehyuk"],
        "week_references": [10, 3, 5],
        "themes": ["piano", "death", "healing", "inner world", "hope", "overcoming", "identity", "memory"],
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
        "cross_references": ["Kim Seonghwi"],
        "week_references": [3, 12, 5],
        "themes": ["death", "inner world", "hope", "identity", "memory", "rhythm", "love", "opera"],
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
        "cross_references": ["Choi Issac"],
        "week_references": [3, 12, 13, 14],
        "themes": ["piano", "death", "healing", "hope", "rhythm", "infectious disease", "dissonance", "silence"],
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
        "cross_references": ["An Yeeun"],
        "week_references": [10, 12, 5, 7],
        "themes": ["communication", "repetition", "piano", "death", "family", "narrative medicine", "genius", "inner world"],
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
        "cross_references": ["Jung Yunjin"],
        "week_references": [],
        "themes": ["piano", "death", "healing", "inner world", "mood disorder", "hope", "romanticism", "beauty"],
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
        "funeral_music": None,
        "cross_references": ["Han Junryul"],
        "week_references": [],
        "themes": ["death", "inner world", "genius", "psychosis", "hope", "overcoming", "beauty", "identity"],
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
        "cross_references": ["Shin Sejong"],
        "week_references": [1, 2, 5],
        "themes": ["death", "inner world", "hope", "overcoming", "beauty", "memory", "rhythm", "opera"],
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
        "themes": ["piano", "death", "inner world", "sensory disability", "hope", "overcoming", "beauty", "identity"],
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
        "cross_references": ["Baek Jaehyuk"],
        "week_references": [],
        "themes": ["death", "inner world", "psychosis", "hope", "overcoming", "beauty", "memory", "trauma"],
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
        "cross_references": ["Lee Yubin", "Cheong Yunho"],
        "week_references": [1, 10, 2],
        "themes": ["death", "inner world", "hope", "romanticism", "overcoming", "beauty", "identity", "violin"],
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
        "cross_references": ["Yu Jonghun"],
        "week_references": [],
        "themes": ["death", "inner world", "hope", "identity", "rhythm", "love", "communication", "repetition"],
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
        "cross_references": ["Han Junryul", "Jang Hyojin"],
        "week_references": [],
        "themes": ["communication", "piano", "death", "opera", "isolation", "genius", "inner world", "beauty"],
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
        "cross_references": ["Lee Inhye"],
        "week_references": [],
        "themes": ["piano", "death", "inner world", "hope", "memory", "rhythm", "love", "isolation"],
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
        "cross_references": ["Jang Ayeong"],
        "week_references": [],
        "themes": ["death", "healing", "empathy", "hope", "memory", "opera", "love", "family"],
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
        "cross_references": ["Jang Jihyeon"],
        "week_references": [],
        "themes": ["piano", "death", "inner world", "hope", "overcoming", "beauty", "sublime", "memory"],
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
        "cross_references": ["Kim Seongjun"],
        "week_references": [1, 3, 12, 13, 14],
        "themes": ["death", "inner world", "healing", "hope", "love", "opera", "silence", "family"],
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
        "themes": ["piano", "death", "healing", "inner world", "empathy", "hope", "beauty", "identity"],
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
        "cross_references": ["Yoon Youngsik"],
        "week_references": [],
        "themes": ["piano", "death", "hope", "beauty", "memory", "rhythm", "opera", "love"],
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
        "cross_references": ["Jang Jihyeon"],
        "week_references": [3, 12, 5],
        "themes": ["piano", "death", "healing", "hope", "overcoming", "beauty", "memory", "rhythm"],
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
        "funeral_music": None,
        "cross_references": [],
        "week_references": [],
        "themes": ["death", "inner world", "empathy", "hope", "beauty", "rhythm", "love", "isolation"],
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
        "cross_references": ["Kim Zia"],
        "week_references": [],
        "themes": ["piano", "death", "inner world", "empathy", "hope", "identity", "memory", "cognitive decline"],
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
        "cross_references": ["Byeon Hyejung"],
        "week_references": [2, 12, 5],
        "themes": ["death", "sensory disability", "empathy", "hope", "identity", "family", "communication", "silence"],
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
        "cross_references": ["Kim Yongbin"],
        "week_references": [11, 3, 12, 5],
        "themes": ["piano", "death", "inner world", "empathy", "hope", "identity", "memory", "cognitive decline"],
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
        "cross_references": ["Kim Chanmi"],
        "week_references": [1, 3, 12, 5],
        "themes": ["piano", "death", "healing", "inner world", "empathy", "hope", "overcoming", "rhythm"],
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
        "cross_references": ["Choi Issac"],
        "week_references": [],
        "themes": ["death", "inner world", "empathy", "hope", "romanticism", "memory", "rhythm", "opera"],
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
        "cross_references": ["Kim Yeongseong"],
        "week_references": [2, 12, 5, 14],
        "themes": ["piano", "death", "healing", "empathy", "hope", "isolation", "love", "repetition"],
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
        "funeral_music": None,
        "cross_references": ["Kim Yunchae"],
        "week_references": [],
        "themes": ["death", "inner world", "empathy", "identity", "sublime", "love", "opera", "silence"],
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
        "cross_references": ["Jang Daehyeok"],
        "week_references": [11, 3, 12, 5],
        "themes": ["piano", "death", "healing", "genius", "psychosis", "hope", "beauty", "trauma"],
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
        "cross_references": ["Jung Yunjin"],
        "week_references": [3, 12, 5, 14],
        "themes": ["piano", "death", "inner world", "mood disorder", "empathy", "hope", "memory", "rhythm"],
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
        "cross_references": ["Lee Jaehyuk"],
        "week_references": [3, 5, 7],
        "themes": ["piano", "death", "inner world", "genius", "hope", "overcoming", "beauty", "memory"],
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
        "cross_references": ["Yoon Youngsik", "Kim Yeongseong"],
        "week_references": [11, 3, 14],
        "themes": ["piano", "death", "healing", "inner world", "genius", "hope", "overcoming", "beauty"],
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
        "week_references": [3, 12, 5],
        "themes": ["piano", "death", "healing", "inner world", "empathy", "hope", "trauma", "rhythm"],
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
        "funeral_music": None,
        "cross_references": [],
        "week_references": [],
        "themes": ["healing", "hope", "overcoming", "memory", "family", "love", "silence", "film score"],
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
        "cross_references": ["Park Hyungjin"],
        "week_references": [3, 12, 7],
        "themes": ["death", "inner world", "healing", "psychosis", "hope", "beauty", "identity", "memory"],
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
        "cross_references": ["Byeon Hyejung"],
        "week_references": [],
        "themes": ["death", "inner world", "sensory disability", "hope", "overcoming", "beauty", "sublime", "memory"],
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
        "cross_references": ["Kwon Doyeon"],
        "week_references": [2, 3, 12],
        "themes": ["death", "inner world", "empathy", "hope", "romanticism", "beauty", "memory", "rhythm"],
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
        "cross_references": ["Yu Jonghun"],
        "week_references": [8, 3, 7],
        "themes": ["death", "inner world", "identity", "memory", "trauma", "opera", "dissonance", "repetition"],
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
        "themes": ["piano", "death", "inner world", "genius", "hope", "overcoming", "beauty", "memory"],
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
        "cross_references": ["Noh Hyunwoo"],
        "week_references": [],
        "themes": ["death", "inner world", "hope", "beauty", "identity", "rhythm", "isolation", "dissonance"],
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
        "cross_references": ["Kim Junho"],
        "week_references": [11],
        "themes": ["piano", "death", "inner world", "genius", "romanticism", "overcoming", "rhythm", "violin"],
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
        "cross_references": ["Yun Jueun"],
        "week_references": [10, 3],
        "themes": ["piano", "death", "mood disorder", "romanticism", "beauty", "identity", "love", "isolation"],
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
        "cross_references": ["Jang Daehyeok"],
        "week_references": [],
        "themes": ["death", "sensory disability", "hope", "memory", "trauma", "rhythm", "love", "family"],
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
        "cross_references": ["Han Junryul"],
        "week_references": [],
        "themes": ["death", "inner world", "psychosis", "hope", "beauty", "identity", "memory", "rhythm"],
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
        "cross_references": ["Jung Yunjin"],
        "week_references": [],
        "themes": ["piano", "death", "healing", "mood disorder", "overcoming", "beauty", "memory", "trauma"],
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
        "week_references": [10, 12, 13],
        "themes": ["piano", "death", "healing", "inner world", "empathy", "hope", "overcoming", "trauma"],
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
        "cross_references": ["Jang Minsun"],
        "week_references": [],
        "themes": ["piano", "death", "healing", "inner world", "genius", "hope", "overcoming", "trauma"],
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
        "cross_references": ["Jeon Eunsu"],
        "week_references": [2, 12, 7],
        "themes": ["death", "inner world", "empathy", "hope", "overcoming", "beauty", "identity", "memory"],
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
        "cross_references": ["Kim Shin"],
        "week_references": [],
        "themes": ["piano", "death", "inner world", "hope", "overcoming", "beauty", "rhythm", "violin"],
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
        "cross_references": ["Baek Seungjae"],
        "week_references": [3, 10, 2, 12],
        "themes": ["death", "inner world", "healing", "hope", "overcoming", "beauty", "sublime", "memory"],
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
        "cross_references": ["Woo Seunghun"],
        "week_references": [],
        "themes": ["violin", "communication", "repetition", "piano", "death", "overcoming", "isolation", "narrative medicine"],
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
        "cross_references": ["Jang Ayeong"],
        "week_references": [10, 11, 5],
        "themes": ["death", "inner world", "healing", "genius", "empathy", "hope", "beauty", "sublime"],
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
        "cross_references": ["Jang Daehyeok"],
        "week_references": [10, 11, 12, 13, 14],
        "themes": ["piano", "death", "healing", "inner world", "empathy", "hope", "overcoming", "beauty"],
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
        "cross_references": ["Bae Minseok"],
        "week_references": [10, 12, 13, 14],
        "themes": ["death", "inner world", "healing", "empathy", "overcoming", "identity", "memory", "trauma"],
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
        "cross_references": ["Xu Yangyang"],
        "week_references": [5],
        "themes": ["death", "healing", "empathy", "hope", "memory", "rhythm", "love", "opera"],
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
        "cross_references": ["Kwon Doyeon", "Woo Yerin"],
        "week_references": [1, 11, 5],
        "themes": ["death", "romanticism", "beauty", "memory", "opera", "love", "repetition", "pain"],
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
        "cross_references": ["Rho Taegang"],
        "week_references": [],
        "themes": ["piano", "death", "healing", "inner world", "hope", "memory", "rhythm", "love"],
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
        "cross_references": ["An Yeeun"],
        "week_references": [2, 12, 5],
        "themes": ["piano", "death", "healing", "inner world", "terminal illness", "empathy", "hope", "romanticism"],
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
        "cross_references": ["Park Hyungjin"],
        "week_references": [13, 5, 14],
        "themes": ["piano", "death", "empathy", "hope", "rhythm", "love", "dissonance", "silence"],
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
        "cross_references": ["Chang Minha"],
        "week_references": [],
        "themes": ["death", "empathy", "hope", "memory", "isolation", "orchestra", "pain", "film score"],
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
        "cross_references": ["Lee Jaehyuk"],
        "week_references": [],
        "themes": ["death", "inner world", "healing", "hope", "overcoming", "rhythm", "love", "repetition"],
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
        "cross_references": ["Kwon Dohyun"],
        "week_references": [11, 12, 7],
        "themes": ["death", "inner world", "empathy", "hope", "identity", "memory", "rhythm", "opera"],
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
        "cross_references": ["Ki Hayoon"],
        "week_references": [12, 5, 14],
        "themes": ["piano", "death", "inner world", "mood disorder", "empathy", "hope", "romanticism", "beauty"],
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
        "cross_references": ["Woo Yerin"],
        "week_references": [2, 11],
        "themes": ["death", "inner world", "romanticism", "overcoming", "love", "opera", "isolation", "orchestra"],
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
        "cross_references": ["Jang Minsun"],
        "week_references": [16, 12, 13, 14],
        "themes": ["death", "inner world", "healing", "mood disorder", "hope", "beauty", "family", "love"],
    }
]

# ============================================================
# ANALYSIS FUNCTIONS
# ============================================================

def analyze_disease_distribution(entries: List[dict]) -> Dict[str, int]:
    """Analyze the distribution of diseases across entries."""
    disease_count = defaultdict(int)
    for entry in entries:
        diseases = [d.strip() for d in entry["disease"].split(",")]
        for disease in diseases:
            if disease:
                disease_count[disease] += 1
    return dict(sorted(disease_count.items(), key=lambda x: -x[1]))


def analyze_genre_distribution(entries: List[dict]) -> Dict[str, int]:
    """Analyze the distribution of genres."""
    genre_count = defaultdict(int)
    for entry in entries:
        genre_count[entry["genre"]] += 1
    return dict(sorted(genre_count.items(), key=lambda x: -x[1]))


def analyze_country_distribution(entries: List[dict]) -> Dict[str, int]:
    """Analyze the distribution of countries."""
    country_count = defaultdict(int)
    for entry in entries:
        country_count[entry["country"]] += 1
    return dict(sorted(country_count.items(), key=lambda x: -x[1]))


def analyze_temporal_distribution(entries: List[dict]) -> Dict[str, List[str]]:
    """Group works by century."""
    centuries = defaultdict(list)
    for entry in entries:
        if entry["year"] > 0:
            century = (entry["year"] // 100) + 1
            centuries[f"{century}th Century"].append(entry["title"])
    return dict(sorted(centuries.items()))


def analyze_cross_references(entries: List[dict]) -> Dict[str, Dict]:
    """Build a network graph of cross-references."""
    nodes = set()
    edges = []
    
    for entry in entries:
        nodes.add(entry["title"])
        for ref in entry.get("cross_references", []):
            if ref:
                nodes.add(ref)
                edges.append({"source": entry["title"], "target": ref})
    
    return {
        "nodes": list(nodes),
        "edges": edges,
        "node_count": len(nodes),
        "edge_count": len(edges)
    }


def analyze_week_references(entries: List[dict]) -> Dict[int, List[str]]:
    """Analyze which course weeks are referenced by each entry."""
    week_map = defaultdict(list)
    for entry in entries:
        for week in entry.get("week_references", []):
            week_map[week].append(entry["title"])
    return dict(sorted(week_map.items()))


def analyze_themes(entries: List[dict]) -> Dict[str, int]:
    """Analyze theme frequency across all entries."""
    theme_count = defaultdict(int)
    for entry in entries:
        for theme in entry.get("themes", []):
            theme_count[theme] += 1
    return dict(sorted(theme_count.items(), key=lambda x: -x[1]))


def find_related_entries(entries: List[dict], query: str) -> List[dict]:
    """Search for entries matching a query string."""
    query_lower = query.lower()
    results = []
    
    for entry in entries:
        score = 0
        searchable = f"{entry['title']} {entry['disease']} {entry.get('composer', '')} {' '.join(entry.get('themes', []))}"
        
        if query_lower in searchable.lower():
            score += 10
        if query_lower in entry['disease'].lower():
            score += 5
        if query_lower in ' '.join(entry.get('themes', [])).lower():
            score += 3
            
        if score > 0:
            results.append({"entry": entry, "score": score})
    
    return sorted(results, key=lambda x: -x["score"])


def generate_research_report(entries: List[dict]) -> str:
    """Generate a comprehensive research report."""
    report = []
    report.append("=" * 60)
    report.append("MEDICAL HUMANITIES MUSIC DATABASE - RESEARCH REPORT")
    report.append("=" * 60)
    report.append("")
    
    # Overview
    report.append("## OVERVIEW")
    report.append(f"Total entries: {len(entries)}")
    report.append(f"Unique diseases: {len(analyze_disease_distribution(entries))}")
    report.append(f"Genres covered: {len(analyze_genre_distribution(entries))}")
    report.append(f"Countries represented: {len(analyze_country_distribution(entries))}")
    report.append("")
    
    # Disease Analysis
    report.append("## TOP DISEASES")
    for disease, count in list(analyze_disease_distribution(entries).items())[:15]:
        report.append(f"  - {disease}: {count}")
    report.append("")
    
    # Genre Analysis
    report.append("## GENRE DISTRIBUTION")
    for genre, count in analyze_genre_distribution(entries).items():
        report.append(f"  - {genre}: {count}")
    report.append("")
    
    # Country Analysis
    report.append("## COUNTRY DISTRIBUTION")
    for country, count in analyze_country_distribution(entries).items():
        report.append(f"  - {country}: {count}")
    report.append("")
    
    # Temporal Analysis
    report.append("## TEMPORAL DISTRIBUTION")
    for century, works in analyze_temporal_distribution(entries).items():
        report.append(f"  {century}: {len(works)} works")
    report.append("")
    
    # Network Analysis
    report.append("## CROSS-REFERENCE NETWORK")
    network = analyze_cross_references(entries)
    report.append(f"  Total nodes: {network['node_count']}")
    report.append(f"  Total edges: {network['edge_count']}")
    report.append("")
    
    # Theme Analysis
    report.append("## TOP THEMES")
    themes = analyze_themes(entries)
    for theme, count in list(themes.items())[:15]:
        report.append(f"  - {theme}: {count}")
    report.append("")
    
    # Week References
    report.append("## COURSE WEEK REFERENCES")
    week_refs = analyze_week_references(entries)
    week_topics = {
        1: "Music and Medicine",
        2: "Romanticizing Disease",
        3: "Narrative Medicine",
        5: "Can Pain Be Expressed?",
        7: "Soundscape Theory",
        8: "Pathological Sounds",
        10: "Orthopedics and Posture",
        11: "Able-bodied Normativity",
        12: "Disease Narratives",
        13: "Late Style",
        14: "Ars Longa, Vita Brevis"
    }
    for week, works in week_refs.items():
        topic = week_topics.get(week, "")
        report.append(f"  Week {week} ({topic}): {len(works)} entries")
    report.append("")
    
    return "\n".join(report)


def export_to_csv(entries: List[dict]) -> str:
    """Export database to CSV format."""
    headers = ["Title", "Year", "Genre", "Disease", "ICD", "Composer", "Country", "Student", "Themes"]
    rows = [",".join(headers)]
    
    for entry in entries:
        row = [
            f'"{entry["title"]}"',
            str(entry["year"]),
            entry["genre"],
            f'"{entry["disease"]}"',
            entry["icd_code"],
            f'"{entry.get("composer", "")}"',
            entry.get("country", ""),
            entry.get("student", ""),
            f'"{"; ".join(entry.get("themes", []))}"'
        ]
        rows.append(",".join(row))
    
    return "\n".join(rows)


def export_to_json(entries: List[dict]) -> str:
    """Export database to JSON format for web applications."""
    return json.dumps(entries, indent=2, ensure_ascii=False)


# ============================================================
# MAIN
# ============================================================

if __name__ == "__main__":
    print("\n" + "=" * 60)
    print("MEDICAL HUMANITIES MUSIC DATABASE - ANALYSIS")
    print("=" * 60)
    
    # Generate and print report
    print(generate_research_report(SAMPLE_ENTRIES))
    
    # Example searches
    print("\n## SEARCH EXAMPLE: 'schizophrenia'")
    results = find_related_entries(SAMPLE_ENTRIES, "schizophrenia")[:5]
    for r in results:
        print(f"  [{r['score']}] {r['entry']['title']} - {r['entry']['disease']}")
    
    print("\n## SEARCH EXAMPLE: 'piano'")
    results = find_related_entries(SAMPLE_ENTRIES, "piano")[:5]
    for r in results:
        print(f"  [{r['score']}] {r['entry']['title']}")
    
    print("\n" + "=" * 60)
    print("Analysis complete. Total entries:", len(SAMPLE_ENTRIES))
    print("=" * 60)
