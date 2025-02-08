import { test, expect, APIRequestContext } from '@playwright/test';
import exp from 'constants';

const baseUrlEmployeesApi = `${process.env.BASE_URL_EMPLOYEES_API}`;
const password = `${process.env.PASSWORD}`;
const userName = `${process.env.USER_NAME}`;
const time = 5000; //timeout limit for each request in the tests

let apiContext: APIRequestContext;
let dependants: number;
let firstName: string;
let lastName: string;

test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext();
})

test.afterAll(async ({ }) => {
    await apiContext.dispose();
});

test.beforeEach(async () => {
    dependants = Math.trunc(Math.random()*20);
    firstName = `BEFN${Date.now()}`;
    lastName = `BELN${Date.now()}`;
});
  
test.describe("@employees-api", () => {

    test('@smoke GET /employees 200 status code', async () => {
        const get_request = await apiContext.get(`${baseUrlEmployeesApi}/employees`, { 
        timeout: time, 
        headers: {
            Accept: 'application/json',
            Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`
        }
        });
        expect(get_request.status()).toBe(200);
    });

    test('GET /employees 401 status code', async () => {
        const get_request = await apiContext.get(`${baseUrlEmployeesApi}/employees`, { 
        timeout: time, 
        headers: {
            Accept: 'application/json'
        }
        });
        expect(get_request.status()).toBe(401);
    });

    test('@smoke POST /employees 200 status code' , async () => {
        let employeeId = '';
        const post_request = await apiContext.post(`${baseUrlEmployeesApi}/employees`, { 
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
        expect(post_request.status()).toBe(200);

        //save the response and get the id of the employee
        let response = await post_request.json();
        employeeId = response.id;

        const delete_request = await apiContext.delete(`${baseUrlEmployeesApi}/employees/${employeeId}`, { 
            timeout: time,
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`
            }
        });
    });

    test('POST /employees 401 status code' , async () => {
        const post_request = await apiContext.post(`${baseUrlEmployeesApi}/employees`, { 
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
        expect(post_request.status()).toBe(401);
    });

    test('POST /employees 400 status code' , async () => {
        const post_request = await apiContext.post(`${baseUrlEmployeesApi}/employees`, { 
            timeout: time,
            data: {
                firstName: firstName,
                lastName: lastName,
                dependants: 100,
            },
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`
            }
        });
        expect(post_request.status()).toBe(400);
    });

    test('@smoke GET /employees/{id} 200 status code', async () => {
        let employeeId = '';
        const post_request = await apiContext.post(`${baseUrlEmployeesApi}/employees`, { 
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

        //save the response and get the id of the employee
        let response = await post_request.json();
        employeeId = response.id;

        const get_request = await apiContext.get(`${baseUrlEmployeesApi}/employees/${employeeId}`, { 
        timeout: time, 
        headers: {
            Accept: 'application/json',
            Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`
        }
        });
        expect(get_request.status()).toBe(200);

        const delete_request = await apiContext.delete(`${baseUrlEmployeesApi}/employees/${employeeId}`, { 
            timeout: time,
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`
            }
        });
    });

    test('GET /employees/{id} 401 status code', async () => {
        const get_request = await apiContext.get(`${baseUrlEmployeesApi}/employees/employeeId`, { 
        timeout: time, 
        headers: {
            Accept: 'application/json',        }
        });
        expect(get_request.status()).toBe(401);
    });

    test('@smoke PUT /employees 200 status code', async () => {
        let employeeId = '';
        const post_request = await apiContext.post(`${baseUrlEmployeesApi}/employees`, { 
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

        //save the response and get the id of the employee
        let response = await post_request.json();
        employeeId = response.id;

        const put_request = await apiContext.put(`${baseUrlEmployeesApi}/employees`, { 
            timeout: time,
            data: {
                id: employeeId,
                firstName: firstName + "Edited",
                lastName: lastName + "Edited",
                dependants: dependants,
            },
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`
            }
        });
        expect(put_request.status()).toBe(200);

        const request2 = await apiContext.delete(`${baseUrlEmployeesApi}/employees/${employeeId}`, { 
            timeout: time,
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`
            }
        });
    });

    test('PUT /employees 400 status code', async () => {
        let employeeId = '';
        const post_request = await apiContext.post(`${baseUrlEmployeesApi}/employees`, { 
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

        //save the response and get the id of the employee
        let response = await post_request.json();
        employeeId = response.id;

        const put_request = await apiContext.put(`${baseUrlEmployeesApi}/employees`, { 
            timeout: time,
            data: {
                id: employeeId,
                firstName: firstName + "Edited",
                lastName: lastName + "Edited",
                dependants: 100,
            },
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`
            }
        });
        expect(put_request.status()).toBe(400);

        const delete_request = await apiContext.delete(`${baseUrlEmployeesApi}/employees/${employeeId}`, { 
            timeout: time,
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`
            }
        });
    });

    test('PUT /employees 401 status code', async () => {
        let employeeId = '';
        const post_request = await apiContext.post(`${baseUrlEmployeesApi}/employees`, { 
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

        //save the response and get the id of the employee
        let response = await post_request.json();
        employeeId = response.id;

        const put_request = await apiContext.put(`${baseUrlEmployeesApi}/employees`, { 
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
        expect(put_request.status()).toBe(401);

        const request2 = await apiContext.delete(`${baseUrlEmployeesApi}/employees/${employeeId}`, { 
            timeout: time,
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`
            }
        });
    });

    test('@smoke DELETE /employees 200 status code', async () => {
        let employeeId = '';
        const post_request = await apiContext.post(`${baseUrlEmployeesApi}/employees`, { 
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

        //save the response and get the id of the employee
        let response = await post_request.json();
        employeeId = response.id;

        const delete_request = await apiContext.delete(`${baseUrlEmployeesApi}/employees/${employeeId}`, { 
            timeout: time,
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`
            }
        });
        expect(delete_request.status()).toBe(200);
    });

    test('DELETE /employees 401 status code', async () => {
        let employeeId = '';
        const post_request = await apiContext.post(`${baseUrlEmployeesApi}/employees`, { 
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
        expect(post_request.status()).toBe(200);

        //save the response and get the id of the employee
        let response = await post_request.json();
        employeeId = response.id;

        const request1 = await apiContext.delete(`${baseUrlEmployeesApi}/employees/${employeeId}`, { 
            timeout: time,
            headers: {
                Accept: 'application/json'
            }
        });
        expect(request1.status()).toBe(401);

        const delete_request = await apiContext.delete(`${baseUrlEmployeesApi}/employees/${employeeId}`, { 
            timeout: time,
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`
            }
        });
    });

    test('DELETE /employees 404 status code', async () => {
        let employeeId = '';
        const post_request = await apiContext.post(`${baseUrlEmployeesApi}/employees`, { 
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
        expect(post_request.status()).toBe(200);

        //save the response and get the id of the employee
        let response = await post_request.json();
        employeeId = response.id;

        const request1 = await apiContext.delete(`${baseUrlEmployeesApi}/employees/employeeId`, { 
            timeout: time,
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`
            }
        });
        expect(request1.status()).toBe(404);

        const delete_request = await apiContext.delete(`${baseUrlEmployeesApi}/employees/${employeeId}`, { 
            timeout: time,
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`
            }
        });
    });
});

test.describe("Salary tests", () => {

    test('@smoke Salary is calculated correctly' , async () => {
        let employeeId = '';
        let dependants = 0;
        let salary = 0;
        let gross = 0;
        let benefitsCost = 0;
        let net = 0;
    
        const post_request = await apiContext.post(`${baseUrlEmployeesApi}/employees`, { 
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
        expect(post_request.status()).toBe(200);

        //save the response and get the id of the employee
        let response = await post_request.json();
        employeeId = response.id;
        dependants = response.dependants;
        salary = response.salary;
        gross = response.gross;
        benefitsCost = response.benefitsCost;
        net = response.net;

        expect( ( gross - ( ( ( dependants * 500 ) + 1000 ) / 26 )).toFixed(2) ).toEqual( net.toFixed(2) );

        const delete_request = await apiContext.delete(`${baseUrlEmployeesApi}/employees/${employeeId}`, { 
            timeout: time,
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`
            }
        });
    });
});