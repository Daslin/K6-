// Scenario: Sample_run (executor: ramping-vus)

import { sleep } from 'k6'
import http from 'k6/http'

export const options = {
  ext: {
    loadimpact: {
      distribution: { 'amazon:ca:montreal': { loadZone: 'amazon:ca:montreal', percent: 100 } },
      apm: [],
    },
  },
  thresholds: {},
  scenarios: {
    Sample_run: {
      executor: 'ramping-vus',
      startTime: '0s',
      gracefulStop: '1m',
      stages: [{ target: 10, duration: '1m' }],
      startVUs: 10,
      gracefulRampDown: '1m',
      exec: 'sample_run',
    },
  },
}

export function sample_run() {
  let response

  // All Definition
  response = http.get(
    'https://fusion-re.sekureqa.com/api/app/definition/?Sorting=Name&MaxResultCount=1000&SkipCount=0'
  )

  // Definition by id
  response = http.get(
    'https://fusion-re.sekureqa.com/api/app/definition/5c6c6b23-d84e-135c-bac6-3a01608eb3ec'
  )

  // Definition by name
  response = http.get('https://fusion-re.sekureqa.com/api/app/definition/name/Test RE')

  // Definition by Ownership
  response = http.get('https://fusion-re.sekureqa.com/api/app/definition/ownership/Engine')

  // Definition
  response = http.post(
    'https://fusion-re.sekureqa.com/api/app/definition',
    '{\r\n  "name": "abc",\r\n  "trigger": "b",\r\n  "ownership": "b",\r\n  "json": "{\\r\\n    \\"Id\\": \\"HelloWorldModified\\",\\r\\n \\r\\n    \\"Version\\": 1,\\r\\n \\r\\n    \\"Steps\\": [\\r\\n \\r\\n                {\\r\\n        \\t\\"Test\\": \\"Test Rule Engine\\"\\r\\n        }\\r\\n \\r\\n       ]\\r\\n \\r\\n}",\r\n  "enabled": true\r\n}\r\n',
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
      },
    }
  )

  // Definition by ID
  response = http.put(
    'https://fusion-re.sekureqa.com/api/app/definition/889c04f7-db8b-3e4e-1852-3a01608160e7',
    '{\r\n  "name": "Test QA5",\r\n  "trigger": "Click save",\r\n  "ownership": "IT5",\r\n  "json": "5",\r\n  "enabled": true,\r\n  "id": "889c04f7-db8b-3e4e-1852-3a01608160e7"\r\n}\r\n',
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
      },
    }
  )

  // Definition
  response = http.del(
    'https://fusion-re.sekureqa.com/api/app/definition/b41f2033-f880-4895-244f-3a015b984a2b/definition',
    null,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
      },
    }
  )

  // Automatically added sleep
  sleep(1)
}
