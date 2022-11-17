import { sleep } from 'k6';
import http from 'k6/http';
import { Rate } from 'k6/metrics';

import { generateDefinition } from 'c:/Users/daslind/Downloads/k6-template-es6-master/k6-template-es6-master/generators/definition';

const baseUrl = 'https://fusion-re.sekureqa.com/api/app/definition';
const urls = {
  allDefinition: `${baseUrl}/?Sorting=Name&MaxResultCount=1000&SkipCount=0`,
  submit: `${baseUrl}/`,
};

let allDefinitionResult = {};
let definitionTotalCount = 1;
let allDefinitionResponse = {};
let definitionid = " ";
let randomValue = 1;

const definitionFailRate = new Rate('failed form fetches');
const definitionSubmitFailRate = new Rate('failed form submits');
const header = {
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    Connection: 'keep-alive',
  },
};

export const options = {
  vus: 1,
  duration: '30s',
  thresholds: {
    'failed form submits': ['rate<0.1'],
    'failed form fetches': ['rate<0.1'],
    'http_req_duration': ['p(95)<400']
  }
};

// GET ALL DEFINITION 
const getAllDefinition = () => {
  allDefinitionResult = http.get(urls.allDefinition);
  allDefinitionResponse = JSON.parse(allDefinitionResult.body);
  definitionFailRate.add(allDefinitionResult.status !== 200);
}

// GET DEFINITION BY ID
const getDefinitionById = () => {
  definitionTotalCount = allDefinitionResponse.totalCount;
  randomValue = Math.floor(Math.random() * definitionTotalCount);
  definitionid = allDefinitionResponse.items[value].id;
  const definitionByIdResult = http.get(`${baseUrl}/${definitionid}`);
  definitionFailRate.add(definitionByIdResult.status !== 200);
  console.log(definitionTotalCount, 'totalCount');
  console.log(value, 'value');
  console.log(definitionid, 'definitionid');

}

// POST NEW DEFINITION

// const postDefinition = () => {
//     const definition = generateDefinition();    
//     const payload = JSON.stringify(definition);
//     const postDefinitionResult = http.post(baseUrl, payload ,
//       header );
//     definitionSubmitFailRate.add(postDefinitionResult.status !== 200);
//     console.log('post payload',payload);
// }

// PUT DEFINITION BY ID

const putDefinitionById = () => {
  const definition = generateDefinition();
  const payload = JSON.stringify(definition);
  const putDefinitionResult = http.put(`${baseUrl}/${definitionid}`, payload,
    header);
  definitionSubmitFailRate.add(putDefinitionResult.status !== 200);
  console.log('post payload', payload);
  console.log('id', definitionid);
}

export default function () {
  getAllDefinition();
  getDefinitionById();
  // postDefinition();
  putDefinitionById();
  sleep(1);
}