import { test, expect, APIRequestContext } from '@playwright/test';

const baseUrlEmployeesApi = 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api';
const password = ".a'/;a#[a*CP";
const userName = 'TestUser723';
const time = 5000; //timeout limit for each request in the tests

let apiContext: APIRequestContext;
let dependants: string;
let firstName: string;
let lastName: string;

test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext();
})

test.afterAll(async ({ }) => {
    await apiContext.dispose();
});

test.beforeEach(async () => {
    dependants = "3";
    firstName = `firstName${Date.now()}`;
    lastName = `lastName${Date.now()}`;
  });
  
test.describe("@employees-api", () => {

    test('GET /employees 200 status code', async () => {
        const request = await apiContext.get(`${baseUrlEmployeesApi}/employees`, { 
        timeout: time, 
        headers: {
            Accept: 'application/json',
            Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`
        }
        });
        expect(request.status()).toBe(200);
    });

    test('GET /employees 401 status code', async () => {
        const request = await apiContext.get(`${baseUrlEmployeesApi}/employees`, { 
        timeout: time, 
        headers: {
            Accept: 'application/json'
        }
        });
        expect(request.status()).toBe(401);
    });

    test('POST /employees 201 status code' , async () => {
        const request = await apiContext.post(`${baseUrlEmployeesApi}/employees`, { 
            timeout: time,
            data: {
                firstName: firstName,
                lastName: lastName,
                dependants: dependants,
            },
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`
            }
        });
        expect(request.status()).toBe(201);
    });

    test('POST /employees 401 status code' , async () => {
        const request = await apiContext.post(`${baseUrlEmployeesApi}/employees`, { 
            timeout: time,
            data: {
                firstName: firstName,
                lastName: lastName,
                dependants: dependants,
            },
            headers: {
                Accept: 'application/json'
            }
        });
        expect(request.status()).toBe(401);
    });

    test('POST /employees 400 status code' , async () => {
        const request = await apiContext.post(`${baseUrlEmployeesApi}/employees`, { 
            timeout: time,
            data: {
                firstName: firstName,
                lastName: lastName,
                dependants: "100",
            },
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`
            }
        });
        expect(request.status()).toBe(400);
    });

    test('GET /employees/{id} 200 status code', async () => {
        let employeeId = '';
        const request = await apiContext.post(`${baseUrlEmployeesApi}/employees`, { 
            timeout: time,
            data: {
                firstName: firstName,
                lastName: lastName,
                dependants: dependants,
            },
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`
            }
        });
        expect(request.status()).toBe(200);
        //save the response and get the id of the employee
        let response = await request.json();
        employeeId = response.id;

        const request1 = await apiContext.get(`${baseUrlEmployeesApi}/employees/${employeeId}`, { 
        timeout: time, 
        headers: {
            Accept: 'application/json',
            Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`
        }
        });
        expect(request1.status()).toBe(200);
    });

    test('GET /employees/{id} 401 status code', async () => {
        const request1 = await apiContext.get(`${baseUrlEmployeesApi}/employees/employeeId`, { 
        timeout: time, 
        headers: {
            Accept: 'application/json',        }
        });
        expect(request1.status()).toBe(401);
    });

    test('PUT /employees 200 status code', async () => {
        let employeeId = '';
        const request = await apiContext.post(`${baseUrlEmployeesApi}/employees`, { 
            timeout: time,
            data: {
                firstName: firstName,
                lastName: lastName,
                dependants: dependants,
            },
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`
            }
        });
        expect(request.status()).toBe(200);
        //save the response and get the id of the employee
        let response = await request.json();
        employeeId = response.id;

        const request1 = await apiContext.put(`${baseUrlEmployeesApi}/employees`, { 
            timeout: time,
            data: {
                id: employeeId,
                firstName: firstName + "Edited",
                lastName: lastName + "Edited",
                dependants: "3",
            },
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`
            }
        });
        expect(request1.status()).toBe(200);
    });

    test('PUT /employees 400 status code', async () => {
        let employeeId = '';
        const request = await apiContext.post(`${baseUrlEmployeesApi}/employees`, { 
            timeout: time,
            data: {
                firstName: firstName,
                lastName: lastName,
                dependants: dependants,
            },
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`
            }
        });
        expect(request.status()).toBe(200);
        //save the response and get the id of the employee
        let response = await request.json();
        employeeId = response.id;

        const request1 = await apiContext.put(`${baseUrlEmployeesApi}/employees`, { 
            timeout: time,
            data: {
                id: employeeId,
                firstName: firstName + "Edited",
                lastName: lastName + "Edited",
                dependants: "100",
            },
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`
            }
        });
        expect(request1.status()).toBe(400);
    });

    test('PUT /employees 401 status code', async () => {
        let employeeId = '';
        const request = await apiContext.post(`${baseUrlEmployeesApi}/employees`, { 
            timeout: time,
            data: {
                firstName: firstName,
                lastName: lastName,
                dependants: dependants,
            },
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`
            }
        });
        expect(request.status()).toBe(200);
        //save the response and get the id of the employee
        let response = await request.json();
        employeeId = response.id;

        const request1 = await apiContext.put(`${baseUrlEmployeesApi}/employees`, { 
            timeout: time,
            data: {
                id: employeeId,
                firstName: firstName + "Edited",
                lastName: lastName + "Edited",
                dependants: dependants,
            },
            headers: {
                Accept: 'application/json'
            }
        });
        expect(request1.status()).toBe(401);
    });

    test('DELETE /employees 200 status code', async () => {
        let employeeId = '';
        const request = await apiContext.post(`${baseUrlEmployeesApi}/employees`, { 
            timeout: time,
            data: {
                firstName: firstName,
                lastName: lastName,
                dependants: dependants,
            },
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`
            }
        });
        expect(request.status()).toBe(200);
        //save the response and get the id of the employee
        let response = await request.json();
        employeeId = response.id;

        const request1 = await apiContext.delete(`${baseUrlEmployeesApi}/employees/${employeeId}`, { 
            timeout: time,
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`
            }
        });
        expect(request1.status()).toBe(200);
    });

    test('DELETE /employees 401 status code', async () => {
        let employeeId = '';
        const request = await apiContext.post(`${baseUrlEmployeesApi}/employees`, { 
            timeout: time,
            data: {
                firstName: firstName,
                lastName: lastName,
                dependants: dependants,
            },
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`
            }
        });
        expect(request.status()).toBe(200);
        //save the response and get the id of the employee
        let response = await request.json();
        employeeId = response.id;

        const request1 = await apiContext.delete(`${baseUrlEmployeesApi}/employees/${employeeId}`, { 
            timeout: time,
            headers: {
                Accept: 'application/json'
            }
        });
        expect(request1.status()).toBe(401);
    });

    test('DELETE /employees 404 status code', async () => {
        let employeeId = '';
        const request = await apiContext.post(`${baseUrlEmployeesApi}/employees`, { 
            timeout: time,
            data: {
                firstName: firstName,
                lastName: lastName,
                dependants: dependants,
            },
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`
            }
        });
        expect(request.status()).toBe(200);
        //save the response and get the id of the employee
        let response = await request.json();
        employeeId = response.id;

        const request1 = await apiContext.delete(`${baseUrlEmployeesApi}/employees/employeeId`, { 
            timeout: time,
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`
            }
        });
        expect(request1.status()).toBe(404);
    });

});