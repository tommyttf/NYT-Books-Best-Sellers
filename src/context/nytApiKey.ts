import { createContext } from 'react';

interface INytApiKeyContext {
  apiKey: string;
  setApiKey: (apiKey: string) => void;
}
export const NytApiKeyContext = createContext<INytApiKeyContext>({
  apiKey: '',
  setApiKey: () => {},
});
