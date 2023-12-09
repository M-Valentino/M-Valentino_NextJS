export const checkEmailInvalid = (email) => {
  if (email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{1,4}$/g)) {
    return false;
  }
  return true;
};

export const checkEmailTooLong = (email) => {
  if (email.length > 40) {
    return true;
  }
  return false;
};

export const checkMessageInvalid = (message) => {
  /**
   * This also checks if '{' and '}' aren't there which maybe can
   * mitigate possible code injections.
   */
  if (message.match(/^[a-z0-9!"#$%&'()*+,.\/:;<=>?@\[\] ^_`|~-]*$/i)) {
    return false;
  }
  return true;
};

export const MAX_MESSAGE_LENGTH = 1280;

export const checkMessageTooLong = (message) => {
  if (message.length > MAX_MESSAGE_LENGTH) {
    return true;
  }
  return false;
};

export const checkMessageTooShort = (message) => {
  if (message.length < 12) {
    return true;
  }
  return false;
};

export const checkHasGibberish = (message) => {
  // A modified list of the most used English words.
  const commonWords = [
    "the",
    /**
     * Two letter words have a higher chance of belonging to
     * gibberish, so a space is appended to lessen the chace.
     */
    "of ",
    "and",
    "to ",
    "in ",
    "is ",
    "that",
    "for",
    "it ",
    "as ",
    "was",
    "with",
    "be ",
    "by ",
    "on ",
    "not",
    "he ",
    "this",
    "are",
    "or ",
    "his",
    "from",
    "at ",
    "which",
    "but",
    "have",
    "an ",
    "had",
    "they",
    "you",
    "were",
    "their",
    "one",
    "all",
    "we ",
    "can",
    "her",
    "has",
    "there",
    "been",
    "if ",
    "more",
    "when",
    "will",
    "would",
    "who",
    "so ",
    "she",
    "other",
    "its",
    "may",
    "these",
    "what",
    "them",
    "than",
    "some",
    "him",
    "time",
    "into",
    "only",
    "do ",
    "such",
    "my ",
    "new",
    "about",
    "out",
    "also",
    "two",
    "any",
    "up ",
    "first",
    "could",
    "our",
    "then",
    "most",
    "see",
    "should",
    "after",
    "said",
    "your",
    "very",
    "between",
    "made",
    "many",
    "over",
    "like",
    "those",
    "did",
    "now",
    "even",
    "well",
    "where",
    "must",
    "people",
    "through",
    "how",
    "hi ",
    "hello",
    "because",
    "website",
  ];

  // A for each loop won't break after return
  for (let i = 0; i < commonWords.length; i++) {
    if (message.includes(commonWords[i])) {
      return false;
    }
  }
  return true;
};
