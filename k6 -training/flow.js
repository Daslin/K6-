import { sleep } from 'k6';
import http from 'k6/http';
import { Rate } from 'k6/metrics';

import { generateDefinition } from './generators/definition';

const baseUrl = 'https://fusion-re.sekureqa.com/api/app/definition';
const urls = {
  allDefinition: `${baseUrl}/?Sorting=Name&MaxResultCount=1000&SkipCount=0`,
  submit: `${baseUrl}/`,
};

const definitionFailRate = new Rate('failed form fetches');
const definitionSubmitFailRate = new Rate('failed form submits');

export const options = {
  vus: 1,
  duration: '10s',
  thresholds: {
    'failed form submits': ['rate<0.1'],
    'failed form fetches': ['rate<0.1'],
    'http_req_duration': ['p(95)<400']
  }
};

const getAllDefinition = () => {
    const allDefinitionResult = http.get(urls.allDefinition);
    definitionFailRate.add(allDefinitionResult.status !== 200);
}

const postDefinition = () => {
    const definition = generateDefinition();    
    const payload = JSON.stringify(definition);
    
    const postDefinitionResult = http.post(urls, payload);
    definitionSubmitFailRate.add(postDefinitionResult.status !== 200);
}

export default function() {
    getAllDefinition();
    postDefinition();
    sleep(1);
}