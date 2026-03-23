export type Language = "ne" | "en";

export const translations = {
  ne: {
    // Setup
    gameTitle: "इम्पोस्टर वर्ड गेम",
    setupSubtitle: "Pass & Play • 2-10 खेलाडीहरू",
    addPlayerPlaceholder: "खेलाडीको नाम थप्नुहोस्",
    addButton: "थप्नुहोस्",
    playersLabel: "खेलाडीहरू",
    imposterCountLabel: "इम्पोस्टर सङ्ख्या",
    imposter: "इम्पोस्टर",
    imposters: "इम्पोस्टरहरू",
    startGame: "खेल सुरु गर्नुहोस्",
    addMinPlayers: "कम्तीमा २ जना खेलाडी थप्नुहोस्",
    showCategoryToImposter: "इम्पोस्टरलाई श्रेणी देखाउनुहोस्",
    showHintToImposter: "इम्पोस्टरलाई संकेत देखाउनुहोस्",
    gameOptions: "खेल विकल्पहरू",
    categoryLabel: "श्रेणी:",
    hintLabel: "संकेत:",

    // Reveal
    passPhoneTo: (name: string) => `फोन ${name} लाई दिनुहोस्`,
    holdToReveal: "Hold to Reveal 👆",
    passToNext: "अर्को खेलाडीलाई दिनुहोस्",
    nextPlayer: "अर्को खेलाडी →",
    imposterMessage: "तपाईं इम्पोस्टर हुनुहुन्छ 😈",
    alreadyViewed: "तपाईंले पहिले नै हेर्नुभयो 👀",

    // Discussion
    discussionPhase: "छलफल चरण",
    discussImposter: "इम्पोस्टरको बारेमा कुराकानी गर्नुहोस्",
    timeLeft: "बाँकी समय",
    goToVoting: "मतदानमा जानुहोस् →",

    // Voting
    voting: "मतदान",
    passPhoneFor: (name: string) => `${name} को लागि फोन दिनुहोस्`,
    whoIsImposter: "इम्पोस्टर भन्ने लाग्छ कसलाई?",
    confirm: "पुष्टि गर्नुहोस्",
    votesCast: (current: number, total: number) =>
      `${current} / ${total} मतदान गरियो`,
    allVoted: "सबैले मतदान गर्यो!",
    clickToSeeResult: "नतिजा हेर्न तल क्लिक गर्नुहोस्",
    revealResult: "नतिजा खोल्नुहोस् 🔍",

    // Result
    result: "नतिजा",
    impostersWere: "इम्पोस्टर थिए:",
    impostersWerePlural: "इम्पोस्टरहरू थिए:",
    votesLabel: "मतदान:",
    vote: "मत",
    playAgain: "फेरि खेल्नुहोस् 🎮",
    exitGame: "बाहिर निस्कनुहोस्",
    clearAll: "सबै हटाउनुहोस्",
  },
  en: {
    // Setup
    gameTitle: "Imposter Word Game",
    setupSubtitle: "Pass & Play • 2-10 players",
    addPlayerPlaceholder: "Add player name",
    addButton: "Add",
    playersLabel: "Players",
    imposterCountLabel: "Number of imposters",
    imposter: "imposter",
    imposters: "imposters",
    startGame: "Start Game",
    addMinPlayers: "Add at least 2 players",
    showCategoryToImposter: "Show category to imposter",
    showHintToImposter: "Show hint to imposter",
    gameOptions: "Game Options",
    categoryLabel: "Category:",
    hintLabel: "Hint:",

    // Reveal
    passPhoneTo: (name: string) => `Pass phone to ${name}`,
    holdToReveal: "Hold to Reveal 👆",
    passToNext: "Pass to next player",
    nextPlayer: "Next Player →",
    imposterMessage: "You are the imposter 😈",
    alreadyViewed: "You've already viewed 👀",

    // Discussion
    discussionPhase: "Discussion Phase",
    discussImposter: "Discuss who might be the imposter",
    timeLeft: "Time left",
    goToVoting: "Go to Voting →",

    // Voting
    voting: "Voting",
    passPhoneFor: (name: string) => `Pass phone to ${name}`,
    whoIsImposter: "Who do you think is the imposter?",
    confirm: "Confirm",
    votesCast: (current: number, total: number) =>
      `${current} / ${total} voted`,
    allVoted: "Everyone voted!",
    clickToSeeResult: "Click below to see the result",
    revealResult: "Reveal Result 🔍",

    // Result
    result: "Result",
    impostersWere: "The imposter was:",
    impostersWerePlural: "The imposters were:",
    votesLabel: "Votes:",
    vote: "vote",
    playAgain: "Play Again 🎮",
    exitGame: "Exit Game",
    clearAll: "Clear All",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["ne"];
