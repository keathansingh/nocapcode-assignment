const responses = [
  {
    intent: 'admissions',
    match: /\b(admission|admissions|fees?|tuition|apply|application deadline|eligibility)\b/,
    reply:
      'The available case-study material does not include verified admissions details or fees. Please use “Contact the team” to send a question.',
  },
  {
    intent: 'overview',
    match: /\b(about|overview|brand identity|case study|university|ppstu)\b/,
    reply:
      'This case study presents a refreshed identity for Pasha Patel SkillTech University, designed to express progress, education, technology, and excellence with a clear, adaptable visual system.',
  },
  {
    intent: 'monogram',
    match: /\b(monogram|logo|mark|symbol|crest|identity mark)\b/,
    reply:
      'The case study contrasts the detailed traditional crest with a simplified geometric monogram intended to remain clear across print and digital applications.',
  },
  {
    intent: 'colors',
    match: /\b(colou?rs?|palette|gold|emerald|navy|blue)\b/,
    reply:
      'The visual palette shown in the case study uses gold, emerald, royal blue, and deep navy, supported by warm off-white and near-black.',
  },
  {
    intent: 'values',
    match: /\b(values?|concepts?|ideas?|pragati|prakriti|shiksha|taknik|utkarsh|education|technology|excellence|progress|nature)\b/,
    reply:
      'The documented identity concepts are Pragati & Prakriti (Progress & Nature), Shiksha (Education), Taknik (Technology), and Utkarsh (Excellence). The supplied material does not verify a fifth concept.',
  },
  {
    intent: 'applications',
    match: /\b(applications?|used|use|notebook|stationery|signage|building|digital|print|environment)\b/,
    reply:
      'The identity-in-use collage shows applications including a badge, notebook, business card, phone display, stationery, and university signage.',
  },
  {
    intent: 'contact',
    match: /\b(contact|email|phone|team|message|reach)\b/,
    reply:
      'No verified public email address or phone number is included in the supplied material. You can use the “Contact the team” option here to send a message.',
  },
];

export function getAssistantReply(input) {
  const normalized = input
    .normalize('NFKC')
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!normalized) {
    return 'Type a question about the identity and I’ll do my best to help.';
  }

  if (/^(hi|hello|hey|good morning|good afternoon|good evening)$/.test(normalized)) {
    return 'Hello! I can answer questions about the brand identity, documented concepts, colors, and applications.';
  }

  const response = responses.find(({ match }) => match.test(normalized));
  return response?.reply
    ?? 'I can help with the brand identity, monogram, colors, documented concepts, and applications. The supplied case-study material does not verify that information.';
}

export const suggestedQuestions = [
  'What is this brand identity about?',
  'What does the monogram represent?',
  'What do the brand colors mean?',
  'Explain the identity concepts.',
  'Where is the identity used?',
  'How can I contact the team?',
];
