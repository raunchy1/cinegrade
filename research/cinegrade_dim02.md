# CINEGRADE LAB - Dimension 2: Cinematic LUTs & Professional Color Grading

**Research Date:** August 2025
**Classification:** Deep-dive research for CINEGRADE LAB premium color grading platform
**Researcher:** AI Research Agent

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Key Players in Cinematic LUTs](#key-players)
3. [LUT Packs for Luxury Brand Commercials & Music Videos](#luts-for-luxury-and-music-videos)
4. [LUT Formats: .CUBE vs .3DL vs .LUT](#lut-formats)
5. [Technical Standards for Professional LUTs](#technical-standards)
6. [ARRI, RED, Sony Venice Native LUTs](#camera-native-luts)
7. [Film Print Emulation LUTs](#film-print-emulation)
8. [LUTs in Netflix, A24 & High-End Productions](#luts-in-high-end-productions)
9. [Colorist Workflows: Starting Point vs Final Look](#colorist-workflows)
10. [Pricing Models for Professional LUT Packs](#pricing-models)
11. [LUTs and ACES Color Workflow](#luts-and-aces)
12. [Market Dynamics](#market-dynamics)
13. [Sources & References](#sources)

---

## Executive Summary

The global Cinematic LUTs market reached USD 312.8 million in 2024, registering a CAGR of 10.4% from 2025 to 2033, with projections to reach USD 758.5 million by 2033 [^1^]. The market is driven by the proliferation of high-quality video content across streaming platforms, social media, and advertising, coupled with the democratization of filmmaking tools. Professional LUTs have evolved from simple color presets to sophisticated conversion tools built on scientific accuracy, with leading creators calibrating against the ARRI Alexa gold standard [^2^]. The industry distinguishes between technical LUTs (for color space conversion) and creative LUTs (for stylized looks), with professional colorists increasingly using LUTs as starting points rather than final solutions [^3^]. Film print emulation remains the dominant creative application, with Kodak 2383 and Kodak Vision3 500T/5219 being the most emulated stocks [^4^]. The ACES color workflow has introduced Look Modification Transforms (LMTs) as the standardized approach to applying creative looks within managed color pipelines [^5^].

---

## Key Players in Cinematic LUTs {#key-players}

### Tier 1: Professional Color Science Creators

**Phantom LUTs by Joel Famularo**
Claim: Joel Famularo, a cinematographer specializing in ARRI Alexa and film emulation, developed Phantom LUTs by calibrating against an in-house ARRI Alexa camera as the gold standard, emulating its "legendary color science, organic skin tones, and cinematic highlight roll-off" [^2^].
Source: Joel Famularo Official Website
URL: https://www.joelfamularo.com/
Date: 2025-10-21
Excerpt: "Phantom LUTs are professional-grade conversion tools built on a foundation of scientific accuracy...Every Phantom LUT is meticulously developed over months by shooting charts and scenes side-by-side with our in-house ARRI Alexa camera."
Context: Joel Famularo is a DoP known for authentic cinematography. Phantom LUTs support Sony S-Log2/S-Log3, Canon C-Log/C-Log2/C-Log3, Panasonic V-Log, RED IPP2, Blackmagic Gen 4/5, ARRI LogC, Apple Log, and DJI D-Log/D-Log M.
Confidence: High

**philmColor by Phil Holland**
Claim: Phil Holland's philmColor R3 offers 718 total LUTs including 540 all-new LUTs, providing one of the most extensive LUT packages for RED's IPP2 workflow, with creative inspiration drawn from motion picture film stocks [^6^].
Source: CineD
URL: https://www.cined.com/philmcolor-r3-lut-based-workflow-for-reds-ipp2-color-pipeline-released/
Date: 2022-02-14
Excerpt: "Phil draws his inspiration for his LUT creations from film stocks. The goal is to produce digital stocks useful to the modern filmmaker that will work with a variety of lighting conditions and exposure methods."
Context: Phil Holland is a director/cinematographer with 20+ years of experience. philmColor R3 costs $300 for new users and includes color space transforms for ARRI, Blackmagic, Canon, DJI, Fujifilm, Nikon, Panasonic, Sony, and Generic Rec709.
Confidence: High

**CINECOLOR by Noam Kroll**
Claim: Noam Kroll, an award-winning Los Angeles filmmaker, has created 144+ LUTs used on "national commercials to theatrical feature films," organized into themed packs covering utility LUTs, film emulation, and creative looks [^7^].
Source: Noam Kroll Blog
URL: https://noamkroll.com/introducing-cinecolor-io-a-brand-new-platform-of-144-cinematic-luts-for-filmmakers-photographers/
Date: 2019-02-08
Excerpt: "They were downloaded by thousands of you, and have been put to use day in & day out on countless film & television projects."
Context: Noam Kroll launched CINECOLOR.IO as a dedicated platform. LUTs come in .cube and .xmp formats. Packs include Vintage, Hollywood Epic, Indie Darling, Dreamify, Low-Con Film, and Vivid Film.
Confidence: High

**Gamut**
Claim: Gamut positions itself as a professional LUT company serving 50,000+ filmmakers and colorists, with creative LUTs designed to work with specific camera systems through their BaseLUT conversion system [^8^].
Source: Gamut Official Website
URL: https://gamut.io/
Date: 2026-05-14
Excerpt: "Join 50,000+ Filmmakers and Colorists Who Trust Our LUTs...Gamut made them easy to use and compatible with all software."
Context: Gamut offers BaseLUTs (technical conversion LUTs) paired with creative LUTs. Notable collections include Immersion 2.0 ($99), Faction (Orange/Teal), Creator, Prestige, and X88. They also offer a subscription model (Gamut Drops at $12/month).
Confidence: High

**Color Grading Central (visionCOLOR)**
Claim: Color Grading Central, in partnership with visionCOLOR, distributes the Osiris and ImpulZ LUT packs, offering film emulation LUTs including the popular M31 blockbuster orange/teal LUT [^9^].
Source: Float Digital
URL: https://float.digital/2023/07/06/live-a-little-live-a-lut-17-free-resources-to-help-you-get-started-with-luts/
Date: 2023-07-06
Excerpt: "Color Grading Central - In partnership with visionCOLOR, download a free M31 Blockbuster orange/teal LUT from the Osiris LUT pack, 6 ImpulZ Kodak & Fuji LUTs"
Context: ImpulZ LUTs emulate 16 different film stocks including Kodak Vision3 500T 5219, with four output gamma profiles: Film Contrast, Film Print, VisionSpace, and CINEON LOG [^10^].
Confidence: High

**Tropic Colour**
Claim: Tropic Colour offers themed LUT collections priced around $39 each, covering categories like Movie LUTs, Urban, Nature, Vintage, Cinematic, and Beauty Retouching, designed in collaboration with professional colorists [^11^].
Source: FixThePhoto
URL: https://fixthephoto.com/tropic-colour-luts.html
Date: 2021-05-21
Excerpt: "To create this collection, the designers took inspiration from popular movies and collaborated with professional colorists. Here, you will find LUTs that allow you to make your footage look like scenes from such movies as Joker, Don't Breath, Her, The Master, Dunkirk, Mad Max, Matrix, Moonrise Kingdom, The Relevant, and Wonder Woman."
Context: Tropic Colour has been reviewed as one of the top LUT creators, featured by prominent YouTube filmmakers including BuffNerds Media.
Confidence: High

**Juan Melara**
Claim: Professional colorist Juan Melara offers free film print emulation LUTs including Kodak 2383 and Fuji 3510, and has written extensively about the transition of print film emulation from technical necessity to creative choice [^12^].
Source: Juan Melara Blog
URL: https://juanmelara.com.au/blog/print-film-emulation-luts-for-download
Date: 2021-10-12
Excerpt: "I use them for maybe 70% of my TV commercial work and maybe 90% of my narrative work. This also seems to reflect the percentages I see in a lot of the larger colour grading houses that have come from a film background."
Context: Juan Melara is a respected professional colorist. His article explains how PFE LUTs shifted from technical necessity to creative choice with the advent of digital projection.
Confidence: High

**mononodes (Colorist/Developer)**
Claim: mononodes has developed sophisticated film emulation PowerGrades for DaVinci Resolve including custom film stock LUTs inspired by Kodak Vision3 200T (KD 5213), FotoKem's SHIFTai project (KD 2254 KEM), and Kodak Vision Color Print Film 2383 (MONOMOD 2383 A) [^13^].
Source: mononodes Film Emulation Page
URL: https://mononodes.com/film-emulation/
Date: 2025-10-29
Excerpt: "In addition, the film aesthetic does not end with matching colors. I'm interested in lens flaws like chromatic aberration, lens distortion, petzval field curvature, and so on."
Context: mononodes creates comprehensive film aesthetic packages including LUTs, lens PowerGrades, halation, flicker, gate weave, and film damage elements. KD 5213 expects "Arri Alexa / Arri LogC" input.
Confidence: High

### Tier 2: Studio/Institutional LUT Creators

**ARRI Film Lab**
Claim: ARRI's official Film Lab plugin provides non-destructive film look simulations for ALEXA 35, including in-camera preview through ARRI Textures and 3D LUTs, plus the ARRI Look Library with 87 pre-defined looks [^14^].
Source: ARRI Official Website
URL: https://www.arri.com/en/learn-help/learn-help-camera-system/tools/arri-film-lab
Date: 2025-10-01
Excerpt: "ARRI Film Lab makes digital feel like real film. It's incredibly easy to use, yet feels like it carries a full color science lab inside—robust and cinematic." - Luisa Cavanagh, Colorist at Quanta Post
Context: ARRI Film Lab is available through RE:Vision Effects with weekly, monthly, annual, or permanent licensing. Built on ARRI's film and digital legacy from ARRILASER and ARRISCAN to REVEAL Color Science.
Confidence: High

**Sony / Picture Shop (Josh Pines, Chris Kutcka, Jason Fabbro, Tony D'Amore)**
Claim: Sony partnered with Picture Shop to release LUTs exclusively designed for Sony VENICE 2, created by legendary color scientists Josh Pines (Saving Private Ryan, Forrest Gump, The Revenant) and Chris Kutcka (Kill Bill, Pirates of the Caribbean) [^15^].
Source: Church Production
URL: https://www.churchproduction.com/gear/sony-and-picture-shop-announce-new-luts-designed-exclusively/
Date: 2022-11-18
Excerpt: "Compared to a LUT supplied by a camera manufacturer, the Sony Lo Con Base LUT is a kinder, gentler viewing transform that has knowledge of the camera's codec and color space. It is low contrast and doesn't severely limit the color gamut."
Context: The collection includes Lo Con Base LUT, Hi Con LUT, 50-50 LUT, Jason Fabbro Looks 1 & 2, Tony D'Amore Daylight/Style/Tungsten LUTs, and HDR versions in Rec.2020 PQ.
Confidence: High

**Filmatic AI**
Claim: Filmatic AI offers precision-engineered film emulation LUT collections, including ARRI Alexa to Kodak 250D 5207 Film Emulation LUT, with both Rec709 and Cineon Log Film Negative versions in 65x65x65 .cube format [^16^].
Source: Filmatic AI
URL: https://www.filmatic.ai/product-page/arri-alexa-to-kodak-250d-5207-film-emulation-lut
Date: Unknown
Excerpt: "These LUTs faithfully reproduce the iconic Kodak 250D 5207 35mm film stock in any shooting environment. Universally compatible with Adobe Premiere Pro, DaVinci Resolve, Final Cut Pro, AVID, and any software accepting .cube LUT files."
Context: Filmatic AI also offers the ColorClone plugin for more comprehensive film emulation. Their LUTs are 65x65x65 .cube files for maximum precision.
Confidence: High

**analogica.lab**
Claim: analogica.lab sells professional film emulation LUTs on Etsy, including 16mm Kodak Vision3 500T film emulation LUTs priced at $42.99, with 382+ five-star reviews [^17^].
Source: Etsy
URL: https://www.etsy.com/listing/4390734342/16mm-kodak-vision3-500t-film-emulation
Date: Unknown
Excerpt: "5 out of 5 stars (382). $42.99. Eligible orders get...16MM Kodak Vision3 500T - Film Emulation LUT - For Professional Filmmaking and Photography."
Context: analogica.lab is a popular independent LUT creator on Etsy, demonstrating that professional-grade LUTs can be successfully distributed through alternative marketplaces.
Confidence: Medium

---

## LUT Packs for Luxury Brand Commercials & Music Videos {#luts-for-luxury-and-music-videos}

**Triune Digital - Cinematic LUTs**
Claim: Triune Digital's Cinematic LUTs V1 includes over 35 movie-inspired LUTs with versions for Alexa, REDLog, Standard LOG, and Rec.709, modeled after films including Blade Runner 2049, La La Land, Moonlight, and The Shape of Water [^18^].
Source: Triune Digital
URL: https://www.triunedigital.com/collections/color-grading
Date: Unknown
Excerpt: "Over 35 movie inspired LUTs. 3 Noir LUTs. Alexa, REDLog, Standard LOG and .rec709 versions of each LUT. 55 Utility LUTs."
Context: Triune Digital's library includes specific looks from A-list films, making them popular among commercial and music video colorists who need to match cinematic references.
Confidence: High

**300+ Music Video Color Grading LUTs Pack (AAA Presets)**
Claim: AAA Presets offers 300+ premium music video color grading LUTs for $59.99 (regular price $699.99), designed for vibrant, moody, retro, and neon aesthetics across all music genres [^19^].
Source: AAA Presets
URL: https://aaapresets.com/products/300-music-video-color-grading-luts-pack
Date: 2023-04-22
Excerpt: "300+ Premium Color LUTs Presets. .CUBE 1 Click Cinema Quality. 107 items sold in last 14 days."
Context: The pack is specifically marketed for music videos with looks for "bold hip-hop vibes, dreamy indie tones, or electrifying pop visuals."
Confidence: Medium

**Gamut - Immersion 2.0, Faction, Prestige**
Claim: Gamut's LUT collections (Immersion 2.0, Faction, Creator, Prestige at $99 each) are used by professional filmmakers for commercial work including wedding, commercial, and narrative projects [^8^].
Source: Gamut Official Website
URL: https://gamut.io/
Date: 2026-05-14
Excerpt: "I absolutely love the teal and orange tones especially with dark moody landscape shots, it looks incredible on sony slog3 footage!" - Luigi S.
Context: Gamut's Faction collection reimagines "Orange and Teal with a modern, cinematic edge" - a look heavily used in luxury commercial work.
Confidence: High

**NETFLIX LUT Pack (TheLUT Hut)**
Claim: TheLUT Hut offers a NETFLIX LUT Pack containing 12 color-grading LUTs based on Netflix TV shows including The Queen's Gambit, Stranger Things, Mindhunter, Wednesday, and You [^20^].
Source: TheLUT Hut
URL: https://www.theluthut.co.uk/products/2020s-pack-lut-pack
Date: 2023-03-11
Excerpt: "This LUT pack contains 12 colour-grading LUT's based on various different TV shows on Netflix. Make your film look more cinematic by using the same colours the professionals use."
Context: Pricing is approximately GBP 140. The pack demonstrates the trend of reverse-engineering looks from high-end streaming productions.
Confidence: Medium

**Pro Cinematic LUT Collection (CinematicGradeLUTs.com)**
Claim: CinematicGradeLUTs.com markets a "Netflix-Level Colors" LUT pack optimized for S-Log3, promising "pro color grading fast - perfect skin tones, rich contrast, cinematic style" [^21^].
Source: CinematicGradeLUTs.com
URL: https://www.cinematicgradeluts.com/
Date: 2025-11-07
Excerpt: "Whether you're editing in Premiere Pro, Final Cut Pro, DaVinci Resolve, or LumaFusion, this LUT pack works flawlessly across all major platforms."
Context: The site demonstrates the market positioning of LUTs as shortcuts to streaming-quality looks.
Confidence: Medium

---

## LUT Formats: .CUBE vs .3DL vs .LUT {#lut-formats}

**The .CUBE Format (Industry Standard)**
Claim: The .cube format is the industry-standard 3D LUT format used by most editing and color grading software, storing color values as floating-point numbers between 0 and 1. It is compatible with DaVinci Resolve, Premiere Pro, Final Cut Pro, After Effects, Baselight, Scratch, SmallHD, and Atomos [^22^].
Source: CINEM8 LUT Converter
URL: https://cinem8.co/pages/free-online-lut-converter-65x-to-33x-to-17x
Date: Unknown
Excerpt: "The industry-standard 3D LUT format used by most editing and color grading software. Uses floating-point RGB values."
Context: DaVinci Resolve's default LUT format is .cube. Most LUT creators distribute primarily in .cube format.
Confidence: High

**The .3DL Format (Autodesk/VFX Pipeline)**
Claim: The .3dl format is Autodesk's 3D LUT format using integer values (typically 10-bit or 12-bit), originating from applications like Lustre and Flame. It is common in high-end VFX and finishing pipelines [^22^].
Source: CINEM8 LUT Converter
URL: https://cinem8.co/pages/free-online-lut-converter-65x-to-33x-to-17x
Date: Unknown
Excerpt: "The .3dl format uses integer values (typically 10-bit or 12-bit) and originated from Autodesk applications like Lustre and Flame. It is common in high-end VFX and finishing pipelines."
Context: Common in Autodesk Flame, Lustre, Nuke, and Assimilate Scratch workflows. DaVinci Resolve also supports .3dl.
Confidence: High

**The .LUT Format (1D Legacy)**
Claim: Traditional .LUT files are typically 1D LUTs that adjust each color channel independently, unlike 3D LUTs which can perform complex cross-channel color transformations. 1D LUTs are useful for gamma/contrast adjustments but cannot create creative looks that require cross-channel color manipulation [^23^].
Source: Inventome - The Truth About LUTs
URL: https://www.inventome.com/note/the-truth-about-luts
Date: Unknown
Excerpt: "Unlike 1D LUTs that adjust each color channel independently, 3D LUTs can perform complex cross-channel color transformations, making them essential for creative looks and technical color space conversions."
Context: 1D LUTs are simpler and smaller but far less powerful. Most professional workflows use 3D LUTs exclusively for creative work.
Confidence: High

**Other Notable Formats**
- **Lattice (.lattice)**: Proprietary format by Video Village for preserving maximum precision [^24^]
- **ARRI Look File (.aml)**: ARRI Alexa-specific look format [^24^]
- **Panasonic VLT**: Panasonic's 3D LUT format [^24^]
- **CLF (Common LUT Format)**: ACES standardized format for LMTs [^5^]
- **Sony .ART**: Sony's proprietary file format offering enhanced performance compared to 3D LUTs [^25^]
- **Hald CLUT**: Image-based LUT format [^24^]
- **DaVinci 3D LUT (.davlut)**: DaVinci Resolve native format [^24^]

---

## Technical Standards for Professional LUTs {#technical-standards}

**3D LUT Lattice Sizes**
Claim: The three standard 3D LUT grid sizes are 17x17x17 (monitor/viewing LUTs), 33x33x33 (industry standard for post-production), and 65x65x65 (maximum precision for HDR/high-end finishing). A 17x17x17 cube has ~5,000 defined points, while a 33x33x33 cube has ~36,000 defined points. A 10-bit RGB image would theoretically need 1.07 billion points for complete accuracy [^23^] [^26^].
Source: Inventome / RED Digital Cinema
URL: https://www.inventome.com/note/the-truth-about-luts / https://docs.red.com/915-0202/REV-A/PDF/915-0202%20Rev-A%20%20%20RED%20OPS%2C%203D%20Cube%20LUTs%20and%20IPP2.pdf
Date: Unknown
Excerpt: "A 17x17x17 cube is a common size for a monitor display style LUT. A 33x33x33 LUT is considered 'production' quality and it's not uncommon to see 64x64x64 LUTs." [^23^]; "It is recommended that 3D LUTs be at least 33x33x33 in size. Both in-camera and REDCINE-X PRO, tetrahedral interpolation is used on 3D LUTs." [^26^]
Context: RED recommends 33x33x33 as minimum for IPP2 creative LUTs. DaVinci Resolve primarily works with 33x33x33. Higher-end workflows use 65x65x65 for critical color work.
Confidence: High

**Interpolation Algorithms**
Claim: Tetrahedral interpolation is the most accurate algorithm for 3D LUT interpolation, used by DaVinci Resolve, OpenColorIO, and CINEM8. It uses only the four closest vertices (a tetrahedron), limiting the influence of distant points and reducing artifacts in areas with high-dynamic color variations. Trilinear interpolation is less accurate but computationally simpler [^22^] [^27^].
Source: CINEM8 / Analog Way Application Note
URL: https://cinem8.co/pages/free-online-lut-converter-65x-to-33x-to-17x / https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/LivePremier/Common/Application+Notes/livepremier-3d-lut-architecture---application-note.pdf
Date: Unknown
Excerpt: "CINEM8 uses tetrahedral interpolation -- the same algorithm used by DaVinci Resolve and OpenColorIO." [^22^]; "Tetrahedral interpolation is far more accurate as it only uses the four closest vertices...It limits the influence of the others, especially in areas where the output colors have high-dynamic variations." [^27^]
Context: Premiere Pro historically used trilinear by default, causing banding issues with some LUTs. Switching to tetrahedral can significantly improve quality.
Confidence: High

**1D LUTs vs 3D LUTs**
Claim: 1D LUTs can hold every possible value for a single channel but cannot perform cross-channel color transformations. A 3D LUT that could hold every possible value would need 1024x1024x1024 points for 10-bit RGB (over 1 billion points), making it impractical. Therefore, 3D LUTs are subsampled and interpolation fills in the gaps. This approximation can introduce banding in smooth gradients [^23^].
Source: Inventome
URL: https://www.inventome.com/note/the-truth-about-luts
Date: Unknown
Excerpt: "A 10 bit RGB image would need 1024x1024x1024 points to accurately define every movement of colour...So what actually happens is the application you are using interpolates between the defined points."
Context: Professional colorists must be aware that visible banding in out-of-focus areas may be caused by the LUT rather than the source footage.
Confidence: High

**Canon 3D LUT Implementation**
Claim: The Canon EOS C70 supports 3D LUTs in 17-grid and 33-grid resolutions in .cube format for Full Range signal input and output, enabling in-camera recording with LUTs applied through the Look File function [^28^].
Source: Canon Professional
URL: https://www.canon.com.cy/pro/stories/how-to-use-3d-luts/
Date: 2021-07-20
Excerpt: "There are three grid sizes, or 'resolutions', of 3D LUTs - 17grid, 33grid and 65grid. Although 65grid offers the most accuracy, applying it to footage in editing software requires a computer with more processing power."
Context: Canon's Look File function allows recording with 3D LUT applied, a feature increasingly available in modern cinema cameras.
Confidence: High

---

## ARRI, RED, Sony Venice Native LUTs {#camera-native-luts}

### ARRI Alexa

**ARRI Legacy Color Emulation**
Claim: Joel Famularo developed a Legacy Colour Emulation LUT for the ARRI Alexa 35 that allows filmmakers to use ARRI's "revolutionary legacy colour science for artistic or camera matching purposes," packaged as an ARRI LUT 5 Pack with 4 creative variations and 6 Film Emulation LUTs [^29^].
Source: Joel Famularo
URL: https://www.joelfamularo.com/colour-alexa35
Date: 2025-10-21
Excerpt: "The official Alexa 35 Log C4 to Rec709 LUT offers a very accurate image but for those who wish to use ARRI's revolutionary legacy colour science for artistic or camera matching purposes, I have developed a Legacy Colour Emulation LUT."
Context: All LUTs come with both 33x and 65x versions. Also includes 6 Film Emulation LUTs emulating film stocks from the past.
Confidence: High

**ARRI Look Library**
Claim: The ARRI Look Library contains 87 pre-defined looks developed by ARRI, each offered in three intensities, included with the ARRI Film Lab plugin [^14^].
Source: ARRI Official
URL: https://www.arri.com/en/learn-help/learn-help-camera-system/tools/arri-film-lab
Date: 2025-10-01
Excerpt: "Bundled with ARRI Film Lab is a special plugin version of the well-established ARRI Look Library, allowing users to explore its diverse range of LUTs in a plugin environment."
Context: These are official ARRI-developed looks, not third-party emulations.
Confidence: High

### RED Digital Cinema

**RED IPP2 and philmColor**
Claim: RED's IPP2 workflow uses REDWideGamutRGB color space and Log3G10 gamma curve, with a recommended workflow of processing into the wide gamut log space, grading there, and applying output conversion at the end of the pipeline. philmColor R3 provides 718 LUTs specifically designed for this workflow [^6^] [^30^].
Source: CineD / Lutify.me
URL: https://www.cined.com/philmcolor-r3-lut-based-workflow-for-reds-ipp2-color-pipeline-released/ / https://lutify.me/how-to-correctly-color-grade-red-ipp2-footage-in-premiere-pro/
Date: 2022-02-14 / 2019-07-18
Excerpt: "IPP2 creative 3D LUTs in camera should be 33x33x33." [^26^]; "Working with Log3G10 and REDWideGamutRGB is simple and greatly simplified...Process your RED footage into Log3G10 and REDWideGamutRGB. This ensures no clipping occurs to the colors coming from the sensor." [^30^]
Context: RED recommends applying creative LUTs in the wide gamut space, then converting to the delivery color space (Rec.709, P3, Rec.2020) at the very end of the pipeline.
Confidence: High

### Sony VENICE

**Sony VENICE 2 LUT Family by Picture Shop**
Claim: Sony's VENICE 2 LUT collection includes the Lo Con Base LUT (a low-contrast viewing transform designed for modification), Hi Con LUT, 50-50 LUT, Jason Fabbro Looks (Captain Marvel, Thor:Ragnarok), and Tony D'Amore LUTs (Fargo, Daredevil) [^15^] [^31^].
Source: Church Production / Sony Cine
URL: https://www.churchproduction.com/gear/sony-and-picture-shop-announce-new-luts-designed-exclusively/ / https://sony-cinematography.com/resources/luts/
Date: 2022-11-18 / 2021-04-17
Excerpt: "The Lo Con Base LUT is a low-contrast base LUT that's intended to be modified and graded. It offers a low-contrast starting point and has the S-curve built into it." [^15^]; "D'Amore Daylight base LUT cools off the blacks and warms up the highlights to give better color separation off the sensor." [^31^]
Context: The Lo Con Base LUT was specifically designed as "a block of clay that gives colorists a starting point" per Josh Pines. HDR versions are available in Rec.2020 PQ.
Confidence: High

**Sony s709 Monitor Look**
Claim: Sony's s709 Monitor Look LUT was developed alongside VENICE and renders imagery in subtle colors with smooth color gradation and softer low contrast tone curve, close to film color characteristics. It is also applicable to FX9 [^25^].
Source: Sony Professional
URL: https://pro.sony/ue_US/technology/professional-video-lut-look-up-table
Date: 2019-12-10
Excerpt: "Sony created these LUTs for on-set monitoring while shooting, as well as for clip review afterward...s709 is close to the film color characteristics."
Context: The s709 look is Sony's official film-like monitoring LUT, distinct from standard Rec.709.
Confidence: High

**Technicolor Look Collection for VENICE**
Claim: Technicolor created a Look Collection for Sony VENICE including both LUT files for on-set monitoring and post-production, plus .ART files in Sony's proprietary format offering enhanced performance compared to 3D LUTs [^25^].
Source: Sony Professional
URL: https://pro.sony/ue_US/technology/professional-video-lut-look-up-table
Date: 2019-12-10
Excerpt: "The new Technicolor Look Collection for VENICE allows anyone to add the artistry and experience of Technicolor colorists to their VENICE productions."
Context: Technicolor's involvement demonstrates the intersection of traditional color science and modern digital workflows.
Confidence: High

---

## Film Print Emulation LUTs {#film-print-emulation}

### Kodak 2383 (The Industry Standard Print Stock)

**Kodak 2383 in Professional Workflows**
Claim: Kodak 2383 is the most widely used print film emulation LUT in professional color grading. Juan Melara uses PFE LUTs for approximately 70% of TV commercial work and 90% of narrative work, and this reflects usage in larger color grading houses with film backgrounds [^12^].
Source: Juan Melara Blog
URL: https://juanmelara.com.au/blog/print-film-emulation-luts-for-download
Date: 2021-10-12
Excerpt: "I use them for maybe 70% of my TV commercial work and maybe 90% of my narrative work. This also seems to reflect the percentages I see in a lot of the larger colour grading houses that have come from a film background."
Context: Kodak 2383 was originally a technical preview LUT before going to film print. With digital projection, it has become a creative choice.
Confidence: High

**Free Kodak 2383 LUTs**
Claim: Multiple creators offer free Kodak 2383 LUTs optimized for modern scene-referred workflows. Cine Source offers a LogC Kodak 2383 LUT as a free alternative to DaVinci Resolve's built-in version. Jamie Fenn provides free Kodak 2383 & Fuji 351 DWG Film LUTs optimized for DaVinci Wide Gamut workflows. procolor.ist offers a free Kodak 2383 LUT built for ACES or DaVinci Wide Gamut [^32^] [^33^] [^34^].
Source: Cine Source / Jamie Fenn / procolor.ist
URL: https://cinesource.nl/products/logc-kodak-2383-lut/ / https://www.jamiefenn.com/p/free-dwg-film-emulation-luts/ / https://procolor.ist/freelut/
Date: 2026-02-15 / Unknown / Unknown
Excerpt: "Created as a better alternative to the build-in 2383 LUT in DaVinci Resolve the Cine Source - Kodak 2383 LUT offers a quick and easy way to achieve a 2383 printfilm emulation on your footage." [^32^]; "This Kodak 2383 LUT has been built to work scene-referred within either ACES or DaVinci Wide Gamut, and will give you beautiful results whether you're grading for SDR or HDR." [^34^]
Context: The shift to scene-referred workflows (ACES/DaVinci Wide Gamut) has created demand for modernized 2383 LUTs that work correctly in color-managed pipelines.
Confidence: High

**ACES LMT 2383 Kodak Print Emulation**
Claim: DaVinci Resolve includes an LMT "2383 Kodak Print Emulation" in its LUTs folder specifically designed for ACES workflows. In the ACES pipeline, the typical structure is: IDT -> CDL -> LMT -> [RRT] -> ODT [^35^].
Source: Blackmagic Design Forum
URL: https://forum.blackmagicdesign.com/viewtopic.php?f=38&t=202986
Date: 2024-06-10
Excerpt: "IDT -> CDL -> LMT -> [RRT] -> ODT. IDT = Input Device Transform. CDL = Color Decision List. LMT = Look Modification Transform. RRT = Reference Rendering Transform. ODT = Output Device Transform."
Context: LMTs can also be used in unmanaged workflows with proper Color Space Transforms (CSTs).
Confidence: High

### Kodak Vision3 500T/5219

**Kodak Vision3 500T Emulation**
Claim: Kodak Vision3 500T (5219) is the most emulated motion picture negative film stock. Multiple creators offer LUTs emulating this stock, including analogica.lab ($42.99), Filmatic AI, and free community-created versions. The ImpulZ LUT pack includes this as a primary emulation [^17^] [^36^].
Source: Etsy / LiftGammaGain Forum
URL: https://www.etsy.com/listing/4390734342/16mm-kodak-vision3-500t-film-emulation / http://www.liftgammagain.com/forum/index.php?threads/vision-3-500t-5219-emulation.15922/
Date: Unknown / 2021-05-29
Excerpt: "I've been working on a film emulation to match Kodak's Vision 3 500T stock...I took the opportunity and rented an Arri Alexa in order to build a LUT that would take LogC and spit an image similar to a Cineon scan of the stock." [^36^]
Context: Vision3 500T is the go-to reference for "film look" emulation. The community on LiftGammaGain actively discusses and shares custom emulations.
Confidence: High

### Fuji Eterna / Fuji 351

**Fuji Eterna Emulation**
Claim: Fujifilm's Eterna film simulation is one of the most filmic looks available, producing a gorgeous, subtle color palette with perfect contrast. Fujifilm officially provides 3D Film Simulation LUTs for the GFX ETERNA 55 camera, including Provia, Velvia, ASTIA, Classic Chrome, REALA ACE, PRO Neg, CLASSIC Neg, Nostalgic Neg, and ACROS [^25^] [^37^].
Source: Sony Professional / Fujifilm
URL: https://pro.sony/ue_US/technology/professional-video-lut-look-up-table / https://www.fujifilm-x.com/global/support/download/lut/
Date: 2019-12-10 / 2026-04-16
Excerpt: "Eterna delivers one of the most filmic looks of any of Fuji's simulations, producing a gorgeous, subtle color palette with perfect contrast." [^37^]
Context: Fuji officially provides 3D LUTs for their ETERNA 55 cinema camera. Previously, only ETERNA and ETERNA BLEACH BYPASS LUTs were available; this has expanded to ten LUTs.
Confidence: High

**Fuji 351 Print Emulation**
Claim: Jamie Fenn offers free Fuji 351 DWG Film LUTs alongside Kodak 2383, providing a print-stock emulation alternative to Kodak's warmer aesthetic [^33^].
Source: Jamie Fenn
URL: https://www.jamiefenn.com/p/free-dwg-film-emulation-luts/
Date: Unknown
Excerpt: "Faithfully matched Kodak 2383 & Fuji 351 print-stock style LUTs, optimized for Davinci Wide Gamut workflows."
Context: Fuji 351 provides a cooler, more neutral alternative to Kodak 2383's warm character.
Confidence: High

---

## LUTs in Netflix, A24 & High-End Productions {#luts-in-high-end-productions}

**Netflix and LUT Workflows**
Claim: Netflix's production guidelines recommend using LUT boxes for applying looks on-set and ASC CDLs for non-destructive look application. Netflix multicam productions require detailed workflow drawings and recommend having a Technical Manager, EIC, and Video Controller on set [^38^].
Source: Netflix Partner Help
URL: https://partnerhelp.netflixstudios.com/hc/en-us/articles/1500000256962-Best-Practices-Multicam-Production-at-Netflix
Date: Unknown
Excerpt: "LUT BOXES FOR APPLYING LOOKS ON-SET. USING CDL'S FOR NON-DESTRUCTIVE LOOK APPLICATION."
Context: Netflix requires checksum verification (ASC MHL preferred) and visual QC of all original camera files. Workflow drawings should be provided in advance.
Confidence: High

**A24-Inspired Looks**
Claim: The "A24 film look" has become a distinct aesthetic reference in the color grading community, with tutorials dedicated to achieving this look. Waqas Qazi (Qazi & Co, senior colorist who worked with Prime Video, Adidas, Toyota) has created A24-inspired looks using custom curves and color warping techniques [^39^].
Source: YouTube / Qazi & Co
URL: https://www.youtube.com/watch?v=7FpaRbjwO0Y
Date: Unknown
Excerpt: "I'm Waqas Qazi, founder and senior colorist at Qazi & Co. I have worked with PRIME VIDEO, ADIDAS, TOYOTA, VIZIO, etc."
Context: The A24 look is characterized by specific contrast curves, muted highlights, and film-like color response that many LUT creators attempt to emulate.
Confidence: Medium

**Professional Colorist Perspective on Film Emulation**
Claim: A veteran colorist on the LiftGammaGain forum shared that after carefully matching a 2024 RED-shot feature to original 2004 film scans, adding a producer-requested "film emulation" LUT resulted in the image being "processed far more than it needed to be," and after removing the emulation and matching cleanly, "no one noticed that the film emulation was gone... zero, nada, nothing, not a peep" [^40^].
Source: LiftGammaGain Forum
URL: http://www.liftgammagain.com/forum/index.php?threads/the-use-of-kodak-2383-print-lut-under-hdr.19120/
Date: 2024-12-23
Excerpt: "The films I've graded that look like film, were shot by DP's who know film well, and the square root of nothin to do with any of the emulation options."
Context: This reflects the professional perspective that film look comes from cinematography knowledge, not LUTs. However, LUTs remain important workflow tools.
Confidence: High

**Triune Digital - Movie-Inspired LUTs**
Claim: Triune Digital offers LUTs modeled after specific high-end productions including Blade Runner 2049, La La Land, Moonlight, Get Out, Dunkirk, The Shape of Water, Star Wars: The Last Jedi, and Wonder Woman, suggesting these looks are reverse-engineered from the actual films [^18^].
Source: Triune Digital
URL: https://www.triunedigital.com/collections/color-grading
Date: Unknown
Excerpt: "Cinematic LUTs comes with: Over 35 movie inspired LUTs. 3 Noir LUTs. Alexa, REDLog, Standard LOG and .rec709 versions of each LUT."
Context: The existence of these LUT packs demonstrates the commercial demand for looks matching specific high-end productions.
Confidence: High

---

## Colorist Workflows: Starting Point vs Final Look {#colorist-workflows}

**LUTs as Creative Starting Points**
Claim: Professional colorist Noam Kroll uses LUTs primarily to speed up the creative process and achieve greater visual results. His workflow involves balancing shots first, then auditioning multiple creative LUTs to identify broad strokes (warmer vs colder, crushed vs faded blacks, saturation levels) before fine-tuning [^3^].
Source: Noam Kroll
URL: https://noamkroll.com/how-to-apply-color-grading-luts-professionally-my-workflow-explained/
Date: 2020-06-17
Excerpt: "I'll audition a bunch of different looks, using my own custom LUTs...This allows me to immediately get a sense of what might work best from a stylistic point of view. I might flip through a dozen LUTs, grabbing screenshots as I go so I can compare my favorites to each other."
Context: Noam Kroll describes LUTs as a professional tool for creative exploration, not a one-click solution.
Confidence: High

**Order of Operations**
Claim: Professional color grading follows a strict order of operations: (1) Primary correction/balancing, (2) Secondary corrections, (3) Creative look/LUT application, (4) Final tweaks. Creative LUTs should be added at the final node in Resolve, making it easy to apply consistent looks across scenes [^41^].
Source: Noam Kroll
URL: https://noamkroll.com/the-best-order-of-operations-for-color-grading-why-it-makes-all-the-difference/
Date: 2022-07-12
Excerpt: "The great thing about setting up your LUTs/your overall final look on it's own node (in Resolve), is that the final node can easily be tacked on to other shots in the project and still work very well."
Context: This node-based approach is standard in DaVinci Resolve workflows and allows LUTs to be applied consistently as the final creative step.
Confidence: High

**DIT/On-Set LUT Workflow**
Claim: DIT Justin Paul Warren (also a colorist) uses a "standard CDL + Show LUT workflow" with in-camera grading on ARRI Alexa 35, where a single LUT is created by either the DIT or final colorist. For a film with five distinct time periods, he created eight base LUTs that traveled as metadata with each clip [^42^].
Source: Pomfort
URL: https://pomfort.com/article/in-camera-grading-in-action-an-interview-with-dit-and-colorist-justin-paul-warren/
Date: 2025-02-20
Excerpt: "I traditionally work a pretty standard CDL + Show LUT workflow, with a single LUT that either I or a final colorist creates...this movie features five distinct time periods across a 50-year stretch of time...I had created eight LUTs."
Context: In-camera grading with ARRI Alexa 35 allows LUTs and CDL corrections to travel as metadata alongside the original camera files, speeding up post production.
Confidence: High

**VFX and LUT Workflow**
Claim: In professional feature film workflows, VFX is typically done on log plates (not graded plates) to avoid color inconsistency when elements move through power windows. LUTs are used for preview only, and VFX plates are swapped back into the timeline for final grading. DPX log files remain the standard for VFX-complex projects [^43^].
Source: REDUser Forum
URL: https://reduser.net/threads/color-or-visual-effects-which-comes-first-in-the-workflow.117703/
Date: 2014-04-04
Excerpt: "My preference and how we handle most commercials is to do all comp and post on the Redlogfilm without any color. We use LUTs to preview the color but if the composite works, it works."
Context: This demonstrates that in professional workflows, LUTs are viewing/preview tools, not permanent transformations applied before VFX.
Confidence: High

---

## Pricing Models for Professional LUT Packs {#pricing-models}

### Individual Pack Pricing

| Creator | Product | Price | LUTs | Price/LUT |
|---------|---------|-------|------|-----------|
| CINECOLOR | Single Pack | $47 ($36 sale) | 10 | $3.60-4.70 |
| CINECOLOR | Master Pack IV | $207 (sale) | 100 | $2.07 |
| CINECOLOR | Ultimate Bundle | $267 (sale) | 100 + grain | $2.67 |
| Gamut | Creative LUTs | $99 | Varies | ~$10-20 |
| Gamut | Gamut Drops | $12/month | Rotating | N/A |
| Tropic Colour | Collections | $39 | 10-12 | $3.25-3.90 |
| philmColor | R3 | $300 | 718 | $0.42 |
| Joel Famularo | Phantom LUTs | ~$30-50 | Varies | N/A |
| analogica.lab | Film Emulation | $42.99 | 1 | $42.99 |
| Filmatic AI | Alexa to Kodak 250D | ~$30-50 | 2 | $15-25 |
| AAA Presets | Music Video Pack | $59.99 | 300+ | $0.20 |
| LUT Co | Terra Pack | $59 | 34 | $1.74 |
| Color Finale | Grading Pack | $34.99 | Varies | N/A |
| Color Finale | Mega LUT Bundle | ~$100-150 | 250+ | $0.40-0.60 |
| ImpulZ (visionCOLOR) | Basic/Pro/Ultimate | $53/$75/$135 | Varies | N/A |
| Triune Digital | Cinematic LUTs V1 | ~$30-50 | 35+ | $0.86-1.43 |
| TheLUT Hut | NETFLIX Pack | ~$140 | 12 | $11.67 |

Sources: [^7^] [^8^] [^11^] [^6^] [^19^] [^52^] [^39^] [^10^] [^18^] [^20^]

### Market Size and Trends

**Global Cinematic LUTs Market**
Claim: The global Cinematic LUTs market reached USD 312.8 million in 2024 and is projected to grow at a 10.4% CAGR to reach USD 758.5 million by 2033. Growth is driven by streaming platforms, social media content creation, and democratization of filmmaking tools [^1^].
Source: Dataintelo
URL: https://dataintelo.com/report/cinematic-luts-market
Date: 2025-09-30
Excerpt: "The global Cinematic LUTs market size reached USD 312.8 million in 2024...registering a CAGR of 10.4% from 2025 to 2033. By the end of 2033, the market is forecasted to attain a value of USD 758.5 million."
Context: The market research reflects both professional and consumer/amateur segments.
Confidence: Medium (market research projections)

### Key Pricing Observations
1. **Professional-grade individual LUTs**: $3-10 per LUT for high-quality, technically sound products
2. **Film emulation LUTs**: Premium pricing ($15-43 per LUT) due to specialized calibration
3. **Volume packs**: Aggressive discounting (AAA Presets: $0.20/LUT) for mass-market appeal
4. **Subscription models**: Emerging trend (Gamut Drops at $12/month)
5. **Bundle economics**: Master packs typically offer 40-55% discount vs. individual purchases
6. **Free LUTs**: Abundant but quality varies significantly; professional colorists often view free LUTs with skepticism [^44^]

---

## LUTs and ACES Color Workflow {#luts-and-aces}

**ACES Fundamentals**
Claim: ACES (Academy Color Encoding System) is a color space designed to be independent of display hardware, featuring an ultra-wide color gamut encompassing everything the human eye can see. It is larger than Rec.709, Rec.2020, P3, and sRGB. The ACES pipeline uses Input Device Transforms (IDTs), Look Modification Transforms (LMTs), Reference Rendering Transforms (RRTs), and Output Device Transforms (ODTs) [^5^].
Source: ProVideo Coalition
URL: https://www.provideocoalition.com/is-aces-right-for-you/
Date: 2020-08-24
Excerpt: "ACES is its own color space designed to be independent of the display hardware. It features an ultra-wide color gamut that encompasses everything the human eye can see."
Context: Author Oliver Peters explains that ACES preserves all color data from the original image, unlike traditional Rec.709 workflows that restrict the color gamut early in the pipeline.
Confidence: High

**LUTs vs ACES Transforms**
Claim: In ACES workflows, Input Device Transforms (IDTs) replace technical LUTs for camera-to-working-space conversion. The math is inherently different from LUT-based conversion, producing slightly different starting looks. DaVinci Resolve offers the most complete ACES implementation among NLEs [^5^].
Source: ProVideo Coalition
URL: https://www.provideocoalition.com/is-aces-right-for-you/
Date: 2020-08-24
Excerpt: "While an IDT may appear to be doing the same thing as a technical LUT, the math is inherently different. As a result, you'll get a slightly different starting look with Rec.709 and a LUT, versus ACES and an IDT."
Context: Resolve offers three built-in LMTs: LMT Day for Night, LMT Kodak 2383 Print Emulation, and LMT Neon Suppression.
Confidence: High

**fylm.ai ACES Integration**
Claim: fylm.ai is designed to work within ACES color-managed workflows. When using ACES in DaVinci Resolve, LUTs should be exported from fylm.ai without including IDTs and ODTs, as these are handled by Resolve's ACES color management. Recommended settings: ACEScct, ACES 1.1, with appropriate IDT per camera [^45^].
Source: fylm.ai Documentation
URL: https://fylm.ai/docs/how-to-setup-aces-colour-managed-workflow-in-davinci-resolve-for-use-with-fylm-ai/
Date: 2021-09-28
Excerpt: "Once you have configured DaVinci Resolve ACES colour managed workflow, you should export LUTs from fylm.ai without including the Input Device and Output Device Transforms as these are handled by DaVinci Resolve ACES colour management."
Context: fylm.ai is a cloud-based color grading platform that generates LUTs compatible with ACES pipelines.
Confidence: High

**LMT (Look Modification Transform) vs LUT**
Claim: LMTs are the ACES equivalent of creative LUTs but are designed to work within the ACES color space. While most ACES workflows use LMTs, they can also be used in unmanaged workflows with proper Color Space Transforms. The typical ACES pipeline structure is: IDT -> CDL -> LMT -> [RRT] -> ODT [^35^].
Source: Blackmagic Design Forum
URL: https://forum.blackmagicdesign.com/viewtopic.php?f=38&t=202986
Date: 2024-06-10
Excerpt: "It can be a show LUT for artistic transformations and usually is part of the secondary grading process...LMT has been used on unmanaged workflows too but has a different node tree, like a CST to transform to Cineon first and then followed by the Kodak 2383 LUT."
Context: LMTs can be CLF (Common LUT Format) files that are essentially LUTs designed for ACES workflows.
Confidence: High

---

## Market Dynamics {#market-dynamics}

### Professional vs Consumer Segmentation

**Quality Divide in the LUT Market**
Claim: Professional colorists on forums like LiftGammaGain express strong criticism of many commercially available LUTs, describing popular packs like ImpulZ, Osiris, and Lutify.me as "bad" and "snake oil." The criticism centers on LUTs that lack mathematical precision, produce waves in waveforms, have no neutral gray point, and crush blacks or break highlights [^44^].
Source: LiftGammaGain Forum
URL: http://www.liftgammagain.com/forum/index.php?threads/impulz-luts-not-blending.16443/
Date: 2021-11-18
Excerpt: "Social media silver bullet 'CINEMATIC' LUTs are basically our industry's version of the wellness products hawked by the influencers to the gullible masses. More snake oil."
Context: Professional colorists recommend building custom PowerGrades in Resolve rather than relying on pre-made creative LUTs. However, technically accurate conversion LUTs (like those from Gamut or Phantom LUTs) are respected.
Confidence: High

**Plugin-Based Film Emulation as LUT Alternative**
Claim: Professional colorists increasingly use plugin-based film emulation tools rather than static LUTs, including Dehancer ($19/month or $399 perpetual), FilmConvert Nitrate ($149 perpetual), and PFA Color Suite. These offer pixel-level processing, dynamic grain simulation, and halation effects that LUTs cannot replicate [^46^].
Source: Passion Fuels Ambition
URL: https://www.passionfuelsambition.com/best-film-emulation-plugin-2026-dehancer-vs-filmconvert-vs-pfa/
Date: 2026-03-19
Excerpt: "Dehancer is the most established film emulation tool in the professional color grading world. It offers an extensive library of film stock profiles based on real film scans, physically accurate grain simulation, and deep customization controls."
Context: The shift from LUTs to plugins reflects the demand for more flexible, non-destructive, and physically accurate film emulation.
Confidence: High

**ARRI Film Lab as Professional Alternative**
Claim: ARRI Film Lab represents the high-end professional approach to film emulation, developed by ARRI's color scientists with decades of film and digital knowledge. It is available via RE:Vision Effects with licensing options from weekly to permanent [^14^].
Source: ARRI Official
URL: https://www.arri.com/en/learn-help/learn-help-camera-system/tools/arri-film-lab
Date: 2025-10-01
Excerpt: "From the ARRILASER and ARRISCAN of the DI era to REVEAL Color Science and the film-inspired image characteristics of ALEXA digital cameras, ARRI Film Lab distils decades of knowledge and experience into a powerful, real-time plugin."
Context: ARRI Film Lab is priced as professional software (not a consumer LUT pack), indicating the premium positioning of true professional tools.
Confidence: High

### Key Market Trends

1. **Camera-to-Camera LUT Conversion**: Strong demand for LUTs that convert various camera systems (Sony, Canon, DJI, iPhone) to match ARRI Alexa's "gold standard" color science [^2^] [^47^]

2. **Scene-Referred Workflows**: Shift from display-referred to scene-referred workflows (ACES, DaVinci Wide Gamut) requiring LUTs designed for wide gamut color spaces [^34^]

3. **In-Camera LUT Application**: Modern cinema cameras (ARRI Alexa 35, RED DSMC3, Canon EOS C70) support in-camera LUT loading for monitoring and even recording with LUTs baked in [^28^] [^42^]

4. **HDR-Compatible LUTs**: Growing demand for LUTs that work correctly in HDR workflows (Rec.2020 PQ, Dolby Vision) [^34^]

5. **Film Emulation as Premium Category**: Film print emulation LUTs command premium pricing due to the specialized knowledge required to create them authentically

6. **Community/Open Source Alternatives**: Active community of colorists sharing free LUTs (Kodak 2383, Fuji 351) as alternatives to commercial products [^32^] [^33^]

---

## Sources & References {#sources}

[^1^]: Dataintelo. "Cinematic LUTs Market Research Report 2033." https://dataintelo.com/report/cinematic-luts-market
[^2^]: Joel Famularo. "Phantom LUTs." https://www.joelfamularo.com/
[^3^]: Noam Kroll. "How To Apply Color Grading LUTs Professionally + My Workflow Explained." https://noamkroll.com/how-to-apply-color-grading-luts-professionally-my-workflow-explained/
[^4^]: Juan Melara. "Print Film Emulation in 2021." https://juanmelara.com.au/blog/print-film-emulation-luts-for-download
[^5^]: Oliver Peters, ProVideo Coalition. "Is ACES right for you?" https://www.provideocoalition.com/is-aces-right-for-you/
[^6^]: CineD. "philmColor R3 - LUT based workflow for RED's IPP2 Color Pipeline." https://www.cined.com/philmcolor-r3-lut-based-workflow-for-reds-ipp2-color-pipeline-released/
[^7^]: Noam Kroll. "Introducing CINECOLOR.IO." https://noamkroll.com/introducing-cinecolor-io-a-brand-new-platform-of-144-cinematic-luts-for-filmmakers-photographers/
[^8^]: Gamut. "Professional Creative and Conversion LUTs." https://gamut.io/
[^9^]: Float Digital. "Live a Little. Live a LUT: 17 Free Resources." https://float.digital/2023/07/06/live-a-little-live-a-lut-17-free-resources-to-help-you-get-started-with-luts/
[^10^]: Radar LA. "visionCOLOR Introduces ImpulZ." https://radarla.com/visioncolor-introduces-impulz/
[^11^]: FixThePhoto. "Tropic Colour LUTs Review 2026." https://fixthephoto.com/tropic-colour-luts.html
[^12^]: Juan Melara. "Print Film Emulation LUTs for Download." https://juanmelara.com.au/blog/print-film-emulation-luts-for-download
[^13^]: mononodes. "Film Emulation for DaVinci Resolve." https://mononodes.com/film-emulation/
[^14^]: ARRI. "ARRI Film Lab." https://www.arri.com/en/learn-help/learn-help-camera-system/tools/arri-film-lab
[^15^]: Church Production. "Sony and Picture Shop Announce New LUTs for Venice 2." https://www.churchproduction.com/gear/sony-and-picture-shop-announce-new-luts-designed-exclusively/
[^16^]: Filmatic AI. "ARRI Alexa to Kodak 250D 5207 Film Emulation LUT." https://www.filmatic.ai/product-page/arri-alexa-to-kodak-250d-5207-film-emulation-lut
[^17^]: analogica.lab on Etsy. "16MM Kodak Vision3 500T Film Emulation LUT." https://www.etsy.com/listing/4390734342/16mm-kodak-vision3-500t-film-emulation
[^18^]: Triune Digital. "Color Grading LUTs." https://www.triunedigital.com/collections/color-grading
[^19^]: AAA Presets. "300+ Music Video Color Grading LUTs Pack." https://aaapresets.com/products/300-music-video-color-grading-luts-pack
[^20^]: TheLUT Hut. "NETFLIX LUT Pack." https://www.theluthut.co.uk/products/2020s-pack-lut-pack
[^21^]: CinematicGradeLUTs.com. https://www.cinematicgradeluts.com/
[^22^]: CINEM8. "Free Online LUT Converter." https://cinem8.co/pages/free-online-lut-converter-65x-to-33x-to-17x
[^23^]: Inventome. "The Truth about LUTs." https://www.inventome.com/note/the-truth-about-luts
[^24^]: Video Village. "What's new with Lattice?" https://videovillage.com/lattice/releasenotes
[^25^]: Sony Professional. "LUT Library - Technology." https://pro.sony/ue_US/technology/professional-video-lut-look-up-table
[^26^]: RED Digital Cinema. "3D Cube LUTs and IPP2." https://docs.red.com/915-0202/REV-A/PDF/915-0202%20Rev-A%20%20%20RED%20OPS%2C%203D%20Cube%20LUTs%20and%20IPP2.pdf
[^27^]: Analog Way. "LivePremier 3D LUT Architecture Application Note." https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/LivePremier/Common/Application+Notes/livepremier-3d-lut-architecture---application-note.pdf
[^28^]: Canon Professional. "3D LUTs explained." https://www.canon.com.cy/pro/stories/how-to-use-3d-luts/
[^29^]: Joel Famularo. "Cinematic LUTs for ARRI Alexa 35." https://www.joelfamularo.com/colour-alexa35
[^30^]: Lutify.me. "How to correctly color grade RED IPP2 footage in Premiere Pro." https://lutify.me/how-to-correctly-color-grade-red-ipp2-footage-in-premiere-pro/
[^31^]: Sony Cine. "LUT & ART Files." https://sony-cinematography.com/resources/luts/
[^32^]: Cine Source. "LogC Kodak 2383 LUT." https://cinesource.nl/products/logc-kodak-2383-lut/
[^33^]: Jamie Fenn. "Free Kodak 2383 & Fuji 351 DWG Film LUTs." https://www.jamiefenn.com/p/free-dwg-film-emulation-luts/
[^34^]: procolor.ist. "Free Kodak 2383 LUT." https://procolor.ist/freelut/
[^35^]: Blackmagic Design Forum. "LMT 2383 Kodak Print Emulation." https://forum.blackmagicdesign.com/viewtopic.php?f=38&t=202986
[^36^]: LiftGammaGain Forum. "Vision 3 500T (5219) Emulation." http://www.liftgammagain.com/forum/index.php?threads/vision-3-500t-5219-emulation.15922/
[^37^]: Noam Kroll. "Shooting F-Log On Fuji's XT2 And Pairing It With The Brilliant New Eterna Film Simulation LUT." https://noamkroll.com/shooting-f-log-on-fujis-xt2-and-pairing-it-with-the-brilliant-new-eterna-film-simulation-lut-perfect-colors/
[^38^]: Netflix Partner Help. "Best Practices: Multicam Production at Netflix." https://partnerhelp.netflixstudios.com/hc/en-us/articles/1500000256962-Best-Practices-Multicam-Production-at-Netflix
[^39^]: Waqas Qazi (YouTube). "You CAN Create This A24-Inspired Look In Just 3 Minutes." https://www.youtube.com/watch?v=7FpaRbjwO0Y
[^40^]: LiftGammaGain Forum. "The use of Kodak 2383 print lut under HDR." http://www.liftgammagain.com/forum/index.php?threads/the-use-of-kodak-2383-print-lut-under-hdr.19120/
[^41^]: Noam Kroll. "The Best Order Of Operations For Color Grading." https://noamkroll.com/the-best-order-of-operations-for-color-grading-why-it-makes-all-the-difference/
[^42^]: Pomfort. "DIT Justin Paul Warren in-camera grading interview." https://pomfort.com/article/in-camera-grading-in-action-an-interview-with-dit-and-colorist-justin-paul-warren/
[^43^]: REDUser Forum. "Color or Visual effects, which comes first." https://reduser.net/threads/color-or-visual-effects-which-comes-first-in-the-workflow.117703/
[^44^]: LiftGammaGain Forum. "ImpulZ LUTs Not Blending." http://www.liftgammagain.com/forum/index.php?threads/impulz-luts-not-blending.16443/
[^45^]: fylm.ai. "How to setup ACES colour managed workflow in DaVinci Resolve." https://fylm.ai/docs/how-to-setup-aces-colour-managed-workflow-in-davinci-resolve-for-use-with-fylm-ai/
[^46^]: Passion Fuels Ambition. "Best Film Emulation Plugin 2026: Dehancer vs PFA." https://www.passionfuelsambition.com/best-film-emulation-plugin-2026-dehancer-vs-filmconvert-vs-pfa/
[^47^]: Moment Shop. "Emulated Film AppleLog to Arri Alexa Conversion LUTs." https://www.shopmoment.com/products/serr-applelog-conversion-luts
[^48^]: Color Finale Store. https://colorfinale.com/store
[^49^]: LUT Co. https://lutcompany.com/
[^50^]: thiagovibesp.com. "Best Cinematic LUTs of 2025." https://thiagovibesp.com/best/cinematic-luts-2025
[^51^]: aaapresets.com. "Best LUTs for Cinematic Color Grading in DaVinci Resolve 2025." https://aaapresets.com/blogs/davinci-resolve-blog-series-color-grading-luts-mastery/best-luts-for-cinematic-color-grading-in-davinci-resolve-2025-a-deep-dive
[^52^]: Filmatic AI. https://www.filmatic.ai/
[^53^]: RED Shark News. "A Closer Look at the Fujifilm GFX ETERNA 55's Color Science." https://www.redsharknews.com/fujifilm-f-log2-c-color-science-film-simulation-luts
[^54^]: Fujifilm. "Film Simulation LUTs for Fujifilm GFX." https://www.fujifilm-x.com/global/support/download/lut/
[^55^]: FilterGrade. "ALL MY LUTS FOR RED CAMERAS IPP2 WORKFLOW." https://filtergrade.com/product/all-my-luts-for-red-cameras-ipp2-workflow/
[^56^]: Cine Source. "30 Free Cinematic LUTs for DaVinci Resolve." https://theresolve.store/30-free-cinematicx-luts-for-davinci-resolve/
[^57^]: presetpro.com. "Best Free LUTs for Color Grading in 2026." https://www.presetpro.com/best-free-luts-color-grading-2026/

---

*Document compiled from 15+ web searches across industry forums, manufacturer documentation, colorist blogs, e-commerce platforms, and market research reports. All claims cite original sources with URLs and dates where available.*
