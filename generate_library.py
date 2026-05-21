#!/usr/bin/env python3
"""
CINEGRADE LAB - Premium Preset & LUT Generation Engine
Generates 125+ valid Adobe XMP Lightroom Presets and 125+ valid 3D CUBE LUTs
"""

import os
import json
import numpy as np
from datetime import datetime

# ============================================================
# OUTPUT PATHS
# ============================================================
XMP_DIR = "/mnt/agents/output/library/xmp"
CUBE_DIR = "/mnt/agents/output/library/cube"
META_DIR = "/mnt/agents/output/library/meta"
INDEX_PATH = "/mnt/agents/output/library/CINEGRADE_LIBRARY_INDEX.json"

for d in [XMP_DIR, CUBE_DIR, META_DIR]:
    os.makedirs(d, exist_ok=True)

# ============================================================
# CATEGORY DEFINITIONS
# ============================================================
CATEGORIES = {
    "luxury_editorial": {
        "name": "Luxury Editorial",
        "description": "Rich blacks, soft contrast, warm skin tones for high-end editorial photography",
        "mood": "Sophisticated, elegant, polished",
    },
    "cinematic_shadows": {
        "name": "Cinematic Shadows",
        "description": "Crushed blacks with teal shadows and warm highlights for cinema-inspired images",
        "mood": "Dramatic, cinematic, bold",
    },
    "analog_film": {
        "name": "Analog Film",
        "description": "Film grain, muted colors, and vintage feel emulating classic film stocks",
        "mood": "Nostalgic, warm, organic",
    },
    "moody_documentary": {
        "name": "Moody Documentary",
        "description": "Desaturated, contrasty, journalistic style for documentary storytelling",
        "mood": "Raw, honest, gritty",
    },
    "dreamy_wedding": {
        "name": "Dreamy Wedding",
        "description": "Soft, romantic, warm highlights with pastel tones for wedding photography",
        "mood": "Romantic, ethereal, tender",
    },
    "hyperreal_fashion": {
        "name": "Hyperreal Fashion",
        "description": "Punchy, saturated, with flawless skin rendering for fashion editorials",
        "mood": "Bold, vibrant, high-impact",
    },
    "night_neon": {
        "name": "Night Neon",
        "description": "Cyberpunk-inspired with neon glow enhancement and deep shadow work",
        "mood": "Electric, urban, futuristic",
    },
    "luxury_travel": {
        "name": "Luxury Travel",
        "description": "Golden hour tones, rich landscapes, and vivid colors for travel content",
        "mood": "Wanderlust, golden, rich",
    },
    "minimal_scandinavian": {
        "name": "Minimal Scandinavian",
        "description": "Clean, bright, muted, airy aesthetic inspired by Scandinavian design",
        "mood": "Calm, airy, minimal",
    },
    "cyberpunk_cinema": {
        "name": "Cyberpunk Cinema",
        "description": "Cyan/magenta split with high contrast for futuristic cyberpunk visuals",
        "mood": "Futuristic, neon, dystopian",
    },
    "neo_noir": {
        "name": "Neo Noir",
        "description": "Dramatic shadows, high contrast, moody lighting inspired by noir cinema",
        "mood": "Mysterious, dramatic, dark",
    },
    "vintage_film_lab": {
        "name": "Vintage Film Lab",
        "description": "Faded, grainy, color-shifted retro film lab aesthetic",
        "mood": "Retro, faded, nostalgic",
    },
    "high_dynamic_luxury": {
        "name": "High Dynamic Luxury",
        "description": "HDR-like with detailed shadows and highlights for luxury imagery",
        "mood": "Premium, detailed, luminous",
    },
    "dark_instagram_mood": {
        "name": "Dark Instagram Mood",
        "description": "Desaturated, crushed blacks, cool tones for social media aesthetics",
        "mood": "Moody, cool, modern",
    },
    "clean_creator_economy": {
        "name": "Clean Creator Economy",
        "description": "Bright, clean, approachable, modern aesthetic for content creators",
        "mood": "Fresh, bright, friendly",
    },
    "music_video_looks": {
        "name": "Music Video Looks",
        "description": "Stylized, dramatic, high-impact looks inspired by music video grading",
        "mood": "Dynamic, stylized, intense",
    },
    "commercial_luxury": {
        "name": "Commercial Luxury",
        "description": "Polished, professional, product-ready aesthetic for commercial work",
        "mood": "Clean, premium, sharp",
    },
    "netflix_inspired": {
        "name": "Netflix Inspired",
        "description": "Cinematic teal/orange with filmic qualities inspired by streaming content",
        "mood": "Cinematic, binge-worthy, polished",
    },
    "a24_inspired": {
        "name": "A24 Inspired",
        "description": "Artistic, unconventional, mood-driven looks inspired by A24 films",
        "mood": "Arthouse, unconventional, evocative",
    },
    "kodak_portra_emulation": {
        "name": "Kodak Portra Emulation",
        "description": "Warm skin tones, soft contrast, film grain emulating Kodak Portra stocks",
        "mood": "Warm, filmic, timeless",
    },
    "fuji_400h_emulation": {
        "name": "Fuji 400H Emulation",
        "description": "Pastel tones, green shadows, airy feel emulating Fuji Pro 400H",
        "mood": "Soft, pastel, delicate",
    },
    "arri_alexa_look": {
        "name": "ARRI Alexa Look",
        "description": "Digital cinema natural skin tones with wide dynamic range emulation",
        "mood": "Cinematic, natural, professional",
    },
    "cinestill_800t_emulation": {
        "name": "CineStill 800T Emulation",
        "description": "Tungsten balance, halation glow, night film characteristics",
        "mood": "Nocturnal, glowing, cinematic",
    },
    "bleach_bypass": {
        "name": "Bleach Bypass",
        "description": "Silver retention, high contrast, desaturated bleach bypass film process",
        "mood": "Gritty, stark, intense",
    },
    "teal_orange_modern": {
        "name": "Teal & Orange Modern",
        "description": "Complementary colors with modern cinematic teal and orange grading",
        "mood": "Blockbuster, cinematic, contemporary",
    },
}

# Preset names per category (5 each = 125 total)
PRESET_NAMES = {
    "luxury_editorial": ["Nocturne Lux", "Velvet Noir", "Opulence", "Silk Embers", "Champagne Dusk"],
    "cinematic_shadows": ["Obsidian Teal", "Crimson Shadow", "Abyss Glow", "Tungsten Dreams", "Midnight Cinema"],
    "analog_film": ["Kodachrome Soul", "Film Haven", "Dust & Grain", "Retrograde", "Analog Hearts"],
    "moody_documentary": ["Raw Truth", "Street Witness", "Shadow Journal", "Urban Decay", "Light Chaser"],
    "dreamy_wedding": ["Blush Veil", "Golden Vows", "Ethereal Love", "Pastel Promise", "Romantic Haze"],
    "hyperreal_fashion": ["Neon Runway", "Editorial Punch", "Glamour Burst", "Haute Glow", "Vogue Voltage"],
    "night_neon": ["Cyber Glow", "Neon Drift", "Electric Avenue", "Tokyo Midnight", "Laser Dreams"],
    "luxury_travel": ["Golden Horizon", "Safari Luxe", "Tuscan Sun", "Azure Escape", "Wanderlust Gold"],
    "minimal_scandinavian": ["Nordic Air", "Oslo Light", "Fjord Mist", "Clean Linen", "Snow Whisper"],
    "cyberpunk_cinema": ["Neon Dystopia", "Synth City", "Matrix Haze", "Future Shock", "Chrome Dreams"],
    "neo_noir": ["Shadow Play", "Night Crawler", "Dark Paradise", "Sin City", "Velvet Shadows"],
    "vintage_film_lab": ["Faded Memories", "Color Fade Lab", "Retro Chem", "Cross Processed", "Film Ghost"],
    "high_dynamic_luxury": ["Luminous Prime", "HDR Luxe", "Detail Master", "Shadow King", "Highlight Queen"],
    "dark_instagram_mood": ["Mood Grid", "Dark Feed", "Shadow Scroll", "Noir Social", "Dim Aesthetic"],
    "clean_creator_economy": ["Bright Start", "Creator Glow", "Fresh Content", "Clean Slate", "Modern Voice"],
    "music_video_looks": ["MTA Glow", "Pop Star", "Rhythm Light", "Stage Blaze", "Beat Drop"],
    "commercial_luxury": ["Product Prime", "Brand Luxe", "Commercial Gold", "Retail Glow", "Market Master"],
    "netflix_inspired": ["Stream Queen", "Binge Night", "Teal Drama", "Series Glow", "Episode One"],
    "a24_inspired": ["Hereditary Mood", "Moonlight Glow", "Midsommar Haze", "Ex Machina", "Green Knight"],
    "kodak_portra_emulation": ["Portra 160", "Portra 400", "Portra 800", "Portra Warm", "Portra Skin"],
    "fuji_400h_emulation": ["Fuji Pastel", "400H Soft", "Pro Green", "Fuji Air", "Sakura Tone"],
    "arri_alexa_look": ["Alexa Log", "ARRI Natural", "Cinema Skin", "Digital Film", "Alexa Wide"],
    "cinestill_800t_emulation": ["800T Tungsten", "CineStill Night", "Halation Glow", "Tungsten Film", "Night Still"],
    "bleach_bypass": ["Silver Keep", "Bleach Raw", "Skip Bath", "Chrome Grain", "Bypass Hard"],
    "teal_orange_modern": ["Blockbuster", "Teal Fire", "Orange Wave", "Modern Cinema", "Complementary"],
}


# ============================================================
# PRESET PARAMETER DEFINITIONS (per category, 5 variations each)
# ============================================================
def make_preset_params(category, variant):
    """Generate detailed preset parameters for each category and variant."""
    v = variant  # 0-4 for variation

    if category == "luxury_editorial":
        return {
            "Exposure": round(0.1 + v * 0.05, 2),
            "Contrast": 10 + v * 5,
            "Highlights": -20 - v * 5,
            "Shadows": 15 + v * 5,
            "Whites": -10 + v * 2,
            "Blacks": -15 - v * 3,
            "Texture": 20 + v * 5,
            "Clarity": 10 + v * 5,
            "Dehaze": 5 + v * 3,
            "Vibrance": 10 + v * 5,
            "Saturation": -5 - v * 2,
            "ToneCurve": f"0, 0, 32, {22 + v*3}, 64, {56 + v*2}, 128, 128, 192, {198 - v*2}, 255, 255",
            "HSL": {
                "RedHue": 5 + v, "RedSat": 10 + v * 3, "RedLum": -5 + v,
                "OrangeHue": 8 + v, "OrangeSat": 5 + v * 2, "OrangeLum": 10 + v * 5,
                "YellowHue": -10 - v, "YellowSat": -5 - v, "YellowLum": 5 + v,
                "GreenHue": 15 + v * 2, "GreenSat": -15 - v * 3, "GreenLum": -10 - v,
                "AquaHue": 10 + v, "AquaSat": -10 - v, "AquaLum": 0,
                "BlueHue": -5 - v, "BlueSat": -10 - v, "BlueLum": -10 - v * 2,
                "PurpleHue": 20 + v, "PurpleSat": -15 - v, "PurpleLum": -5 - v,
                "MagentaHue": 25 + v, "MagentaSat": -20 - v, "MagentaLum": 0,
            },
            "SplitToning": {"ShadowHue": 30 + v * 5, "ShadowSat": 10 + v * 3,
                           "HighlightHue": 45 + v * 3, "HighlightSat": 15 + v * 3, "Balance": 60 + v * 5},
            "Grain": {"Amount": 15 + v * 10, "Size": 25 + v * 3, "Frequency": 50 + v * 10},
            "Vignette": {"Amount": -15 - v * 5, "Midpoint": 50 + v * 5, "Feather": 65 + v * 5},
            "Sharpening": {"Amount": 50 + v * 10, "Radius": 1.0 + v * 0.1, "Detail": 25 + v * 5, "Masking": 40 + v * 10},
            "ColorGrade": {
                "ShadowLum": -10 - v * 3, "ShadowHue": 30 + v * 5, "ShadowSat": 12 + v * 3,
                "MidtoneLum": 5 + v, "MidtoneHue": 45 + v * 3, "MidtoneSat": 8 + v * 2,
                "HighlightLum": 10 + v * 2, "HighlightHue": 50 + v * 3, "HighlightSat": 15 + v * 3,
                "Balance": 0.5 + v * 0.05,
            },
        }
    elif category == "cinematic_shadows":
        teal_hue = 180 + v * 5
        return {
            "Exposure": round(-0.1 + v * 0.05, 2),
            "Contrast": 25 + v * 5,
            "Highlights": -30 - v * 5,
            "Shadows": -20 - v * 5,
            "Whites": 10 + v * 3,
            "Blacks": -25 - v * 5,
            "Texture": 15 + v * 5,
            "Clarity": 20 + v * 5,
            "Dehaze": 10 + v * 5,
            "Vibrance": -10 - v * 3,
            "Saturation": -10 - v * 2,
            "ToneCurve": f"0, 0, 32, {15 + v*2}, 64, {48 + v*3}, 128, 128, 192, {205 - v*3}, 255, 255",
            "HSL": {
                "RedHue": -10 - v, "RedSat": -5 - v, "RedLum": -10 - v * 2,
                "OrangeHue": 5 + v, "OrangeSat": 5 + v, "OrangeLum": 5 + v,
                "YellowHue": -15 - v, "YellowSat": -15 - v * 3, "YellowLum": -10 - v,
                "GreenHue": 40 + v * 5, "GreenSat": -20 - v * 5, "GreenLum": -20 - v * 5,
                "AquaHue": 30 + v * 3, "AquaSat": 25 + v * 5, "AquaLum": -15 - v * 3,
                "BlueHue": -15 - v * 3, "BlueSat": 20 + v * 5, "BlueLum": -20 - v * 5,
                "PurpleHue": -20 - v, "PurpleSat": -10 - v, "PurpleLum": -10 - v,
                "MagentaHue": -20 - v, "MagentaSat": -5 - v, "MagentaLum": -5 - v,
            },
            "SplitToning": {"ShadowHue": teal_hue, "ShadowSat": 30 + v * 5,
                           "HighlightHue": 35 + v * 5, "HighlightSat": 25 + v * 3, "Balance": 70 + v * 5},
            "Grain": {"Amount": 20 + v * 10, "Size": 30 + v * 3, "Frequency": 55 + v * 10},
            "Vignette": {"Amount": -25 - v * 5, "Midpoint": 40 + v * 5, "Feather": 60 + v * 5},
            "Sharpening": {"Amount": 60 + v * 10, "Radius": 1.2 + v * 0.1, "Detail": 30 + v * 5, "Masking": 50 + v * 10},
            "ColorGrade": {
                "ShadowLum": -20 - v * 3, "ShadowHue": teal_hue, "ShadowSat": 30 + v * 5,
                "MidtoneLum": -5 - v, "MidtoneHue": 45 + v * 3, "MidtoneSat": 5 + v,
                "HighlightLum": 5 + v, "HighlightHue": 35 + v * 5, "HighlightSat": 25 + v * 3,
                "Balance": 0.7 + v * 0.03,
            },
        }
    elif category == "analog_film":
        return {
            "Exposure": round(0.15 + v * 0.1, 2),
            "Contrast": -5 - v * 3,
            "Highlights": -25 - v * 5,
            "Shadows": 10 + v * 5,
            "Whites": -15 - v * 3,
            "Blacks": 5 + v * 5,
            "Texture": -5 - v * 2,
            "Clarity": -10 - v * 3,
            "Dehaze": -5 - v * 2,
            "Vibrance": -15 - v * 5,
            "Saturation": -15 - v * 5,
            "ToneCurve": f"0, {5 + v*2}, 32, {25 + v*3}, 64, {62 + v*2}, 128, 128, 192, {192 - v*2}, 255, {250 - v*3}",
            "HSL": {
                "RedHue": 10 + v, "RedSat": -10 - v * 3, "RedLum": 5 + v,
                "OrangeHue": 5 + v, "OrangeSat": -10 - v * 3, "OrangeLum": 10 + v * 5,
                "YellowHue": -15 - v * 2, "YellowSat": -20 - v * 5, "YellowLum": 10 + v * 3,
                "GreenHue": 20 + v * 3, "GreenSat": -25 - v * 5, "GreenLum": -5 - v,
                "AquaHue": 15 + v * 2, "AquaSat": -20 - v * 5, "AquaLum": -5 - v,
                "BlueHue": -10 - v, "BlueSat": -20 - v * 5, "BlueLum": -10 - v * 2,
                "PurpleHue": 15 + v * 2, "PurpleSat": -25 - v * 5, "PurpleLum": -5 - v,
                "MagentaHue": 20 + v * 3, "MagentaSat": -20 - v * 5, "MagentaLum": 0,
            },
            "SplitToning": {"ShadowHue": 40 + v * 5, "ShadowSat": 15 + v * 3,
                           "HighlightHue": 50 + v * 5, "HighlightSat": 12 + v * 3, "Balance": 50 + v * 5},
            "Grain": {"Amount": 35 + v * 15, "Size": 35 + v * 5, "Frequency": 65 + v * 10},
            "Vignette": {"Amount": -20 - v * 5, "Midpoint": 45 + v * 5, "Feather": 70 + v * 5},
            "Sharpening": {"Amount": 30 + v * 5, "Radius": 1.0 + v * 0.15, "Detail": 20 + v * 5, "Masking": 30 + v * 10},
            "ColorGrade": {
                "ShadowLum": 5 + v, "ShadowHue": 40 + v * 5, "ShadowSat": 12 + v * 3,
                "MidtoneLum": 3 + v, "MidtoneHue": 50 + v * 5, "MidtoneSat": 8 + v * 2,
                "HighlightLum": 5 + v, "HighlightHue": 55 + v * 5, "HighlightSat": 10 + v * 2,
                "Balance": 0.4 + v * 0.05,
            },
        }
    elif category == "moody_documentary":
        return {
            "Exposure": round(-0.15 + v * 0.05, 2),
            "Contrast": 20 + v * 5,
            "Highlights": -35 - v * 5,
            "Shadows": -15 - v * 3,
            "Whites": -10 + v * 3,
            "Blacks": -20 - v * 5,
            "Texture": 25 + v * 5,
            "Clarity": 25 + v * 5,
            "Dehaze": 15 + v * 5,
            "Vibrance": -20 - v * 5,
            "Saturation": -20 - v * 5,
            "ToneCurve": f"0, 0, 32, {18 + v*2}, 64, {50 + v*3}, 128, 128, 192, {200 - v*3}, 255, 255",
            "HSL": {
                "RedHue": -5 - v, "RedSat": -15 - v * 5, "RedLum": -10 - v * 2,
                "OrangeHue": 5 + v, "OrangeSat": -15 - v * 5, "OrangeLum": -5 - v,
                "YellowHue": -10 - v * 2, "YellowSat": -20 - v * 5, "YellowLum": -10 - v * 2,
                "GreenHue": 10 + v * 2, "GreenSat": -25 - v * 5, "GreenLum": -15 - v * 3,
                "AquaHue": 10 + v, "AquaSat": -20 - v * 5, "AquaLum": -10 - v * 2,
                "BlueHue": -5 - v, "BlueSat": -15 - v * 5, "BlueLum": -15 - v * 3,
                "PurpleHue": 10 + v, "PurpleSat": -20 - v * 5, "PurpleLum": -10 - v,
                "MagentaHue": 15 + v, "MagentaSat": -20 - v * 5, "MagentaLum": -5 - v,
            },
            "SplitToning": {"ShadowHue": 220 + v * 5, "ShadowSat": 10 + v * 3,
                           "HighlightHue": 45 + v * 3, "HighlightSat": 8 + v * 2, "Balance": 65 + v * 5},
            "Grain": {"Amount": 30 + v * 15, "Size": 40 + v * 5, "Frequency": 60 + v * 10},
            "Vignette": {"Amount": -25 - v * 5, "Midpoint": 40 + v * 5, "Feather": 55 + v * 5},
            "Sharpening": {"Amount": 65 + v * 10, "Radius": 1.1 + v * 0.1, "Detail": 35 + v * 5, "Masking": 55 + v * 10},
            "ColorGrade": {
                "ShadowLum": -25 - v * 3, "ShadowHue": 220 + v * 5, "ShadowSat": 10 + v * 3,
                "MidtoneLum": -8 - v, "MidtoneHue": 45 + v * 3, "MidtoneSat": 5 + v,
                "HighlightLum": 0, "HighlightHue": 50 + v * 3, "HighlightSat": 8 + v * 2,
                "Balance": 0.75 + v * 0.03,
            },
        }
    elif category == "dreamy_wedding":
        return {
            "Exposure": round(0.25 + v * 0.1, 2),
            "Contrast": -15 - v * 5,
            "Highlights": -20 - v * 5,
            "Shadows": 25 + v * 5,
            "Whites": -10 - v * 3,
            "Blacks": 10 + v * 5,
            "Texture": -10 - v * 3,
            "Clarity": -15 - v * 5,
            "Dehaze": -8 - v * 3,
            "Vibrance": 10 + v * 5,
            "Saturation": -10 - v * 3,
            "ToneCurve": f"0, {8 + v*2}, 32, {30 + v*3}, 64, {68 + v*2}, 128, 128, 192, {196 - v*2}, 255, {248 - v*3}",
            "HSL": {
                "RedHue": 8 + v, "RedSat": -5 - v, "RedLum": 12 + v * 3,
                "OrangeHue": 5 + v, "OrangeSat": -8 - v * 2, "OrangeLum": 15 + v * 5,
                "YellowHue": -8 - v, "YellowSat": -10 - v * 3, "YellowLum": 12 + v * 3,
                "GreenHue": 20 + v * 3, "GreenSat": -20 - v * 5, "GreenLum": 5 + v,
                "AquaHue": 10 + v, "AquaSat": -10 - v * 3, "AquaLum": 5 + v,
                "BlueHue": -10 - v, "BlueSat": -15 - v * 5, "BlueLum": -5 - v,
                "PurpleHue": 10 + v * 2, "PurpleSat": -5 - v, "PurpleLum": 10 + v * 3,
                "MagentaHue": 15 + v * 2, "MagentaSat": -5 - v, "MagentaLum": 12 + v * 3,
            },
            "SplitToning": {"ShadowHue": 320 + v * 5, "ShadowSat": 8 + v * 2,
                           "HighlightHue": 45 + v * 3, "HighlightSat": 15 + v * 3, "Balance": 45 + v * 5},
            "Grain": {"Amount": 10 + v * 8, "Size": 25 + v * 3, "Frequency": 45 + v * 10},
            "Vignette": {"Amount": -10 - v * 3, "Midpoint": 55 + v * 5, "Feather": 75 + v * 5},
            "Sharpening": {"Amount": 35 + v * 5, "Radius": 0.9 + v * 0.1, "Detail": 20 + v * 5, "Masking": 25 + v * 10},
            "ColorGrade": {
                "ShadowLum": 10 + v * 3, "ShadowHue": 320 + v * 5, "ShadowSat": 8 + v * 2,
                "MidtoneLum": 8 + v * 2, "MidtoneHue": 15 + v * 3, "MidtoneSat": 6 + v * 2,
                "HighlightLum": 15 + v * 3, "HighlightHue": 45 + v * 3, "HighlightSat": 15 + v * 3,
                "Balance": 0.3 + v * 0.05,
            },
        }
    elif category == "hyperreal_fashion":
        return {
            "Exposure": round(0.1 + v * 0.05, 2),
            "Contrast": 20 + v * 5,
            "Highlights": -15 - v * 5,
            "Shadows": 20 + v * 5,
            "Whites": 10 + v * 5,
            "Blacks": -5 - v * 3,
            "Texture": 30 + v * 5,
            "Clarity": 30 + v * 5,
            "Dehaze": 10 + v * 5,
            "Vibrance": 25 + v * 5,
            "Saturation": 10 + v * 5,
            "ToneCurve": f"0, 0, 32, {20 + v*2}, 64, {55 + v*3}, 128, 128, 192, {200 - v*2}, 255, 255",
            "HSL": {
                "RedHue": 10 + v, "RedSat": 20 + v * 5, "RedLum": 10 + v * 3,
                "OrangeHue": -5 - v, "OrangeSat": 15 + v * 5, "OrangeLum": 15 + v * 5,
                "YellowHue": -10 - v * 2, "YellowSat": 10 + v * 3, "YellowLum": 10 + v * 3,
                "GreenHue": 15 + v * 2, "GreenSat": -5 - v, "GreenLum": 0,
                "AquaHue": 10 + v, "AquaSat": 0, "AquaLum": 5 + v,
                "BlueHue": -5 - v, "BlueSat": 20 + v * 5, "BlueLum": -5 - v,
                "PurpleHue": 15 + v * 3, "PurpleSat": 25 + v * 5, "PurpleLum": 10 + v * 3,
                "MagentaHue": 20 + v * 3, "MagentaSat": 30 + v * 5, "MagentaLum": 10 + v * 3,
            },
            "SplitToning": {"ShadowHue": 280 + v * 5, "ShadowSat": 15 + v * 3,
                           "HighlightHue": 50 + v * 3, "HighlightSat": 20 + v * 3, "Balance": 55 + v * 5},
            "Grain": {"Amount": 5 + v * 5, "Size": 20 + v * 3, "Frequency": 40 + v * 10},
            "Vignette": {"Amount": -5 - v * 3, "Midpoint": 60 + v * 5, "Feather": 70 + v * 5},
            "Sharpening": {"Amount": 70 + v * 10, "Radius": 1.2 + v * 0.1, "Detail": 40 + v * 5, "Masking": 60 + v * 10},
            "ColorGrade": {
                "ShadowLum": -5 - v, "ShadowHue": 280 + v * 5, "ShadowSat": 12 + v * 3,
                "MidtoneLum": 5 + v, "MidtoneHue": 15 + v * 3, "MidtoneSat": 10 + v * 3,
                "HighlightLum": 10 + v * 3, "HighlightHue": 50 + v * 3, "HighlightSat": 18 + v * 3,
                "Balance": 0.5 + v * 0.05,
            },
        }
    elif category == "night_neon":
        return {
            "Exposure": round(-0.2 + v * 0.1, 2),
            "Contrast": 30 + v * 5,
            "Highlights": -20 - v * 5,
            "Shadows": -25 - v * 5,
            "Whites": 5 + v * 3,
            "Blacks": -30 - v * 5,
            "Texture": 20 + v * 5,
            "Clarity": 35 + v * 5,
            "Dehaze": 20 + v * 5,
            "Vibrance": 30 + v * 5,
            "Saturation": 10 + v * 5,
            "ToneCurve": f"0, 0, 32, {12 + v}, 64, {42 + v*2}, 128, 128, 192, {205 - v*2}, 255, 255",
            "HSL": {
                "RedHue": 30 + v * 5, "RedSat": 40 + v * 5, "RedLum": -10 - v * 2,
                "OrangeHue": -15 - v * 3, "OrangeSat": 20 + v * 5, "OrangeLum": -5 - v,
                "YellowHue": -25 - v * 5, "YellowSat": 10 + v * 3, "YellowLum": -15 - v * 3,
                "GreenHue": 50 + v * 5, "GreenSat": 30 + v * 5, "GreenLum": -10 - v * 2,
                "AquaHue": 20 + v * 3, "AquaSat": 50 + v * 5, "AquaLum": 10 + v * 3,
                "BlueHue": -20 - v * 5, "BlueSat": 40 + v * 5, "BlueLum": -5 - v,
                "PurpleHue": 25 + v * 5, "PurpleSat": 45 + v * 5, "PurpleLum": 10 + v * 3,
                "MagentaHue": 30 + v * 5, "MagentaSat": 50 + v * 5, "MagentaLum": 10 + v * 3,
            },
            "SplitToning": {"ShadowHue": 200 + v * 5, "ShadowSat": 35 + v * 5,
                           "HighlightHue": 320 + v * 5, "HighlightSat": 40 + v * 5, "Balance": 40 + v * 5},
            "Grain": {"Amount": 25 + v * 15, "Size": 30 + v * 5, "Frequency": 55 + v * 10},
            "Vignette": {"Amount": -30 - v * 5, "Midpoint": 35 + v * 5, "Feather": 50 + v * 5},
            "Sharpening": {"Amount": 65 + v * 10, "Radius": 1.3 + v * 0.1, "Detail": 35 + v * 5, "Masking": 55 + v * 10},
            "ColorGrade": {
                "ShadowLum": -25 - v * 3, "ShadowHue": 200 + v * 5, "ShadowSat": 30 + v * 5,
                "MidtoneLum": -10 - v, "MidtoneHue": 280 + v * 5, "MidtoneSat": 20 + v * 3,
                "HighlightLum": 5 + v, "HighlightHue": 320 + v * 5, "HighlightSat": 35 + v * 5,
                "Balance": 0.6 + v * 0.03,
            },
        }
    elif category == "luxury_travel":
        return {
            "Exposure": round(0.15 + v * 0.1, 2),
            "Contrast": 15 + v * 5,
            "Highlights": -25 - v * 5,
            "Shadows": 20 + v * 5,
            "Whites": 5 + v * 3,
            "Blacks": -10 - v * 3,
            "Texture": 20 + v * 5,
            "Clarity": 20 + v * 5,
            "Dehaze": 15 + v * 5,
            "Vibrance": 25 + v * 5,
            "Saturation": 5 + v * 3,
            "ToneCurve": f"0, 0, 32, {20 + v*2}, 64, {55 + v*3}, 128, 128, 192, {202 - v*2}, 255, 255",
            "HSL": {
                "RedHue": 10 + v, "RedSat": 15 + v * 3, "RedLum": 5 + v,
                "OrangeHue": -10 - v * 2, "OrangeSat": 20 + v * 5, "OrangeLum": 10 + v * 3,
                "YellowHue": -15 - v * 3, "YellowSat": 25 + v * 5, "YellowLum": 12 + v * 3,
                "GreenHue": 20 + v * 3, "GreenSat": 10 + v * 3, "GreenLum": -5 - v,
                "AquaHue": 10 + v, "AquaSat": 15 + v * 3, "AquaLum": 5 + v,
                "BlueHue": -15 - v * 3, "BlueSat": 20 + v * 5, "BlueLum": -5 - v,
                "PurpleHue": 10 + v * 2, "PurpleSat": 10 + v * 3, "PurpleLum": 5 + v,
                "MagentaHue": 15 + v * 2, "MagentaSat": 10 + v * 3, "MagentaLum": 5 + v,
            },
            "SplitToning": {"ShadowHue": 40 + v * 5, "ShadowSat": 15 + v * 3,
                           "HighlightHue": 45 + v * 3, "HighlightSat": 25 + v * 3, "Balance": 50 + v * 5},
            "Grain": {"Amount": 15 + v * 10, "Size": 25 + v * 3, "Frequency": 50 + v * 10},
            "Vignette": {"Amount": -15 - v * 5, "Midpoint": 50 + v * 5, "Feather": 65 + v * 5},
            "Sharpening": {"Amount": 55 + v * 10, "Radius": 1.1 + v * 0.1, "Detail": 30 + v * 5, "Masking": 45 + v * 10},
            "ColorGrade": {
                "ShadowLum": -5 - v, "ShadowHue": 40 + v * 5, "ShadowSat": 12 + v * 3,
                "MidtoneLum": 5 + v, "MidtoneHue": 45 + v * 3, "MidtoneSat": 15 + v * 3,
                "HighlightLum": 12 + v * 3, "HighlightHue": 48 + v * 3, "HighlightSat": 22 + v * 3,
                "Balance": 0.45 + v * 0.05,
            },
        }
    elif category == "minimal_scandinavian":
        return {
            "Exposure": round(0.35 + v * 0.15, 2),
            "Contrast": -20 - v * 5,
            "Highlights": -15 - v * 5,
            "Shadows": 35 + v * 5,
            "Whites": 15 + v * 5,
            "Blacks": 20 + v * 5,
            "Texture": -10 - v * 3,
            "Clarity": -15 - v * 5,
            "Dehaze": -15 - v * 5,
            "Vibrance": -25 - v * 5,
            "Saturation": -20 - v * 5,
            "ToneCurve": f"0, {15 + v*3}, 32, {40 + v*5}, 64, {78 + v*3}, 128, 130, 192, {200 - v*3}, 255, {248 - v*3}",
            "HSL": {
                "RedHue": 5 + v, "RedSat": -20 - v * 5, "RedLum": 15 + v * 5,
                "OrangeHue": 5 + v, "OrangeSat": -20 - v * 5, "OrangeLum": 15 + v * 5,
                "YellowHue": -10 - v * 2, "YellowSat": -25 - v * 5, "YellowLum": 15 + v * 5,
                "GreenHue": 15 + v * 3, "GreenSat": -25 - v * 5, "GreenLum": 10 + v * 3,
                "AquaHue": 10 + v, "AquaSat": -20 - v * 5, "AquaLum": 10 + v * 3,
                "BlueHue": -10 - v, "BlueSat": -25 - v * 5, "BlueLum": 15 + v * 5,
                "PurpleHue": 10 + v, "PurpleSat": -20 - v * 5, "PurpleLum": 10 + v * 3,
                "MagentaHue": 15 + v, "MagentaSat": -20 - v * 5, "MagentaLum": 10 + v * 3,
            },
            "SplitToning": {"ShadowHue": 210 + v * 5, "ShadowSat": 8 + v * 2,
                           "HighlightHue": 55 + v * 5, "HighlightSat": 10 + v * 2, "Balance": 35 + v * 5},
            "Grain": {"Amount": 5 + v * 5, "Size": 20 + v * 3, "Frequency": 40 + v * 10},
            "Vignette": {"Amount": -5 - v * 3, "Midpoint": 65 + v * 5, "Feather": 80 + v * 5},
            "Sharpening": {"Amount": 30 + v * 5, "Radius": 0.8 + v * 0.1, "Detail": 20 + v * 5, "Masking": 20 + v * 10},
            "ColorGrade": {
                "ShadowLum": 20 + v * 5, "ShadowHue": 210 + v * 5, "ShadowSat": 8 + v * 2,
                "MidtoneLum": 15 + v * 3, "MidtoneHue": 55 + v * 5, "MidtoneSat": 5 + v,
                "HighlightLum": 20 + v * 5, "HighlightHue": 60 + v * 5, "HighlightSat": 8 + v * 2,
                "Balance": 0.25 + v * 0.05,
            },
        }
    elif category == "cyberpunk_cinema":
        return {
            "Exposure": round(-0.1 + v * 0.05, 2),
            "Contrast": 35 + v * 5,
            "Highlights": -25 - v * 5,
            "Shadows": -20 - v * 5,
            "Whites": 5 + v * 3,
            "Blacks": -35 - v * 5,
            "Texture": 20 + v * 5,
            "Clarity": 40 + v * 5,
            "Dehaze": 25 + v * 5,
            "Vibrance": 35 + v * 5,
            "Saturation": 15 + v * 5,
            "ToneCurve": f"0, 0, 32, {10 + v}, 64, {38 + v*2}, 128, 128, 192, {208 - v*3}, 255, 255",
            "HSL": {
                "RedHue": 40 + v * 5, "RedSat": 20 + v * 5, "RedLum": -10 - v * 2,
                "OrangeHue": -30 - v * 5, "OrangeSat": 10 + v * 3, "OrangeLum": -15 - v * 3,
                "YellowHue": -40 - v * 5, "YellowSat": 0, "YellowLum": -20 - v * 5,
                "GreenHue": 60 + v * 5, "GreenSat": 10 + v * 3, "GreenLum": -15 - v * 3,
                "AquaHue": 25 + v * 5, "AquaSat": 55 + v * 5, "AquaLum": 10 + v * 3,
                "BlueHue": -25 - v * 5, "BlueSat": 30 + v * 5, "BlueLum": -5 - v,
                "PurpleHue": 35 + v * 5, "PurpleSat": 50 + v * 5, "PurpleLum": 10 + v * 3,
                "MagentaHue": 30 + v * 5, "MagentaSat": 55 + v * 5, "MagentaLum": 15 + v * 5,
            },
            "SplitToning": {"ShadowHue": 180 + v * 5, "ShadowSat": 40 + v * 5,
                           "HighlightHue": 300 + v * 5, "HighlightSat": 45 + v * 5, "Balance": 50 + v * 5},
            "Grain": {"Amount": 20 + v * 15, "Size": 30 + v * 5, "Frequency": 55 + v * 10},
            "Vignette": {"Amount": -35 - v * 5, "Midpoint": 35 + v * 5, "Feather": 50 + v * 5},
            "Sharpening": {"Amount": 70 + v * 10, "Radius": 1.3 + v * 0.1, "Detail": 40 + v * 5, "Masking": 60 + v * 10},
            "ColorGrade": {
                "ShadowLum": -30 - v * 3, "ShadowHue": 180 + v * 5, "ShadowSat": 35 + v * 5,
                "MidtoneLum": -15 - v, "MidtoneHue": 290 + v * 5, "MidtoneSat": 25 + v * 5,
                "HighlightLum": 0, "HighlightHue": 300 + v * 5, "HighlightSat": 40 + v * 5,
                "Balance": 0.55 + v * 0.03,
            },
        }
    elif category == "neo_noir":
        return {
            "Exposure": round(-0.2 + v * 0.1, 2),
            "Contrast": 40 + v * 5,
            "Highlights": -15 - v * 5,
            "Shadows": -30 - v * 5,
            "Whites": 0,
            "Blacks": -40 - v * 5,
            "Texture": 25 + v * 5,
            "Clarity": 45 + v * 5,
            "Dehaze": 25 + v * 5,
            "Vibrance": -30 - v * 5,
            "Saturation": -25 - v * 5,
            "ToneCurve": f"0, 0, 32, {8 + v}, 64, {35 + v*2}, 128, 128, 192, {210 - v*3}, 255, 255",
            "HSL": {
                "RedHue": -10 - v, "RedSat": -20 - v * 5, "RedLum": -15 - v * 3,
                "OrangeHue": -5 - v, "OrangeSat": -15 - v * 5, "OrangeLum": -10 - v * 2,
                "YellowHue": -20 - v * 5, "YellowSat": -25 - v * 5, "YellowLum": -20 - v * 5,
                "GreenHue": 15 + v * 3, "GreenSat": -30 - v * 5, "GreenLum": -25 - v * 5,
                "AquaHue": 10 + v, "AquaSat": -25 - v * 5, "AquaLum": -20 - v * 5,
                "BlueHue": -15 - v * 3, "BlueSat": -15 - v * 5, "BlueLum": -20 - v * 5,
                "PurpleHue": 10 + v, "PurpleSat": -25 - v * 5, "PurpleLum": -15 - v * 3,
                "MagentaHue": 15 + v, "MagentaSat": -25 - v * 5, "MagentaLum": -10 - v * 2,
            },
            "SplitToning": {"ShadowHue": 220 + v * 5, "ShadowSat": 15 + v * 3,
                           "HighlightHue": 45 + v * 3, "HighlightSat": 10 + v * 2, "Balance": 75 + v * 5},
            "Grain": {"Amount": 40 + v * 20, "Size": 45 + v * 5, "Frequency": 65 + v * 10},
            "Vignette": {"Amount": -40 - v * 5, "Midpoint": 30 + v * 5, "Feather": 45 + v * 5},
            "Sharpening": {"Amount": 70 + v * 10, "Radius": 1.4 + v * 0.1, "Detail": 45 + v * 5, "Masking": 65 + v * 10},
            "ColorGrade": {
                "ShadowLum": -35 - v * 3, "ShadowHue": 220 + v * 5, "ShadowSat": 15 + v * 3,
                "MidtoneLum": -15 - v, "MidtoneHue": 45 + v * 3, "MidtoneSat": 5 + v,
                "HighlightLum": -5 - v, "HighlightHue": 50 + v * 3, "HighlightSat": 8 + v * 2,
                "Balance": 0.8 + v * 0.02,
            },
        }
    elif category == "vintage_film_lab":
        return {
            "Exposure": round(0.1 + v * 0.1, 2),
            "Contrast": -10 - v * 3,
            "Highlights": -30 - v * 5,
            "Shadows": 15 + v * 5,
            "Whites": -20 - v * 5,
            "Blacks": 15 + v * 5,
            "Texture": -10 - v * 3,
            "Clarity": -20 - v * 5,
            "Dehaze": -10 - v * 3,
            "Vibrance": -20 - v * 5,
            "Saturation": -20 - v * 5,
            "ToneCurve": f"0, {10 + v*2}, 32, {32 + v*3}, 64, {68 + v*3}, 128, 130, 192, {188 - v*3}, 255, {240 - v*5}",
            "HSL": {
                "RedHue": 15 + v * 3, "RedSat": -15 - v * 5, "RedLum": 5 + v,
                "OrangeHue": 10 + v * 2, "OrangeSat": -15 - v * 5, "OrangeLum": 10 + v * 3,
                "YellowHue": -20 - v * 5, "YellowSat": -20 - v * 5, "YellowLum": 15 + v * 5,
                "GreenHue": 35 + v * 5, "GreenSat": -25 - v * 5, "GreenLum": -5 - v,
                "AquaHue": 25 + v * 5, "AquaSat": -20 - v * 5, "AquaLum": -5 - v,
                "BlueHue": -20 - v * 5, "BlueSat": -20 - v * 5, "BlueLum": -15 - v * 3,
                "PurpleHue": 25 + v * 5, "PurpleSat": -20 - v * 5, "PurpleLum": -5 - v,
                "MagentaHue": 30 + v * 5, "MagentaSat": -15 - v * 5, "MagentaLum": 5 + v,
            },
            "SplitToning": {"ShadowHue": 55 + v * 5, "ShadowSat": 18 + v * 3,
                           "HighlightHue": 45 + v * 5, "HighlightSat": 15 + v * 3, "Balance": 40 + v * 5},
            "Grain": {"Amount": 50 + v * 25, "Size": 50 + v * 10, "Frequency": 70 + v * 10},
            "Vignette": {"Amount": -25 - v * 5, "Midpoint": 40 + v * 5, "Feather": 65 + v * 5},
            "Sharpening": {"Amount": 25 + v * 5, "Radius": 1.2 + v * 0.15, "Detail": 15 + v * 5, "Masking": 25 + v * 10},
            "ColorGrade": {
                "ShadowLum": 10 + v * 3, "ShadowHue": 55 + v * 5, "ShadowSat": 15 + v * 3,
                "MidtoneLum": 8 + v * 2, "MidtoneHue": 45 + v * 5, "MidtoneSat": 10 + v * 2,
                "HighlightLum": 5 + v, "HighlightHue": 40 + v * 5, "HighlightSat": 12 + v * 3,
                "Balance": 0.35 + v * 0.05,
            },
        }
    elif category == "high_dynamic_luxury":
        return {
            "Exposure": round(0.05 + v * 0.05, 2),
            "Contrast": 5 + v * 3,
            "Highlights": -50 - v * 5,
            "Shadows": 50 + v * 5,
            "Whites": -20 - v * 3,
            "Blacks": 15 + v * 5,
            "Texture": 35 + v * 5,
            "Clarity": 25 + v * 5,
            "Dehaze": 15 + v * 5,
            "Vibrance": 15 + v * 5,
            "Saturation": 0,
            "ToneCurve": f"0, {5 + v}, 32, {35 + v*3}, 64, {72 + v*2}, 128, 128, 192, {185 - v*2}, 255, {230 - v*3}",
            "HSL": {
                "RedHue": 5 + v, "RedSat": 10 + v * 3, "RedLum": 5 + v,
                "OrangeHue": 8 + v, "OrangeSat": 10 + v * 3, "OrangeLum": 8 + v * 2,
                "YellowHue": -10 - v, "YellowSat": 5 + v * 2, "YellowLum": 10 + v * 3,
                "GreenHue": 15 + v * 2, "GreenSat": 0, "GreenLum": 5 + v,
                "AquaHue": 10 + v, "AquaSat": 5 + v * 2, "AquaLum": 5 + v,
                "BlueHue": -5 - v, "BlueSat": 10 + v * 3, "BlueLum": 0,
                "PurpleHue": 10 + v, "PurpleSat": 5 + v * 2, "PurpleLum": 5 + v,
                "MagentaHue": 15 + v, "MagentaSat": 5 + v * 2, "MagentaLum": 5 + v,
            },
            "SplitToning": {"ShadowHue": 35 + v * 5, "ShadowSat": 10 + v * 3,
                           "HighlightHue": 45 + v * 3, "HighlightSat": 12 + v * 3, "Balance": 50 + v * 5},
            "Grain": {"Amount": 10 + v * 8, "Size": 25 + v * 3, "Frequency": 45 + v * 10},
            "Vignette": {"Amount": -5 - v * 3, "Midpoint": 60 + v * 5, "Feather": 75 + v * 5},
            "Sharpening": {"Amount": 60 + v * 10, "Radius": 1.0 + v * 0.1, "Detail": 35 + v * 5, "Masking": 50 + v * 10},
            "ColorGrade": {
                "ShadowLum": 15 + v * 5, "ShadowHue": 35 + v * 5, "ShadowSat": 10 + v * 3,
                "MidtoneLum": 8 + v * 2, "MidtoneHue": 45 + v * 3, "MidtoneSat": 8 + v * 2,
                "HighlightLum": 5 + v, "HighlightHue": 50 + v * 3, "HighlightSat": 10 + v * 3,
                "Balance": 0.5 + v * 0.05,
            },
        }
    elif category == "dark_instagram_mood":
        return {
            "Exposure": round(-0.2 + v * 0.1, 2),
            "Contrast": 15 + v * 5,
            "Highlights": -30 - v * 5,
            "Shadows": -20 - v * 5,
            "Whites": -15 - v * 3,
            "Blacks": -25 - v * 5,
            "Texture": 15 + v * 5,
            "Clarity": 20 + v * 5,
            "Dehaze": 15 + v * 5,
            "Vibrance": -25 - v * 5,
            "Saturation": -20 - v * 5,
            "ToneCurve": f"0, 0, 32, {15 + v*2}, 64, {48 + v*3}, 128, 128, 192, {200 - v*3}, 255, 255",
            "HSL": {
                "RedHue": -5 - v, "RedSat": -20 - v * 5, "RedLum": -15 - v * 3,
                "OrangeHue": -5 - v, "OrangeSat": -15 - v * 5, "OrangeLum": -10 - v * 2,
                "YellowHue": -15 - v * 3, "YellowSat": -25 - v * 5, "YellowLum": -15 - v * 3,
                "GreenHue": 20 + v * 3, "GreenSat": -20 - v * 5, "GreenLum": -15 - v * 3,
                "AquaHue": 15 + v * 2, "AquaSat": -15 - v * 5, "AquaLum": -10 - v * 2,
                "BlueHue": -15 - v * 3, "BlueSat": -10 - v * 3, "BlueLum": -15 - v * 3,
                "PurpleHue": 10 + v, "PurpleSat": -20 - v * 5, "PurpleLum": -10 - v * 2,
                "MagentaHue": 15 + v, "MagentaSat": -20 - v * 5, "MagentaLum": -10 - v * 2,
            },
            "SplitToning": {"ShadowHue": 220 + v * 5, "ShadowSat": 12 + v * 3,
                           "HighlightHue": 200 + v * 5, "HighlightSat": 8 + v * 2, "Balance": 70 + v * 5},
            "Grain": {"Amount": 20 + v * 15, "Size": 35 + v * 5, "Frequency": 55 + v * 10},
            "Vignette": {"Amount": -25 - v * 5, "Midpoint": 40 + v * 5, "Feather": 55 + v * 5},
            "Sharpening": {"Amount": 60 + v * 10, "Radius": 1.2 + v * 0.1, "Detail": 30 + v * 5, "Masking": 50 + v * 10},
            "ColorGrade": {
                "ShadowLum": -25 - v * 3, "ShadowHue": 220 + v * 5, "ShadowSat": 12 + v * 3,
                "MidtoneLum": -15 - v, "MidtoneHue": 210 + v * 5, "MidtoneSat": 5 + v,
                "HighlightLum": -10 - v, "HighlightHue": 200 + v * 5, "HighlightSat": 6 + v,
                "Balance": 0.7 + v * 0.03,
            },
        }
    elif category == "clean_creator_economy":
        return {
            "Exposure": round(0.3 + v * 0.1, 2),
            "Contrast": -10 - v * 3,
            "Highlights": -20 - v * 5,
            "Shadows": 30 + v * 5,
            "Whites": 10 + v * 5,
            "Blacks": 15 + v * 5,
            "Texture": 15 + v * 5,
            "Clarity": 10 + v * 5,
            "Dehaze": -5 - v * 3,
            "Vibrance": 15 + v * 5,
            "Saturation": 0,
            "ToneCurve": f"0, {10 + v*2}, 32, {35 + v*3}, 64, {70 + v*2}, 128, 128, 192, {198 - v*2}, 255, {250 - v*3}",
            "HSL": {
                "RedHue": 5 + v, "RedSat": 5 + v * 2, "RedLum": 10 + v * 3,
                "OrangeHue": 5 + v, "OrangeSat": 5 + v * 2, "OrangeLum": 12 + v * 3,
                "YellowHue": -8 - v, "YellowSat": 0, "YellowLum": 10 + v * 3,
                "GreenHue": 10 + v * 2, "GreenSat": -5 - v, "GreenLum": 8 + v * 2,
                "AquaHue": 8 + v, "AquaSat": -5 - v, "AquaLum": 8 + v * 2,
                "BlueHue": -8 - v, "BlueSat": 5 + v * 2, "BlueLum": 8 + v * 2,
                "PurpleHue": 10 + v, "PurpleSat": 0, "PurpleLum": 8 + v * 2,
                "MagentaHue": 12 + v, "MagentaSat": 0, "MagentaLum": 10 + v * 3,
            },
            "SplitToning": {"ShadowHue": 45 + v * 3, "ShadowSat": 8 + v * 2,
                           "HighlightHue": 50 + v * 3, "HighlightSat": 10 + v * 2, "Balance": 45 + v * 5},
            "Grain": {"Amount": 0, "Size": 25, "Frequency": 50},
            "Vignette": {"Amount": -5 - v * 3, "Midpoint": 65 + v * 5, "Feather": 80 + v * 5},
            "Sharpening": {"Amount": 45 + v * 10, "Radius": 0.9 + v * 0.1, "Detail": 25 + v * 5, "Masking": 35 + v * 10},
            "ColorGrade": {
                "ShadowLum": 15 + v * 5, "ShadowHue": 45 + v * 3, "ShadowSat": 6 + v * 2,
                "MidtoneLum": 10 + v * 3, "MidtoneHue": 50 + v * 3, "MidtoneSat": 5 + v,
                "HighlightLum": 12 + v * 3, "HighlightHue": 55 + v * 3, "HighlightSat": 8 + v * 2,
                "Balance": 0.4 + v * 0.05,
            },
        }
    elif category == "music_video_looks":
        return {
            "Exposure": round(0.0 + v * 0.05, 2),
            "Contrast": 25 + v * 5,
            "Highlights": -25 - v * 5,
            "Shadows": -15 - v * 5,
            "Whites": 10 + v * 3,
            "Blacks": -15 - v * 5,
            "Texture": 25 + v * 5,
            "Clarity": 35 + v * 5,
            "Dehaze": 15 + v * 5,
            "Vibrance": 30 + v * 5,
            "Saturation": 10 + v * 5,
            "ToneCurve": f"0, 0, 32, {18 + v*2}, 64, {50 + v*3}, 128, 128, 192, {200 - v*3}, 255, 255",
            "HSL": {
                "RedHue": 15 + v * 3, "RedSat": 25 + v * 5, "RedLum": -5 - v,
                "OrangeHue": -10 - v * 2, "OrangeSat": 20 + v * 5, "OrangeLum": 5 + v,
                "YellowHue": -20 - v * 5, "YellowSat": 15 + v * 3, "YellowLum": -10 - v * 2,
                "GreenHue": 30 + v * 5, "GreenSat": 10 + v * 3, "GreenLum": -10 - v * 2,
                "AquaHue": 15 + v * 3, "AquaSat": 30 + v * 5, "AquaLum": 5 + v,
                "BlueHue": -20 - v * 5, "BlueSat": 25 + v * 5, "BlueLum": -5 - v,
                "PurpleHue": 25 + v * 5, "PurpleSat": 35 + v * 5, "PurpleLum": 10 + v * 3,
                "MagentaHue": 30 + v * 5, "MagentaSat": 40 + v * 5, "MagentaLum": 10 + v * 3,
            },
            "SplitToning": {"ShadowHue": 260 + v * 5, "ShadowSat": 30 + v * 5,
                           "HighlightHue": 50 + v * 3, "HighlightSat": 25 + v * 3, "Balance": 55 + v * 5},
            "Grain": {"Amount": 15 + v * 12, "Size": 30 + v * 5, "Frequency": 55 + v * 10},
            "Vignette": {"Amount": -20 - v * 5, "Midpoint": 45 + v * 5, "Feather": 60 + v * 5},
            "Sharpening": {"Amount": 65 + v * 10, "Radius": 1.2 + v * 0.1, "Detail": 35 + v * 5, "Masking": 55 + v * 10},
            "ColorGrade": {
                "ShadowLum": -20 - v * 3, "ShadowHue": 260 + v * 5, "ShadowSat": 25 + v * 5,
                "MidtoneLum": -5 - v, "MidtoneHue": 330 + v * 5, "MidtoneSat": 15 + v * 3,
                "HighlightLum": 8 + v * 2, "HighlightHue": 50 + v * 3, "HighlightSat": 22 + v * 3,
                "Balance": 0.6 + v * 0.03,
            },
        }
    elif category == "commercial_luxury":
        return {
            "Exposure": round(0.1 + v * 0.05, 2),
            "Contrast": 15 + v * 5,
            "Highlights": -20 - v * 5,
            "Shadows": 20 + v * 5,
            "Whites": 5 + v * 3,
            "Blacks": -5 - v * 3,
            "Texture": 25 + v * 5,
            "Clarity": 25 + v * 5,
            "Dehaze": 10 + v * 5,
            "Vibrance": 15 + v * 5,
            "Saturation": 0,
            "ToneCurve": f"0, 0, 32, {22 + v*2}, 64, {56 + v*3}, 128, 128, 192, {198 - v*2}, 255, 255",
            "HSL": {
                "RedHue": 5 + v, "RedSat": 10 + v * 3, "RedLum": 5 + v,
                "OrangeHue": 5 + v, "OrangeSat": 8 + v * 2, "OrangeLum": 8 + v * 2,
                "YellowHue": -8 - v, "YellowSat": 5 + v * 2, "YellowLum": 8 + v * 2,
                "GreenHue": 12 + v * 2, "GreenSat": 0, "GreenLum": 5 + v,
                "AquaHue": 8 + v, "AquaSat": 0, "AquaLum": 5 + v,
                "BlueHue": -5 - v, "BlueSat": 8 + v * 2, "BlueLum": 5 + v,
                "PurpleHue": 10 + v, "PurpleSat": 5 + v * 2, "PurpleLum": 5 + v,
                "MagentaHue": 12 + v, "MagentaSat": 5 + v * 2, "MagentaLum": 5 + v,
            },
            "SplitToning": {"ShadowHue": 40 + v * 5, "ShadowSat": 8 + v * 2,
                           "HighlightHue": 45 + v * 3, "HighlightSat": 10 + v * 2, "Balance": 50 + v * 5},
            "Grain": {"Amount": 5 + v * 3, "Size": 20 + v * 3, "Frequency": 45 + v * 10},
            "Vignette": {"Amount": -8 - v * 3, "Midpoint": 60 + v * 5, "Feather": 75 + v * 5},
            "Sharpening": {"Amount": 70 + v * 10, "Radius": 1.0 + v * 0.1, "Detail": 40 + v * 5, "Masking": 60 + v * 10},
            "ColorGrade": {
                "ShadowLum": -5 - v, "ShadowHue": 40 + v * 5, "ShadowSat": 6 + v * 2,
                "MidtoneLum": 5 + v, "MidtoneHue": 45 + v * 3, "MidtoneSat": 5 + v,
                "HighlightLum": 8 + v * 2, "HighlightHue": 48 + v * 3, "HighlightSat": 8 + v * 2,
                "Balance": 0.5 + v * 0.05,
            },
        }
    elif category == "netflix_inspired":
        return {
            "Exposure": round(0.0 + v * 0.05, 2),
            "Contrast": 20 + v * 5,
            "Highlights": -30 - v * 5,
            "Shadows": -10 - v * 3,
            "Whites": 5 + v * 3,
            "Blacks": -15 - v * 5,
            "Texture": 20 + v * 5,
            "Clarity": 15 + v * 5,
            "Dehaze": 15 + v * 5,
            "Vibrance": -5 - v * 3,
            "Saturation": -5 - v * 2,
            "ToneCurve": f"0, 0, 32, {18 + v*2}, 64, {50 + v*3}, 128, 128, 192, {200 - v*3}, 255, 255",
            "HSL": {
                "RedHue": 5 + v, "RedSat": 5 + v, "RedLum": -5 - v,
                "OrangeHue": -8 - v, "OrangeSat": 10 + v * 3, "OrangeLum": 5 + v,
                "YellowHue": -15 - v * 3, "YellowSat": -10 - v * 3, "YellowLum": -10 - v * 2,
                "GreenHue": 40 + v * 5, "GreenSat": -20 - v * 5, "GreenLum": -15 - v * 3,
                "AquaHue": 30 + v * 5, "AquaSat": 15 + v * 3, "AquaLum": -10 - v * 2,
                "BlueHue": -20 - v * 5, "BlueSat": 10 + v * 3, "BlueLum": -15 - v * 3,
                "PurpleHue": -10 - v, "PurpleSat": -10 - v * 3, "PurpleLum": -10 - v * 2,
                "MagentaHue": -10 - v, "MagentaSat": -10 - v * 3, "MagentaLum": -5 - v,
            },
            "SplitToning": {"ShadowHue": 195 + v * 5, "ShadowSat": 25 + v * 5,
                           "HighlightHue": 30 + v * 5, "HighlightSat": 25 + v * 3, "Balance": 65 + v * 5},
            "Grain": {"Amount": 15 + v * 10, "Size": 25 + v * 3, "Frequency": 50 + v * 10},
            "Vignette": {"Amount": -20 - v * 5, "Midpoint": 45 + v * 5, "Feather": 65 + v * 5},
            "Sharpening": {"Amount": 60 + v * 10, "Radius": 1.1 + v * 0.1, "Detail": 30 + v * 5, "Masking": 50 + v * 10},
            "ColorGrade": {
                "ShadowLum": -20 - v * 3, "ShadowHue": 195 + v * 5, "ShadowSat": 22 + v * 3,
                "MidtoneLum": -5 - v, "MidtoneHue": 45 + v * 3, "MidtoneSat": 5 + v,
                "HighlightLum": 5 + v, "HighlightHue": 30 + v * 5, "HighlightSat": 18 + v * 3,
                "Balance": 0.65 + v * 0.03,
            },
        }
    elif category == "a24_inspired":
        return {
            "Exposure": round(-0.1 + v * 0.1, 2),
            "Contrast": 15 + v * 5,
            "Highlights": -35 - v * 5,
            "Shadows": 5 + v * 3,
            "Whites": -15 - v * 3,
            "Blacks": 5 + v * 5,
            "Texture": 15 + v * 5,
            "Clarity": 10 + v * 5,
            "Dehaze": 15 + v * 5,
            "Vibrance": -20 - v * 5,
            "Saturation": -15 - v * 5,
            "ToneCurve": f"0, {3 + v}, 32, {25 + v*3}, 64, {60 + v*2}, 128, 128, 192, {190 - v*3}, 255, {245 - v*5}",
            "HSL": {
                "RedHue": 8 + v, "RedSat": -10 - v * 3, "RedLum": -5 - v,
                "OrangeHue": 5 + v, "OrangeSat": -8 - v * 2, "OrangeLum": 8 + v * 2,
                "YellowHue": -20 - v * 5, "YellowSat": -20 - v * 5, "YellowLum": -5 - v,
                "GreenHue": 25 + v * 5, "GreenSat": -25 - v * 5, "GreenLum": -15 - v * 3,
                "AquaHue": 20 + v * 3, "AquaSat": -15 - v * 5, "AquaLum": -10 - v * 2,
                "BlueHue": -15 - v * 3, "BlueSat": -10 - v * 3, "BlueLum": -15 - v * 3,
                "PurpleHue": 15 + v * 2, "PurpleSat": -15 - v * 5, "PurpleLum": -5 - v,
                "MagentaHue": 20 + v * 3, "MagentaSat": -15 - v * 5, "MagentaLum": 0,
            },
            "SplitToning": {"ShadowHue": 220 + v * 5, "ShadowSat": 12 + v * 3,
                           "HighlightHue": 55 + v * 5, "HighlightSat": 12 + v * 3, "Balance": 40 + v * 5},
            "Grain": {"Amount": 30 + v * 20, "Size": 40 + v * 5, "Frequency": 60 + v * 10},
            "Vignette": {"Amount": -20 - v * 5, "Midpoint": 40 + v * 5, "Feather": 60 + v * 5},
            "Sharpening": {"Amount": 45 + v * 10, "Radius": 1.2 + v * 0.1, "Detail": 25 + v * 5, "Masking": 40 + v * 10},
            "ColorGrade": {
                "ShadowLum": -10 - v, "ShadowHue": 220 + v * 5, "ShadowSat": 10 + v * 3,
                "MidtoneLum": 0, "MidtoneHue": 55 + v * 5, "MidtoneSat": 5 + v,
                "HighlightLum": -5 - v, "HighlightHue": 60 + v * 5, "HighlightSat": 10 + v * 3,
                "Balance": 0.4 + v * 0.05,
            },
        }
    elif category == "kodak_portra_emulation":
        return {
            "Exposure": round(0.2 + v * 0.1, 2),
            "Contrast": -10 - v * 3,
            "Highlights": -30 - v * 5,
            "Shadows": 15 + v * 5,
            "Whites": -15 - v * 5,
            "Blacks": 5 + v * 5,
            "Texture": -5 - v * 2,
            "Clarity": -8 - v * 3,
            "Dehaze": -8 - v * 3,
            "Vibrance": 5 + v * 3,
            "Saturation": -15 - v * 5,
            "ToneCurve": f"0, {5 + v}, 32, {28 + v*3}, 64, {65 + v*2}, 128, 128, 192, {192 - v*2}, 255, {248 - v*3}",
            "HSL": {
                "RedHue": 10 + v, "RedSat": -5 - v, "RedLum": 10 + v * 3,
                "OrangeHue": 8 + v, "OrangeSat": -5 - v, "OrangeLum": 15 + v * 5,
                "YellowHue": -12 - v * 2, "YellowSat": -15 - v * 3, "YellowLum": 12 + v * 3,
                "GreenHue": 25 + v * 5, "GreenSat": -20 - v * 5, "GreenLum": -10 - v * 2,
                "AquaHue": 15 + v * 2, "AquaSat": -15 - v * 3, "AquaLum": -5 - v,
                "BlueHue": -15 - v * 3, "BlueSat": -15 - v * 3, "BlueLum": -12 - v * 2,
                "PurpleHue": 15 + v * 2, "PurpleSat": -15 - v * 5, "PurpleLum": -5 - v,
                "MagentaHue": 20 + v * 3, "MagentaSat": -15 - v * 5, "MagentaLum": 0,
            },
            "SplitToning": {"ShadowHue": 35 + v * 5, "ShadowSat": 15 + v * 3,
                           "HighlightHue": 50 + v * 5, "HighlightSat": 12 + v * 3, "Balance": 45 + v * 5},
            "Grain": {"Amount": 40 + v * 20, "Size": 40 + v * 5, "Frequency": 65 + v * 10},
            "Vignette": {"Amount": -15 - v * 5, "Midpoint": 50 + v * 5, "Feather": 70 + v * 5},
            "Sharpening": {"Amount": 35 + v * 5, "Radius": 1.0 + v * 0.15, "Detail": 20 + v * 5, "Masking": 30 + v * 10},
            "ColorGrade": {
                "ShadowLum": 5 + v, "ShadowHue": 35 + v * 5, "ShadowSat": 12 + v * 3,
                "MidtoneLum": 5 + v, "MidtoneHue": 45 + v * 5, "MidtoneSat": 8 + v * 2,
                "HighlightLum": 8 + v * 2, "HighlightHue": 50 + v * 5, "HighlightSat": 10 + v * 2,
                "Balance": 0.4 + v * 0.05,
            },
        }
    elif category == "fuji_400h_emulation":
        return {
            "Exposure": round(0.25 + v * 0.1, 2),
            "Contrast": -15 - v * 5,
            "Highlights": -20 - v * 5,
            "Shadows": 25 + v * 5,
            "Whites": -10 - v * 3,
            "Blacks": 15 + v * 5,
            "Texture": -10 - v * 3,
            "Clarity": -15 - v * 5,
            "Dehaze": -10 - v * 3,
            "Vibrance": -10 - v * 3,
            "Saturation": -15 - v * 5,
            "ToneCurve": f"0, {12 + v*3}, 32, {38 + v*3}, 64, {72 + v*2}, 128, 130, 192, {195 - v*2}, 255, {245 - v*5}",
            "HSL": {
                "RedHue": 8 + v, "RedSat": -15 - v * 5, "RedLum": 15 + v * 5,
                "OrangeHue": 5 + v, "OrangeSat": -15 - v * 5, "OrangeLum": 18 + v * 5,
                "YellowHue": -10 - v * 2, "YellowSat": -20 - v * 5, "YellowLum": 15 + v * 5,
                "GreenHue": 30 + v * 5, "GreenSat": -15 - v * 5, "GreenLum": 0,
                "AquaHue": 20 + v * 3, "AquaSat": -15 - v * 5, "AquaLum": 5 + v,
                "BlueHue": -10 - v, "BlueSat": -15 - v * 5, "BlueLum": 8 + v * 2,
                "PurpleHue": 15 + v * 2, "PurpleSat": -15 - v * 5, "PurpleLum": 10 + v * 3,
                "MagentaHue": 20 + v * 3, "MagentaSat": -15 - v * 5, "MagentaLum": 12 + v * 3,
            },
            "SplitToning": {"ShadowHue": 80 + v * 5, "ShadowSat": 10 + v * 2,
                           "HighlightHue": 55 + v * 5, "HighlightSat": 8 + v * 2, "Balance": 35 + v * 5},
            "Grain": {"Amount": 35 + v * 15, "Size": 35 + v * 5, "Frequency": 60 + v * 10},
            "Vignette": {"Amount": -10 - v * 3, "Midpoint": 55 + v * 5, "Feather": 75 + v * 5},
            "Sharpening": {"Amount": 30 + v * 5, "Radius": 0.9 + v * 0.1, "Detail": 20 + v * 5, "Masking": 25 + v * 10},
            "ColorGrade": {
                "ShadowLum": 12 + v * 3, "ShadowHue": 80 + v * 5, "ShadowSat": 8 + v * 2,
                "MidtoneLum": 8 + v * 2, "MidtoneHue": 55 + v * 5, "MidtoneSat": 5 + v,
                "HighlightLum": 10 + v * 3, "HighlightHue": 60 + v * 5, "HighlightSat": 6 + v * 2,
                "Balance": 0.3 + v * 0.05,
            },
        }
    elif category == "arri_alexa_look":
        return {
            "Exposure": round(0.1 + v * 0.05, 2),
            "Contrast": 10 + v * 5,
            "Highlights": -35 - v * 5,
            "Shadows": 20 + v * 5,
            "Whites": -10 + v * 3,
            "Blacks": -5 - v * 3,
            "Texture": 20 + v * 5,
            "Clarity": 15 + v * 5,
            "Dehaze": 10 + v * 5,
            "Vibrance": 5 + v * 3,
            "Saturation": -5 - v * 3,
            "ToneCurve": f"0, 0, 32, {25 + v*3}, 64, {58 + v*2}, 128, 128, 192, {195 - v*2}, 255, 255",
            "HSL": {
                "RedHue": 5 + v, "RedSat": 5 + v, "RedLum": 5 + v,
                "OrangeHue": 5 + v, "OrangeSat": 5 + v, "OrangeLum": 10 + v * 3,
                "YellowHue": -10 - v * 2, "YellowSat": -5 - v, "YellowLum": 8 + v * 2,
                "GreenHue": 15 + v * 2, "GreenSat": -10 - v * 3, "GreenLum": 0,
                "AquaHue": 10 + v, "AquaSat": -5 - v, "AquaLum": 5 + v,
                "BlueHue": -10 - v, "BlueSat": -5 - v, "BlueLum": -5 - v,
                "PurpleHue": 10 + v, "PurpleSat": -10 - v * 3, "PurpleLum": 0,
                "MagentaHue": 12 + v, "MagentaSat": -10 - v * 3, "MagentaLum": 5 + v,
            },
            "SplitToning": {"ShadowHue": 220 + v * 5, "ShadowSat": 8 + v * 2,
                           "HighlightHue": 45 + v * 3, "HighlightSat": 10 + v * 2, "Balance": 55 + v * 5},
            "Grain": {"Amount": 10 + v * 8, "Size": 25 + v * 3, "Frequency": 50 + v * 10},
            "Vignette": {"Amount": -10 - v * 3, "Midpoint": 55 + v * 5, "Feather": 70 + v * 5},
            "Sharpening": {"Amount": 50 + v * 10, "Radius": 1.0 + v * 0.1, "Detail": 30 + v * 5, "Masking": 45 + v * 10},
            "ColorGrade": {
                "ShadowLum": -5 - v, "ShadowHue": 220 + v * 5, "ShadowSat": 8 + v * 2,
                "MidtoneLum": 5 + v, "MidtoneHue": 45 + v * 3, "MidtoneSat": 5 + v,
                "HighlightLum": 5 + v, "HighlightHue": 48 + v * 3, "HighlightSat": 8 + v * 2,
                "Balance": 0.55 + v * 0.03,
            },
        }
    elif category == "cinestill_800t_emulation":
        return {
            "Exposure": round(0.0 + v * 0.1, 2),
            "Contrast": 15 + v * 5,
            "Highlights": -30 - v * 5,
            "Shadows": -10 - v * 3,
            "Whites": -10 - v * 3,
            "Blacks": -15 - v * 5,
            "Texture": 15 + v * 5,
            "Clarity": 20 + v * 5,
            "Dehaze": 15 + v * 5,
            "Vibrance": 10 + v * 5,
            "Saturation": -5 - v * 3,
            "ToneCurve": f"0, 0, 32, {20 + v*2}, 64, {52 + v*3}, 128, 128, 192, {198 - v*2}, 255, 255",
            "HSL": {
                "RedHue": 20 + v * 3, "RedSat": 10 + v * 3, "RedLum": -5 - v,
                "OrangeHue": 15 + v * 3, "OrangeSat": 5 + v * 2, "OrangeLum": 5 + v,
                "YellowHue": -20 - v * 5, "YellowSat": -10 - v * 3, "YellowLum": -10 - v * 2,
                "GreenHue": 35 + v * 5, "GreenSat": -20 - v * 5, "GreenLum": -20 - v * 5,
                "AquaHue": 25 + v * 5, "AquaSat": -10 - v * 3, "AquaLum": -15 - v * 3,
                "BlueHue": -25 - v * 5, "BlueSat": 15 + v * 5, "BlueLum": -15 - v * 3,
                "PurpleHue": 20 + v * 3, "PurpleSat": 15 + v * 3, "PurpleLum": -5 - v,
                "MagentaHue": 25 + v * 5, "MagentaSat": 20 + v * 5, "MagentaLum": 0,
            },
            "SplitToning": {"ShadowHue": 200 + v * 5, "ShadowSat": 20 + v * 3,
                           "HighlightHue": 35 + v * 5, "HighlightSat": 25 + v * 3, "Balance": 60 + v * 5},
            "Grain": {"Amount": 40 + v * 20, "Size": 40 + v * 5, "Frequency": 65 + v * 10},
            "Vignette": {"Amount": -20 - v * 5, "Midpoint": 45 + v * 5, "Feather": 60 + v * 5},
            "Sharpening": {"Amount": 55 + v * 10, "Radius": 1.1 + v * 0.1, "Detail": 30 + v * 5, "Masking": 50 + v * 10},
            "ColorGrade": {
                "ShadowLum": -15 - v * 3, "ShadowHue": 200 + v * 5, "ShadowSat": 18 + v * 3,
                "MidtoneLum": -5 - v, "MidtoneHue": 25 + v * 5, "MidtoneSat": 8 + v * 2,
                "HighlightLum": 0, "HighlightHue": 35 + v * 5, "HighlightSat": 20 + v * 3,
                "Balance": 0.6 + v * 0.03,
            },
        }
    elif category == "bleach_bypass":
        return {
            "Exposure": round(-0.1 + v * 0.05, 2),
            "Contrast": 35 + v * 5,
            "Highlights": -15 - v * 5,
            "Shadows": -20 - v * 5,
            "Whites": 5 + v * 3,
            "Blacks": -25 - v * 5,
            "Texture": 30 + v * 5,
            "Clarity": 35 + v * 5,
            "Dehaze": 20 + v * 5,
            "Vibrance": -30 - v * 5,
            "Saturation": -25 - v * 5,
            "ToneCurve": f"0, 0, 32, {15 + v}, 64, {45 + v*2}, 128, 128, 192, {205 - v*3}, 255, 255",
            "HSL": {
                "RedHue": 5 + v, "RedSat": -20 - v * 5, "RedLum": -10 - v * 2,
                "OrangeHue": 5 + v, "OrangeSat": -20 - v * 5, "OrangeLum": -10 - v * 2,
                "YellowHue": -10 - v * 2, "YellowSat": -25 - v * 5, "YellowLum": -15 - v * 3,
                "GreenHue": 15 + v * 3, "GreenSat": -30 - v * 5, "GreenLum": -20 - v * 5,
                "AquaHue": 10 + v, "AquaSat": -25 - v * 5, "AquaLum": -15 - v * 3,
                "BlueHue": -10 - v * 2, "BlueSat": -20 - v * 5, "BlueLum": -15 - v * 3,
                "PurpleHue": 10 + v, "PurpleSat": -25 - v * 5, "PurpleLum": -10 - v * 2,
                "MagentaHue": 15 + v, "MagentaSat": -25 - v * 5, "MagentaLum": -10 - v * 2,
            },
            "SplitToning": {"ShadowHue": 35 + v * 5, "ShadowSat": 8 + v * 2,
                           "HighlightHue": 45 + v * 3, "HighlightSat": 10 + v * 2, "Balance": 65 + v * 5},
            "Grain": {"Amount": 45 + v * 25, "Size": 45 + v * 10, "Frequency": 70 + v * 10},
            "Vignette": {"Amount": -20 - v * 5, "Midpoint": 40 + v * 5, "Feather": 55 + v * 5},
            "Sharpening": {"Amount": 70 + v * 10, "Radius": 1.3 + v * 0.1, "Detail": 40 + v * 5, "Masking": 60 + v * 10},
            "ColorGrade": {
                "ShadowLum": -25 - v * 3, "ShadowHue": 35 + v * 5, "ShadowSat": 6 + v * 2,
                "MidtoneLum": -10 - v, "MidtoneHue": 45 + v * 3, "MidtoneSat": 5 + v,
                "HighlightLum": 0, "HighlightHue": 50 + v * 3, "HighlightSat": 5 + v,
                "Balance": 0.7 + v * 0.03,
            },
        }
    elif category == "teal_orange_modern":
        return {
            "Exposure": round(0.05 + v * 0.05, 2),
            "Contrast": 25 + v * 5,
            "Highlights": -25 - v * 5,
            "Shadows": -15 - v * 5,
            "Whites": 10 + v * 5,
            "Blacks": -20 - v * 5,
            "Texture": 20 + v * 5,
            "Clarity": 20 + v * 5,
            "Dehaze": 15 + v * 5,
            "Vibrance": 15 + v * 5,
            "Saturation": 5 + v * 3,
            "ToneCurve": f"0, 0, 32, {16 + v*2}, 64, {48 + v*3}, 128, 128, 192, {202 - v*2}, 255, 255",
            "HSL": {
                "RedHue": 10 + v, "RedSat": 15 + v * 3, "RedLum": 5 + v,
                "OrangeHue": -15 - v * 3, "OrangeSat": 20 + v * 5, "OrangeLum": 10 + v * 3,
                "YellowHue": -25 - v * 5, "YellowSat": 5 + v * 2, "YellowLum": -5 - v,
                "GreenHue": 45 + v * 5, "GreenSat": -20 - v * 5, "GreenLum": -15 - v * 3,
                "AquaHue": 35 + v * 5, "AquaSat": 15 + v * 3, "AquaLum": -10 - v * 2,
                "BlueHue": -30 - v * 5, "BlueSat": 10 + v * 3, "BlueLum": -15 - v * 3,
                "PurpleHue": -10 - v, "PurpleSat": -10 - v * 3, "PurpleLum": -10 - v * 2,
                "MagentaHue": -15 - v * 3, "MagentaSat": -5 - v, "MagentaLum": -5 - v,
            },
            "SplitToning": {"ShadowHue": 195 + v * 5, "ShadowSat": 30 + v * 5,
                           "HighlightHue": 28 + v * 5, "HighlightSat": 30 + v * 3, "Balance": 65 + v * 5},
            "Grain": {"Amount": 15 + v * 10, "Size": 25 + v * 3, "Frequency": 50 + v * 10},
            "Vignette": {"Amount": -20 - v * 5, "Midpoint": 45 + v * 5, "Feather": 60 + v * 5},
            "Sharpening": {"Amount": 60 + v * 10, "Radius": 1.1 + v * 0.1, "Detail": 30 + v * 5, "Masking": 50 + v * 10},
            "ColorGrade": {
                "ShadowLum": -20 - v * 3, "ShadowHue": 195 + v * 5, "ShadowSat": 28 + v * 5,
                "MidtoneLum": -5 - v, "MidtoneHue": 35 + v * 5, "MidtoneSat": 10 + v * 3,
                "HighlightLum": 8 + v * 2, "HighlightHue": 28 + v * 5, "HighlightSat": 25 + v * 3,
                "Balance": 0.65 + v * 0.03,
            },
        }
    else:
        # Fallback default
        return {
            "Exposure": 0.0, "Contrast": 0, "Highlights": 0, "Shadows": 0,
            "Whites": 0, "Blacks": 0, "Texture": 0, "Clarity": 0, "Dehaze": 0,
            "Vibrance": 0, "Saturation": 0,
            "ToneCurve": "0, 0, 64, 64, 128, 128, 192, 192, 255, 255",
            "HSL": {f"{h}Hue": 0 for h in ["Red","Orange","Yellow","Green","Aqua","Blue","Purple","Magenta"]},
            "SplitToning": {"ShadowHue": 0, "ShadowSat": 0, "HighlightHue": 0, "HighlightSat": 0, "Balance": 50},
            "Grain": {"Amount": 0, "Size": 25, "Frequency": 50},
            "Vignette": {"Amount": 0, "Midpoint": 50, "Feather": 50},
            "Sharpening": {"Amount": 25, "Radius": 1.0, "Detail": 25, "Masking": 0},
            "ColorGrade": {f"{t}Lum": 0 for t in ["Shadow","Midtone","Highlight"]}
                     | {f"{t}Hue": 0 for t in ["Shadow","Midtone","Highlight"]}
                     | {f"{t}Sat": 0 for t in ["Shadow","Midtone","Highlight"]}
                     | {"Balance": 0.5},
        }


# ============================================================
# XMP GENERATION
# ============================================================
def generate_xmp(category_key, preset_name, params, index):
    """Generate a valid Adobe XMP preset file."""
    cat_info = CATEGORIES[category_key]
    safe_name = preset_name.replace(" ", "_").replace("&", "and")
    filename = f"{safe_name}_{index:03d}.xmp"
    filepath = os.path.join(XMP_DIR, filename)

    hsl = params["HSL"]
    st = params["SplitToning"]
    grain = params["Grain"]
    vignette = params["Vignette"]
    sharp = params["Sharpening"]
    cg = params["ColorGrade"]

    # Build tone curve points
    tc_parts = params["ToneCurve"].split(", ")
    tc_points = []
    for i in range(0, len(tc_parts), 2):
        tc_points.append(f"{tc_parts[i]}/{tc_parts[i+1]}")
    tc_str = ", ".join(tc_points)

    xmp_content = f"""<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="CINEGRADE LAB v1.0">
 <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
  <rdf:Description rdf:about=""
    xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    crs:Version="15.0"
    crs:ProcessVersion="11.0"
    crs:Exposure2012="{params['Exposure']}"
    crs:Contrast2012="{params['Contrast']}"
    crs:Highlights2012="{params['Highlights']}"
    crs:Shadows2012="{params['Shadows']}"
    crs:Whites2012="{params['Whites']}"
    crs:Blacks2012="{params['Blacks']}"
    crs:Texture="{params['Texture']}"
    crs:Clarity2012="{params['Clarity']}"
    crs:Dehaze="{params['Dehaze']}"
    crs:Vibrance="{params['Vibrance']}"
    crs:Saturation="{params['Saturation']}"
    crs:ParametricShadows="0"
    crs:ParametricDarks="0"
    crs:ParametricLights="0"
    crs:ParametricHighlights="0"
    crs:ParametricShadowSplit="25"
    crs:ParametricMidtoneSplit="50"
    crs:ParametricHighlightSplit="75"
    crs:Sharpness="{sharp['Amount']}"
    crs:SharpenRadius="{sharp['Radius']}"
    crs:SharpenDetail="{sharp['Detail']}"
    crs:SharpenEdgeMasking="{sharp['Masking']}"
    crs:LuminanceSmoothing="0"
    crs:ColorNoiseReduction="25"
    crs:HueAdjustmentRed="{hsl['RedHue']}"
    crs:HueAdjustmentOrange="{hsl['OrangeHue']}"
    crs:HueAdjustmentYellow="{hsl['YellowHue']}"
    crs:HueAdjustmentGreen="{hsl['GreenHue']}"
    crs:HueAdjustmentAqua="{hsl['AquaHue']}"
    crs:HueAdjustmentBlue="{hsl['BlueHue']}"
    crs:HueAdjustmentPurple="{hsl['PurpleHue']}"
    crs:HueAdjustmentMagenta="{hsl['MagentaHue']}"
    crs:SaturationAdjustmentRed="{hsl['RedSat']}"
    crs:SaturationAdjustmentOrange="{hsl['OrangeSat']}"
    crs:SaturationAdjustmentYellow="{hsl['YellowSat']}"
    crs:SaturationAdjustmentGreen="{hsl['GreenSat']}"
    crs:SaturationAdjustmentAqua="{hsl['AquaSat']}"
    crs:SaturationAdjustmentBlue="{hsl['BlueSat']}"
    crs:SaturationAdjustmentPurple="{hsl['PurpleSat']}"
    crs:SaturationAdjustmentMagenta="{hsl['MagentaSat']}"
    crs:LuminanceAdjustmentRed="{hsl['RedLum']}"
    crs:LuminanceAdjustmentOrange="{hsl['OrangeLum']}"
    crs:LuminanceAdjustmentYellow="{hsl['YellowLum']}"
    crs:LuminanceAdjustmentGreen="{hsl['GreenLum']}"
    crs:LuminanceAdjustmentAqua="{hsl['AquaLum']}"
    crs:LuminanceAdjustmentBlue="{hsl['BlueLum']}"
    crs:LuminanceAdjustmentPurple="{hsl['PurpleLum']}"
    crs:LuminanceAdjustmentMagenta="{hsl['MagentaLum']}"
    crs:SplitToningShadowHue="{st['ShadowHue']}"
    crs:SplitToningShadowSaturation="{st['ShadowSat']}"
    crs:SplitToningHighlightHue="{st['HighlightHue']}"
    crs:SplitToningHighlightSaturation="{st['HighlightSat']}"
    crs:SplitToningBalance="{st['Balance']}"
    crs:ColorGradeShadowLum="{cg['ShadowLum']}"
    crs:ColorGradeShadowHue="{cg['ShadowHue']}"
    crs:ColorGradeShadowSat="{cg['ShadowSat']}"
    crs:ColorGradeMidtoneLum="{cg['MidtoneLum']}"
    crs:ColorGradeMidtoneHue="{cg['MidtoneHue']}"
    crs:ColorGradeMidtoneSat="{cg['MidtoneSat']}"
    crs:ColorGradeHighlightLum="{cg['HighlightLum']}"
    crs:ColorGradeHighlightHue="{cg['HighlightHue']}"
    crs:ColorGradeHighlightSat="{cg['HighlightSat']}"
    crs:ColorGradeBlending="50"
    crs:ColorGradeGlobalLum="0"
    crs:ColorGradeGlobalHue="0"
    crs:ColorGradeGlobalSat="0"
    crs:ColorGradeShadowsColor="{cg['ShadowHue']}, {cg['ShadowSat']}"
    crs:ColorGradeMidtonesColor="{cg['MidtoneHue']}, {cg['MidtoneSat']}"
    crs:ColorGradeHighlightsColor="{cg['HighlightHue']}, {cg['HighlightSat']}"
    crs:ColorGradeBalance="{cg['Balance']}"
    crs:GrainAmount="{grain['Amount']}"
    crs:GrainSize="{grain['Size']}"
    crs:GrainFrequency="{grain['Frequency']}"
    crs:PostCropVignetteAmount="{vignette['Amount']}"
    crs:PostCropVignetteMidpoint="{vignette['Midpoint']}"
    crs:PostCropVignetteFeather="{vignette['Feather']}"
    crs:PostCropVignetteRoundness="0"
    crs:PostCropVignetteStyle="1"
    crs:ToneCurveName2012="Custom"
    crs:ToneCurvePV2012="{tc_str}"
    crs:ToneCurvePV2012Red="{tc_str}"
    crs:ToneCurvePV2012Green="{tc_str}"
    crs:ToneCurvePV2012Blue="{tc_str}"
    crs:HasSettings="True"
    crs:CropConstrainToWarp="0">
   <dc:title>
    <rdf:Alt>
     <rdf:li xml:lang="x-default">{preset_name}</rdf:li>
    </rdf:Alt>
   </dc:title>
   <dc:description>
    <rdf:Alt>
     <rdf:li xml:lang="x-default">{cat_info['description']} — CINEGRADE LAB Premium Preset. Mood: {cat_info['mood']}. Variant {index}.</rdf:li>
    </rdf:Alt>
   </dc:description>
   <dc:subject>
    <rdf:Bag>
     <rdf:li>cinematic</rdf:li>
     <rdf:li>{cat_info['name'].lower()}</rdf:li>
     <rdf:li>cinegrade</rdf:li>
     <rdf:li>premium</rdf:li>
     <rdf:li>{cat_info['mood'].split(',')[0].lower().strip()}</rdf:li>
    </rdf:Bag>
   </dc:subject>
  </rdf:Description>
 </rdf:RDF>
</x:xmpmeta>"""

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(xmp_content)

    return filename


print("XMP generation function defined successfully")


# ============================================================
# CUBE LUT GENERATION — REAL COLOR TRANSFORMS
# ============================================================

LUT_SIZE = 33  # 33x33x33 lattice

def luma(r, g, b):
    """Rec.709 luma."""
    return 0.2126 * r + 0.7152 * g + 0.0722 * b

def rgb_to_hsv(r, g, b):
    """Convert RGB to HSV. All inputs/outputs in [0,1]."""
    mx = max(r, g, b)
    mn = min(r, g, b)
    df = mx - mn
    if mx == mn:
        h = 0.0
    elif mx == r:
        h = (60 * ((g - b) / df) + 360) % 360
    elif mx == g:
        h = (60 * ((b - r) / df) + 120) % 360
    else:
        h = (60 * ((r - g) / df) + 240) % 360
    s = 0.0 if mx == 0 else df / mx
    v = mx
    return h / 360.0, s, v

def hsv_to_rgb(h, s, v):
    """Convert HSV to RGB. H in [0,1], S,V in [0,1]."""
    h = h * 360.0
    c = v * s
    x = c * (1 - abs((h / 60) % 2 - 1))
    m = v - c
    if h < 60:
        r, g, b = c, x, 0
    elif h < 120:
        r, g, b = x, c, 0
    elif h < 180:
        r, g, b = 0, c, x
    elif h < 240:
        r, g, b = 0, x, c
    elif h < 300:
        r, g, b = x, 0, c
    else:
        r, g, b = c, 0, x
    return r + m, g + m, b + m

def apply_contrast_curve(val, contrast=1.0, lift=0.0, gain=1.0, gamma=1.0):
    """Apply contrast S-curve and exposure/gamma adjustments."""
    # Apply lift (shadow offset)
    val = max(0.0, min(1.0, val + lift))
    # Apply gain
    val = max(0.0, min(1.0, val * gain))
    # Apply contrast (power function around 0.5)
    if contrast != 1.0:
        val = max(0.0, min(1.0, ((val - 0.5) * contrast + 0.5)))
    # Apply gamma
    if gamma != 1.0:
        val = max(0.0, min(1.0, val ** gamma))
    return val

def apply_film_tone_curve(val, category):
    """Apply film-like tone curve based on category."""
    curves = {
        "analog_film": (0.85, 0.05, 1.0, 1.1),
        "kodak_portra_emulation": (0.9, 0.03, 1.0, 1.08),
        "fuji_400h_emulation": (0.88, 0.06, 1.0, 1.12),
        "cinestill_800t_emulation": (0.92, 0.02, 1.0, 1.05),
        "vintage_film_lab": (0.85, 0.08, 1.0, 1.15),
        "bleach_bypass": (1.3, -0.02, 1.05, 0.95),
        "dreamy_wedding": (0.8, 0.08, 1.0, 1.15),
        "minimal_scandinavian": (0.75, 0.1, 1.0, 1.2),
    }
    c, l, g, gm = curves.get(category, (1.0, 0.0, 1.0, 1.0))
    return apply_contrast_curve(val, c, l, g, gm)

def blend_color(src, target, amount):
    """Blend src color toward target by amount [0,1]."""
    return src * (1 - amount) + target * amount

def generate_lut_transform(r, g, b, category, variant=0):
    """
    Apply category-specific color transforms to RGB values.
    Returns transformed (r, g, b) tuple.
    """
    v = variant / 4.0  # Normalize to 0-1
    lum = luma(r, g, b)
    h, s, val = rgb_to_hsv(r, g, b)

    # Start with identity
    nr, ng, nb = r, g, b

    # ===== CATEGORY-SPECIFIC TRANSFORMS =====

    if category == "luxury_editorial":
        # Rich blacks, soft contrast, warm skin
        for ch in [nr, ng, nb]:
            pass  # Processed below via tone curve
        nr = apply_contrast_curve(nr, 1.05 + v * 0.05, -0.02, 1.0, 1.05)
        ng = apply_contrast_curve(ng, 1.05 + v * 0.05, -0.02, 1.0, 1.03)
        nb = apply_contrast_curve(nb, 1.08 + v * 0.05, -0.03, 1.0, 1.08)
        # Warm highlights
        highlight_mask = lum ** 2
        nr = blend_color(nr, min(1.0, nr * 1.08 + 0.02), highlight_mask * (0.1 + v * 0.05))
        ng = blend_color(ng, min(1.0, ng * 1.03 + 0.01), highlight_mask * (0.05 + v * 0.03))
        # Slight desat of non-skin
        sat_scale = 0.92 - v * 0.05
        nr, ng, nb = apply_saturation(nr, ng, nb, sat_scale)

    elif category == "cinematic_shadows":
        # Teal shadows, warm highlights
        shadow_mask = (1.0 - lum) ** 3
        highlight_mask = lum ** 2.5
        nr = blend_color(nr, min(1.0, nr * 0.7 + 0.08), shadow_mask * (0.25 + v * 0.1))
        ng = blend_color(ng, min(1.0, ng * 1.1 + 0.05), shadow_mask * (0.2 + v * 0.1))
        nb = blend_color(nb, min(1.0, nb * 1.25 + 0.05), shadow_mask * (0.3 + v * 0.1))
        # Warm highlights
        nr = blend_color(nr, min(1.0, nr * 1.15 + 0.05), highlight_mask * (0.15 + v * 0.05))
        ng = blend_color(ng, min(1.0, ng * 1.05 + 0.02), highlight_mask * (0.1 + v * 0.03))
        nb = blend_color(nb, max(0.0, nb * 0.85), highlight_mask * (0.12 + v * 0.05))
        # Contrast
        nr = apply_contrast_curve(nr, 1.15 + v * 0.1)
        ng = apply_contrast_curve(ng, 1.15 + v * 0.1)
        nb = apply_contrast_curve(nb, 1.15 + v * 0.1)
        # Desat
        nr, ng, nb = apply_saturation(nr, ng, nb, 0.88 - v * 0.05)

    elif category == "analog_film":
        # Film tone curve
        nr = apply_film_tone_curve(nr, category)
        ng = apply_film_tone_curve(ng, category)
        nb = apply_film_tone_curve(nb, category)
        # Lift blacks
        nr = min(1.0, nr + 0.04 + v * 0.02)
        ng = min(1.0, ng + 0.04 + v * 0.02)
        nb = min(1.0, nb + 0.04 + v * 0.02)
        # Desaturate
        nr, ng, nb = apply_saturation(nr, ng, nb, 0.78 - v * 0.08)
        # Warm shift
        nr = min(1.0, nr * 1.05 + 0.02)
        ng = min(1.0, ng * 1.01 + 0.01)
        nb = nb * 0.92

    elif category == "moody_documentary":
        # Contrast
        nr = apply_contrast_curve(nr, 1.2 + v * 0.1, -0.02)
        ng = apply_contrast_curve(ng, 1.2 + v * 0.1, -0.02)
        nb = apply_contrast_curve(nb, 1.2 + v * 0.1, -0.02)
        # Desat
        nr, ng, nb = apply_saturation(nr, ng, nb, 0.75 - v * 0.08)
        # Cool shadows
        shadow_mask = (1.0 - lum) ** 2.5
        nr = blend_color(nr, nr * 0.85, shadow_mask * 0.15)
        ng = blend_color(ng, ng * 0.9, shadow_mask * 0.1)
        nb = blend_color(nb, min(1.0, nb * 1.05 + 0.03), shadow_mask * 0.12)

    elif category == "dreamy_wedding":
        # Soft contrast
        nr = apply_film_tone_curve(nr, category)
        ng = apply_film_tone_curve(ng, category)
        nb = apply_film_tone_curve(nb, category)
        # Lift shadows
        shadow_mask = (1.0 - lum) ** 2
        nr = min(1.0, nr + shadow_mask * (0.06 + v * 0.02))
        ng = min(1.0, ng + shadow_mask * (0.05 + v * 0.02))
        nb = min(1.0, nb + shadow_mask * (0.05 + v * 0.02))
        # Warm highlights
        hl_mask = lum ** 2
        nr = blend_color(nr, min(1.0, nr * 1.1 + 0.03), hl_mask * (0.12 + v * 0.05))
        ng = blend_color(ng, min(1.0, ng * 1.04 + 0.01), hl_mask * (0.08 + v * 0.03))
        # Pink midtones
        mid_mask = 1.0 - abs(lum - 0.5) * 2
        mid_mask = max(0, mid_mask) ** 2
        nr = blend_color(nr, min(1.0, nr * 1.06 + 0.02), mid_mask * (0.08 + v * 0.04))
        ng = blend_color(ng, ng * 0.98, mid_mask * (0.03 + v * 0.02))
        nr, ng, nb = apply_saturation(nr, ng, nb, 0.85 - v * 0.05)

    elif category == "hyperreal_fashion":
        # High contrast
        nr = apply_contrast_curve(nr, 1.2 + v * 0.1)
        ng = apply_contrast_curve(ng, 1.2 + v * 0.1)
        nb = apply_contrast_curve(nb, 1.2 + v * 0.1)
        # Boost saturation
        nr, ng, nb = apply_saturation(nr, ng, nb, 1.15 + v * 0.08)
        # Skin boost (orange-red range)
        if 0.03 < h < 0.12:
            nr = min(1.0, nr * (1.05 + v * 0.05) + 0.02)
            ng = min(1.0, ng * 1.02 + 0.01)

    elif category == "night_neon":
        # Deep shadows
        nr = apply_contrast_curve(nr, 1.3 + v * 0.1, -0.03)
        ng = apply_contrast_curve(ng, 1.3 + v * 0.1, -0.03)
        nb = apply_contrast_curve(nb, 1.3 + v * 0.1, -0.03)
        # Neon enhancement - boost cyan and magenta
        shadow_mask = (1.0 - lum) ** 2
        # Cyan boost
        if 0.4 < h < 0.55:
            ng = min(1.0, ng * (1.25 + v * 0.15))
            nb = min(1.0, nb * (1.3 + v * 0.15))
        # Magenta/pink boost
        if (h > 0.8 or h < 0.15) and s > 0.2:
            nr = min(1.0, nr * (1.2 + v * 0.1))
            nb = min(1.0, nb * (1.2 + v * 0.1))
        # Blue boost
        if 0.55 < h < 0.75:
            nb = min(1.0, nb * (1.15 + v * 0.1))
        # Shadow teal
        nr = blend_color(nr, nr * 0.4, shadow_mask * 0.3)
        ng = blend_color(ng, min(1.0, ng * 1.1 + 0.05), shadow_mask * 0.25)
        nb = blend_color(nb, min(1.0, nb * 1.2 + 0.05), shadow_mask * 0.3)
        nr, ng, nb = apply_saturation(nr, ng, nb, 1.1 + v * 0.1)

    elif category == "luxury_travel":
        # Golden hour feel
        nr = apply_contrast_curve(nr, 1.08 + v * 0.05)
        ng = apply_contrast_curve(ng, 1.05 + v * 0.05)
        nb = apply_contrast_curve(nb, 1.02 + v * 0.03)
        hl_mask = lum ** 2
        nr = blend_color(nr, min(1.0, nr * 1.12 + 0.04), hl_mask * (0.15 + v * 0.05))
        ng = blend_color(ng, min(1.0, ng * 1.06 + 0.02), hl_mask * (0.1 + v * 0.03))
        nb = blend_color(nb, nb * 0.88, hl_mask * (0.08 + v * 0.04))
        # Green enhancement
        if 0.25 < h < 0.45:
            ng = min(1.0, ng * (1.08 + v * 0.05))
        nr, ng, nb = apply_saturation(nr, ng, nb, 1.08 + v * 0.05)

    elif category == "minimal_scandinavian":
        # Bright, airy, desaturated
        nr = apply_film_tone_curve(nr, category)
        ng = apply_film_tone_curve(ng, category)
        nb = apply_film_tone_curve(nb, category)
        nr = min(1.0, nr + 0.08 + v * 0.03)
        ng = min(1.0, ng + 0.08 + v * 0.03)
        nb = min(1.0, nb + 0.1 + v * 0.04)
        nr, ng, nb = apply_saturation(nr, ng, nb, 0.55 - v * 0.1)
        # Cool blue tint in shadows
        shadow_mask = (1.0 - lum) ** 2
        nr = blend_color(nr, nr * 0.92, shadow_mask * 0.08)
        ng = blend_color(ng, ng * 0.95, shadow_mask * 0.06)
        nb = blend_color(nb, min(1.0, nb * 1.05 + 0.02), shadow_mask * 0.1)

    elif category == "cyberpunk_cinema":
        # Cyan/magenta split
        nr = apply_contrast_curve(nr, 1.35 + v * 0.1, -0.03)
        ng = apply_contrast_curve(ng, 1.35 + v * 0.1, -0.03)
        nb = apply_contrast_curve(nb, 1.35 + v * 0.1, -0.03)
        shadow_mask = (1.0 - lum) ** 2.5
        hl_mask = lum ** 2
        # Cyan shadows
        nr = blend_color(nr, nr * 0.15, shadow_mask * 0.35)
        ng = blend_color(ng, min(1.0, ng * 1.15 + 0.08), shadow_mask * 0.4)
        nb = blend_color(nb, min(1.0, nb * 1.2 + 0.05), shadow_mask * 0.35)
        # Magenta highlights
        nr = blend_color(nr, min(1.0, nr * 1.25 + 0.08), hl_mask * 0.25)
        ng = blend_color(ng, ng * 0.7, hl_mask * 0.3)
        nb = blend_color(nb, min(1.0, nb * 1.2 + 0.05), hl_mask * 0.3)
        # Boost cyan/magenta channels
        nr, ng, nb = apply_saturation(nr, ng, nb, 1.2 + v * 0.1)

    elif category == "neo_noir":
        # Dramatic shadows, high contrast
        nr = apply_contrast_curve(nr, 1.4 + v * 0.1, -0.03, 1.0, 0.95)
        ng = apply_contrast_curve(ng, 1.4 + v * 0.1, -0.03, 1.0, 0.95)
        nb = apply_contrast_curve(nb, 1.4 + v * 0.1, -0.03, 1.0, 0.95)
        # Desaturate
        nr, ng, nb = apply_saturation(nr, ng, nb, 0.65 - v * 0.1)
        # Deep cool shadows
        shadow_mask = (1.0 - lum) ** 3
        nr = blend_color(nr, nr * 0.3, shadow_mask * 0.4)
        ng = blend_color(ng, ng * 0.5, shadow_mask * 0.3)
        nb = blend_color(nb, nb * 0.7, shadow_mask * 0.25)
        # Warm highlights
        hl_mask = lum ** 2
        nr = blend_color(nr, min(1.0, nr * 1.15 + 0.05), hl_mask * 0.1)
        ng = blend_color(ng, min(1.0, ng * 1.05 + 0.02), hl_mask * 0.08)

    elif category == "vintage_film_lab":
        # Faded, grainy, color-shifted
        nr = apply_film_tone_curve(nr, category)
        ng = apply_film_tone_curve(ng, category)
        nb = apply_film_tone_curve(nb, category)
        nr = min(1.0, nr + 0.06 + v * 0.02)
        ng = min(1.0, ng + 0.05 + v * 0.02)
        nb = min(1.0, nb + 0.04 + v * 0.02)
        # Cross-processed color shift
        nr, ng, nb = apply_saturation(nr, ng, nb, 0.72 - v * 0.08)
        # Warm shadows, cool highlights (cross-process)
        shadow_mask = (1.0 - lum) ** 2
        nr = blend_color(nr, min(1.0, nr * 1.15 + 0.05), shadow_mask * 0.15)
        ng = blend_color(ng, min(1.0, ng * 1.05 + 0.02), shadow_mask * 0.1)
        hl_mask = lum ** 2
        nb = blend_color(nb, min(1.0, nb * 1.1 + 0.03), hl_mask * 0.12)

    elif category == "high_dynamic_luxury":
        # HDR-like: preserve detail in shadows and highlights
        # Lift shadows
        shadow_mask = (1.0 - lum) ** 2
        nr = min(1.0, nr + shadow_mask * (0.08 + v * 0.02))
        ng = min(1.0, ng + shadow_mask * (0.08 + v * 0.02))
        nb = min(1.0, nb + shadow_mask * (0.08 + v * 0.02))
        # Compress highlights
        hl_mask = lum ** 2
        nr = blend_color(nr, nr * 0.85 + 0.15, hl_mask * (0.15 + v * 0.05))
        ng = blend_color(ng, ng * 0.88 + 0.12, hl_mask * (0.12 + v * 0.04))
        nb = blend_color(nb, nb * 0.9 + 0.1, hl_mask * (0.1 + v * 0.03))
        # Moderate contrast
        nr = apply_contrast_curve(nr, 1.02 + v * 0.03)
        ng = apply_contrast_curve(ng, 1.02 + v * 0.03)
        nb = apply_contrast_curve(nb, 1.02 + v * 0.03)

    elif category == "dark_instagram_mood":
        # Desaturated, crushed blacks, cool tones
        nr = apply_contrast_curve(nr, 1.15 + v * 0.08, -0.02)
        ng = apply_contrast_curve(ng, 1.15 + v * 0.08, -0.02)
        nb = apply_contrast_curve(nb, 1.15 + v * 0.08, -0.02)
        nr, ng, nb = apply_saturation(nr, ng, nb, 0.7 - v * 0.08)
        # Cool shadows
        shadow_mask = (1.0 - lum) ** 2
        nr = blend_color(nr, nr * 0.8, shadow_mask * 0.15)
        ng = blend_color(ng, ng * 0.88, shadow_mask * 0.1)
        nb = blend_color(nb, nb * 1.05, shadow_mask * 0.12)
        # Lifted blacks
        nr = max(0.03 + v * 0.01, nr)
        ng = max(0.03 + v * 0.01, ng)
        nb = max(0.04 + v * 0.01, nb)

    elif category == "clean_creator_economy":
        # Bright, clean, modern
        nr = apply_contrast_curve(nr, 0.9 + v * 0.05, 0.03, 1.0, 1.1)
        ng = apply_contrast_curve(ng, 0.9 + v * 0.05, 0.03, 1.0, 1.08)
        nb = apply_contrast_curve(nb, 0.88 + v * 0.05, 0.04, 1.0, 1.1)
        nr = min(1.0, nr + 0.06 + v * 0.02)
        ng = min(1.0, ng + 0.06 + v * 0.02)
        nb = min(1.0, nb + 0.08 + v * 0.02)
        nr, ng, nb = apply_saturation(nr, ng, nb, 0.88 - v * 0.05)

    elif category == "music_video_looks":
        # Stylized, dramatic
        nr = apply_contrast_curve(nr, 1.25 + v * 0.1)
        ng = apply_contrast_curve(ng, 1.25 + v * 0.1)
        nb = apply_contrast_curve(nb, 1.25 + v * 0.1)
        # Color grade toward purple/teal
        shadow_mask = (1.0 - lum) ** 2
        nr = blend_color(nr, nr * 0.5, shadow_mask * 0.25)
        ng = blend_color(ng, ng * 0.8, shadow_mask * 0.15)
        nb = blend_color(nb, nb * 1.15, shadow_mask * 0.2)
        hl_mask = lum ** 2
        nr = blend_color(nr, min(1.0, nr * 1.2 + 0.05), hl_mask * 0.18)
        ng = blend_color(ng, min(1.0, ng * 1.05 + 0.02), hl_mask * 0.1)
        nb = blend_color(nb, nb * 0.8, hl_mask * 0.15)
        nr, ng, nb = apply_saturation(nr, ng, nb, 1.15 + v * 0.08)

    elif category == "commercial_luxury":
        # Polished, professional
        nr = apply_contrast_curve(nr, 1.1 + v * 0.05)
        ng = apply_contrast_curve(ng, 1.08 + v * 0.05)
        nb = apply_contrast_curve(nb, 1.05 + v * 0.03)
        # Clean skin tones
        if 0.03 < h < 0.12:
            nr = min(1.0, nr * 1.02 + 0.01)
            ng = min(1.0, ng * 1.01 + 0.005)
        nr, ng, nb = apply_saturation(nr, ng, nb, 0.95 - v * 0.03)
        # Slight warmth
        nr = min(1.0, nr * 1.02 + 0.005)
        ng = min(1.0, ng * 1.005 + 0.002)

    elif category == "netflix_inspired":
        # Teal/orange cinematic
        nr = apply_contrast_curve(nr, 1.18 + v * 0.08)
        ng = apply_contrast_curve(ng, 1.15 + v * 0.08)
        nb = apply_contrast_curve(nb, 1.12 + v * 0.06)
        shadow_mask = (1.0 - lum) ** 2.5
        nr = blend_color(nr, nr * 0.4, shadow_mask * 0.3)
        ng = blend_color(ng, min(1.0, ng * 1.1 + 0.06), shadow_mask * 0.25)
        nb = blend_color(nb, min(1.0, nb * 1.15 + 0.05), shadow_mask * 0.28)
        hl_mask = lum ** 2
        nr = blend_color(nr, min(1.0, nr * 1.2 + 0.05), hl_mask * 0.18)
        ng = blend_color(ng, min(1.0, ng * 1.08 + 0.02), hl_mask * 0.12)
        nb = blend_color(nb, nb * 0.75, hl_mask * 0.15)
        nr, ng, nb = apply_saturation(nr, ng, nb, 0.92 - v * 0.05)

    elif category == "a24_inspired":
        # Artistic, mood-driven
        nr = apply_contrast_curve(nr, 1.08 + v * 0.08, 0.0, 1.0, 1.05)
        ng = apply_contrast_curve(ng, 1.05 + v * 0.05, 0.0, 1.0, 1.05)
        nb = apply_contrast_curve(nb, 1.02 + v * 0.03, 0.0, 1.0, 1.08)
        nr, ng, nb = apply_saturation(nr, ng, nb, 0.78 - v * 0.1)
        # Desaturated cool look with warm accents
        shadow_mask = (1.0 - lum) ** 2
        nr = blend_color(nr, nr * 0.65, shadow_mask * 0.2)
        ng = blend_color(ng, ng * 0.78, shadow_mask * 0.15)
        nb = blend_color(nb, nb * 0.9, shadow_mask * 0.12)
        hl_mask = lum ** 2.5
        nr = blend_color(nr, min(1.0, nr * 1.18 + 0.04), hl_mask * 0.12)
        ng = blend_color(ng, min(1.0, ng * 1.06 + 0.02), hl_mask * 0.08)

    elif category == "kodak_portra_emulation":
        nr = apply_film_tone_curve(nr, category)
        ng = apply_film_tone_curve(ng, category)
        nb = apply_film_tone_curve(nb, category)
        nr = min(1.0, nr + 0.03 + v * 0.01)
        ng = min(1.0, ng + 0.02 + v * 0.01)
        nb = nb * 0.88
        nr, ng, nb = apply_saturation(nr, ng, nb, 0.82 - v * 0.06)
        # Warm skin boost
        if 0.03 < h < 0.12:
            nr = min(1.0, nr * (1.06 + v * 0.04) + 0.02)
            ng = min(1.0, ng * 1.02 + 0.01)

    elif category == "fuji_400h_emulation":
        nr = apply_film_tone_curve(nr, category)
        ng = apply_film_tone_curve(ng, category)
        nb = apply_film_tone_curve(nb, category)
        nr = min(1.0, nr + 0.06 + v * 0.02)
        ng = min(1.0, ng + 0.05 + v * 0.02)
        nb = min(1.0, nb + 0.08 + v * 0.03)
        nr, ng, nb = apply_saturation(nr, ng, nb, 0.78 - v * 0.08)
        # Green shadows
        shadow_mask = (1.0 - lum) ** 2
        ng = blend_color(ng, min(1.0, ng * 1.08 + 0.03), shadow_mask * 0.12)
        nb = blend_color(nb, nb * 0.92, shadow_mask * 0.08)
        # Pastel highlights
        hl_mask = lum ** 2
        nr = blend_color(nr, min(1.0, nr * 1.04 + 0.02), hl_mask * 0.08)
        ng = blend_color(ng, min(1.0, ng * 1.06 + 0.02), hl_mask * 0.1)
        nb = blend_color(nb, min(1.0, nb * 1.1 + 0.02), hl_mask * 0.06)

    elif category == "arri_alexa_look":
        # Natural, wide dynamic range
        nr = apply_contrast_curve(nr, 1.05 + v * 0.03, -0.01, 1.0, 1.02)
        ng = apply_contrast_curve(ng, 1.03 + v * 0.03, -0.01, 1.0, 1.02)
        nb = apply_contrast_curve(nb, 1.0 + v * 0.02, -0.01, 1.0, 1.03)
        # Natural skin rendering
        if 0.03 < h < 0.12:
            nr = min(1.0, nr * 1.02 + 0.005)
        # Slight desat
        nr, ng, nb = apply_saturation(nr, ng, nb, 0.92 - v * 0.03)

    elif category == "cinestill_800t_emulation":
        nr = apply_film_tone_curve(nr, category)
        ng = apply_film_tone_curve(ng, category)
        nb = apply_film_tone_curve(nb, category)
        # Tungsten warmth
        nr = min(1.0, nr * (1.08 + v * 0.04) + 0.02)
        ng = min(1.0, ng * 1.02 + 0.01)
        nb = nb * (0.82 - v * 0.05)
        # Halation simulation (red bloom in highlights)
        hl_mask = lum ** 3
        nr = blend_color(nr, min(1.0, nr * 1.2 + 0.08), hl_mask * (0.2 + v * 0.1))
        ng = blend_color(ng, min(1.0, ng * 1.05 + 0.02), hl_mask * 0.08)
        # Cool shadows from tungsten mismatch
        shadow_mask = (1.0 - lum) ** 2
        nr = blend_color(nr, nr * 0.85, shadow_mask * 0.12)
        ng = blend_color(ng, ng * 0.9, shadow_mask * 0.1)
        nb = blend_color(nb, min(1.0, nb * 1.08 + 0.03), shadow_mask * 0.15)
        nr, ng, nb = apply_saturation(nr, ng, nb, 0.88 - v * 0.05)

    elif category == "bleach_bypass":
        nr = apply_film_tone_curve(nr, category)
        ng = apply_film_tone_curve(ng, category)
        nb = apply_film_tone_curve(nb, category)
        # Silver retention: keep luma high, desaturate
        lum_factor = luma(nr, ng, nb)
        nr = blend_color(nr, lum_factor, 0.35 + v * 0.1)
        ng = blend_color(ng, lum_factor, 0.3 + v * 0.1)
        nb = blend_color(nb, lum_factor, 0.25 + v * 0.08)
        # Cool shadows, warm highlights
        shadow_mask = (1.0 - lum) ** 2
        nr = blend_color(nr, nr * 0.7, shadow_mask * 0.1)
        ng = blend_color(ng, ng * 0.85, shadow_mask * 0.08)
        hl_mask = lum ** 2
        nr = blend_color(nr, min(1.0, nr * 1.08 + 0.02), hl_mask * 0.08)

    elif category == "teal_orange_modern":
        nr = apply_contrast_curve(nr, 1.22 + v * 0.08)
        ng = apply_contrast_curve(ng, 1.18 + v * 0.08)
        nb = apply_contrast_curve(nb, 1.15 + v * 0.06)
        # Classic teal/orange
        shadow_mask = (1.0 - lum) ** 2.5
        nr = blend_color(nr, nr * 0.35, shadow_mask * 0.32)
        ng = blend_color(ng, min(1.0, ng * 1.12 + 0.06), shadow_mask * 0.28)
        nb = blend_color(nb, min(1.0, nb * 1.18 + 0.05), shadow_mask * 0.3)
        hl_mask = lum ** 2
        nr = blend_color(nr, min(1.0, nr * 1.22 + 0.06), hl_mask * 0.2)
        ng = blend_color(ng, min(1.0, ng * 1.06 + 0.02), hl_mask * 0.1)
        nb = blend_color(nb, nb * 0.7, hl_mask * 0.18)
        nr, ng, nb = apply_saturation(nr, ng, nb, 0.95 - v * 0.03)

    # Clamp to valid range
    nr = max(0.0, min(1.0, nr))
    ng = max(0.0, min(1.0, ng))
    nb = max(0.0, min(1.0, nb))

    return nr, ng, nb


def apply_saturation(r, g, b, scale):
    """Apply saturation scaling while preserving luma."""
    lum = luma(r, g, b)
    nr = lum + (r - lum) * scale
    ng = lum + (g - lum) * scale
    nb = lum + (b - lum) * scale
    return nr, ng, nb


def generate_cube(category_key, lut_name, variant=0):
    """Generate a valid 3D CUBE LUT file."""
    cat_info = CATEGORIES[category_key]
    safe_name = lut_name.replace(" ", "_").replace("&", "and")
    filename = f"{safe_name}_{variant:03d}.cube"
    filepath = os.path.join(CUBE_DIR, filename)

    lut_data = []
    for b_idx in range(LUT_SIZE):
        for g_idx in range(LUT_SIZE):
            for r_idx in range(LUT_SIZE):
                r = r_idx / (LUT_SIZE - 1)
                g = g_idx / (LUT_SIZE - 1)
                b = b_idx / (LUT_SIZE - 1)

                nr, ng, nb = generate_lut_transform(r, g, b, category_key, variant)

                lut_data.append(f"{nr:.6f} {ng:.6f} {nb:.6f}")

    # Write CUBE file
    with open(filepath, 'w') as f:
        f.write(f"# CINEGRADE LAB — Premium Cinematic LUT\n")
        f.write(f"# Title: {lut_name}\n")
        f.write(f"# Category: {cat_info['name']}\n")
        f.write(f"# Description: {cat_info['description']}\n")
        f.write(f"# Mood: {cat_info['mood']}\n")
        f.write(f"# Variant: {variant + 1}\n")
        f.write(f"# Generated: {datetime.now().isoformat()}\n")
        f.write(f"\n")
        f.write(f"TITLE \"{lut_name}\"\n")
        f.write(f"LUT_3D_SIZE {LUT_SIZE}\n")
        f.write(f"\n")
        f.write("\n".join(lut_data))
        f.write("\n")

    return filename, len(lut_data)


def generate_metadata_txt(category_key, lut_name, variant=0):
    """Generate companion metadata text file for each LUT."""
    cat_info = CATEGORIES[category_key]
    safe_name = lut_name.replace(" ", "_").replace("&", "and")
    filename = f"{safe_name}_{variant:03d}_metadata.txt"
    filepath = os.path.join(META_DIR, filename)

    content = f"""CINEGRADE LAB — LUT Metadata
==============================

LUT Name:        {lut_name}
Category:        {cat_info['name']}
Category ID:     {category_key}
Variant:         {variant + 1} of 5
Description:     {cat_info['description']}
Mood:            {cat_info['mood']}
File Format:     3D CUBE LUT ({LUT_SIZE}x{LUT_SIZE}x{LUT_SIZE})
Total Entries:   {LUT_SIZE ** 3}
Generated:       {datetime.now().isoformat()}
Engine:          CINEGRADE LAB Generation Engine v1.0

Technical Specifications:
  - Lattice: {LUT_SIZE}x{LUT_SIZE}x{LUT_SIZE} = {LUT_SIZE**3} RGB triplets
  - Bit depth: Floating point 0.0-1.0
  - Color space: Rec.709 input/output
  - Compatible: DaVinci Resolve, Premiere Pro, Final Cut Pro, OBS, etc.

Use Case:
  This LUT is designed for {cat_info['description'].lower()}.
  Apply at 50-100% intensity for best results. Adjust exposure
  before applying LUT for optimal color rendition.

CINEGRADE LAB — Premium Cinematic Color Tools
"""

    with open(filepath, 'w') as f:
        f.write(content)

    return filename


# ============================================================
# MAIN EXECUTION
# ============================================================
def main():
    print("=" * 60)
    print("CINEGRADE LAB — Premium Preset & LUT Generation Engine")
    print("=" * 60)

    xmp_files = []
    cube_files = []
    meta_files = []
    index_data = {
        "library_name": "CINEGRADE LAB Premium Collection",
        "version": "1.0.0",
        "generated_at": datetime.now().isoformat(),
        "total_xmp_presets": 0,
        "total_cube_luts": 0,
        "total_categories": len(CATEGORIES),
        "categories": [],
        "xmp_presets": [],
        "cube_luts": [],
    }

    for cat_idx, (cat_key, cat_info) in enumerate(CATEGORIES.items()):
        print(f"\n[{cat_idx + 1}/{len(CATEGORIES)}] Generating: {cat_info['name']}")
        preset_names = PRESET_NAMES[cat_key]

        cat_entry = {
            "id": cat_key,
            "name": cat_info["name"],
            "description": cat_info["description"],
            "mood": cat_info["mood"],
            "preset_count": len(preset_names),
            "xmp_files": [],
            "cube_files": [],
        }

        for i, name in enumerate(preset_names):
            # Generate XMP
            params = make_preset_params(cat_key, i)
            xmp_filename = generate_xmp(cat_key, name, params, i)
            xmp_files.append(xmp_filename)
            cat_entry["xmp_files"].append(xmp_filename)
            index_data["xmp_presets"].append({
                "filename": xmp_filename,
                "name": name,
                "category": cat_info["name"],
                "category_id": cat_key,
                "variant": i,
                "description": cat_info["description"],
                "mood": cat_info["mood"],
                "type": "xmp",
            })

            # Generate CUBE
            cube_filename, entry_count = generate_cube(cat_key, name, i)
            cube_files.append(cube_filename)
            cat_entry["cube_files"].append(cube_filename)
            index_data["cube_luts"].append({
                "filename": cube_filename,
                "name": name,
                "category": cat_info["name"],
                "category_id": cat_key,
                "variant": i,
                "description": cat_info["description"],
                "mood": cat_info["mood"],
                "lattice_size": LUT_SIZE,
                "total_entries": entry_count,
                "type": "cube",
            })

            # Generate metadata
            meta_filename = generate_metadata_txt(cat_key, name, i)
            meta_files.append(meta_filename)

            print(f"  ✓ {name} — XMP + CUBE + META")

        index_data["categories"].append(cat_entry)

    # Update totals
    index_data["total_xmp_presets"] = len(xmp_files)
    index_data["total_cube_luts"] = len(cube_files)

    # Write JSON index
    with open(INDEX_PATH, 'w') as f:
        json.dump(index_data, f, indent=2)

    print("\n" + "=" * 60)
    print("GENERATION COMPLETE")
    print("=" * 60)
    print(f"XMP Presets:  {len(xmp_files)}")
    print(f"CUBE LUTs:    {len(cube_files)}")
    print(f"Meta Files:   {len(meta_files)}")
    print(f"Categories:   {len(CATEGORIES)}")
    print(f"Index:        {INDEX_PATH}")

    return xmp_files, cube_files, meta_files


if __name__ == "__main__":
    main()
