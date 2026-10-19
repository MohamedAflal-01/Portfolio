/**
 * Variable name: "indecent words"
 * Comprehensive content moderation list for the portfolio contact section.
 * Flags profanities, vulgarities, slurs, and explicit terms.
 */
export const indecentWords: string[] = [
  // Profanities & Vulgarities
  'fuck', 'fucker', 'fucking', 'fuckin', 'fucked', 'fuckhead', 'motherfucker', 'motherfucking', 'fuckup',
  'shit', 'shitty', 'bullshit', 'horseshit', 'shite', 'shat',
  'bitch', 'bitches', 'bitching', 'bitchy',
  'asshole', 'ass', 'asses', 'arse', 'arsehole', 'dumbass', 'jackass', 'badass', 'smartass',
  'bastard', 'bastards',
  'crap', 'crappy',
  'damn', 'dammit',
  'piss', 'pissed', 'pissing',
  'bollocks', 'bugger',

  // Anatomical & Sexual Explicits
  'dick', 'dickhead', 'dicks', 'cock', 'cocks', 'cockhead', 'cocksucker',
  'pussy', 'pussies', 'cunt', 'cunts',
  'whore', 'whores', 'slut', 'sluts', 'skank',
  'twat', 'wank', 'wanker', 'prick', 'pricks',
  'blowjob', 'handjob', 'dildo',
  'penis', 'vagina', 'clit', 'clitoris',
  'boobs', 'boob', 'tit', 'tits', 'titties',
  'cum', 'jizz', 'semen', 'ejaculate', 'ejaculation',
  'orgasm', 'masturbate', 'masturbation',
  'anus', 'rectum',

  // Slurs & Severe Insults
  'nigger', 'nigga', 'faggot', 'fag', 'retard', 'retarded',

  // Adult Content Terms
  'porn', 'porno', 'pornography', 'nude', 'nudes',
  'hentai', 'milf', 'horny'
];

// Explicit alias matching snake_case naming convention
export const indecent_words = indecentWords;

/**
 * Checks whether text contains any indecent words from the moderation list.
 * Includes direct word-boundary detection, leetspeak normalization,
 * punctuation stripping (e.g. "f.u.c.k"), and spaced tokens (e.g. "f u c k").
 */
export function containsIndecentWords(text: string, wordsList: string[] = indecentWords): boolean {
  if (!text || typeof text !== 'string') return false;

  // 1. Direct word-boundary match
  for (const word of wordsList) {
    const regex = new RegExp(`(?:^|[^a-zA-Z0-9])${word}(?:$|[^a-zA-Z0-9])`, 'i');
    if (regex.test(text)) {
      return true;
    }
  }

  // 2. Leetspeak substitutions (@ -> a, $ -> s, 0 -> o, 1/! -> i, 3 -> e)
  const normalized = text
    .toLowerCase()
    .replace(/[@]/g, 'a')
    .replace(/[$]/g, 's')
    .replace(/[0]/g, 'o')
    .replace(/[1!|]/g, 'i')
    .replace(/[3]/g, 'e');

  for (const word of wordsList) {
    const regex = new RegExp(`(?:^|[^a-zA-Z0-9])${word}(?:$|[^a-zA-Z0-9])`, 'i');
    if (regex.test(normalized)) {
      return true;
    }
  }

  // 3. Punctuation-stripped text (e.g. "f.u.c.k", "s_h_i_t", "b-i-t-c-h")
  const strippedPunctuation = normalized.replace(/[^a-z0-9\s]/g, '');
  for (const word of wordsList) {
    const regex = new RegExp(`(?:^|[^a-zA-Z0-9])${word}(?:$|[^a-zA-Z0-9])`, 'i');
    if (regex.test(strippedPunctuation)) {
      return true;
    }
  }

  // 4. Token-spaced check (e.g. "f u c k", "s h i t")
  const collapsedSpaced = normalized.replace(/\b([a-z])\s+(?=[a-z]\b)/g, '$1');
  for (const word of wordsList) {
    const regex = new RegExp(`(?:^|[^a-zA-Z0-9])${word}(?:$|[^a-zA-Z0-9])`, 'i');
    if (regex.test(collapsedSpaced)) {
      return true;
    }
  }

  return false;
}
