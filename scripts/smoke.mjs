import https from 'https'
import http from 'http'

const baseUrl = process.argv[2] || 'http://localhost:3000'

const routesToTest = [
  '/',
  '/menu',
  '/api/catalog', // Assuming there's a catalog API
]

async function testRoute(route) {
  const url = `${baseUrl}${route}`
  const client = url.startsWith('https') ? https : http

  return new Promise((resolve) => {
    client.get(url, (res) => {
      console.log(`[${res.statusCode}] ${url}`)
      resolve(res.statusCode === 200 || res.statusCode === 308 || res.statusCode === 301)
    }).on('error', (err) => {
      console.error(`[ERROR] ${url}: ${err.message}`)
      resolve(false)
    })
  })
}

async function runSmokeTests() {
  console.log(`Starting smoke tests for ${baseUrl}...\n`)
  let allPassed = true

  for (const route of routesToTest) {
    const passed = await testRoute(route)
    if (!passed) {
      allPassed = false
    }
  }

  console.log('\n---')
  if (allPassed) {
    console.log('✅ All smoke tests passed successfully.')
    process.exit(0)
  } else {
    console.error('❌ Some smoke tests failed.')
    process.exit(1)
  }
}

runSmokeTests()
