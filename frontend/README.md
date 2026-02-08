# LinguaLive - Learn Languages Through Real-World Vision

A gamified language learning platform that uses AI-powered camera translation, quest systems, and character interactions to teach languages in the most engaging way possible.

## Features

### 🎥 Real-Time Camera Translation
- Point your camera at any object, sign, menu, or scene
- Get instant translations with pronunciation guidance
- Receive cultural context and learning notes
- Practice interactive conversations based on real-world scenarios

### 🎮 Gamified Quest System
- Complete daily challenges to earn points and badges
- Track progress with streak counters and achievement milestones
- Level up through consistent learning and quest completion
- Compete with friends on leaderboards

### 🎭 Character-Driven Learning
- Meet "LinguaLive" - your AI language companion
- Receive personalized encouragement and learning tips
- Interact with animated mascot character throughout the platform
- Enjoy motivational messages based on your progress

### 📚 AI Pronunciation Coach
- Compare your pronunciation to native speakers
- Get real-time feedback on accuracy
- Practice unlimited repetitions with instant feedback
- Build confidence through guided practice

### 🌍 25+ Languages
Currently supports:
- Spanish
- French
- German
- Japanese
- Mandarin Chinese
- Korean
- Portuguese
- Italian
- And many more...

### 🏆 Achievement System
Unlock achievements like:
- First Steps - Complete your first quest
- Camera Master - Use camera 50+ times
- Week Warrior - Maintain 7-day streak
- Language Lover - Learn 100+ unique words
- Global Citizen - Learn multiple languages

## Project Structure

```
linguaLive/
├── app/
│   ├── layout.tsx              # Root layout with design tokens
│   ├── page.tsx                # Landing page
│   ├── onboarding/
│   │   └── page.tsx            # Animated onboarding flow
│   ├── dashboard/
│   │   └── page.tsx            # Main learning dashboard
│   ├── api/
│   │   └── translate/
│   │       └── route.ts        # Camera translation API
│   └── globals.css             # Design system with animations
├── src/
│   └── components/
│       ├── MascotCharacter.tsx           # Animated mascot component
│       ├── CharacterInteraction.tsx      # Chat interface component
│       ├── AnimatedBadge.tsx             # Achievement badges
│       └── CameraTranslator.tsx          # Camera interface
├── public/
│   └── mascot.png              # LinguaLive mascot image
└── README.md                   # This file
```

## Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm or yarn package manager
- Modern web browser with camera support

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd linguaLive
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Design System

### Color Palette
- **Primary (Yellow)**: Action buttons and primary CTAs
- **Secondary (Purple)**: Secondary elements and highlights
- **Accent (Cyan)**: Tertiary actions and accents
- **Background (Dark Blue)**: Main theme background
- **Foreground (White)**: Text and primary content

### Typography
- **Font**: Poppins (Google Fonts)
- Weights: 400 (Regular), 600 (Semibold), 700 (Bold), 800 (Extra Bold)

### Animations
- `animate-float`: Smooth vertical floating motion
- `animate-glow`: Pulsing glow effect
- `animate-pulse-scale`: Scale pulse animation
- `animate-slide-up`: Slide up entrance
- `animate-slide-in`: Slide in from left

## Pages Overview

### Landing Page (`/`)
- Hero section with mascot animation
- Features showcase
- How it works section
- Social proof and statistics
- Call-to-action buttons

### Onboarding (`/onboarding`)
- 6-step personalized setup flow
- Language selection
- Proficiency level assessment
- Learning goal setting
- Camera permission request
- Welcome summary

### Dashboard (`/dashboard`)
- Real-time stats (streak, points, quests completed)
- Active quest list with progress tracking
- Achievement showcase
- Quick access to learning tools
- Daily tips and motivation

## API Endpoints

### POST `/api/translate`
Translates objects captured by camera to target language.

**Request:**
```json
{
  "imageData": "base64-encoded-image",
  "targetLanguage": "spanish|french|german|japanese|mandarin|korean",
  "sourceLanguage": "en"
}
```

**Response:**
```json
{
  "original": "Coffee",
  "translation": "Café",
  "pronunciation": "KAH-fay",
  "culturalContext": "...",
  "detectedObjects": [...],
  "suggestedPhrases": [...],
  "relatedVocabulary": [...]
}
```

## Integration Opportunities

### Vision APIs (for camera translation)
- **Google Cloud Vision API**: For object detection and OCR
- **Microsoft Azure Computer Vision**: For advanced image analysis
- **AWS Rekognition**: For image and video analysis
- **OpenAI Vision**: For GPT-4 powered analysis

### Translation APIs
- **Google Translate API**: For language translation
- **Microsoft Translator**: For multi-language support
- **DeepL API**: For high-quality translations

### Text-to-Speech APIs
- **Google Cloud Text-to-Speech**: For pronunciation audio
- **Amazon Polly**: For natural-sounding speech
- **Azure Speech Services**: For speech synthesis

### AI/LLM Integration (for conversation practice)
- **OpenAI GPT-4**: For intelligent tutoring
- **Anthropic Claude**: For contextual conversations
- **Google Vertex AI**: For custom language models

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Vision API (choose one)
NEXT_PUBLIC_GOOGLE_VISION_API_KEY=your_api_key
# or
NEXT_PUBLIC_AZURE_CV_API_KEY=your_api_key

# Translation API
NEXT_PUBLIC_TRANSLATION_API_KEY=your_api_key

# Speech API
NEXT_PUBLIC_SPEECH_API_KEY=your_api_key
```

## Component Usage

### MascotCharacter
```tsx
import { MascotCharacter } from '@/components/MascotCharacter'

<MascotCharacter
  variant="happy"
  size="medium"
  showSpeechBubble={true}
  speechText="Let's learn something new!"
  animated={true}
/>
```

### CameraTranslator
```tsx
import { CameraTranslator } from '@/components/CameraTranslator'

<CameraTranslator />
```

### AnimatedBadge
```tsx
import { AnimatedBadge } from '@/components/AnimatedBadge'

<AnimatedBadge
  type="streak"
  value={7}
  label="Day Streak"
  animated={true}
/>
```

## Development Notes

### Adding New Languages
Update the languages array in `/app/onboarding/page.tsx`:
```tsx
const languages = [
  { id: 'new-lang', name: 'Language', flag: '🌐', speakers: '100M+' },
  // ...
]
```

### Customizing Colors
Edit the CSS variables in `/app/globals.css`:
```css
--primary: 47 100% 50%;  /* Yellow */
--secondary: 260 100% 65%;  /* Purple */
--accent: 180 100% 60%;  /* Cyan */
```

### Adding New Quests
Update the quests array in `/app/dashboard/page.tsx` with new quest objects.

## Performance Optimization

- **Image Optimization**: Next.js Image component for auto-optimization
- **Code Splitting**: Route-based code splitting
- **Animations**: CSS-based animations for smooth 60fps performance
- **Lazy Loading**: Components load on demand

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers with camera support

## Accessibility

- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- High contrast design tokens
- Focus indicators on interactive elements

## Future Enhancements

- [ ] User authentication and profiles
- [ ] Multiplayer competitive modes
- [ ] Voice recording and analysis
- [ ] Spaced repetition algorithm
- [ ] Social features and leaderboards
- [ ] Offline learning mode
- [ ] AR-based learning experiences
- [ ] Custom vocabulary lists
- [ ] Progress analytics dashboard
- [ ] Integration with language certification exams

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, questions, or feature requests, please open an issue on the GitHub repository or contact our team.

---

Made with ❤️ for language learners worldwide. Happy learning!
