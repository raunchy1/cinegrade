## 4. CINEGRADE LAB Product Architecture

### 4.1 System Overview

#### 4.1.1 Product Vision: Convergence of Four Aesthetic Pillars

CINEGRADE LAB is architected around the thesis that the most compelling color grading tools will emerge from the intersection of four aesthetic traditions. First, Apple's computational photography philosophy — restraint, natural skin tones, and invisible correction over visible manipulation. Second, Netflix's HDR-first cinematic pipeline, which mandates Dolby Vision mastering with P3-D65 color space and PQ (ST.2084) EOTF at minimum 1000 nits peak luminance [^481^]. Third, DaVinci Resolve's democratization of professional color science, bringing tetrahedral LUT interpolation and ACES-native workflows to creators beyond the traditional color suite. Fourth, Leica's optical aesthetic: warm tonal rendition, creamy highlight rolloff, and rendering the world beautifully without post-processing artifice.

Market data confirms that the global Cinematic LUTs market reached USD 312.8 million in 2024 and is projected to grow at a 10.4% CAGR to USD 758.5 million by 2033 [^1^]. Within this expanding market, the "prosumer chasm" — the gap between $7–$50 consumer LUT packs and $300+ professional plugins — represents an estimated $100M+ addressable opportunity. Professional colorists on forums such as LiftGammaGain routinely dismiss consumer-grade LUTs as "snake oil," while working creators cannot justify $399 for Dehancer or $500 for ARRI Film Lab [^40^]. CINEGRADE LAB occupies the $89–$129 per pack tier with documented color science credentials and colorist-verified accuracy metrics.

The product architecture translates these four aesthetic pillars into 250 premium color tools distributed as paired XMP/CUBE files across 25 categories, each with quantified color transformation parameters derived from measured film stock data and cinematic reference analysis.

#### 4.1.2 Core Value Proposition

The CINEGRADE LAB collection delivers 250 premium color tools — 125 XMP presets for Adobe Camera Raw/Lightroom and 125 CUBE LUTs for DaVinci Resolve, Premiere Pro, Final Cut Pro, and Baselight. Each tool exists in paired format, enabling seamless workflow transitions between photography and video deliverables. The value proposition rests on three technical pillars.

**Scientific Accuracy.** Every film emulation is validated against CIEDE2000 color difference metrics [^211^], the industry-standard perceptual color difference formula that correlates with human visual judgment. Where consumer LUTs approximate film looks through subjective adjustment, CINEGRADE LAB emulations derive from analysis of actual film scan data, preserving the six distinctive properties of film grain: temporal independence, pink noise power spectrum density, spatial dependence, cross-color correlation in RGB, Gaussian histogram distribution, and signal intensity adaptation [^274^].

**Parameter Completeness.** Each XMP preset encodes 23+ discrete adjustments including Color Grading wheels (Shadows, Midtones, Highlights), parametric and point tone curves, HSL selective adjustments, split toning with balance control, calibration profiles, and lens corrections. This depth contrasts sharply with consumer presets that adjust 3–5 sliders, leaving substantial creative work to the user.

**AI-Powered Discovery.** The 25-category taxonomy is navigable through an intelligent recommendation system that matches source content characteristics to optimal preset selections, addressing the "paradox of choice" documented in behavioral economics research — users prefer curated collections of 8–12 exceptional options over massive uncategorized packs of 500+ LUTs.

#### 4.1.3 Target Persona Matrix

The architecture serves four distinct professional personas, each with differentiated workflow requirements and aesthetic preferences.

| Persona | Primary Tool | Key Aesthetic Need | Representative Category | Price Sensitivity |
|---------|-------------|-------------------|------------------------|-------------------|
| Wedding Photographers | XMP (Lightroom/ACR) | Soft film emulation, natural skin tones, hybrid film-digital matching | Dreamy Wedding, Kodak Portra Emulation, Fuji 400H Emulation | Medium ($99–$149 acceptable) |
| Filmmakers | CUBE (DaVinci Resolve) | Cinematic contrast, camera log compatibility, scene-referred workflows | Cinematic Shadows, ARRI Alexa Look, Netflix Inspired | Low ($89–$129 standard) |
| Content Creators | Both (cross-platform) | Social media optimization, trending aesthetics, mobile compatibility | Dark Instagram Mood, Clean Creator Economy, Night Neon | Medium ($49–$99 preferred) |
| Brand Teams | CUBE (multi-editor) | Brand consistency, product-ready output, commercial polish | Commercial Luxury, Luxury Editorial, Hyperreal Fashion | Low ($200+ bundles acceptable) |

Wedding photographers constitute the largest addressable segment, with Mastin Labs ($99/pack) and Noble Presets ($149) demonstrating sustained demand for scientifically accurate film emulation. Wedding filmmakers shooting hybrid film-digital workflows lack reliable tools to match Portra 400 or Fuji 400H looks across common wedding cameras — a niche within a niche that commands premium pricing.

Filmmakers require scene-referred workflow compatibility. The ACES gamut encompasses all visible light with more than 25 stops of exposure latitude, and the standard IDT → RRT → ODT pipeline is increasingly mandatory for Netflix-delivered content [^252^]. CINEGRADE LAB's CUBE LUTs operate correctly within this pipeline as Look Modification Transforms (LMTs), avoiding the color space inconsistencies that plague consumer-grade LUTs in professional workflows.

Content creators share a need for aesthetic currency — tools that produce trending looks with minimal learning curve. Viral social media aesthetics predict professional color trends 12–18 months in advance, making this segment a leading indicator for product development priorities. Brand teams prioritize consistency and throughput, with the Commercial Luxury and Luxury Editorial categories engineered for restrained parameter ranges that minimize variation across large batch workflows.

### 4.2 The 25-Category Taxonomy

The CINEGRADE LAB taxonomy organizes 25 categories into five functional clusters. Every category contains 5 presets/LUTs, yielding 125 XMP and 125 CUBE files. The naming convention follows a narrative specificity principle — users consistently pay 2–3x more for presets that evoke specific emotional memories than for technically equivalent generic looks. Presets carry names such as "Champagne Dusk" rather than "Warm Editorial 03," and "Hereditary Mood" rather than "Dark A24 Look."

#### 4.2.1 Luxury & Editorial Cluster

The Luxury & Editorial cluster encompasses three categories: **Luxury Editorial** (rich blacks, soft contrast, warm skin tones for high-end editorial photography), **Hyperreal Fashion** (punchy, saturated, flawless skin rendering for fashion editorials), and **Commercial Luxury** (polished, professional, product-ready aesthetic). This cluster addresses the premium market's universal preference for muted, desaturated tones over bright saturated colors — a pattern documented across luxury brand research, editorial fashion, and high-end wedding photography. The five defining traits of luxury color palettes are restraint, depth, one metallic accent, high whitespace, and cultural weight. The Luxury Editorial category specifically emulates the documentary-style fashion photography aesthetic associated with Juergen Teller and Tyrone Lebon — minimal retouching, natural skin texture, and candid moments over polished perfection. The Hyperreal Fashion category inverts this restraint, delivering the bold, vibrant, high-impact rendering required for runway and magazine cover work where visibility and commercial punch override subtlety.

#### 4.2.2 Cinematic Cluster

The Cinematic cluster comprises four categories: **Cinematic Shadows** (crushed blacks with teal shadows and warm highlights), **Netflix Inspired** (cinematic teal/orange with filmic qualities inspired by streaming content), **A24 Inspired** (artistic, unconventional, mood-driven looks), and **ARRI Alexa Look** (digital cinema natural skin tones with wide dynamic range emulation). This cluster represents the most technically demanding component of the library, requiring precise color space awareness and scene-referred workflow compatibility.

The Cinematic Shadows category implements the teal/orange split — the dominant cinematic color grading aesthetic in Hollywood — through scientifically informed hue manipulation. Teal/orange grading exploits opponent-process color theory: blue-yellow and red-green are opponent pairs in human vision, and separating skin tones (warm/orange) from environments (cool/teal) creates maximum perceptual color contrast [^199^]. The A24 Inspired category encodes a quantifiable aesthetic signature that has become a distinct commercial category: lifted shadows (+12), muted primaries (saturation ~78%), fine grain (14–20), and olive/ochre split toning (Shadow #283828, Highlight #d4c8a0) [^469^]. The ARRI Alexa Look category emulates the "gold standard" digital cinema color science that Phantom LUTs and professional colorists calibrate against — legendary for its organic skin tones, cinematic highlight roll-off, and wide dynamic range rendering [^2^].

#### 4.2.3 Film Emulation Cluster

The Film Emulation cluster contains four categories: **Kodak Portra Emulation** (warm skin tones, soft contrast, fine grain), **Fuji 400H Emulation** (pastel tones, green shadows, airy feel), **CineStill 800T Emulation** (tungsten balance, halation glow, night film characteristics), and **Bleach Bypass** (silver retention, high contrast, desaturated). This cluster is anchored by Kodak Portra 400, which research across the professional photography and fashion editorial dimensions confirms as the universal skin tone reference standard [^4^] [^12^].

| Film Stock | Skin Tone Rendering | Shadow Character | Signature Color Trait | Grain Quality |
|-----------|-------------------|-----------------|---------------------|--------------|
| Kodak Portra 400 | Warm, peachy, luminous | Deep but detailed, lifted blacks (~+15) | Warm greens, soft cyan-blues | Very fine T-grain |
| Fuji Pro 400H | Soft pink-green, pastel | Lifted, almost washed-out | Muted foliage, cool greens | Fine, delicate |
| CineStill 800T | Neutral-to-cool under daylight | High contrast, tungsten-shifted | Signature halation glow (red-orange) | Moderate, cinematic |
| Bleach Bypass | Stark, desaturated | Deep blacks, silver retention | Metallic sheen, high contrast | Enhanced, gritty |

The technical implementation of each emulation targets the defining characteristics of the source stock. Portra 400 emulation prioritizes the T-grain structure — tabular grain technology producing remarkably fine grain for ISO 400, finer than Kodak Gold 200 despite the higher speed rating. Fuji 400H emulation captures its distinctive greenish-pink midtone cast that renders skin with a soft, romantic quality, along with its characteristic muted foliage handling that prevents backgrounds from competing with subjects. CineStill 800T emulation replicates the stock's signature halation — the red-orange glow around bright highlights caused by light passing through the emulsion, reflecting off the film base, and re-exposing the emulsion from behind. The digital halation simulation algorithm employed thresholds bright regions, applies exponential kernel blur (not Gaussian) for natural light bleeding, redshifts the result by approximately [1.0, 0.05, 0.02] in RGB space, and composites back to the original image [^296^]. Bleach bypass emulates the photochemical process of skipping the bleach bath during processing, leaving silver halides intact alongside dye clouds to produce the characteristic high-contrast, desaturated, metallic-sheen appearance used in films such as *Saving Private Ryan* and *Fight Club*.

#### 4.2.4 Aesthetic Cluster

The Aesthetic cluster includes four categories: **Cyberpunk Cinema** (cyan/magenta split with high contrast), **Night Neon** (neon glow enhancement and deep shadow work), **Neo Noir** (dramatic shadows, high contrast), and **Dark Instagram Mood** (desaturated, crushed blacks, cool tones). This cluster serves converging demand from cyberpunk visual culture, CineStill 800T night photography, and neon noir cinematography — all sharing the common use case of night and low-light color grading.

The Cyberpunk Cinema category implements the cyan/magenta split drawn from *Blade Runner* (1982) and *Blade Runner 2049* (2017). Night Neon addresses highlight rolloff for neon signs, skin tone preservation under artificial light, and noise-friendly tonal shaping. Neo Noir translates classic film noir high-key lighting into contemporary digital grading. Dark Instagram Mood captures the "fashionably numb" desaturation trend dominating social media aesthetics since 2022.

#### 4.2.5 Utility Cluster

The Utility cluster comprises five categories for high-frequency professional workflows: **Dreamy Wedding** (soft, romantic, warm highlights with pastel tones), **Luxury Travel** (golden hour tones, rich landscapes), **Clean Creator Economy** (bright, clean, modern aesthetic), **Music Video Looks** (stylized, dramatic, high-impact), and **Minimal Scandinavian** (clean, bright, muted, airy). Dreamy Wedding is engineered for flattering skin tones across diverse complexions with gentle highlight rolloff for white dress detail retention. Luxury Travel targets golden hour content with believable saturation. Clean Creator Economy serves brand-safe content for algorithm-driven platforms. Music Video Looks delivers performance-ready stylization for rapid turnaround timelines. Minimal Scandinavian implements the Nordic design aesthetic that has become a global signifier of understated sophistication.

### 4.3 Technical Specifications

#### 4.3.1 XMP Format: Adobe Camera Raw v15.0+

CINEGRADE LAB XMP presets are encoded for Adobe Camera Raw v15.0+, utilizing Process Version 11.0 with full `crs:` namespace declarations. The XMP format stores preset parameters as structured XML metadata that Adobe applications apply to RAW development pipelines. Process Version 11.0 ensures presets render identically across Lightroom Classic, Lightroom CC, Lightroom Mobile, and Adobe Camera Raw.

Each XMP preset encodes a comprehensive parameter set across six functional domains:

| Parameter Domain | Specific Adjustments | Count | Creative Function |
|-----------------|---------------------|-------|-------------------|
| Basic Adjustments | Exposure, Contrast, Highlights, Shadows, Whites, Blacks, Texture, Clarity, Dehaze, Vibrance, Saturation | 11 | Global tonal and presence correction |
| Tone Curve | Parametric curve (Highlights, Lights, Darks, Shadows) + Point curve (RGB independent) | 2 | Contrast shaping and film-like rolloff |
| Color Grading | Shadows wheel, Midtones wheel, Highlights wheel, Blending, Balance | 5 | Split toning with midtone isolation |
| HSL / Color | Hue, Saturation, Luminance per 8 color ranges | 3 | Selective color targeting and skin tone protection |
| Calibration | Red Primary, Green Primary, Blue Primary (Hue + Saturation each) | 6 | Camera profile-level color science adjustment |
| Effects & Detail | Grain, Vignette, Sharpening, Noise Reduction, Lens Corrections | 4+ | Finishing texture and optical correction |

The total parameter count exceeds 31 discrete values per preset, though the exact count varies by category — film emulation presets include more grain and tone curve parameters, while utility presets emphasize basic adjustments and HSL targeting. The Color Grading wheels (Shadows, Midtones, Highlights) represent a critical technical advantage over simpler split toning implementations: each wheel controls both hue and saturation within its respective tonal range, with the Blending and Balance sliders controlling interaction between ranges. This three-wheel architecture enables the subtle color separation that defines cinematic looks — for instance, the A24 Inspired preset's characteristic olive shadow / ochre highlight split requires independent midtone control that two-way split toning cannot achieve.

Profile-based design, as implemented by RNI All Films, represents an alternative technical approach that operates below the slider level for more nuanced emulation [^4^]. CINEGRADE LAB preserves slider-based construction so adjustments remain available for user creative edits after preset application, and parameter transparency enables educational content that explains the color science behind each look — a key component of the YouTube tutorial discovery channel that drives near-zero marginal customer acquisition cost in the preset market.

#### 4.3.2 CUBE Format: 3D LUT, 33×33×33 Lattice

CINEGRADE LAB CUBE LUTs are distributed in the industry-standard `.cube` format, compatible with DaVinci Resolve, Premiere Pro, Final Cut Pro, After Effects, Baselight, Scratch, SmallHD monitors, and Atomos recorders [^22^]. Each LUT implements a 33×33×33 lattice — the production-quality standard recommended by RED Digital Cinema and used as the default in DaVinci Resolve [^26^].

A 33×33×33 3D LUT contains 35,937 discrete RGB triplets ($33^3 = 35,937$), each defining an output color value for a specific coordinate in the input color cube. The lattice samples the RGB color space uniformly: each R, G, and B channel is divided into 32 intervals, with lattice points at each intersection. For any input color that does not fall exactly on a lattice point, the output is computed through interpolation. Tetrahedral interpolation — the algorithm used by DaVinci Resolve, OpenColorIO, and CINEM8 — is employed as the reference standard [^27^]. Tetrahedral interpolation divides the color cube containing the input color into tetrahedra and interpolates using only the four vertices of the containing tetrahedron, limiting the influence of distant lattice points and reducing artifacts in areas with high-dynamic color variations. Industry and academic reports recommend tetrahedral interpolation over trilinear for 3D LUTs due to better numerical behavior at equivalent resolution [^269^].

The CUBE format stores color values as floating-point numbers between 0 and 1, with a file header specifying lattice size (`LUT_3D_SIZE 33`) and domain boundaries (`DOMAIN_MIN` and `DOMAIN_MAX`, typically 0.0 to 1.0). This self-describing structure enables universal compatibility without format conversion.

While 65×65×65 lattices (274,625 triplets) are available for HDR workflows, the 33×33×33 standard represents the optimal balance of precision, file size, and computational performance for the prosumer target segment. For HDR workflows targeting Rec.2020 PQ or Dolby Vision, the library provides 65×65×65 variants as premium tier upgrades.

#### 4.3.3 Parameter Completeness: 23+ Adjustments Per Preset

The parameter completeness of CINEGRADE LAB presets significantly exceeds industry norms. Consumer-grade presets typically adjust 3–7 sliders, leaving substantial creative work to the user. Premium competitors such as Mastin Labs and RNI employ profile-based approaches that operate below the slider level. CINEGRADE LAB occupies a middle position: comprehensive slider-based parameter sets that encode complete creative looks while preserving editability.

The 23+ parameter minimum per preset ensures each tool delivers a finished aesthetic without requiring extensive post-application adjustment — addressing the "Tweak Trap" identified as the core pain point of static presets. Market data indicates that 68% of professional photographers have adopted AI tools because static presets require extensive manual adjustment on each application [^1^]. CINEGRADE LAB mitigates this friction through parameter depth: a preset that simultaneously adjusts exposure compensation, tone curve shape, three color grading wheels, HSL targeting, and calibration primaries produces results requiring minimal additional tweaking across diverse source images.

#### 4.3.4 Category-Specific Color Transforms

Each category cluster implements distinct mathematical color transforms optimized for its creative domain. These transforms are not merely stylistic preferences but structurally different approaches to color manipulation.

**Teal/Orange Split (Cinematic Shadows, Netflix Inspired, Teal & Orange Modern).** This transform pushes shadows toward cool cyan/teal while steering skin tones and highlights toward warm orange/amber. The implementation operates through HSL selective adjustment: cyan hue is shifted toward teal, blue shadows are enhanced through a reverse S-curve, and orange saturation is boosted while competing greens and magentas are pulled back [^199^]. Color Grading wheels reinforce the separation — Shadows adds blue-green, Highlights adds warm amber, Balance at 40–60 favors shadow toning. The result exploits opponent-process color vision: blue-yellow and red-green receptor pairs create maximum perceptual separation when skin tones are pushed opposite environmental tones [^247^].

**Film Tone Curves (Kodak Portra Emulation, Fuji 400H Emulation, Analog Film).** Film tone curves feature three distinctive elements: lifted blacks (far-left anchor raised 5–10% to remap pure black to dark gray), creamy highlight rolloff (top-right anchor pulled down to soften specular highlights), and an S-curve in midtones that increases contrast without crushing shadows [^194^]. Portra 400 targets a matte value of 8–12 and shadow lift of +10 to +20, producing the "milky shadow" quality. Fuji 400H employs a gentler S-curve with a subtle green-magenta tint axis shift producing its characteristic pastel quality [^4^].

**Cyberpunk Neon Boost (Cyberpunk Cinema, Night Neon).** This transform implements a cyan/magenta split fundamentally different from teal/orange. Where teal/orange separates warm skin from cool environments, cyberpunk cyan/magenta creates chromatic tension within the image itself. The transform pushes cyan hues toward electric blue, boosts magenta saturation in mid-brightness regions, and applies aggressive shadow crushing while preserving neon-range luminance values (typically 60–85% IRE). The HSL layer specifically targets the cyan hue range for maximum shift while protecting skin tone frequencies from contamination. Noise-friendly tonal shaping is achieved through reduced clarity values and careful dehaze application to avoid exaggerating digital noise in shadow regions.

**A24 Olive/Ochre Split (A24 Inspired).** This transform implements the quantifiable aesthetic signature that defines A24's visual identity: lifted shadows (+12), muted saturation (~78%), matte blacks (10), and fine grain (14–20). The signature split tone applies olive green (#283828) to shadows and warm ochre (#d4c8a0) to highlights [^469^]. The mathematical implementation differs from standard split toning by using the Color Grading Midtones wheel to add a subtle warm-neutral center, preventing the image from feeling either too cool or too warm. The result prioritizes naturalism and imperfection — saturation is reduced uniformly rather than selectively, creating the "limited palette" aesthetic where scenes work within 2–3 color families rather than exploiting full-spectrum contrast.

**Halation Simulation (CineStill 800T Emulation).** True halation simulation requires wavelength-dependent light scatter modeling rather than the crude Gaussian blur overlays employed by most consumer plugins. The CINEGRADE LAB implementation follows the physically informed algorithm: threshold the image to isolate bright regions above 60–70% luminance, apply exponential kernel blur (sigma ~20 pixels at 1080p equivalent) for natural light bleeding, redshift the blurred layer by multiplying RGB channels [1.0, 0.05, 0.02] to replicate the characteristic red-orange halation glow, and composite back to the original with weighted blending [^296^]. This approach was validated in cinema production by Steve Yedlin's proprietary halation algorithms for *Knives Out* (2019), which specifically added "unease and tactility" through accurate digital halation [^2^].

The technical architecture is designed for extensibility. As the LUT market evolves toward the projected $758.5 million by 2033 [^1^], the modular category structure enables rapid addition of new aesthetic domains. Dual-format distribution (XMP + CUBE) ensures new categories automatically serve both photography and video workflows, while parameterized construction enables AI-assisted customization tools that treat each preset as a starting point for intelligent adaptation.
