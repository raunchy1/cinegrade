## 5. Premium Preset Library: 125 XMP

### 5.1 Preset Design Methodology

#### 5.1.1 Profile-based design vs slider-based: technical moat and cross-camera consistency

The CINEGRADE LAB preset collection employs a hybrid architecture integrating profile-based color transformation with precision slider calibration. Profile-based presets operate at the RAW interpretation level before any slider enters the pipeline, leveraging hidden data within RAW files to achieve film-like highlight compression that prevents clipping regardless of push intensity [^17^] [^37^]. This approach, pioneered by RNI All Films 5 and The Archetype Process, assigns a color profile — essentially a lookup table — adjustable in strength while leaving all Lightroom sliders available for creative edits [^34^]. Camera-specific profiling ensures consistent rendering across Canon, Nikon, Sony, and Fuji bodies by calibrating to each sensor's unique RAW characteristics [^35^].

CINEGRADE LAB extends this principle through two-stage transformation: the profile first normalizes RAW data into a predictable working space; calibrated slider adjustments — 15 to 35 individual parameters per preset — then sculpt the aesthetic identity against that normalized base. The combination yields a technical barrier entry-level creators cannot replicate without calibration hardware and colorimetric measurement equipment. DVLOP's ISO-adaptive technology represents the state of the art: grain and tonal settings automatically adjust based on the image's native ISO, eliminating the "Tweak Trap" of static presets [^24^] [^38^]. CINEGRADE LAB embeds equivalent camera-aware metadata within each XMP file for conditional parameter loading.

| Dimension | Profile-based approach | Slider-only approach | CINEGRADE LAB hybrid |
|---|---|---|---|
| **Processing stage** | RAW interpretation level [^34^] | Post-debayer adjustment | Two-stage: profile + slider |
| **Highlight behavior** | Film-like compression, no clipping [^37^] | Static curve, clip-prone | Profile-managed rolloff |
| **Cross-camera consistency** | Camera-profiled, calibrated [^35^] | Generic, variable results | Camera-conditional metadata |
| **ISO adaptation** | ISO-adaptive grain/tonal [^38^] | Static regardless of ISO | Embedded ISO sensitivity tables |
| **Slider availability** | All sliders free for editing [^17^] | Locked by preset values | Profile locked, sliders adjustable |
| **Piracy resistance** | Harder to reverse-engineer | Trivial to extract | Profile + encrypted metadata |
| **Technical barrier** | Requires calibration hardware | Software only | Calibration + colorimetric validation |

The hybrid approach positions the collection above the consumer tier (USD 7–50) while maintaining the accessibility that professional plugins above USD 300 sacrifice. The premium preset market spans USD 59–200 per pack, with RNI All Films 5 Pro at USD 192 and DVLOP creator packs at USD 200 occupying the upper bound through profile-based differentiation [^1^] [^2^].

#### 5.1.2 Naming convention: cinematic emotional specificity

Each preset name evokes a specific emotional and visual context rather than a generic functional descriptor. Academic research on nostalgia psychology confirms users pay 2–3x more for presets triggering specific memories — "summer 1995" rather than "warm vintage" — because the purchase functions as an identity signal as much as a technical tool [^PMC12824257^]. Peter McKinnon's "Fade Out" and "Kodak Killer" demonstrate that narrative specificity drives memorability and perceived value [^32^].

The CINEGRADE LAB naming system operates on three tiers: an *evocative adjective* establishing atmosphere ("Nocturne," "Velvet," "Champagne"), a *descriptive noun* anchoring the look to a visual phenomenon ("Lux" for luminance, "Noir" for shadow), and a *three-digit index* (000–004) preserving sortability with underscore delimiters for cross-platform filename compatibility. The result — "Nocturne_Lux_000" — communicates sophistication and cinematic intent before the preset is applied.

#### 5.1.3 Parameter mapping: Exposure, Contrast, HSL, SplitToning, Grain, ColorGrade

Each of the 125 presets maps adjustments across eight parameter domains. The Exposure module calibrates luminance through `crs:Exposure2012` with adjustments from −0.50 to +0.70 EV depending on category intent. Contrast is shaped through both the `crs:Contrast2012` slider and parametric tone curves controlling shadow lift (0 to +22) and highlight compression (−30 to +5). The HSL panel provides 24 independent adjustments — Hue, Saturation, and Luminance each across eight color families (Red, Orange, Yellow, Green, Aqua, Blue, Purple, Magenta) — enabling per-channel precision for film stock emulation. Split toning is implemented through the Color Grading panel's three wheels (Shadows, Midtones, Highlights) with Hue, Saturation, and Luminance controls plus a Balance slider determining the crossover point between shadow and highlight toning [^203^]. Grain synthesis uses three parameters (Amount, Size, Frequency) producing organic texture distinct from digital noise, with values calibrated to match specific film stocks' T-grain characteristics.

### 5.2 Category Deep Dives

#### 5.2.1 Luxury Editorial: rich blacks, soft contrast, warm skin tones

The Luxury Editorial category — *Nocturne Lux*, *Velvet Noir*, *Opulence*, *Silk Embers*, and *Champagne Dusk* — targets the convergence between luxury wedding photography and editorial fashion, where lifted shadows, desaturated colors, and warm skin tones dominate [^13^]. Technical signatures include soft S-curves with black-point lifts of 10–15 points for "milky" shadow quality characteristic of medium-format film [^25^]. Skin tone handling follows Kodak Portra 400's neutral-to-warm science: reds that do not oversaturate toward orange, blues that remain clean and separate from greens [^KubusPhoto^]. Split toning applies warm amber to highlights (Hue 45–55°, Saturation 8–12) and cool teal to shadows (Hue 210–220°, Saturation 6–10), with the Balance slider weighted toward shadows to preserve editorial depth.

#### 5.2.2 Film Emulation: Kodak Portra, Fuji 400H, and CineStill 800T variants

Film emulation commands USD 82–200 per pack in the premium market, with dedicated companies achieving pricing through scientific accuracy in replicating specific film stocks [^25^]. The CINEGRADE LAB suite spans 15 presets across three subcategories.

The Kodak Portra subcategory — *Portra 160*, *Portra 400*, *Portra 800*, *Portra Warm*, and *Portra Skin* — reproduces T-grain emulsion's soft contrast and lifted blacks (+10 to +20). Portra 400 maintains restrained saturation where consumer films punch color; Portra 800 adds Vision2 motion-picture lineage for mixed lighting warmth [^KubusPhoto^] [^AdamInsights^]. The Fuji 400H subcategory — *Fuji Pastel*, *400H Soft*, *Pro Green*, *Fuji Air*, and *Sakura Tone* — targets the discontinued stock whose only remaining access is digital emulation. Three characteristics differentiate 400H: muted blue-green shadow rendering, a greenish-pink midtone cast that softens skin, and gentle foliage desaturation [^LegendaryPresets^]. The critical green-magenta tint axis runs +8 to +15 with slight overexposure (+0.3 to +0.5 EV) before application. The CineStill 800T subcategory — *800T Tungsten*, *CineStill Night*, *Halation Glow*, *Tungsten Film*, and *Night Still* — reproduces the remjet-less motion picture film where light reflects off the film base and re-exposes the emulsion from behind, creating the signature red-orange glow [^KubusPhoto^] [^Darkroom^]. Digital simulation employs the standard algorithm: threshold, exponential kernel blur, redshift by [1.0, 0.05, 0.02], and weighted blending [^296^].

| Preset Name | Category | Stock Basis | Key Emulation Target | Shadow Lift | Grain Level |
|---|---|---|---|---|---|
| Portra 160 | Kodak Portra | Kodak Portra 160 | Creamy highlights, fine grain | +10 | Fine, 18 |
| Portra 400 | Kodak Portra | Kodak Portra 400 | Skin tone neutrality, latitude | +12 | Fine, 20 |
| Portra 800 | Kodak Portra | Kodak Portra 800 | Mixed lighting warmth | +15 | Medium, 22 |
| Portra Warm | Kodak Portra | Pushed Portra 400 | Enhanced warmth, editorial | +14 | Fine, 19 |
| Portra Skin | Kodak Portra | Portra 400 (isolated) | Flattering all complexions | +11 | Fine, 17 |
| Fuji Pastel | Fuji 400H | Fujifilm Pro 400H | Blue-green shadow rendering | +18 | Fine, 16 |
| 400H Soft | Fuji 400H | Pro 400H overexposed | Creamy highlight rolloff | +20 | Fine, 15 |
| Pro Green | Fuji 400H | Pro 400H (green bias) | Muted foliage, soft skin | +16 | Fine, 18 |
| Fuji Air | Fuji 400H | Pro 400H (minimal) | Delicate, ethereal quality | +18 | Very fine, 14 |
| Sakura Tone | Fuji 400H | Pro 400H (pink-green) | Romantic portrait rendering | +15 | Fine, 16 |
| 800T Tungsten | CineStill 800T | CineStill 800T | Tungsten warmth, night accuracy | +8 | Medium, 25 |
| CineStill Night | CineStill 800T | CineStill 800T (pushed) | Enhanced halation, drama | +10 | Medium, 28 |
| Halation Glow | CineStill 800T | 800T (halation isolated) | Maximum halation simulation | +6 | Coarse, 30 |
| Tungsten Film | CineStill 800T | 800T (balanced) | Natural skin under tungsten | +9 | Medium, 24 |
| Night Still | CineStill 800T | 800T (subtle) | Soft night atmosphere | +7 | Fine, 22 |

Shadow lift values range from +6 to +20, reflecting divergent source stock characteristics — CineStill 800T's remjet-less base preserves deeper blacks, while Fuji 400H's lifted shadows require +18 to +20 adjustments [^LegendaryPresets^]. Grain levels track physical stocks' actual T-grain structures: Portra's fine ISO 400 grain receives lower values than CineStill's coarser motion-picture texture. The *Halation Glow* preset departs from strict accuracy to maximize the red-orange bloom for stylized night photography.

#### 5.2.3 Cinematic: Netflix, A24, and ARRI Alexa variants

The Netflix Inspired subcategory — *Stream Queen*, *Binge Night*, *Teal Drama*, *Series Glow*, and *Episode One* — replicates the platform's teal/orange grading. The base look exploits opponent color theory: blue-yellow and red-green opponent pairs make teal/orange separation the maximum perceptual contrast arrangement [^199^] [^247^]. Implementation pushes shadows toward cyan/teal (Hue 195–205°) while steering highlights toward warm amber (Hue 25–35°), with the tone curve applying a reverse S-curve to the blue channel [^183^].

The A24 Inspired subcategory — *Hereditary Mood*, *Moonlight Glow*, *Midsommar Haze*, *Ex Machina*, and *Green Knight* — targets the arthouse aesthetic quantified as: lifted shadows (+12 to +18), muted primaries at ~78% saturation, fine grain (14–20), and olive/ochre split toning [^Dim10^]. *Moonlight Glow* replicates the blue-teal monochrome of the Oscar-winning cinematography; *Midsommar Haze* introduces lifted blacks (+20) and reduced clarity (−15) for a dreamy, dissociated atmosphere.

The ARRI Alexa Look subcategory — *Alexa Log*, *ARRI Natural*, *Cinema Skin*, *Digital Film*, and *Alexa Wide* — emulates the industry-reference digital cinema camera. Presets apply the LogC-to-Rec.709 transformation with ARRI's hue twists: yellow toward orange (+5°), green toward teal (−8°), cyan toward blue (+6°).

| Preset Name | Category | Reference Source | Tonal Signature | Split Tone Highlights | Split Tone Shadows |
|---|---|---|---|---|---|
| Stream Queen | Netflix Inspired | Streaming teal/orange | Teal shadows, amber highlights | Orange, 30° / 12 | Teal, 200° / 10 |
| Binge Night | Netflix Inspired | Dark drama grading | Deep crushed blacks | Warm amber, 35° / 10 | Cyan, 195° / 14 |
| Teal Drama | Netflix Inspired | Drama series look | Maximum teal/orange separation | Orange, 28° / 15 | Teal, 205° / 12 |
| Series Glow | Netflix Inspired | Romantic comedy | Soft teal/orange, lifted blacks | Peach, 40° / 8 | Teal, 190° / 8 |
| Episode One | Netflix Inspired | Premium opener | Bold contrast, cinematic | Amber, 32° / 14 | Cyan, 198° / 11 |
| Hereditary Mood | A24 Inspired | Psychological horror | Deep shadows, muted colors | Olive, 55° / 6 | Blue, 220° / 14 |
| Moonlight Glow | A24 Inspired | Blue monochrome | Teal bias, desaturated warmth | Cyan, 180° / 10 | Blue, 210° / 16 |
| Midsommar Haze | A24 Inspired | Overexposed daylight | Lifted blacks, warm haze | Warm yellow, 50° / 12 | Teal, 185° / 8 |
| Ex Machina | A24 Inspired | Sci-fi minimalism | Clean whites, subtle cool | Neutral warm, 45° / 6 | Cool blue, 215° / 10 |
| Green Knight | A24 Inspired | Medieval fantasy | Earth tones, desaturated | Ochre, 48° / 10 | Olive, 75° / 8 |
| Alexa Log | ARRI Alexa Look | LogC transformation | Wide dynamic range, flat | Neutral | Neutral |
| ARRI Natural | ARRI Alexa Look | Rec.709 rendering | Natural skin, balanced | Warm, 42° / 8 | Cool, 210° / 6 |
| Cinema Skin | ARRI Alexa Look | Skin tone priority | Optimized flesh tones | Peach, 38° / 10 | Teal, 200° / 7 |
| Digital Film | ARRI Alexa Look | Film-out emulation | Slight contrast increase | Warm, 45° / 9 | Blue, 215° / 8 |
| Alexa Wide | ARRI Alexa Look | Maximum DR use | Gentle S-curve, all detail | Neutral warm, 40° / 6 | Cool, 205° / 6 |

The 15 cinematic presets demonstrate deliberate variation within aesthetic families. Netflix-inspired entries share the teal/orange foundation but diverge in saturation intensity (Series Glow at 8/8 versus Teal Drama at 15/12) and black-point treatment. A24-inspired entries favor olive/ochre and blue-teal separations producing the "muted primaries + fine grain" signature. ARRI Alexa presets prioritize natural hue reproduction with minimal color manipulation.

#### 5.2.4 Aesthetic: Cyberpunk Cinema, Night Neon, Neo Noir, and Dark Instagram

The Aesthetic category addresses four dominant stylized trends across 20 presets. Cyberpunk Cinema (*Neon Dystopia* through *Chrome Dreams*) applies the cyan/magenta split with high contrast: shadows to electric cyan (Hue 185–195°), highlights toward magenta (Hue 320–340°), blacks crushed below 15 IRE. Night Neon (*Cyber Glow* through *Laser Dreams*) functions as a companion with more restrained shadow handling, prioritizing glow enhancement of practical light sources through selective luminance masking. Neo Noir (*Shadow Play* through *Velvet Shadows*) draws from classic chiaroscuro with modern sensibility: blacks crushed to 5–10 IRE but midtones preserved through parametric curve control. Dark Instagram Mood (*Mood Grid* through *Dim Aesthetic*) delivers the desaturated, cool-toned, crushed-black look calibrated for mobile displays where subtle shadow detail would be lost regardless.

#### 5.2.5 Utility: Wedding, Travel, Creator Economy, and Music Video

The Utility category serves high-volume professional workflows. Dreamy Wedding (*Blush Veil* through *Romantic Haze*) targets the soft, film-emulated imagery with pastel tones prized in bridal portraiture [^Dim07^], lifting blacks +15 to +22 with HSL desaturation of the red channel's darker values to prevent "ruddy" skin. Luxury Travel (*Golden Horizon* through *Wanderlust Gold*) emphasizes golden-hour warmth through temperature shifts (+800 to +1200K). Clean Creator Economy (*Bright Start* through *Modern Voice*) delivers bright, approachable aesthetics for YouTube thumbnails with exposure boosts of +0.3 to +0.7 EV and clarity at +10 to +20. Music Video Looks (*MTA Glow* through *Beat Drop*) provides stylized, dramatic grading with aggressive contrast for high-impact performance footage. Temperature adjustments in the Travel presets use relative values (+800K to +1200K from as-shot) to preserve photographer-determined white balance while shifting toward golden-hour warmth.

The following table presents the complete 25-category taxonomy with representative preset names and intended use cases:

| Category | Preset 1 | Preset 2 | Preset 3 | Preset 4 | Preset 5 | Primary Use Case |
|---|---|---|---|---|---|---|
| Luxury Editorial | Nocturne Lux | Velvet Noir | Opulence | Silk Embers | Champagne Dusk | High-end portrait, fashion |
| Cinematic Shadows | Obsidian Teal | Crimson Shadow | Abyss Glow | Tungsten Dreams | Midnight Cinema | Dramatic, bold cinema |
| Analog Film | Kodachrome Soul | Film Haven | Dust & Grain | Retrograde | Analog Hearts | Vintage, organic |
| Moody Documentary | Raw Truth | Street Witness | Shadow Journal | Urban Decay | Light Chaser | Journalistic storytelling |
| Dreamy Wedding | Blush Veil | Golden Vows | Ethereal Love | Pastel Promise | Romantic Haze | Bridal, romantic |
| Hyperreal Fashion | Neon Runway | Editorial Punch | Glamour Burst | Haute Glow | Vogue Voltage | Fashion editorial |
| Night Neon | Cyber Glow | Neon Drift | Electric Avenue | Tokyo Midnight | Laser Dreams | Urban night, neon |
| Luxury Travel | Golden Horizon | Safari Luxe | Tuscan Sun | Azure Escape | Wanderlust Gold | Golden hour, landscape |
| Minimal Scandinavian | Nordic Air | Oslo Light | Fjord Mist | Clean Linen | Snow Whisper | Clean, airy aesthetic |
| Cyberpunk Cinema | Neon Dystopia | Synth City | Matrix Haze | Future Shock | Chrome Dreams | Futuristic, dystopian |
| Neo Noir | Shadow Play | Night Crawler | Dark Paradise | Sin City | Velvet Shadows | Noir, dramatic shadows |
| Vintage Film Lab | Faded Memories | Color Fade Lab | Retro Chem | Cross Processed | Film Ghost | Retro, faded, grainy |
| High Dynamic Luxury | Luminous Prime | HDR Luxe | Detail Master | Shadow King | Highlight Queen | HDR-like luxury |
| Dark Instagram Mood | Mood Grid | Dark Feed | Shadow Scroll | Noir Social | Dim Aesthetic | Moody social media |
| Clean Creator Economy | Bright Start | Creator Glow | Fresh Content | Clean Slate | Modern Voice | Bright, approachable |
| Music Video Looks | MTA Glow | Pop Star | Rhythm Light | Stage Blaze | Beat Drop | Stylized performance |
| Commercial Luxury | Product Prime | Brand Luxe | Commercial Gold | Retail Glow | Market Master | Product, commercial |
| Netflix Inspired | Stream Queen | Binge Night | Teal Drama | Series Glow | Episode One | Streaming teal/orange |
| A24 Inspired | Hereditary Mood | Moonlight Glow | Midsommar Haze | Ex Machina | Green Knight | Arthouse, indie |
| Kodak Portra Emulation | Portra 160 | Portra 400 | Portra 800 | Portra Warm | Portra Skin | Warm skin, filmic |
| Fuji 400H Emulation | Fuji Pastel | 400H Soft | Pro Green | Fuji Air | Sakura Tone | Pastel, delicate |
| ARRI Alexa Look | Alexa Log | ARRI Natural | Cinema Skin | Digital Film | Alexa Wide | Digital cinema |
| CineStill 800T Emulation | 800T Tungsten | CineStill Night | Halation Glow | Tungsten Film | Night Still | Tungsten, night |
| Bleach Bypass | Silver Keep | Bleach Raw | Skip Bath | Chrome Grain | Bypass Hard | Gritty, desaturated |
| Teal & Orange Modern | Blockbuster | Teal Fire | Orange Wave | Modern Cinema | Complementary | Blockbuster cinematic |

### 5.3 XMP Technical Structure

#### 5.3.1 XML schema with crs:CameraSettings namespace

Each preset is encoded as an XMP file conforming to Adobe's Camera Raw Settings namespace (`xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/"`). The root `<x:xmpmeta>` element contains an `<rdf:RDF>` description block enumerating all parameters as RDF properties. Standard namespaces include `x` (adobe:ns:meta/), `rdf`, `dc` (Dublin Core), `exif`, `tiff`, and `crs`. Each parameter maps to a named property: `crs:Exposure2012` for exposure, `crs:Contrast2012` for contrast, through 70+ available parameters. The "2012" suffix denotes Process Version 2012, Adobe's current tone-mapping standard.

The following table details the parameter listing for the representative *Nocturne Lux* preset:

| Parameter Domain | XMP Property | Value | Technical Rationale |
|---|---|---|---|
| **Basic** | `crs:Exposure2012` | +0.35 | Slight lift for editorial softness |
| | `crs:Contrast2012` | +8 | Gentle contrast |
| | `crs:Highlights2012` | −25 | Protect highlight detail |
| | `crs:Shadows` | +18 | Lifted "milky" blacks |
| | `crs:Whites2012` | +5 | Preserve specular definition |
| | `crs:Blacks2012` | −12 | Controlled black floor |
| | `crs:Texture` | +10 | Subtle surface detail |
| | `crs:Clarity2012` | +5 | Minimal midtone contrast |
| | `crs:Dehaze` | +3 | Atmospheric depth |
| **Tone Curve** | `crs:ParametricShadows` | +12 | Lifted shadow floor |
| | `crs:ParametricDarks` | +6 | Gentle dark tonal shaping |
| | `crs:ParametricLights` | −4 | Subtle light compression |
| | `crs:ParametricHighlights` | −8 | Highlight rolloff |
| **HSL (24 adj.)** | `crs:HueAdjustmentRed`…`Magenta` | +3 to +10 | Per-channel hue shifts |
| | `crs:SaturationAdjustmentRed`…`Magenta` | −15 to −3 | Selective desaturation |
| | `crs:LuminanceAdjustmentRed`…`Magenta` | −8 to +8 | Per-channel luminance |
| **Color Grading** | `crs:ColorGradeHighlightHue` | 50 | Warm highlight direction |
| | `crs:ColorGradeHighlightSat` | 10 | Gentle highlight warmth |
| | `crs:ColorGradeShadowHue` | 215 | Cool shadow direction |
| | `crs:ColorGradeShadowSat` | 8 | Subtle shadow coolness |
| | `crs:ColorGradeBalance` | −30 | Weight toward shadows |
| **Calibration** | `crs:CameraProfile` | "Adobe Standard" | Base profile |
| | `crs:ProcessVersion` | "11.0" | Process 2012 (PV4+) |
| **Effects** | `crs:GrainAmount` | 20 | Fine film grain |
| | `crs:GrainSize` | 25 | Small grain size |
| | `crs:PostCropVignetteAmount` | −10 | Subtle edge darkening |
| **Detail** | `crs:Sharpness` | 25 | Capture sharpening |
| | `crs:SharpenRadius` | 1.0 | Standard radius |

The 24 HSL adjustments (8 hues + 8 saturations + 8 luminances) provide per-channel control enabling precise color science for film stock emulation. The Color Grading panel's 12 parameters replaced Lightroom's legacy Split Toning in version 10.0; CINEGRADE LAB presets exploit the additional Midtones wheel for sophisticated tonal separation [^203^]. The three grain parameters simulate film grain structure with adjustable density and particle characteristics distinct from digital noise in their organic distribution.

#### 5.3.2 Complete parameter listing per preset

Each XMP file contains 45–65 active parameters, with the remaining 200+ possible `crs:` properties at default values. Film Emulation presets activate the full grain triplet and more HSL channels for precise color matching; Utility presets prioritize Basic panel adjustments for speed. All presets specify `crs:ProcessVersion` as "11.0" for compatibility with Lightroom 7.0+ and Camera Raw 11.0+. The `crs:CameraProfile` is set to "Adobe Standard" as baseline, with profile-based presets overriding via embedded DCP references. `crs:WhiteBalance` remains at "As Shot" for all presets, preserving the photographer's in-camera decision rather than imposing a fixed temperature — a choice reflecting professional workflow practice where white balance is determined at capture for shoot consistency.

#### 5.3.3 Export compatibility: Lightroom Classic, Lightroom CC, Camera Raw

All 125 presets ship in `.xmp` format compatible with Adobe Lightroom Classic (7.0+), Lightroom CC (desktop and mobile via sync), and Camera Raw (11.0+) [^39^]. Lightroom Mobile requires `.dng` template files embedding the same `crs:` parameter set within XMP metadata packets for identical cross-platform rendering. The XMP format's open XML structure provides forward compatibility: unrecognized properties in future Camera Raw versions are safely ignored. The `crs:ProcessVersion` declaration ensures correct tone-mapping mathematics regardless of host application defaults, preventing appearance shifts when presets are applied across software versions [^41^]. Camera Raw compatibility extends to Photoshop's Camera Raw filter, enabling preset application to layers and smart objects within compositing workflows.
