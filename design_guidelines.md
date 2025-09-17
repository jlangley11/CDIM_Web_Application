# Azure DCSA CDIM Evaluation Tool - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from Microsoft's Fluent Design System and modern enterprise productivity tools like Linear and Notion, optimized for professional Azure sales environments.

## Core Design Elements

### A. Color Palette
**Light Mode:**
- Primary: 220 100% 45% (Microsoft Azure Blue)
- Surface: 0 0% 98% (Clean background)
- Text: 220 15% 15% (Professional dark gray)

**Dark Mode:**
- Primary: 220 100% 65% (Brighter Azure Blue)
- Surface: 220 15% 8% (Deep professional dark)
- Text: 0 0% 95% (Clean white text)

**Component Color Coding:**
- Current State: 220 100% 45% (Azure Blue)
- Desired State: 142 70% 45% (Professional Green)
- Impact: 271 81% 56% (Microsoft Purple)
- Metrics: 25 95% 53% (Warm Orange)

**Scoring Colors:**
- Success (80+): 142 70% 45%
- Warning (60-79): 45 100% 50%
- Error (<60): 0 65% 51%

### B. Typography
- **Primary**: Inter (Google Fonts) - Clean, readable, professional
- **Secondary**: JetBrains Mono (for code/data elements)
- **Hierarchy**: text-3xl for headers, text-lg for body, text-sm for metadata

### C. Layout System
**Spacing Units**: Consistent use of Tailwind units 2, 4, 6, 8, 12, 16
- Micro spacing: p-2, m-2
- Standard spacing: p-4, gap-4, m-6
- Section spacing: p-8, mb-12, gap-16

### D. Component Library

**Flip Cards (Primary Feature):**
- 3D CSS transforms with 0.6s transition
- Hover elevation: shadow-xl
- Card dimensions: Responsive grid with consistent aspect ratios
- Front: Confirmed information with check icons
- Back: Gap analysis with alert icons

**Navigation:**
- Clean header with Azure branding
- Breadcrumb navigation for multi-step evaluation
- Subtle shadows and borders for definition

**Scorecard Dashboard:**
- Circular progress indicators for overall scores
- Horizontal bar charts for component breakdown
- Color-coded status indicators
- Clean card-based layout with subtle borders

**Forms & Inputs:**
- Consistent border-2 styling
- Focus states with primary color
- Proper dark mode contrast
- Upload areas with drag-and-drop styling

**Data Display:**
- Clean tables with alternating row colors
- Executive summary in card format
- Recommendations in organized lists
- Metadata display in subtle gray text

### E. Animations
**Minimal and Purposeful:**
- Flip card transitions (0.6s ease-in-out)
- Hover states (0.2s ease)
- Loading states for data processing
- Smooth scroll for navigation

## Images
**Hero Section:** No large hero image - focus on functional dashboard layout
**Icons:** Use Heroicons for consistent Microsoft-aligned iconography
**Illustrations:** Optional subtle background patterns or geometric shapes in brand colors

## Layout Structure
1. **Header**: Navigation with Azure branding
2. **Upload Section**: Clean file upload interface
3. **Evaluation Dashboard**: 2x2 grid of flip cards
4. **Scorecard**: Horizontal layout with visual indicators
5. **Summary**: Executive summary and recommendations
6. **Footer**: Simple links and branding