## 6. Cinematic LUT Library: 125 CUBE

The CINEGRADE LAB collection ships 125 discrete 3D LUTs in the industry-standard .cube format, distributed across 25 stylistic categories. Where the companion XMP preset library targets RAW photography workflows in Adobe Lightroom and Camera Raw, the CUBE library is engineered for motion-picture pipelines: DaVinci Resolve, Adobe Premiere Pro, Final Cut Pro, OBS Studio, FFmpeg, and any application accepting an IRIDAS-format 3D LUT. The global market for cinematic LUTs reached USD 312.8 million in 2024 and is projected to expand at a 10.4% compound annual growth rate through 2033 [^1^]. Within this landscape, CINEGRADE LAB positions its CUBE collection as a prosumer-tier product bridging the gap between $7–$50 consumer LUT packs and the $300-plus professional plugin ecosystem occupied by Dehancer and ARRI Film Lab. The following sections document the design methodology, category-specific engineering, and technical specification defining the 125 CUBE library.

### 6.1 LUT Design Methodology

Every LUT in the collection is constructed from a stack of real color transforms rather than approximate color shifts. The design philosophy treats each .cube file as a deterministic mathematical function mapping input RGB values to output RGB values through calibrated operations, producing transforms that are reversible, quantifiable, and compatible with scene-referred color-managed workflows.

#### 6.1.1 Real Color Transforms: Exposure, Gamma, Contrast Curve, Saturation, and Hue Remapping

The foundational transform stack applied across all 125 LUTs consists of four ordered operations: exposure and gamma adjustment, contrast curve shaping, saturation modulation, and hue remapping.

Exposure and gamma adjustment corrects the input luminance distribution to a neutral working space. The gamma curve is a piecewise function with a linear slope at the bottom (a "kink" near zero) and a gamma-2.4 response through midtones and highlights, closely matching the sRGB electro-optical transfer function [^273^]. This prevents dark-pixel calculation inaccuracies that accumulate through multiple linearization steps in modern pipelines. Exposure offset is calibrated per-category: film emulation LUTs receive a +0.15 to +0.25 stop lift to emulate scanned negative density, while moody LUTs receive a −0.10 to −0.20 stop reduction to deepen shadow anchors.

Contrast curve shaping employs a parametric S-curve with variable pivot. The S-curve increases perceived contrast by darkening shadow tones and brightening highlights [^195^]; the pivot control sets the fulcrum around which expansion occurs [^205^]. CINEGRADE LAB LUTs use pivot values ranging from 0.40 (high-contrast looks: Neo Noir, Bleach Bypass) to 0.52 (low-contrast looks: Fuji 400H Emulation, Dreamy Wedding). Film-emulation categories incorporate a matte lift on the left anchor point (pure black remapped to 3–8% luminance), replicating the compressed dynamic range of vintage print stocks [^194^].

Saturation modulation is applied after contrast shaping so luminance changes do not artificially inflate color intensity. Global saturation multipliers range from 0.65 (Moody Documentary) to 1.25 (Hyperreal Fashion), with selective HSL adjustments targeting specific hue ranges. The hue remapping stage rotates selected color vectors for category-specific separation: Teal & Orange Modern LUTs rotate cyan hues toward teal (−12°) and orange hues toward amber (+8°), exploiting the opponent-process color response of human vision [^199^][^247^].

| Transform Stage | Parameter Range | Cinematic Purpose | Applied Categories |
|---|---|---|---|
| Exposure offset | −0.20 to +0.25 stops | Density matching; shadow deepening | All (category-calibrated) |
| Gamma curve | Piecewise: linear kink + gamma 2.4 | Dark-pixel accuracy through pipeline [^273^] | All |
| Contrast pivot | 0.40–0.52 | S-curve fulcrum; lower = more contrast [^205^] | All (category-calibrated) |
| Matte lift (black point) | 0.03–0.08 | Film fade; remaps pure black to dark gray [^194^] | Film emulation, vintage |
| Global saturation | 0.65×–1.25× | Mood calibration | All (category-calibrated) |
| Hue rotation | ±15° per hue range | Color separation, skin-tone isolation [^199^] | Teal/Orange, Cyberpunk, Film |

The transform stack produces CIEDE2000 color differences (ΔE₀₀) within the imperceptible-to-minor range (ΔE₀₀ < 2.0) for neutral grays, ensuring no unwanted color cast in balanced footage [^269^]. ΔE₀₀ remains the standard metric correlating with human perceptual judgments for LUT quality assessment [^269^].

#### 6.1.2 Film Matrix Approach: Portra Warmth, CineStill Halation, Bleach Bypass Silver Retention

Film emulation LUTs are constructed using a film matrix approach modeling specific photographic stocks' dye-layer spectral sensitivity. Each emulation derives a 3×3 color matrix and offset vector governing cross-talk between channels — a property that simple hue/saturation adjustments cannot replicate.

Kodak Portra emulation targets the warm, creamy skin-tone rendering of Portra 160, 400, and 800. The Portra matrix increases red-to-green cross-talk by approximately 8% and reduces blue-channel separation in midtones, producing the stock's characteristic ivory highlight quality. Shadow tones are warmed through an offset vector of (0.04, 0.02, −0.03) in normalized RGB, while saturation is reduced 15–20% globally.

CineStill 800T emulation addresses halation — the red-orange glow around bright highlights caused by light reflecting off the film base and re-exposing the emulsion [^250^]. Since a static 3D LUT cannot fully simulate spatial diffusion, the CineStill LUTs incorporate a highlight compression curve that approximates exposure-dependent bloom. The red channel in highlights is boosted 12–18% relative to green and blue, creating a warm halo approximation. For full halation simulation, users may pair these LUTs with a post-process bloom filter using an exponential kernel with redshift multiplier [1.0, 0.05, 0.02] [^296^].

Bleach bypass emulation models silver retention, increasing contrast 25–35% through a steeper S-curve, reducing global saturation to 70–75%, and applying luminance-dependent desaturation in highlights that mimics silver's neutral reflectance.

| Emulation Target | Key Matrix Property | Saturation Change | Signature Highlight Behavior | LUTs in Collection |
|---|---|---|---|---|
| Kodak Portra 160/400/800 | +8% red-green cross-talk; warm midtone offset | −15 to −20% | Creamy, warm skin-tone rolloff | 5 LUTs (Portra_160_000 through Portra_Skin_004) |
| CineStill 800T | Red boost +12–18% in highlights; tungsten WB | −10 to −15% | Warm halation approximation; tungsten neutrals | 5 LUTs (800T_Tungsten_000 through Night_Still_004) |
| Bleach Bypass | High-contrast S-curve (+25–35%); luminance desaturation | −25 to −30% | Metallic silver sheen; near-black shadows | 5 LUTs (Silver_Keep_000 through Bypass_Hard_004) |

The Portra emulation achieves an average ΔE₀₀ of 3.2 against target film-scan colors — within the acceptable range for creative emulation, where deviation reflects film processing variability [^211^].

#### 6.1.3 Shadow Mapping and Highlight Compression for Cinematic Tonal Behavior

Cinematic tonal behavior is defined by extreme-luminance treatment. CINEGRADE LAB LUTs employ tonal mapping that preserves detail while compressing toward cinematic targets.

Shadow mapping uses a three-zone approach. Zone 1 (0–5% input luminance) is lifted or crushed by category: Moody Documentary and Neo Noir LUTs crush to near-zero, while Film Emulation and Dreamy Wedding LUTs lift to 3–5% [^194^]. Zone 2 (5–20%) receives the primary shadow color cast — teal for Cinematic Shadows, warm amber for Luxury Travel, neutral for Minimal Scandinavian. Zone 3 (20–40%) transitions into midtones through a soft knee preventing visible banding.

Highlight compression addresses the most common failure mode of generic LUTs: clipped skin-tone highlights. The highlight curve pulls the top-right anchor point slightly downward for creamy, film-like rolloff [^194^]. Compression begins at 80–85% input luminance, reaching maximum at 98–100%. The ratio varies: A24 Inspired and Film Emulation LUTs use gentle 1.5:1 compression, while Commercial Luxury and Music Video Looks use 2.5:1 for a broadcast-safe finish. The combined shadow and highlight mapping produces a characteristic "S-curve with lifted toe and compressed shoulder" matching the density response of interpositive/internegative film stocks in theatrical distribution — the reason film-emulation LUTs on properly exposed log footage can approach the perceptual quality of scanned film.

### 6.2 Category-Specific LUT Engineering

The 125 LUTs are organized into 25 categories of 5 LUTs each, with every category representing a distinct color engineering philosophy. The five LUTs within a category are variants (intensity levels, lighting-condition adaptations, stylistic shifts) rather than unrelated looks.

#### 6.2.1 Teal/Orange LUTs: Shadow and Highlight Color Targets

The Teal & Orange Modern and Cinematic Shadows categories exploit the teal/orange complementary scheme at different intensities. Teal/orange grading pushes shadows toward cool cyan/teal while steering skin tones and highlights toward warm orange/amber, creating perceptual color contrast the human visual system processes as dimensional [^199^].

Engineering targets specific RGB values: shadow tones shift toward teal at approximately (0.08, 0.28, 0.35) in normalized RGB — a saturated blue-green retaining luminance information. Highlights and skin-tone ranges shift toward orange at approximately (0.95, 0.65, 0.25), flattering human skin across complexions. The critical constraint is maintaining the vectorscope skin-tone line (between red and yellow targets) while pulling shadows toward cyan; if teal encroaches on skin-tone ranges, complexions become sallow [^244^].

Cinematic Shadows variants apply the teal shift aggressively in the deepest shadows (below 10% luminance), producing the "Obsidian Teal" and "Abyss Glow" looks where shadow regions approach monochromatic blue-green. Teal & Orange Modern variants distribute the teal shift more evenly across the shadow-to-midtone range, producing the balanced blockbuster aesthetic of contemporary streaming content.

#### 6.2.2 Film Emulation LUTs: Tone Curve, Saturation Reduction, and Color Cross-Talk

Film emulation LUTs — Analog Film, Kodak Portra Emulation, Fuji 400H Emulation, Vintage Film Lab, and CineStill 800T Emulation — share a common engineering base. The tone curve is defining: unlike digital sensors' sharp linear response, photographic film exhibits a characteristic toe (gentle shadow slope), shoulder (highlight compression), and linear midsection. Kodak Portra variants use a softer shoulder for creamy highlights; CineStill 800T variants use a more pronounced shoulder for tungsten-balanced negative response.

Saturation reduction of 15–25% is applied globally because film dye layers have inherently lower color purity than digital RGB [^274^]. Reduction is not uniform: red and green are desaturated more than blue, matching color negative spectral sensitivity. Color cross-talk is introduced through off-diagonal matrix terms modeling physical light exposure across adjacent dye layers — producing the "muddy but beautiful" response digital systems cannot natively reproduce.

The Fuji 400H Emulation category represents a distinct philosophy. Fuji Pro 400H is characterized by pastel tones, a slight green shadow bias, and an airy quality differing from Portra's warmth. The Fuji matrix introduces a +5% green offset in shadows and −8% red reduction in midtones, producing the signature "mint" shadow quality and pink-tinted highlights prized by fine-art wedding photographers.

#### 6.2.3 Cyberpunk LUTs: Cyan and Magenta Channel Enhancement

The Cyberpunk Cinema and Night Neon categories engineer electric, high-energy imagery through channel-specific enhancement rather than the film-emulation approach of saturation reduction.

Primary engineering targets are cyan (approximately 0, 0.8, 0.9 normalized RGB) and magenta (approximately 0.9, 0, 0.8). These colors sit near Rec.709 gamut extremes and exploit opponent-process visual response, producing maximum perceptual separation when adjacent [^247^]. Cyberpunk Cinema LUTs apply a split-tone structure: shadows below 25% luminance shift toward deep cyan, highlights above 75% shift toward magenta, with a neutral midtone zone protecting skin tones.

Neon sign handling includes gamut-limiting logic mapping out-of-gamut colors to the nearest in-gamut equivalent while preserving luminance — preventing unpredictable hue shifts from LED and vapor lamp sources. Night Neon category LUTs add luminance weighting to cyan and magenta ranges, making neon elements "pop" against dark backgrounds. Contrast pivots sit at 0.40–0.42 with minimal matte lift, preserving deep blacks as canvas for neon effects and controlled shadow crushing below 0.05 eliminating noise in night footage.

#### 6.2.4 Moody LUTs: Black Crushing, Shadow Lifting, and Midtone Desaturation

Moody LUTs — Moody Documentary, Neo Noir, Dark Instagram Mood, and A24 Inspired — engineer emotional register through tonal and chromatic suppression.

Black crushing is applied below 0.05 (5% input luminance), where values map to zero or near-zero. Moody LUTs eliminate the lifted toe entirely, producing the "void black" of contemporary dark aesthetics. The A24 Inspired category uses variable black crush preserving a whisper of detail at 2–3% luminance — enough to suggest shadow texture without resolving it, matching the lifted-shadows-plus-muted-primaries aesthetic of the arthouse studio's visual signature.

Shadow lifting in the 5–20% range introduces subtle casts: A24 Inspired LUTs apply olive/ochre split tone (olive shadows, ochre highlights) producing the muted, autumnal palette of *Midsommar* (2019) and *The Green Knight* (2021). Neo Noir LUTs apply neutral-to-cool shadow lift preserving high-contrast chiaroscuro with modern digital sharpness.

Midtone desaturation is the defining chromatic operation. Global saturation drops to 70–80%, with additional desaturation targeting green and yellow. The Moody Documentary category pushes furthest to 65% with a slight green shadow bias for the gritty photojournalistic aesthetic.

| Category Family | Shadow Target RGB | Highlight Target RGB | Saturation | Contrast Pivot | Black Treatment |
|---|---|---|---|---|---|
| Teal/Orange | (0.08, 0.28, 0.35) — teal | (0.95, 0.65, 0.25) — orange | 85–95% | 0.43–0.46 | Normal |
| Film Emulation | Warm/cool offset per stock | Creamy rolloff per stock | 75–85% | 0.48–0.52 | Matte lift 3–8% [^194^] |
| Cyberpunk | (0, 0.8, 0.9) — cyan | (0.9, 0, 0.8) — magenta | 100–110% | 0.40–0.42 | Hard crush below 0.05 |
| Moody | Olive/cool per variant | Ochre/warm per variant | 65–80% | 0.42–0.46 | Crush below 0.05; lift 5–20% |

These four families represent the majority of the 125 LUT collection. Additional categories (Luxury Editorial, Dreamy Wedding, Hyperreal Fashion, Minimal Scandinavian, etc.) represent hybrid or specialized applications of these base engineering approaches.

### 6.3 CUBE Technical Specification

All 125 LUTs conform to the IRIDAS .cube format, the industry-standard 3D LUT specification used by DaVinci Resolve, Premiere Pro, Final Cut Pro, and professional color grading software [^22^].

#### 6.3.1 Header Format: TITLE, LUT_3D_SIZE, and 35,937 RGB Triplets

CINEGRADE LAB .cube files use a standardized header. The TITLE keyword identifies the LUT name for software browsers. LUT_3D_SIZE specifies lattice resolution: all CINEGRADE LAB LUTs use 33×33×33 (LUT_3D_SIZE 33), producing 35,937 RGB triplets. This is the industry-standard post-production resolution, balancing precision against file size [^23^][^26^]. RED recommends 33×33×33 as the minimum for IPP2 creative LUTs; higher-end workflows may use 65×65×65 (274,625 triplets) for HDR finishing, but 33×33×33 provides sufficient precision for SDR delivery with tetrahedral interpolation [^22^].

Triplets are ordered with blue index changing fastest, then green, then red. Each line contains three space-separated floating-point values. The first triplet corresponds to input RGB (0, 0, 0); the last to (1, 1, 1). Intermediate values are interpolated by the host application.

#### 6.3.2 Value Range: Floating-Point 0.0–1.0 with Proper Formatting

All values are normalized to 0.0–1.0 floating-point range; out-of-range values are clipped during generation. Formatting uses six decimal digits (e.g., "0.823451"), providing sufficient granularity for subtle film-emulation shifts while maintaining readability. Each 33×33×33 file occupies approximately 1.1 MB.

The floating-point range ensures compatibility with both video-range (16–235) and full-range (0–255) workflows. CINEGRADE LAB LUTs are designed for full-range input; users with video-range footage must ensure correct range mapping in their host application.

Interpolation behavior varies by host. DaVinci Resolve and OpenColorIO use tetrahedral interpolation by default — limiting influence to four nearest lattice vertices, producing smoother gradients with fewer artifacts [^22^][^27^]. Tetrahedral interpolation preserves pure grayscale more accurately than trilinear, which can introduce subtle color shifts in neutrals [^278^].

#### 6.3.3 Compatibility Matrix: DaVinci Resolve, Premiere Pro, Final Cut Pro, OBS, FFmpeg

The .cube format's universal acceptance makes it the most compatible LUT distribution format available. CINEGRADE LAB tests all 125 LUTs against the following application matrix.

| Application | Version Tested | LUT Loading Method | Default Interpolation | Compatibility |
|---|---|---|---|---|
| DaVinci Resolve | 18.x–19.x | Color Management → LUTs folder, or node-based | Tetrahedral [^22^] | Full — reference platform |
| Adobe Premiere Pro | 2024–2025 | Lumetri Color → Creative → Look | Trilinear (tetrahedral available) | Full |
| Final Cut Pro | 10.7.x | Effects → Color → LUT; Color Board | Tetrahedral (via Core Image) | Full |
| OBS Studio | 30.x–31.x | Filters → Apply LUT → browse to .cube | Trilinear | Full — SDR only |
| FFmpeg | 6.x–7.x | `-vf lut3d=file=lut.cube` | Trilinear | Full — command-line |
| Avid Media Composer | 2024.x | Source Settings → Color Encoding → LUT | Trilinear | Verified |
| Baselight | 5.x | Import via FLUX manage; layer stack | Tetrahedral | Verified |
| SmallHD/Atomos | Firmware 2024+ | Load via SD card/USB; monitoring | Hardware tetrahedral | Verified |

DaVinci Resolve is the reference platform, offering the most complete color management and tetrahedral interpolation by default [^22^]. Professional colorist Noam Kroll's recommended workflow — balancing shots first, then auditioning creative LUTs as final-node applications before fine-tuning — aligns with CINEGRADE LAB's intended usage [^3^].

For ACES (Academy Color Encoding System) pipelines, CINEGRADE LAB LUTs can be applied as Look Modification Transforms (LMTs) within the standard transform chain: IDT → CDL → LMT → [RRT] → ODT [^35^]. In DaVinci Resolve, this requires exporting LUTs without embedded Input or Output Device Transforms, allowing Resolve's ACES color management to handle camera-specific and display-specific conversions [^45^]. The ACES gamut encompasses all visible light with over 25 stops of latitude, making it the preferred working space for maximum fidelity and archival masters [^252^]. As HDR delivery becomes more prevalent across streaming platforms, scene-referred workflow compatibility positions the CINEGRADE LAB collection for workflows beyond standard Rec.709 output.

The 125 CUBE LUTs collectively represent a comprehensive cinematic color toolkit. Where individual categories target specific outcomes — the warmth of Portra, the electricity of cyberpunk neon, the gravitas of A24 arthouse cinema — the shared engineering foundation of real color transforms, film-matrix emulation, and cinematic tonal mapping ensures every LUT functions as a professional-grade color instrument. The .cube format's universal compatibility means these transforms travel through any stage of the modern production pipeline, from on-set monitoring to final HDR delivery, without degradation.
