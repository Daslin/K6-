import { sleep } from 'k6';
import http from 'k6/http';
import { Rate } from 'k6/metrics';
import { check } from 'k6';

// import { generateDefinition } from './generators/definition';

const baseUrl = 'https://fusion-re.sekureqa.com/api/app/definition';
const urls = {
  allDefinition: `${baseUrl}/?Sorting=Name&MaxResultCount=1000&SkipCount=0`,
  submit: `${baseUrl}/`,
};

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
  duration: '1m',
  thresholds: {
    http_req_duration: ['p(99) < 1000'],
  }
};

export default function () {
  let allDefinition = http.get(urls.allDefinition);

    check(allDefinition, {
      'status is 200 for all definitions': (r) => r.status === 200,
    });

  let allDefinitionResponse  =  JSON.parse(allDefinition.body);

  let totalCount = allDefinitionResponse.totalCount;
  let allDefinitionItems = allDefinitionResponse.items;
  
  console.log(allDefinitionResponse, 'body');
  console.log(totalCount, 'count');
  console.log(allDefinitionResponse.items, 'items');

  const randomDefinition = Math.floor(Math.random() * totalCount);
  console.log("Random Number is: " + allDefinitionItems[randomDefinition]);

  let definitionById = baseUrl + allDefinitionItems[randomDefinition].id;
  let getDefinitionById = http.get(definitionById);

  console.log(definitionById, 'URL for definitionById');

  check(getDefinitionById, {
    'status is 200 for get definition by id': (r) => r.status === 200,
  });

  sleep(1);
}

//   // Add to Cart

// ----------------------------------------------------------------
// // GET ALL DEFINITION 
// const getAllDefinition = () => {
//   allDefinitionResult = http.get(urls.allDefinition);
//   allDefinitionResponse = allDefinitionResult.body;
//   definitionFailRate.add(allDefinitionResult.status !== 200);
// }

// // GET DEFINITION BY ID
// const getDefinitionById = () => {
//   definitionTotalCount = allDefinitionResponse.totalCount;
//   const value = Math.floor(Math.random() * definitionTotalCount);
//   const definitionid = allDefinitionResponse.items[value].id;
//   const allDefinitionResult = http.get(`${baseUrl}/${definitionid}`);
//   definitionFailRate.add(allDefinitionResult.status !== 200);
//   console.log(definitionTotalCount, 'totalCount');
//   console.log(value, 'value');
//   console.log(definitionid, 'definitionid');

// }

// // POST NEW DEFINITION
// // const postDefinition = () => {
// //     const definition = generateDefinition();    
// //     const payload = JSON.stringify(definition);

// //     const postDefinitionResult = http.post(baseUrl, payload ,
// //       header );
// //     definitionSubmitFailRate.add(postDefinitionResult.status !== 200);
// //     console.log('post payload',payload);
// // }

// // PUT DEFINITION BY ID
// // const putDefinitionById = () => {
// //   const definition = generateDefinition();
// //   const payload = JSON.stringify(definition);
// //   const value = Math.floor(Math.random() * definitionTotalCount);
// //   definitionid = allDefinitionResponse.items[value].id;
// //   const putDefinitionResult = http.put(`${baseUrl}/${definitionid}`, payload,
// //     header);
// //   definitionSubmitFailRate.add(putDefinitionResult.status !== 200);
// //   console.log('post payload', payload);
// //   console.log('id', definitionid);
// // }

// export default function () {
//   getAllDefinition();
//   getDefinitionById();
//   // postDefinition();
//   // putDefinitionById();
//   sleep(1);
// }