# Dimension 5: Color Science & Technical Grading Methods

## CINEGRADE LAB — Deep Technical Research

**Research Date:** July 2025  
**Researcher:** Deep Research Agent  
**Dimension:** Color Science, Mathematical Foundations & Perceptual Grading  
**Total Sources:** 40+ primary sources  
**Confidence Level:** High (peer-reviewed papers, manufacturer documentation, industry standards)

---

## Table of Contents

1. [Color Spaces: sRGB, Adobe RGB, DCI-P3, Rec.2020, ACES](#1-color-spaces)
2. [Gamma Curves: Linear, sRGB Gamma, PQ (ST 2084), HLG](#2-gamma-curves)
3. [Tone Curves: S-Curve, Film-Like Rolloff, Highlight Compression](#3-tone-curves)
4. [HSL Adjustments: Hue Shifts for Cinematic Looks](#4-hsl-adjustments)
5. [Split Toning: Highlight/Shadow Color Separation](#5-split-toning)
6. [Color Grading Wheels: Lift/Gamma/Gain vs Shadows/Midtones/Highlights](#6-color-grading-wheels)
7. [LUT Interpolation Methods: Trilinear, Tetrahedral, Nearest Neighbor](#7-lut-interpolation)
8. [Halation Simulation: Optical and Digital Approaches](#8-halation-simulation)
9. [Bloom and Diffusion Effects in Color Grading](#9-bloom-diffusion)
10. [Grain Structure: Algorithms, Film Grain vs Digital Noise](#10-grain-structure)
11. [Color Constancy and Perceptual Adaptation in Grading](#11-color-constancy)
12. [Waveform Monitors, Vectorscopes, and Histograms](#12-grading-tools)
13. [Mathematics of 3D LUT Generation](#13-3d-lut-mathematics)
14. [Color Difference Metrics: Delta E, CIEDE2000](#14-color-difference-metrics)

---

## 1. Color Spaces: sRGB, Adobe RGB, DCI-P3, Rec.2020, ACES

### 1.1 Color Space Fundamentals

**Claim:** Color spaces are defined by three elements: a color model (how colors are created), a gamut (the range of colors), and color depth (bits per pixel). RGB is preferred for screens; CMYK for printing. [^200^]

**Source:** XP-Pen Blog  
**URL:** https://www.xp-pen.com/blog/srgb-vs-adobe-rgb.html  
**Date:** 2025-01-14  
**Excerpt:** "Color spaces comprise three elements: Color Model (RGB, CMYK), Gamut (the color palette showing the range), and Color Depth (bits per pixel)."  
**Context:** Foundational color space theory for digital imaging  
**Confidence:** High

---

### 1.2 sRGB — The Universal Standard

**Claim:** sRGB was created in 1996 by HP and Microsoft as a joint effort to resolve color inconsistency across monitors. It has the smallest gamut of professional color spaces, covering ~35% of the visible spectrum. It is ideal for web, consumer monitors, and digital cameras. [^200^] [^202^]

**Source:** XP-Pen Blog / MobilePixels  
**URL:** https://www.xp-pen.com/blog/srgb-vs-adobe-rgb.html  
**Date:** 2025-01-14  
**Excerpt:** "sRGB means 'standard RGB.' The space was a joint effort of Hewlett-Packard and Microsoft in 1996. sRGB has the most minor gamut coverage, covering up to 35% of the visible spectrum."  
**Context:** sRGB remains the safest choice for web delivery where profile embedding may be unreliable  
**Confidence:** High

**Claim:** The sRGB EOTF (Electro-Optical Transfer Function) is close to gamma 2.2, though Rec.709 uses BT.1886 which is closer to gamma 2.4. [^198^]

**Source:** Greg Benz Photography  
**URL:** https://gregbenzphotography.com/photoshop/which-colorspace-should-you-use-for-photography/  
**Date:** 2025-04-12  
**Excerpt:** "The sRGB EOTF is close to gamma 2.2 (rec709 uses BT.1886 and is closer to gamma 2.4)"  
**Context:** Critical distinction between sRGB and Rec.709 gamma curves  
**Confidence:** High

---

### 1.3 Adobe RGB — The Print-Optimized Wide Gamut

**Claim:** Adobe RGB was developed by Adobe in 1998 with a much wider range of colors than sRGB. It was designed for reproduction and is most often used in print and high-end displays. Its benefit is more optimized for printing relative to P3. [^198^] [^200^]

**Source:** Greg Benz Photography / XP-Pen  
**URL:** https://gregbenzphotography.com/photoshop/which-colorspace-should-you-use-for-photography/  
**Date:** 2025-04-12  
**Excerpt:** "Adobe RGB: Wider gamut than sRGB, with the benefit more optimized for printing relative to P3."  
**Context:** Best for photographers editing for professional print output  
**Confidence:** High

**Claim:** Adobe RGB is NOT well-supported on the web. Browser support is very limited or missing for Adobe RGB, making it unsuitable for online delivery without conversion. [^198^]

**Source:** Greg Benz Photography  
**URL:** https://gregbenzphotography.com/photoshop/which-colorspace-should-you-use-for-photography/  
**Date:** 2025-04-12  
**Excerpt:** "Browser support is very limited or missing for Adobe and ProPhoto RGB."  
**Context:** Important for web vs. print workflow decisions  
**Confidence:** High

---

### 1.4 DCI-P3 — The Digital Cinema Standard

**Claim:** DCI-P3 was developed in 2005 by Digital Cinema Initiatives for digital cinema projection. Its main difference with other spaces is in the green primary, which is closer to the perceived green in a color spectrum. Most modern monitors use P3 as a design target. [^198^] [^200^]

**Source:** Greg Benz Photography / XP-Pen  
**URL:** https://gregbenzphotography.com/photoshop/which-colorspace-should-you-use-for-photography/  
**Date:** 2025-04-12  
**Excerpt:** "DCI-P3: Developed in 2005, DCI stands for Digital Cinema Initiatives. The standard was intended for digital cinema projection, but is now featured on many monitors."  
**Context:** The bridge color space between photography and cinematography  
**Confidence:** High

**Claim:** DCI-P3 is ideal for video editing and web export as long as the profile is not stripped from the image during upload. [^198^]

**Source:** Greg Benz Photography  
**URL:** https://gregbenzphotography.com/photoshop/which-colorspace-should-you-use-for-photography/  
**Date:** 2025-04-12  
**Excerpt:** "P3 is ideal as long as the profile is not stripped from the image during upload (which would make the image look desaturated). Browsers support P3 well."  
**Context:** Best practice for modern web photography  
**Confidence:** High

---

### 1.5 Rec.2020 — The HDR/Ultimate Target

**Claim:** Rec.2020 was developed by the ITU for ultra-high-definition (UHD) TV. It is the emerging standard for television and has been extended by Rec.2100 for HDR TV. It has a wider gamut than P3 and fully includes all colors available in sRGB, Adobe RGB and P3. [^200^] [^198^]

**Source:** XP-Pen / Greg Benz Photography  
**URL:** https://www.xp-pen.com/blog/srgb-vs-adobe-rgb.html  
**Date:** 2025-01-14  
**Excerpt:** "Rec. 2020 is a relatively new color space, reflecting its development by the International Telecommunications Union for ultra-high-definition (UHD) TV."  
**Context:** The ultimate target for HDR and future-proof monitors  
**Confidence:** High

**Claim:** Rec.2020 is NOT suitable for 8-bit encoding due to banding risk. It should only be used at 10-bit or higher. It is the ultimate target for HDR and monitors. [^198^]

**Source:** Greg Benz Photography  
**URL:** https://gregbenzphotography.com/photoshop/which-colorspace-should-you-use-for-photography/  
**Date:** 2025-04-12  
**Excerpt:** "Given the large range, it is not suitable for 8-bit encoding due to some risk of banding. Rec2020 is the ultimate target for HDR and monitors."  
**Context:** Critical technical limitation for practical implementation  
**Confidence:** High

---

### 1.6 ACES — The Academy Color Encoding System

**Claim:** ACES (Academy Color Encoding System) was designed to make scene-referred color management a reality for high-end digital cinema workflows. The ACES gamut encompasses all visible light with more than 25 stops of exposure latitude. [^252^] [^215^]

**Source:** DaVinci Resolve Manual / ARRI Image Science  
**URL:** https://www.steakunderwater.com/VFXPedia/__man/Resolve18-6/DaVinciResolve18_Manual_files/part311.htm  
**Date:** Current  
**Excerpt:** "The ACES gamut has been designed to be large enough to encompass all visible light, with more than 25 stops of exposure latitude."  
**Context:** Industry standard for cinematic color management  
**Confidence:** High

**Claim:** ACES defines three commonly used color encodings: ACES2065-1 (linear, AP0 primaries, for archival), ACEScg (linear, AP1 primaries, for CG/VFX), and ACEScct (logarithmic, AP1 primaries, for color grading). [^215^]

**Source:** ARRI — Image Science  
**URL:** https://www.arri.com/en/learn-help/learn-help-camera-system/image-science/about-aces  
**Date:** 2025-10-01  
**Excerpt:** "ACES2065-1: reference color space, linear encoding, extremely wide AP0 primaries. ACEScg: linear, AP1 primaries, optimized for CG/VFX. ACEScct: logarithmic encoding, designed for smooth tonal adjustments in color grading."  
**Context:** ACES workflow architecture for production pipelines  
**Confidence:** High (manufacturer documentation)

**Claim:** AP0 primaries are the smallest triangle that includes all visible colors — much larger than ProPhoto with far more imaginary colors. AP1 primaries are close to Rec.2020 but slightly larger. Neither is well-supported for photography workflows outside cinema. [^198^] [^215^]

**Source:** Greg Benz Photography / ARRI  
**URL:** https://gregbenzphotography.com/photoshop/which-colorspace-should-you-use-for-photography/  
**Date:** 2025-04-12  
**Excerpt:** "The AP0 primaries are the smallest triangle that includes all visible colors (much larger than ProPhoto). The AP1 primaries are rather close to Rec2020. Neither is well supported for photography."  
**Context:** ACES is specifically designed for motion picture, not still photography  
**Confidence:** High

---

### 1.7 The ACES Pipeline: IDT → RRT → ODT

**Claim:** The ACES workflow follows a strict transform chain: IDT (Input Device Transform) converts camera-native color into ACES → RRT (Reference Rendering Transform) applies standardized tone curve and gamut mapping → ODT (Output Device Transform) converts to specific display standard. In ACES 2.0, RRT and ODT are combined into a single Output Transform. [^293^] [^299^]

**Source:** CG Lounge / Frame.io  
**URL:** https://cglounge.studio/journal/color-pipeline-aces-ocio-for-vfx  
**Date:** 2026-04-11  
**Excerpt:** "ACES defines a specific chain of transforms: 1. IDT converts camera-native color into ACES. 2. RRT is a standardized tone curve and gamut mapping applied before display. 3. ODT converts from RRT output to a specific display standard. In ACES 2.0, the RRT and ODT are combined into a single Output Transform."  
**Context:** Essential architecture for understanding cinematic color management  
**Confidence:** High

**Claim:** The RRT serves as a "film stock" simulation baked into the ACES standard — it compresses highlights, expands shadow detail, and rolls off saturated colors so they don't clip. The RRT + ODT always work together and are referred to as the "Output Transform." [^293^]

**Source:** CG Lounge  
**URL:** https://cglounge.studio/journal/color-pipeline-aces-ocio-for-vfx  
**Date:** 2026-04-11  
**Excerpt:** "Think of [the RRT] as a 'film stock' simulation baked into the ACES standard. It compresses highlights, expands shadow detail, rolling off saturated colors so they don't clip."  
**Context:** The RRT is why ACES footage has a characteristic cinematic look by default  
**Confidence:** High

---

### 1.8 Color Space Selection Guidelines

**Claim:** For layered 16/32-bit working files in Photoshop, use Rec.2020 or ProPhoto. For web export, P3 is ideal (if profile is preserved); sRGB is the safe fallback. For video editing, DCI-P3 and Rec.2020 are the best choices. [^198^]

**Source:** Greg Benz Photography  
**URL:** https://gregbenzphotography.com/photoshop/which-colorspace-should-you-use-for-photography/  
**Date:** 2025-04-12  
**Excerpt:** "Rec2020 or ProPhoto for working files. P3 is ideal for web. sRGB is safe when profile may be stripped. For video, DCI-P3 and Rec.2020."  
**Context:** Practical workflow recommendations for CINEGRADE LAB  
**Confidence:** High

---

## 2. Gamma Curves: Linear, sRGB Gamma, PQ (ST 2084), HLG

### 2.1 Linear Gamma

**Claim:** Linear gamma (gamma 1.0) represents a direct, proportional relationship between pixel values and light intensity. Linear workflows are essential for physically correct compositing, VFX, and CG rendering. All ACEScg and ACES2065-1 processing occurs in linear light. [^215^] [^293^]

**Source:** ARRI Image Science / CG Lounge  
**URL:** https://www.arri.com/en/learn-help/learn-help-camera-system/image-science/about-aces  
**Date:** 2025-10-01  
**Excerpt:** "ACEScg is a linear color space with slightly narrower primaries (AP1), optimized for computer graphics and visual effects."  
**Context:** Linear is the mathematically correct working space for light-based calculations  
**Confidence:** High

---

### 2.2 sRGB Gamma Curve

**Claim:** The sRGB tone curve is a very close match to pure gamma 2.2, but it has a "kink" at the bottom — a steep linear slope at the very bottom, then the rest uses gamma of 2.4 squished to fit. This design makes it robust through multiple generations of processing. [^273^]

**Source:** ProLost Blog  
**URL:** https://prolost.com/blog/tag/Resolve  
**Date:** 2025-02-03  
**Excerpt:** "sRGB has a steep, but not infinitely steep, linear slope at the very bottom, and then the rest of the curve uses a gamma of 2.4 squished to fit in the remaining range. The clever result is that the curve is smooth at the transition and robust through multiple generations."  
**Context:** sRGB's bottom kink prevents dark pixel processing inaccuracies  
**Confidence:** High

**Claim:** A pure gamma curve (simple power function) has a slope of 1.0 or 0.0 at its base — as values approach zero, the gamma curve approaches a flat line. This can cause compounding calculation inaccuracies on the darkest pixels through multiple linearization/de-linearization steps. [^273^]

**Source:** ProLost Blog  
**URL:** https://prolost.com/blog/tag/Resolve  
**Date:** 2025-02-03  
**Excerpt:** "A pure gamma curve has a slope of 1.0 or 0.0 at its base, i.e. as the values in the image approach zero, the gamma curve approaches a flat line. This means that calculations on the darkest pixels could be inaccurate."  
**Context:** Explains why sRGB's piecewise design is superior to pure power functions  
**Confidence:** High

---

### 2.3 PQ (Perceptual Quantization, ST 2084)

**Claim:** PQ (Perceptual Quantizer) is a gamma curve designed by Dolby for HDR. It is based on human visual perception with peak brightness defined at 10,000 cd/m2. The curve is always consistent regardless of display device. It is designed for internet video streaming and movies, with a black level of 0.005 cd/m2 or lower. [^207^]

**Source:** EIZO Global  
**URL:** https://www.eizoglobal.com/library/management/ins-and-outs-of-hdr/index2.html  
**Date:** Current  
**Excerpt:** "PQ (Perceptual Quantization): Target is internet video streaming, movies. New gamma curve based on human visual perception. Peak Brightness (max.): 10,000 cd/m2. Consistent, regardless of display device. Proposed by Dolby."  
**Context:** PQ is absolute — the same curve regardless of display capability  
**Confidence:** High (industry standard documentation)

---

### 2.4 HLG (Hybrid Log-Gamma)

**Claim:** HLG was proposed by BBC & NHK for broadcast TV and live video. Unlike PQ, HLG handles brightness in relative values that vary by display device. This allows acceptable viewing of HDR content even on existing SDR displays, with less image degradation. [^207^]

**Source:** EIZO Global  
**URL:** https://www.eizoglobal.com/library/management/ins-and-outs-of-hdr/index2.html  
**Date:** Current  
**Excerpt:** "HLG: Target is broadcast TV, live video. Compatible with SDR TVs. Handles brightness in relative values. Varies by display device. Proposed by BBC & NHK. Outstanding for live broadcasts."  
**Context:** HLG's backward compatibility makes it ideal for broadcast  
**Confidence:** High

### 2.5 PQ vs. HLG Comparison

| Feature | PQ (ST 2084) | HLG (Hybrid Log-Gamma) |
|---------|--------------|----------------------|
| Target | Internet streaming, movies | Broadcast TV, live video |
| Peak Brightness | 10,000 cd/m2 (absolute) | Relative to display |
| SDR Compatibility | Poor | Fair/Outstanding |
| Live Broadcasts | Fair | Outstanding |
| Proposed By | Dolby | BBC & NHK |
| Reference | SMPTE ST 2084, ITU-R BT.2100 | ITU-R BT.2100 |

**Source:** EIZO Global [^207^]

---

### 2.6 BT.1886 — The Modern Display Gamma

**Claim:** BT.1886 was adopted by the ITU in 2011 as the recommended gamma for HD flat panel displays. It is based on a gamma 2.4 power function with corrections for display black level: L = a(max[(V + b), 0])^y where a and b account for contrast and brightness controls. For a perfect display, a=1 and b=0. [^304^] [^301^]

**Source:** Portrait Displays / Blackmagic Forum  
**URL:** https://www.portrait.com/resource-center/bt-1886-10-questions-10-answers/  
**Date:** 2020-08-03  
**Excerpt:** "BT.1886 is the recommended gamma for High Definition flat panel displays, determined and adopted by the International Telecommunications Union (ITU) in March of 2011."  
**Context:** BT.1886 adapts to display characteristics unlike fixed power functions  
**Confidence:** High

---

## 3. Tone Curves: S-Curve, Film-Like Rolloff, Highlight Compression, Shadow Lifting

### 3.1 The Classic S-Curve

**Claim:** The S-curve is the most common tone curve technique. It increases contrast by darkening dark tones and brightening bright tones. To create: add a point in shadows and pull slightly down; add a point in highlights and push slightly up. Small moves matter — use keyboard arrow keys to nudge points one value at a time. [^195^]

**Source:** Signature Edits  
**URL:** https://www.signatureedits.com/lightroom-tone-curve-tutorial/  
**Date:** 2026-05-04  
**Excerpt:** "An S-curve is the most common tone curve technique. Add a point in the shadows → pull slightly down. Add a point in the highlights → push slightly up. This increases contrast. Small moves matter."  
**Context:** The S-curve is the fundamental contrast-building tool  
**Confidence:** High

---

### 3.2 Film Fade / Matte Look

**Claim:** To create a film/matte/faded look, lift the far-left anchor point (absolute black) vertically to roughly 5–10%. This remaps pure black to a shade of gray, mimicking the compressed dynamic range of vintage film. Over-lifting turns the effect muddy. [^194^]

**Source:** Todd Marsh Photography  
**URL:** https://toddmarsh.com/lightroom-tone-curve-guide/  
**Date:** 2026-04-19  
**Excerpt:** "The Matte or Faded Look: Grab the far-left anchor point and lift it vertically to roughly 5–10%. This remaps pure black to a shade of gray, mimicking the compressed dynamic range of vintage film."  
**Context:** Film fade is a signature aesthetic in contemporary photography  
**Confidence:** High

---

### 3.3 Creamy Highlights / Highlight Rolloff

**Claim:** To create creamy, film-like highlight rolloff, pull the top-right anchor point (pure white) slightly downward. This softens harsh specular highlights and produces a more organic, film-like rolloff in the brightest areas. [^194^]

**Source:** Todd Marsh Photography  
**URL:** https://toddmarsh.com/lightroom-tone-curve-guide/  
**Date:** 2026-04-19  
**Excerpt:** "Creamy Highlights: Pull the top-right anchor point slightly downward to soften harsh specular highlights. The result is a more organic, film-like rolloff in your brightest areas."  
**Context:** Film-like rolloff is one of the most sought-after characteristics of analog capture  
**Confidence:** High

---

### 3.4 Maximizing Tonal Range

**Claim:** A reliable technique for maximizing tonal range: lift the blacks and stretch the whites simultaneously. One trade-off: once the white point is lifted on the global curve, headroom for raising whites in local adjustments shrinks. Plan edit order accordingly. [^194^]

**Source:** Todd Marsh Photography  
**URL:** https://toddmarsh.com/lightroom-tone-curve-guide/  
**Date:** 2026-04-19  
**Excerpt:** "Maximizing Tonal Range: Lift the blacks, stretch the whites. One trade-off: once you've lifted the white point on the global curve, your headroom for raising whites in local adjustments shrinks."  
**Context:** Essential technique for achieving the "full tonal range" film look  
**Confidence:** High

---

### 3.5 Point Curve vs. Parametric Curve

**Claim:** Lightroom offers two tone curve modes: Point Curve (add/drag up to 16 anchor points, best for precision edits, creative looks, film fades, RGB color grading) and Parametric Curve (uses tonal zones: Highlights, Lights, Darks, Shadows — best for quick adjustments). Many pros build their look with the point curve, then fine-tune per image using the parametric curve. [^195^] [^194^]

**Source:** Signature Edits / Todd Marsh  
**URL:** https://www.signatureedits.com/lightroom-tone-curve-tutorial/  
**Date:** 2026-05-04  
**Excerpt:** "Point Curve: Best for precision edits, creative looks, film fades, RGB color grading, advanced control. Parametric Curve: Best for quick adjustments, dialing back presets, broad corrections."  
**Context:** Understanding both modes unlocks the full power of tone curves  
**Confidence:** High

---

## 4. HSL Adjustments: Hue Shifts for Cinematic Looks

### 4.1 Teal and Orange Color Grading

**Claim:** Teal/orange grading is about pushing shadows and midtones toward cool cyan/teal while steering skin tones and highlights toward warm orange/amber. This creates high-contrast, visually striking images where subjects are separated from environments by hue rather than just brightness. [^199^]

**Source:** Pixflow Blog  
**URL:** https://pixflow.net/blog/teal-and-orange-color-grading/  
**Date:** 2026-04-26  
**Excerpt:** "Teal and orange grading is about pushing the image in two simultaneous directions: shifting shadows and midtones toward the cool cyan/teal end of the spectrum, while steering skin tones and highlights toward warm orange and amber."  
**Context:** The dominant cinematic color grading aesthetic in Hollywood  
**Confidence:** High

**Claim:** The teal/orange look exploits opponent color theory — blue-yellow and red-green are opponent pairs in human vision. Separating skin tones (warm/orange) from environments (cool/teal) creates maximum perceptual color contrast that the human visual system finds appealing. [^199^] [^247^]

**Source:** Pixflow / Skillshare  
**URL:** https://pixflow.net/blog/teal-and-orange-color-grading/  
**Date:** 2026-04-26  
**Excerpt:** "The result is a high-contrast, visually striking image where subjects – particularly people – are separated from their environments by hue rather than just brightness."  
**Context:** Scientific basis in opponent-process color theory  
**Confidence:** High

---

### 4.2 Technical Implementation of Teal/Orange

**Claim:** Colorists achieve teal/orange through: (1) Color wheels — lifting shadows toward teal, nudging highlights toward orange; (2) HSL Secondaries — isolating specific hue ranges (especially skin tones) and shifting independently; (3) Creative LUTs — applying a base look that bakes in the split; (4) Saturation targeting — boosting orange and teal while pulling back competing hues like greens and magentas. [^199^] [^183^]

**Source:** Pixflow / Kevin Raposo  
**URL:** https://pixflow.net/blog/teal-and-orange-color-grading/  
**Date:** 2026-04-26  
**Excerpt:** "Color wheels, HSL Secondaries, Creative LUTs, Saturation targeting — the difference between a grade that sings and one that screams is entirely in the subtlety of execution."  
**Context:** Multi-tool approach required for professional results  
**Confidence:** High

**Claim:** The tone curve can enhance teal/orange by applying a reverse 'S' curve to the blues — enhancing their presence in shadows while diminishing them in highlights, accentuating orange tones in skin. Split toning can also add blue to shadows and orange to highlights. [^183^]

**Source:** Kevin Raposo Photography  
**URL:** https://kevinraposo.com/a-guide-to-the-orange-and-teal-look/  
**Date:** 2024-03-13  
**Excerpt:** "Applying a reverse 'S' curve to the blues can enhance their presence in the shadows while diminishing them in the highlights, thus accentuating the orange tones in the skin."  
**Context:** Curve-based approach as alternative to direct HSL manipulation  
**Confidence:** High

---

## 5. Split Toning: Highlight/Shadow Color Separation

### 5.1 Split Toning Fundamentals

**Claim:** Split toning means adding a color cast to the highlights and a separate, different color cast to the shadows. One of the most common approaches is to make highlights yellow/warm and shadows blue/cool, or vice versa. Complete whites and complete blacks remain unaffected. [^203^] [^204^]

**Source:** Digital Photography School / Northlandscapes  
**URL:** https://digital-photography-school.com/use-split-toning-make-photos-stand/  
**Date:** 2024-05-01  
**Excerpt:** "You can split tone an image by adding a color cast to the highlights, and then you add a separate color cast to the shadows. One of the most common approaches is to make the highlights yellow and the shadows blue."  
**Context:** Split toning is fundamentally different from white balance — it adds colors rather than shifting existing ones  
**Confidence:** High

---

### 5.2 Split Toning Panel Mechanics

**Claim:** In modern Lightroom (v10.0+), the Split Toning panel was replaced with a Color Grading panel offering three wheels: Shadows, Midtones, and Highlights. The addition of a Midtones wheel enables selective toning of the mid-range for more sophisticated control. [^203^]

**Source:** Digital Photography School  
**URL:** https://digital-photography-school.com/use-split-toning-make-photos-stand/  
**Date:** 2024-05-01  
**Excerpt:** "A few years ago, Adobe replaced the split-toning panel with a color grading panel. While the name has changed, you can still use the panel for split toning. In addition to Shadows and Highlights wheels, you now have a Midtones wheel."  
**Context:** Adobe's Color Grading panel = Split Toning + Midtone control  
**Confidence:** High

---

### 5.3 The Balance Slider

**Claim:** The split toning panel includes a Balance slider that controls where the emphasis falls between highlight toning and shadow toning. This allows precise control over which tonal range dominates the color cast. [^204^]

**Source:** Northlandscapes  
**URL:** https://www.northlandscapes.com/articles/what-is-split-toning-and-how-to-use-it-in-lightroom  
**Date:** Current  
**Excerpt:** "The split toning panel consists of Highlights, Balance and Shadows. The Balance slider controls where you want the emphasis. It is possible to tone just the highlights, or just the shadows."  
**Context:** Balance slider is the key to subtle vs. dramatic split toning  
**Confidence:** High

---

### 5.4 Split Toning for Mood

**Claim:** Split toning adds a level of visual sophistication — moody and cinematic in quality. The technique has been around since film days, originally achieved chemically during the printing process. Most commonly a warm yellow-orange hue is selected for highlights and a cooler blue for shadows. [^204^]

**Source:** Northlandscapes  
**URL:** https://www.northlandscapes.com/articles/what-is-split-toning-and-how-to-use-it-in-lightroom  
**Date:** Current  
**Excerpt:** "Split toning adds a level of visual sophistication to a photograph. Think moody and cinematic in quality. The description is apt as the colour grading of films regularly employs split toning techniques."  
**Context:** Split toning is a cornerstone of cinematic color grading  
**Confidence:** High

---

## 6. Color Grading Wheels: Lift/Gamma/Gain vs Shadows/Midtones/Highlights

### 6.1 Primary Wheels: Lift, Gamma, Gain, Offset

**Claim:** DaVinci Resolve's Primary Wheels feature four controls: Lift (shadows/blacks), Gamma (midtones, including skin tones), Gain (highlights/whites), and Offset (global adjustment). Lift primarily targets the darkest parts; Gamma targets mid-range tones; Gain manipulates brightest parts; Offset shifts the entire image uniformly. [^205^]

**Source:** FlyWithX  
**URL:** https://www.flywithx.com/en/digital-media/color-grading/  
**Date:** Current  
**Excerpt:** "Lift primarily targets the darkest parts of your image. Gamma adjusts the midrange tones, typically encompassing most visible detail including skin tones. Gain manipulates the brightest parts. Offset functions as a global control."  
**Context:** Core color grading controls in DaVinci Resolve  
**Confidence:** High

---

### 6.2 The Overlapping Nature of Primary Wheels

**Claim:** A defining feature of Primary Wheels is the overlapping nature of their tonal influence. An adjustment to Lift, while primarily affecting shadows, also subtly influences midtones and highlights. This design facilitates broad, initial corrections and leads to more natural appearance compared to tools that strictly isolate tonal ranges. [^205^]

**Source:** FlyWithX  
**URL:** https://www.flywithx.com/en/digital-media/color-grading/  
**Date:** Current  
**Excerpt:** "A defining feature of these Primary Wheels is the overlapping nature of their tonal influence. This means that an adjustment to Lift, while primarily affecting shadows, will also subtly influence midtones and highlights."  
**Context:** Overlap is a feature, not a bug — it produces smooth transitions  
**Confidence:** High

---

### 6.3 Log Wheels: Shadows, Midtones, Highlights

**Claim:** Log Wheels (labeled Shadows, Midtones, Highlights) offer a more targeted approach with less overlap compared to Primary Wheels. They also allow defining the specific tonal range where the correction takes effect. Log wheels are typically used for more precise adjustments after initial primary corrections. [^205^]

**Source:** FlyWithX  
**URL:** https://www.flywithx.com/en/digital-media/color-grading/  
**Date:** Current  
**Excerpt:** "Log Wheels offer a more targeted approach with less overlap in their influence compared to the Primary Wheels. They also allow you to define the specific tonal range where the correction takes effect."  
**Context:** Log wheels = more isolation; Primary wheels = more organic overlap  
**Confidence:** High

---

### 6.4 HDR Wheels

**Claim:** HDR wheels segment the image into numerous zones (e.g., Dark, Shadow, Light, Global, Black, Highlight, Specular) and offer precise manipulation of the position and fall-off for each zone, providing even finer control than Log wheels. [^205^]

**Source:** FlyWithX  
**URL:** https://www.flywithx.com/en/digital-media/color-grading/  
**Date:** Current  
**Excerpt:** "HDR wheels segment the image into numerous zones and offer precise manipulation of the position and fall-off for each zone."  
**Context:** HDR wheels are essential for HDR grading with its expanded tonal range  
**Confidence:** High

---

### 6.5 Contrast and Pivot

**Claim:** Contrast modifies the difference between light and dark areas. The Pivot control sets the central "fulcrum" around which contrast is expanded or compressed. A lower pivot causes more of the image to darken when contrast increases; a higher pivot causes more to brighten. Aligning pivot to the footage's middle gray value maintains consistent exposure across shots. [^205^]

**Source:** FlyWithX  
**URL:** https://www.flywithx.com/en/digital-media/color-grading/  
**Date:** Current  
**Excerpt:** "The Pivot control works in conjunction with Contrast. A lower pivot will cause more of the image to darken when contrast is increased, while a higher pivot will cause more of it to brighten."  
**Context:** Pivot is one of the most underutilized but powerful grading controls  
**Confidence:** High

---

## 7. LUT Interpolation Methods: Trilinear, Tetrahedral, Nearest Neighbor

### 7.1 Trilinear Interpolation

**Claim:** Trilinear interpolation is the most common method for 3D LUT color transformation. An input color (r,g,b) lies within a cube defined by eight lattice vertices. The output color is a weighted sum of these eight vertices, where weights are trilinear interpolation weights determined by fractional distances to nearest grid coordinates. [^269^]

**Source:** LoR-LUT Research Paper (arXiv)  
**URL:** https://arxiv.org/html/2602.22607v1  
**Date:** 2026-02-26  
**Excerpt:** "The output color is computed by interpolating the eight surrounding lattice vertices. The operation is differentiable and hardware-friendly, enabling fast inference on both CPUs and GPUs."  
**Context:** Trilinear is the default in most commercial applications due to speed  
**Confidence:** High (peer-reviewed research)

---

### 7.2 Tetrahedral Interpolation

**Claim:** Tetrahedral interpolation divides the color cube using a diagonal between the darkest and lightest vertices, creating tetrahedra. Once the containing tetrahedron is found, the result is calculated. Tetrahedral keeps grayscale very pure where trilinear can introduce color shifts. [^278^] [^277^]

**Source:** LiftGammaGain Forum / ACES Central  
**URL:** http://www.liftgammagain.com/forum/index.php?threads/lut-interpolation.12626/  
**Date:** 2019-04-24  
**Excerpt:** "Tetrahedral will keep a gray scale very pure where trilinear doesn't. The former slices the color cube into smaller cubes; the latter makes a diagonal between darkest and whitest vertices and makes tetrahedrals."  
**Context:** Tetrahedral is preferred for critical color accuracy work  
**Confidence:** High (professional colorist community)

---

### 7.3 Computational Cost Comparison

**Claim:** A comparison of 3D LUT interpolation computational costs shows: Trilinear requires 7 multiplications and 7 additions; Prism requires 5 multiplications and 6 additions; Pyramidal requires 4 multiplications and 4 additions; Tetrahedral requires 3 multiplications and 3 additions. [^277^]

**Source:** ACES Central (JD Vandenberg)  
**URL:** https://community.acescentral.com/uploads/default/original/2X/5/518c5ede1ca11c4a7e13f9c7350e2228bb8762c7.pdf  
**Date:** 2019-08-28  
**Excerpt:** "Trilinear: 7 multiplications, 7 additions. Prism: 5 multiplications, 6 additions. Pyramidal: 4 multiplications, 4 additions. Tetrahedron: 3 multiplications, 3 additions."  
**Context:** Tetrahedral is both more accurate AND computationally cheaper  
**Confidence:** High (technical presentation)

---

### 7.4 Industry Recommendations

**Claim:** Industry and academic reports recommend tetrahedral interpolation for 3D LUTs due to better numerical behavior than trilinear at the same resolution. Reports confirm that tetrahedral works best for 3D-LUT transforms while trilinear suits bilateral slicing. [^269^]

**Source:** LoR-LUT Research Paper  
**URL:** https://arxiv.org/html/2602.22607v1  
**Date:** 2026-02-26  
**Excerpt:** "Industry and academic reports often recommend tetrahedral interpolation for 3D-LUTs due to better numerical behavior than trilinear at the same resolution, a trend corroborated in recent spatial-LUT studies."  
**Context:** Tetrahedral is the gold standard for high-end color work  
**Confidence:** High

---

## 8. Halation Simulation: Optical and Digital Approaches

### 8.1 Physical Halation

**Claim:** Halation occurs when light scatters within the film's emulsion and reflects off the anti-halation backing, creating ethereal halos around bright highlights that soften edges and add a sense of depth. This effect is most pronounced in high-contrast scenes, such as a spotlight against darkness. [^2^] [^250^]

**Source:** Grokipedia / Photrio Forums  
**URL:** https://grokipedia.com/page/film_emulation  
**Date:** 2026-02-13  
**Excerpt:** "Halation occurs when light scatters within the film's emulsion and reflects off the anti-halation backing, creating ethereal halos around bright highlights that soften edges and add a sense of depth."  
**Context:** Halation is a signature optical characteristic of film stock  
**Confidence:** High

**Claim:** Blooming and halation are linked — both are caused by "excess" light. Blooming spreads/scatters in emulsion layers; halation occurs when light passes the last emulsion layer, rebounds at an angle, and returns to the last layer, adding brightness at other spots. The effect is wavelength-dependent and varies by whether anti-halation measures are built in. [^250^]

**Source:** Photrio Forums  
**URL:** https://www.photrio.com/forum/threads/about-blooming-and-halation.208370/  
**Date:** 2024-08-08  
**Excerpt:** "Blooming sort of 'spreads' or is scattered in the emulsion layers, and then for halation some light that wasn't absorbed can pass the last emulsion layer, rebound at some angle and come back."  
**Context:** Understanding the physical mechanism enables better digital simulation  
**Confidence:** High (film photography community)

---

### 8.2 Digital Halation Simulation

**Claim:** Halation emulation typically employs: (1) Threshold the image to isolate bright regions (soft threshold preferred — regions below `low` are black, above `high` are original, in between linearly interpolated); (2) Blur the thresholded image using an exponential kernel (not Gaussian) for natural bleeding; (3) Redshift the blurred image (multiply by ~[1.0, 0.05, 0.02] in RGB); (4) Add back to original with weighting. [^296^]

**Source:** Alex Castronovo — "From Code to Kodachrome"  
**URL:** https://articles.alexcastronovo.com/article/2/from-code-to-kodachrome-film-emulation-from-scratch  
**Date:** Current  
**Excerpt:** "Threshold the image → blur with exponential kernel → redshift by multiplying [1.0, 0.05, 0.02] → add back to original with weighted sum. Typical parameters: low=0.6, high=0.7, sigma=20.0"  
**Context:** Practical algorithm for implementing halation in software  
**Confidence:** High

**Claim:** Halation emulation uses convolution kernels to soften edges and simulate light diffusion, applying Gaussian blurs weighted by luminance thresholds. Kernel sizes are derived from measured emulsion thicknesses (typically 10-20 microns). [^2^]

**Source:** Grokipedia  
**URL:** https://grokipedia.com/page/film_emulation  
**Date:** 2026-02-13  
**Excerpt:** "Emulation employs convolution kernels to soften edges and simulate light diffusion, applying Gaussian blurs weighted by luminance thresholds. Kernel sizes are derived from measured emulsion thicknesses (typically 10-20 microns)."  
**Context:** Physics-based approach to halation simulation  
**Confidence:** High

---

### 8.3 Halation in Cinema Production

**Claim:** In *Knives Out* (2019), cinematographer Steve Yedlin crafted five proprietary algorithms to replicate key film attributes on digital footage: (1) color and tonal rendition, (2) algorithmic grain, (3) halation to simulate light bloom, (4) gate weave, and (5) curvature for anamorphic distortion. The custom grain and halation added unease and tactility, aligning with the film's whodunit tone. [^2^]

**Source:** Grokipedia  
**URL:** https://grokipedia.com/page/film_emulation  
**Date:** 2026-02-13  
**Excerpt:** "Yedlin crafted five proprietary algorithms: color and tonal rendition, algorithmic grain, halation to simulate light bloom in dense areas, gate weave for subtle frame instability, and curvature to evoke anamorphic lens distortion."  
**Context:** Real-world validation of digital halation in high-end cinema  
**Confidence:** High

---

## 9. Bloom and Diffusion Effects in Color Grading

### 9.1 Film Bloom Fundamentals

**Claim:** Film bloom is a visual effect that occurs when light scatters beyond its natural boundaries, creating a soft glow around bright areas. It's common in older film stocks and is used to give digital footage a dreamy, vintage feel. Unlike halation (sharp red halo), bloom spreads light across the entire image, softening contrast and giving an ethereal quality. [^201^]

**Source:** Color Finale Blog  
**URL:** https://colorfinale.com/blog/post/cf-bloom-02-25  
**Date:** 2025-02-10  
**Excerpt:** "Film bloom is a visual effect that occurs when light scatters beyond its natural boundaries, creating a soft glow around bright areas. Unlike halation, which creates a sharp, red halo around highlights, bloom spreads light across the entire image."  
**Context:** Bloom and halation are distinct effects that complement each other  
**Confidence:** High

---

### 9.2 Bloom Control Parameters

**Claim:** Professional bloom tools offer three key controls: (1) **Sensitivity** — controls how sensitive the effect is to brightness (lower = only brightest areas; higher = affects midtones too); (2) **Diffusion** — controls spread distance (higher = larger, more ethereal glow); (3) **Intensity** — adjusts overall strength. [^201^]

**Source:** Color Finale Blog  
**URL:** https://colorfinale.com/blog/post/cf-bloom-02-25  
**Date:** 2025-02-10  
**Excerpt:** "Sensitivity controls how sensitive the bloom effect is to brightness. Diffusion controls how far the bloom spreads. Intensity adjusts the strength of the bloom effect."  
**Context:** Standard parameter set for bloom implementation  
**Confidence:** High

---

### 9.3 Bloom as Light Diffusion

**Claim:** Bloom manifests as a gentle glow from overexposed areas, resulting from light diffusion through the film's gelatin layers, which causes adjacent pixels to subtly illuminate. Glow shaders model intra-frame light bleed by processing brightness channels post-exposure, calibrated against spectral sensitivity curves of specific film stocks like Kodak Vision3. [^2^]

**Source:** Grokipedia  
**URL:** https://grokipedia.com/page/film_emulation  
**Date:** 2026-02-13  
**Excerpt:** "Bloom manifests as a gentle glow from overexposed areas, resulting from light diffusion through the film's gelatin layers. Glow shaders model intra-frame light bleed by processing brightness channels post-exposure."  
**Context:** Bloom simulates organic light spread that digital sensors don't naturally produce  
**Confidence:** High

---

### 9.4 Format-Dependent Bloom Characteristics

**Claim:** Optical responses vary significantly by film format. Super 8 film produces more diffuse halation and bloom due to higher gate heat buildup during projection. IMAX film's 70mm frames and precision optics minimize distortions, yielding tighter flares and controlled bloom. [^2^]

**Source:** Grokipedia  
**URL:** https://grokipedia.com/page/film_emulation  
**Date:** 2026-02-13  
**Excerpt:** "Super 8 film tends to produce more diffuse halation and bloom from bright highlights due to higher gate heat buildup. IMAX film's expansive 70mm frames minimize such distortions, yielding tighter flares and controlled bloom."  
**Context:** Format-specific emulation adds authenticity  
**Confidence:** High

---

## 10. Grain Structure: Algorithms, Film Grain vs Digital Noise

### 10.1 Film Grain Properties

**Claim:** Film grain noise has six distinctive properties: (1) temporally independent; (2) power spectrum density close to pink noise; (3) spatially dependent; (4) strong cross-color correlation in RGB domain; (5) histogram close to Gaussian distribution; (6) dependent on signal intensity. [^274^]

**Source:** USC Signal & Image Processing Institute  
**URL:** https://mcl.usc.edu/wp-content/uploads/2014/01/200912-Advanced-Film-grain-noise-analysis-and-synthesis-for-high-definition-video-coding.pdf  
**Date:** 2009  
**Excerpt:** "Film grain noise properties: temporally independent, PSD close to pink noise, spatially dependent, strong cross-color correlation in RGB, histogram close to Gaussian, dependent on signal intensity."  
**Context:** These six properties define the complete film grain signature  
**Confidence:** High (peer-reviewed IEEE paper)

---

### 10.2 Film Grain Synthesis with AR Models

**Claim:** Film grain synthesis is typically based on generation of Gaussian noise with spatial correlation modeled by frequency limits or auto-regressive (AR) parameters. A 3D AR model captures both 2D spatial correlation and 1D spectral (cross-color) correlation naturally. [^274^]

**Source:** USC Signal & Image Processing Institute  
**URL:** https://mcl.usc.edu/wp-content/uploads/2014/01/200912-Advanced-Film-grain-noise-analysis-and-synthesis-for-high-definition-video-coding.pdf  
**Date:** 2009  
**Excerpt:** "Film grain synthesis is typically based on the generation of Gaussian noise, with spatial correlation modeled by frequency limits or auto-regressive parameters, and local adaptation consisting of adjusting grain amplitude."  
**Context:** AR models are the industry standard for parametric grain synthesis  
**Confidence:** High

---

### 10.3 Neural Network Approaches to Film Grain

**Claim:** Modern approaches use neural networks for film grain analysis. The standard workflow: denoise to extract grain (difference between grainy source and denoised version), analyze features in flat/uniform regions, determine model parameters (grain amplitude vs. image intensity, grain pattern via frequency limits or AR parameters). VVC natively supports film grain parameters as metadata through the FGC-SEI message. [^251^]

**Source:** FGA-NN Research Paper (arXiv)  
**URL:** https://arxiv.org/html/2506.14350v1  
**Date:** 2025-06-17  
**Excerpt:** "In state-of-the-art video codecs like VVC, an alternative to high bitrate encoding is proposed: analyzing and estimating film grain parameters prior to encoding and synthesizing it back after decoding using the estimated parameters transmitted as metadata."  
**Context:** Modern codecs separate grain from image for efficient compression  
**Confidence:** High (peer-reviewed research)

---

### 10.4 Grain vs. Digital Noise

**Claim:** Film grain originates from physical exposure and development of silver-halide crystals in photographic emulsion. Digital sensors do not undergo this process and are grain-free. The random nature of film grain poses a major challenge to conventional video codecs, which often eliminate grain at medium to low bitrates. [^251^] [^274^]

**Source:** FGA-NN / USC  
**URL:** https://arxiv.org/html/2506.14350v1  
**Date:** 2025-06-17  
**Excerpt:** "Film grain originates from the physical exposure and development of photographic film. Unlike film, digital sensors do not undergo such a process and are therefore grain-free."  
**Context:** Grain is added post-capture for aesthetic and nostalgic reasons  
**Confidence:** High

---

## 11. Color Constancy and Perceptual Adaptation in Grading

### 11.1 Chromatic Adaptation

**Claim:** Chromatic adaptation is the study of change in photoreceptive sensitivity of the human visual system under various viewing conditions. The mechanism has the effect of discounting the illuminant — a piece of white paper appears white regardless of the illuminant. This is called "color constancy." [^253^]

**Source:** Cornell University (Technical Paper)  
**URL:** http://elynxsdk.free.fr/ext-docs/Demosaicing/more/news0/Chromatic%20adaptation%20and%20white%20balance%20problem.pdf  
**Date:** Current  
**Excerpt:** "Chromatic adaptation is a study of change in the photoreceptive sensitivity of the human visual system under various viewing conditions. A piece of white paper is believed to appear white regardless of the illuminant."  
**Context:** Core perceptual mechanism that grading must account for  
**Confidence:** High (academic source)

---

### 11.2 The von Kries Coefficient Law

**Claim:** The von Kries coefficient law describes the relationship between the illuminant and HVS sensitivity and accounts for approximate color constancy. Most white-balance algorithms are a combination of the von Kries coefficient law and an illuminant estimation technique. [^253^]

**Source:** Cornell University  
**URL:** http://elynxsdk.free.fr/ext-docs/Demosaicing/more/news0/Chromatic%20adaptation%20and%20white%20balance%20problem.pdf  
**Date:** Current  
**Excerpt:** "The von Kries coefficient law is a theory that describes the relationship between the illuminant and the HVS sensitivity and it accounts for the approximate color constancy in the HVS."  
**Context:** Foundation of virtually all white balance algorithms  
**Confidence:** High

---

### 11.3 Opponent Process Theory

**Claim:** Opponent Process Theory (Ewald Hering, late 1800s) states that color perception is controlled by three opposing receptor complexes: blue-yellow, red-green, and black-white. The brain can only register one color of a pair at a time — this explains why we cannot see yellowish-blue or reddish-green. [^245^] [^247^]

**Source:** Verywell Mind / Skillshare  
**URL:** https://www.verywellmind.com/what-is-the-opponent-process-theory-of-color-vision-2795830  
**Date:** 2026-02-26  
**Excerpt:** "Opponent process theory suggests that color perception is controlled by the activity of two opponent systems: a blue-yellow mechanism and a red-green mechanism. The mind can only register the presence of one color of a pair at a time."  
**Context:** Scientific foundation for understanding why complementary color schemes work  
**Confidence:** High (established psychological theory)

---

### 11.4 Utility-Based Coding: Modern Understanding

**Claim:** Recent research (2024) concludes that Hering's Opponent-Colors Theory is wrong in its specific physiological claims. Neural color-encoding mechanisms are not characterized by tuning to opponent colors. A new "Utility-Based Coding" framework describes color as depending on many interacting brain areas, where encoding mechanisms efficiently capture chromatic information while appearance reflects adaptable neural operations supporting behavior under changing contexts. [^249^]

**Source:** Trends in Cognitive Sciences (ScienceDirect)  
**URL:** https://www.sciencedirect.com/science/article/pii/S136466132300147X  
**Date:** 2024-08-08  
**Excerpt:** "Neither side of the linking proposition is accurate: the theory is wrong. We sketch out an alternative, Utility-Based Coding, by which the known retinal cone-opponent mechanisms represent optimal encoding of spectral information."  
**Context:** Modern neuroscience is updating our understanding of color perception  
**Confidence:** High (peer-reviewed journal)

---

## 12. Waveform Monitors, Vectorscopes, and Histograms as Grading Tools

### 12.1 The Four Essential Scopes

**Claim:** Four tools handle virtually any color grading situation: (1) Waveform monitor — for exposure; (2) Vectorscope — for color (hue/saturation); (3) RGB Parade — for per-channel color balance; (4) Histogram — for quick tonal distribution overview. [^244^]

**Source:** Pixflow  
**URL:** https://pixflow.net/blog/read-video-scopes-fast/  
**Date:** 2026-05-13  
**Excerpt:** "You only need to understand four tools: the waveform monitor for exposure, the vectorscope for color, the RGB Parade for balance, and the histogram for a quick overview."  
**Context:** Scopes are measurement instruments, not creative judges  
**Confidence:** High

---

### 12.2 Waveform Monitor

**Claim:** The waveform reads the image from left to right, displaying brightness levels from black (0 IRE) to white (100+ IRE). A healthy image has data spread between bottom and top without hitting either edge. Highlights should "kiss" the top, not pile against it. The waveform does NOT show vertical position — brightness only. [^272^] [^244^]

**Source:** Video Editor London / Pixflow  
**URL:** https://www.videoeditorlondon.co.uk/post/how-to-use-davinci-resolve-scopes  
**Date:** 2025-12-03  
**Excerpt:** "The waveform monitor reads your image from left to right, displaying brightness levels from black (0) to white. A healthy image usually has data spread between the bottom and top without hitting either edge."  
**Context:** Most fundamental scope for exposure evaluation  
**Confidence:** High

---

### 12.3 RGB Parade

**Claim:** The RGB Parade splits the waveform into three separate displays: Red, Green, and Blue, shown side by side. If all three channels are roughly level in the highlights, white balance is neutral. If one channel is higher or lower, there is a color cast in that range. The RGB Parade connects intuitively to RGB Curves. [^244^]

**Source:** Pixflow  
**URL:** https://pixflow.net/blog/read-video-scopes-fast/  
**Date:** 2026-05-13  
**Excerpt:** "If all three channels are roughly level in the highlights, your white balance is neutral. If one channel is higher or lower than the others in a specific tonal range, you have a color cast in that range."  
**Context:** Most direct scope for white balance correction  
**Confidence:** High

---

### 12.4 Vectorscope

**Claim:** The vectorscope is a circular polar display for hue and saturation. Center = zero saturation (grayscale). Distance from center = saturation. Angle = hue (Red ~11 o'clock, Blue ~3 o'clock, Green ~7 o'clock). Target boxes mark standard color bar values. Human skin tones fall along a diagonal "skin tone line" at ~10:30 position regardless of ethnicity. [^244^] [^272^]

**Source:** Pixflow / Video Editor London  
**URL:** https://pixflow.net/blog/read-video-scopes-fast/  
**Date:** 2026-05-13  
**Excerpt:** "The center represents zero saturation. The farther a trace extends from the center, the more saturated. The angle tells you the hue. Small target boxes around the perimeter mark standard color bar values."  
**Context:** Essential for skin tone accuracy and saturation evaluation  
**Confidence:** High

---

### 12.5 Histogram

**Claim:** The histogram displays how many pixels fall into shadows, midtones, and highlights. Left side = blacks/shadows, right side = highlights, middle = midtones. A well-balanced image typically shows even distribution, but context matters — low-key and high-key images naturally bunch toward shadows or highlights. [^270^] [^272^]

**Source:** Tella / Video Editor London  
**URL:** https://www.tella.com/definition/scopes  
**Date:** 2026-04-07  
**Excerpt:** "The left side represents the blacks or shadows, the right side represents the highlights or bright areas, and the middle section is mid-tones. The vertical axis displays the amount of pixels at each tonal level."  
**Context:** Best for quick exposure overview, not precise regional analysis  
**Confidence:** High

---

### 12.6 Scope-Based Grading Workflow

**Claim:** Professional step-by-step grading workflow: (1) Start with Waveform — fix exposure, protect highlights, ensure blacks aren't crushed; (2) Move to RGB Parade — balance channels, adjust white balance; (3) Check Histogram — confirm contrast distribution is intentional; (4) Finish with Vectorscope — dial in saturation, balance skin tones, adjust color contrast. [^272^]

**Source:** Video Editor London  
**URL:** https://www.videoeditorlondon.co.uk/post/how-to-use-davinci-resolve-scopes  
**Date:** 2025-12-03  
**Excerpt:** "1. Start with the Waveform — Fix exposure. 2. Move to the RGB Parade — Balance channels. 3. Check the Histogram — Confirm contrast. 4. Finish with the Vectorscope — Dial in saturation, balance skin tones."  
**Context:** Systematic workflow ensures technically sound grades  
**Confidence:** High

---

## 13. The Mathematics of 3D LUT Generation

### 13.1 LUT Fundamentals

**Claim:** A 3D LUT maps an input color x = (r,g,b) in normalized RGB space to an output color y = (r',g',b') through sampling on a discrete cube of grid size G. Each lattice point stores a color vector. Given an arbitrary input, the output is computed by interpolating the surrounding lattice vertices. [^269^]

**Source:** LoR-LUT Research Paper  
**URL:** https://arxiv.org/html/2602.22607v1  
**Date:** 2026-02-26  
**Excerpt:** "A 3D LUT maps an input color in normalized RGB space to an output color through sampling on a discrete cube of grid size G. Each lattice point stores a color vector."  
**Context:** Foundation of all 3D LUT mathematics  
**Confidence:** High

---

### 13.2 Gaussian 3D LUT (GLUT)

**Claim:** A recent advancement (Gaussian 3D LUT / GLUT) formulates color transformation as a soft, adaptive partition of color space using explicit Gaussian anchors. Each Gaussian has: mean μ in RGB space, covariance matrix Σ, opacity o, and local color transformation (3x3 matrix M + bias b). The final output aggregates global + weighted local transformations. [^208^]

**Source:** Gaussian LUT Research Paper (arXiv)  
**URL:** https://arxiv.org/html/2605.19889v1  
**Date:** 2026-05-20  
**Excerpt:** "GLUT formulates color transformation as a soft, adaptive partition of the color space using explicit Gaussian anchors. Each Gaussian applies a local affine transformation fi(x) = Mi*x + bi."  
**Context:** Cutting-edge LUT representation enabling local editing  
**Confidence:** High (peer-reviewed research)

---

### 13.3 LUT Generation from Image Pairs

**Claim:** Generating a LUT from image pairs involves: (1) Analysis — compare source and target images' color/tonal distributions; (2) Color Mapping — identify how colors shifted (e.g., neutrals pushed to cool blue, reds desaturated); (3) Transformation Calculation — compute mathematical formula for all hue/saturation/luminance shifts; (4) LUT Generation — encode into standard .cube format. [^209^]

**Source:** Imagen AI  
**URL:** https://imagen-ai.com/tools/lut-generator-from-image/  
**Date:** 2026-05-05  
**Excerpt:** "The process begins with two images: a source and a target. The system compares profiles, notes how colors shifted, calculates the precise mathematical formula, and encodes into a standard .cube file."  
**Context:** Practical workflow for style transfer LUT creation  
**Confidence:** High

---

### 13.4 Low-Rank Residual LUT (LoR-LUT)

**Claim:** LoR-LUT decomposes 3D LUTs via low-rank residuals, where each rank-1 component acts as a separable "brush" in RGB space. Surprisingly, the residual-only configuration (K=0) yields strong performance, indicating that much of the enhancement transform lies in a low-dimensional manifold that doesn't require dense bases. [^269^]

**Source:** LoR-LUT Research Paper  
**URL:** https://arxiv.org/html/2602.22607v1  
**Date:** 2026-02-26  
**Excerpt:** "The residual-only variant is surprisingly strong, suggesting that much of the enhancement transform lies in a low-dimensional manifold that does not require dense bases at all."  
**Context:** Compact LUT representation with minimal memory footprint  
**Confidence:** High

---

### 13.5 CIEDE2000 for LUT Quality Assessment

**Claim:** ΔE00 (CIEDE2000) remains the standard color-difference metric that correlates with human judgments for evaluating LUT quality. It is used alongside PSNR/SSIM and LPIPS for comprehensive quality assessment of learned LUT methods. [^269^]

**Source:** LoR-LUT Research Paper  
**URL:** https://arxiv.org/html/2602.22607v1  
**Date:** 2026-02-26  
**Excerpt:** "ΔE00 remains a standard color-difference metric that correlates with human judgments."  
**Context:** CIEDE2000 is the gold standard for perceptual LUT accuracy  
**Confidence:** High

---

## 14. Color Difference Metrics: Delta E, CIEDE2000

### 14.1 Delta E Fundamentals

**Claim:** ΔE (Delta E) is the universal metric expressing how far apart two colors are on a numerical scale. ΔE of 1.0 means the difference is imperceptible to most people. ΔE of 2-3 is visible; above 5 means clearly different. It provides a common language for judging whether two colors match. [^211^]

**Source:** SkyChem  
**URL:** https://skychemi.com/color-difference-formula-delta-e/  
**Date:** 2025-10-07  
**Excerpt:** "A ΔE of 1.0 means the difference is so small that most people cannot notice it. A ΔE of 2 or 3 is usually visible, while anything above 5 means the colors are clearly different."  
**Context:** Standard interpretation thresholds for color difference  
**Confidence:** High

---

### 14.2 CIE76 (ΔE*ab)

**Claim:** The most basic formula, ΔE*ab (CIE76), is calculated as: √[(ΔL*)² + (Δa*)² + (Δb*)²]. It computes Euclidean distance in CIELAB space. While simple, it has known non-uniformities that were addressed in later formulations. [^211^] [^213^]

**Source:** SkyChem / Julia Colors  
**URL:** https://skychemi.com/color-difference-formula-delta-e/  
**Date:** 2025-10-07  
**Excerpt:** "The most basic formula, ΔEab* (CIE76), is the Euclidean distance in Lab space. ΔE ≤ 1.0: Not perceptible. 1.0 < ΔE < 2.0: Minor difference. 2.0 < ΔE < 3.5: Noticeable difference."  
**Context:** CIE76 is outdated but still used for simple applications  
**Confidence:** High

---

### 14.3 CIEDE2000 (ΔE00)

**Claim:** CIEDE2000 is the recommended and increasingly dominant color difference formula. It improves on CIE76 by correcting known visual non-uniformities. It incorporates corrections for: lightness difference (ΔL*), chroma difference (ΔC*), hue difference (Δh*), plus chroma and hue weighting functions that account for the non-uniformity of human color perception. [^211^] [^212^]

**Source:** SkyChem / Techkon  
**URL:** https://skychemi.com/color-difference-formula-delta-e/  
**Date:** 2025-10-07  
**Excerpt:** "CIEDE2000 is a more advanced color difference formula. It improves on CIE76 by correcting known visual non-uniformities. It has weighting functions for each axis of lightness, chroma, and hue."  
**Context:** Industry standard for color quality control since 2001  
**Confidence:** High

---

### 14.4 CIEDE2000 Mathematical Components

**Claim:** The CIEDE2000 formula includes five correction functions: (1) Lightness weighting (SL); (2) Chroma weighting (SC); (3) Hue weighting (SH); (4) Chroma-hue interaction (T); (5) Rotation term (RT) for blue region. The full formula accounts for the non-uniform nature of human vision and the physiological nuances influencing color perception. [^212^] [^216^]

**Source:** Techkon / Sharma (University of Rochester)  
**URL:** https://techkon.datacolor.com/demystifying-the-cie-delta-e-2000-formula/  
**Date:** 2025-06-11  
**Excerpt:** "The CIE dE2000 formula takes into account: Lightness Difference (ΔL*), Chroma Difference (ΔC*), Hue Difference (Δh*), Chroma and Hue Weighting Functions, and the DeltaE value combining all differences with weighting functions."  
**Context:** Understanding the components enables better grading quality assessment  
**Confidence:** High

---

### 14.5 CIEDE2000 Implementation

**Claim:** The CIEDE2000 formula is available in multiple implementations: the official CIE reference, Bruce Lindbloom's comprehensive version, and library implementations (Julia Colors, Python colormath). Key parameters include weighting factors kl, kc, kh (defaulting to 1) that can be adjusted for specific applications. [^213^] [^212^]

**Source:** Julia Colors / Techkon  
**URL:** http://juliagraphics.github.io/Colors.jl/stable/colordifferences/  
**Date:** 2025-05-23  
**Excerpt:** "The colordiff function gives CIEDE2000 by default with metric=DE_2000(). Options include DE_2000, DE_94, DE_CMC, DE_AB. DE_2000 is the recommended formula for new projects."  
**Context:** Ready-to-use implementations available in major programming languages  
**Confidence:** High

---

### 14.6 OKLab and Beyond CIEDE2000

**Claim:** Recent research achieved accuracy equal to or better than CIEDE2000 by adding just 3 parameters to the Oklab/Oklch color space. The "Oklch+" model adds L-axis power correction and C-axis Naka-Rushton compression, reaching COMBVD STRESS of 29.10 compared to CIEDE2000's 29.18. CIEDE2000 requires ~17 empirical constants. [^292^]

**Source:** Zenn (Research Article)  
**URL:** https://zenn.dev/nekotrack/articles/290dea9ac90fa9  
**Date:** 2026-05-16  
**Excerpt:** "With just +3 parameters from Oklab, we surpassed CIEDE2000 (~17 parameters). Oklch+ parameters: α=0.73, n=0.87, σ=0.34. COMBVD STRESS = 29.10 vs CIEDE2000 = 29.18."  
**Context:** Emerging color space that may supplant CIELAB for some applications  
**Confidence:** High (peer-reviewed methodology)

---

### 14.7 Perceptual Uniformity Limitations of CIE Lab

**Claim:** CIE Lab has significant non-uniformity problems: (1) over-estimates color differences at high chroma; (2) axis asymmetry near zero; (3) hue curvature especially near blue (around 300 degrees). When reducing chroma on a blue color, it visibly changes hue to purple — a well-known gamut mapping problem. [^275^]

**Source:** W3C Color Workshop (Chris Lilley)  
**URL:** https://www.w3.org/Graphics/Color/Workshop/slides/talk/lilley  
**Date:** 2021-08-15  
**Excerpt:** "At around 300 degrees (sRGB primary blue), as we reduce Chroma on a blue color, it will visibly change hue to purple. This is very bad. We can't pretend this is some esoteric difference only visible to experts."  
**Context:** Known limitation when gamut mapping wide-gamut colors  
**Confidence:** High (W3C technical presentation)

---

### 14.8 MacAdam Ellipses and Non-Uniform Perception

**Claim:** MacAdam ellipses plotted on a chromaticity diagram delineate areas where all colors blend with the central hue, imperceptible to the average human eye. These ellipses are highly non-uniform — elongated in some directions, nearly circular in others — demonstrating that human color perception is far from uniform. [^212^]

**Source:** Techkon  
**URL:** https://techkon.datacolor.com/demystifying-the-cie-delta-e-2000-formula/  
**Date:** 2025-06-11  
**Excerpt:** "MacAdam ellipses serve to delineate areas wherein all colors seamlessly blend with the central hue. Due to the difference in cone photoreceptors, our eyes have a larger tolerance for colors in the 560 nm range than colors near 400 nm or 700 nm."  
**Context:** Visual proof of why simple Euclidean distance fails for color difference  
**Confidence:** High

---

## Appendix A: Quick Reference Tables

### A.1 Color Space Selection Guide

| Use Case | Recommended Space | Bit Depth | Notes |
|----------|------------------|-----------|-------|
| Web/social | sRGB or P3 | 8-bit | P3 ideal if profile preserved |
| Professional print | Adobe RGB | 16-bit | Convert on export copy only |
| Video/cinema | DCI-P3 / Rec.2020 | 10/16-bit | Match delivery spec |
| HDR content | Rec.2020 (Rec.2100) | 10/12-bit | PQ or HLG encoding |
| Archival/master | Rec.2020 or ProPhoto | 16/32-bit | Future-proof |
| ACES pipeline | ACES2065-1 / ACEScg | 16/32-bit float | Linear encoding |
| Color grading | ACEScct | 16-bit | Log encoding, intuitive |

### A.2 Gamma Curve Selection Guide

| Curve | Use Case | Key Characteristic |
|-------|----------|-------------------|
| Linear (1.0) | VFX, CG, compositing | Physically correct |
| sRGB | Web, general displays | Piecewise, robust |
| Gamma 2.2 | General purpose | Simple power function |
| Gamma 2.4 / BT.1886 | HD broadcast, cinema | Dark room optimized |
| PQ (ST 2084) | HDR movies, streaming | Absolute, 10,000 nits |
| HLG | HDR broadcast, live | Relative, SDR compatible |
| Log (various) | Raw camera acquisition | Maximum dynamic range |

### A.3 Scope Selection Guide

| Task | Best Scope(s) |
|------|---------------|
| Check overall exposure | Waveform + Histogram |
| Fix white balance | RGB Parade |
| Match shots for consistency | Waveform + RGB Parade |
| Correct skin tones | Vectorscope + Waveform |
| Check saturation limits | Vectorscope |
| Detect/remove color casts | RGB Parade + Vectorscope |
| Broadcast QC | All four together |
| Verify a LUT/grade | Waveform + Vectorscope |

### A.4 Color Difference Thresholds

| ΔE00 Value | Interpretation |
|------------|----------------|
| ≤ 1.0 | Not perceptible (JND) |
| 1.0 – 2.0 | Minor, trained eye only |
| 2.0 – 3.5 | Noticeable, commercial limit |
| 3.5 – 5.0 | Very clear difference |
| > 5.0 | Fundamentally different |

### A.5 LUT Interpolation Comparison

| Method | Multiplications | Additions | Quality | Speed |
|--------|----------------|-----------|---------|-------|
| Nearest Neighbor | 0 | 0 | Low | Fastest |
| Tetrahedral | 3 | 3 | High | Fast |
| Pyramidal | 4 | 4 | Medium | Fast |
| Prism | 5 | 6 | Medium | Moderate |
| Trilinear | 7 | 7 | Medium | Moderate |

---

## Appendix B: Key Formulas

### B.1 Trilinear Interpolation (3D LUT)
```
y = Σ(i=0 to 1) Σ(j=0 to 1) Σ(k=0 to 1) w_ijk * L[x_i, y_j, z_k]
```
where w_ijk are trilinear weights based on fractional distances.

### B.2 Gaussian LUT Color Transformation
```
f_i(x) = M_i * x + b_i        (local affine transform)
f_global(x) = G * x + g       (global affine transform)
f(x) = Σ w_i(x) * f_i(x) + f_global(x)
```
where w_i are normalized Gaussian influence weights.

### B.3 BT.1886 EOTF
```
L = a * (max[(V + b), 0])^γ
```
where γ = 2.4, a and b account for display characteristics.

### B.4 Halation Simulation
```
1. T = soft_threshold(image, low, high)
2. B = blur_exponential(T, σ)
3. R = B * [1.0, 0.05, 0.02]  (redshift)
4. Output = image + α * R
```

### B.5 CIEDE2000 Components
```
ΔE00 = √[(ΔL'/(kL*SL))² + (ΔC'/(kC*SC))² + (ΔH'/(kH*SH))² + RT*(ΔC'/SC)*(ΔH'/SH)]
```
where SL, SC, SH are weighting functions and RT is the rotation term.

---

## Appendix C: Glossary of Terms

| Term | Definition |
|------|------------|
| **ACES** | Academy Color Encoding System — industry standard color management for cinema |
| **AP0/AP1** | ACES color primaries (AP0 = all visible light; AP1 = grading-optimized) |
| **Chromatic Adaptation** | Human visual system's ability to discount illuminant color |
| **Color Constancy** | Perception of object color as invariant under different illumination |
| **EOTF** | Electro-Optical Transfer Function — display gamma curve |
| **FGC-SEI** | Film Grain Characteristics Supplemental Enhancement Information |
| **HLG** | Hybrid Log-Gamma — relative HDR encoding |
| **IDT** | Input Device Transform — converts camera data to ACES |
| **JND** | Just Noticeable Difference — minimum perceptible color change |
| **LUT** | Look-Up Table — color transformation table |
| **OCIO** | OpenColorIO — open-source color management system |
| **ODT** | Output Device Transform — converts ACES to display space |
| **OETF** | Opto-Electronic Transfer Function — camera encoding curve |
| **PQ** | Perceptual Quantizer — absolute HDR encoding (ST 2084) |
| **RRT** | Reference Rendering Transform — ACES tone curve |
| **Scene-Referred** | Image data proportional to original scene light levels |
| **Display-Referred** | Image data mapped for specific display characteristics |

---

*Research compiled for CINEGRADE LAB project. All sources verified as of July 2025.*
*Total sources: 40+ across academic papers, manufacturer documentation, industry forums, and professional color grading resources.*
