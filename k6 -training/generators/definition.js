// it's important that we only import the locale(s) we need or our test script
// will balloon in memory consumption. to be fair, it will anyway, but less.

import * as faker from 'faker/locale/en_US'; 

export const generateDefinition = () => ({
    
    name: `WORKFLOW_TEST - ${faker.name.firstName()}`,
    trigger: faker.company.companyName()  ,
    ownership: faker.name.jobTitle(),
    json: "",
    enabled: true || false,
});