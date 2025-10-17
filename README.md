**totoAi — On‑device AI Assistant for React Native**

Smart, multimodal assistant that can:

- Answer questions using RAG via a vector database
- Render React Native components from model output (tool use)
- Fetch/present real data from mock API endpoints
- Convert speech to text on‑device using Whisper RN + VAD
- Maintain multi‑turn chat context with Firebase AI (Gemini)

Getting Started

- Prereqs: set up the React Native environment (Node >= 18, Xcode/Android Studio).
- Install deps: `npm install` or `yarn`
- iOS pods: `bundle install && bundle exec pod install` (inside `ios/`)
- Start Metro: `npm start` or `yarn start`
- Run Android: `npm run android` or `yarn android`
- Run iOS: `npm run ios` or `yarn ios`

Features

- Multimodal chat: text + optional image input
- Tool calling: model can call functions to read component catalog, fetch mock API data, navigate, or query the vector DB
- RAG: queries Pinecone using Gemini embeddings
- Voice: realtime microphone transcription using `whisper.rn` and Silero VAD
- Persistence: chat history stored/replayed

Architecture

- Chat UI: `src/components/ChatPopup.tsx`
  - Animated popup, Markdown responses, navigation links, component rendering
  - Voice toggle with Whisper RN + Silero VAD, streaming transcription
  - Tool calling loop (function calls → tool dispatch → function responses)
- Prompt: `src/ai/prompts/promptTemplates.ts`
  - Explicit JSON output contract: `{ navigation, component, text }`
  - Tool names aligned to implementation (e.g., `getQueryData`)
- Tools: `src/ai/tools/index.ts`
  - `readComponentsFile`, `readApiEndpointsFile`, `readNavigationFile`
  - `getQueryData` for mock API calls, `queryVectorDB` for RAG
- Mock API/Data: `src/services/apiService.ts`, `src/data/mockData.ts`, `src/ai/data/*.json`
- Embeddings util: `src/utils/index.ts`
- Chat persistence: `src/utils/chatStorage.ts`
- Styles: `src/styles/*.ts`

Environment & Keys

- Do NOT commit secrets. The repo ignores `.env` and `src/config/env.ts`.
- Configure keys by copying the example to a local, untracked file:
  - `cp src/config/env.example.ts src/config/env.ts`
  - Edit `src/config/env.ts` and add:
    - `GOOGLE_API_KEY`: Google Generative Language API key (embeddings)
    - `PINECONE_API_KEY`: Pinecone API key
    - `PINECONE_HOST`: Your Pinecone index query endpoint URL
- Alternatively, you can wire `.env` with `react-native-config` if preferred, but that requires native setup; this project uses `src/config/env.ts` for simplicity.

Vector Database (RAG)

- Embeddings via Gemini: `src/utils/index.ts`
- Pinecone query: `src/ai/tools/index.ts` (update the index host if needed)

Whisper RN Models

- Model binaries are included under Android assets and copied at runtime:
  - `ggml-tiny.bin` (Whisper)
  - `ggml-silero-v5.1.2.bin` (VAD)
- On Android, models are copied from `android/app/src/main/assets/models/*` to `DocumentDirectoryPath` on first run.
- On iOS, models are loaded from `MainBundlePath`.

Permissions & Native Notes

- Android: see `android/app/src/main/AndroidManifest.xml` for mic/storage/Internet permissions.
- iOS: `ios/totoAi/Info.plist` includes mic/camera usage descriptions.
- Firebase config files are NOT committed:
  - Add your own `android/app/google-services.json` locally (see `android/app/google-services.json.example`).
  - Add your own `ios/GoogleService-Info.plist` locally (see `ios/GoogleService-Info.plist.example`).
  - Both paths are ignored via `.gitignore` to keep configs out of the public repo.

Project Scripts

- Start Metro: `npm start`
- Lint: `npm run lint`
- Test: `npm test`
- Android: `npm run android`
- iOS: `npm run ios`

Security

- Never commit real API keys. Keep only `src/config/env.ts` locally (ignored by Git) or use a secret manager.
- Consider server‑side proxies for third‑party calls if you need to conceal keys from clients.
