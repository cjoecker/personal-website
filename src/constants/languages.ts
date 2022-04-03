export interface Languages {
  language: 'es' | 'de' | 'en' | 'pt';
  sentence: string;
}

export const languages: Languages[] = [
  {
    language: "es",
    sentence: "Lo aprendí desde chiquito."
  },
  {
    language: "de",
    sentence: "Das kann ich doch auch."
  },
  {
    language: "en",
    sentence: "I couldn't program without this language."
  },
  {
    language: "pt",
    sentence: "Fico confuso com a minha língua materna."
  }
]
