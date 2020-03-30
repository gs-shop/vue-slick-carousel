module.exports = {
  tagFormat: '${version}',
  plugins: [
    [
      'semantic-release-gitmoji',
      {
        releaseRules: {
          major: [':boom:'],
          minor: [':sparkles:'],
          patch: [':bug:', ':ambulance:', ':lock:'],
        },
      },
    ],
    '@semantic-release/github',
  ],
}
