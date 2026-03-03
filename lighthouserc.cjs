module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npx -y http-server dist -p 4321 -s',
      startServerReadyPattern: 'Available on:',
      url: ['http://localhost:4321/'],
      numberOfRuns: 1,
      settings: {
        preset: 'desktop',
        chromeFlags: '--headless=new --disable-gpu --no-sandbox --user-data-dir=.lighthouseci/chrome-profile'
      }
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
