
# Muscle Mastery Microsite

A static microsite delivering the "Muscle Mastery: Creatine, Protein, and Power After 40" mini-course to paying readers.

## Features

- **Passcode Protection**: Secure access with code `ENTER42`
- **Dark Mode Toggle**: User-friendly dark/light theme switching
- **Accessibility Compliant**: WCAG-AA color contrast and keyboard navigation
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **5 Comprehensive Lessons**: Evidence-based content with AMA citations
- **Free Preview**: Teaser content to engage potential learners
- **Resource Downloads**: PDF guides and calculators
- **Contact Information**: Author bio and social media links

## Site Structure

```
muscle-mastery/
├── index.html              # Landing page with hero and course overview
├── lessons/
│   ├── lesson-1.html       # Creatine Science and Safety Fundamentals
│   ├── lesson-2.html       # Protein Requirements and Timing Strategies
│   ├── lesson-3.html       # Power Training Over Strength Training
│   ├── lesson-4.html       # Supplement Protocols and Meal Planning
│   └── lesson-5.html       # Long Term Success and Troubleshooting
├── teaser.html             # Free preview content
├── resources.html          # PDF downloads and additional resources
├── contact.html            # Author bio and contact information
├── styles.css              # Custom CSS with brand colors and accessibility
├── script.js               # JavaScript for passcode system and dark mode
└── assets/                 # Images and downloadable resources
```

## GitHub Pages Deployment

### Option 1: GitHub Web Interface

1. **Create Repository**:
   - Go to GitHub and create a new repository named `DPropst-Creatine`
   - Make it public
   - Don't initialize with README (we'll upload our files)

2. **Upload Files**:
   - Click "uploading an existing file"
   - Drag and drop all files from the `muscle-mastery` folder
   - Ensure the `.nojekyll` file is included
   - Commit with message: "Initial commit - Muscle Mastery microsite"

3. **Enable GitHub Pages**:
   - Go to Settings > Pages
   - Source: Deploy from a branch
   - Branch: main (or master)
   - Folder: / (root)
   - Save

4. **Access Your Site**:
   - Site will be available at: `https://username.github.io/DPropst-Creatine`
   - Wait 5-10 minutes for initial deployment

### Option 2: Command Line (Git)

If you have Git installed:

```bash
# Navigate to the muscle-mastery directory
cd muscle-mastery

# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit - Muscle Mastery microsite"

# Add remote origin (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/DPropst-Creatine.git

# Push to GitHub
git push -u origin main

# Then enable GitHub Pages in repository settings
```

## Brand Specifications

- **Primary Color**: #0E3D6B (Navy)
- **Accent Color**: #EABA2B (Gold)
- **Neutral Color**: #F5F5F5 (Light Gray)
- **Typography**: Montserrat (headings), Open Sans (body)
- **Logo**: 120px height at /assets/logo.png (or site name if missing)

## Technical Details

- **Framework**: Static HTML/CSS/JavaScript
- **CSS Framework**: Tailwind CSS via CDN
- **JavaScript**: Vanilla ES6+
- **Accessibility**: WCAG-AA compliant
- **Performance**: Optimized for Lighthouse scores ≥90%
- **SEO**: Meta tags, semantic HTML, structured data

## Passcode System

The site uses a JavaScript-based passcode system:
- **Access Code**: `ENTER42`
- **Storage**: localStorage with 30-day expiration
- **Protection**: All lesson pages require valid access
- **Fallback**: Redirects to passcode modal if access invalid

## Dark Mode

- **Toggle**: Available in header on all pages
- **Persistence**: Saved in localStorage
- **System Preference**: Respects user's OS theme preference
- **Accessibility**: Maintains proper contrast ratios

## Contact Information

- **Email**: david@propstmetabolichealth.com
- **Substack**: https://propstmetabolichealth.substack.com
- **LinkedIn**: https://www.linkedin.com/in/david-propst-pac/
- **Twitter**: https://x.com/PrimaryCarePAC

## Content Structure

Each lesson includes:
- **Objective**: Clear learning outcome
- **Key Points**: 3-4 evidence-based bullet points
- **AMA Citations**: Superscript references to peer-reviewed studies
- **Action Steps**: Practical implementation guidance
- **Navigation**: Previous/next lesson links
- **References**: Full citation details

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

- **Images**: Optimized to ≤200KB with descriptive alt text
- **Fonts**: Google Fonts with display=swap
- **CSS**: Minified and combined
- **JavaScript**: Compressed and efficient
- **Caching**: Proper cache headers for static assets

## Troubleshooting

**Site not loading?**
- Ensure `.nojekyll` file is present in root directory
- Check GitHub Pages settings in repository
- Verify all files are uploaded correctly

**Passcode not working?**
- Confirm code is `ENTER42` (case sensitive)
- Clear browser cache and localStorage
- Check browser console for JavaScript errors

**Dark mode not persisting?**
- Ensure localStorage is enabled in browser
- Check for JavaScript errors in console
- Verify `script.js` is loading correctly

## License

© 2025 Muscle Mastery. All rights reserved.

## Support

For technical issues or questions about the course content, contact: david@propstmetabolichealth.com
