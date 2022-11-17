// Scenario: Scenario_1 (executor: ramping-vus)

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
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 20, duration: '1m' },
        { target: 20, duration: '3m30s' },
        { target: 0, duration: '1m' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
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

  // Automatically added sleep
  sleep(1)
}
