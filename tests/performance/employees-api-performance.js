import encoding from 'k6/encoding';
import http from 'k6/http';
import { check, sleep } from 'k6';

const baseURL = 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api';
const password = ".a'/;a#[a*CP";
const userName = 'TestUser723';
let employeeId = '';
let response = '';

export default function () {

  const body = JSON.stringify({
    firstName: 'New',
    lastName: 'Employee',
    dependants: '2'
  });
  const credentials = `${userName}:${password}`;
  const encodedCredentials = encoding.b64encode(credentials);
  const params = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${encodedCredentials}`,
      }
  };


  let res = http.get( `${baseURL}/employees`, params);
  check(res, {
      'status is 200': (r) => r.status === 200,
  });

  sleep(3);

  let res1 = http.post(`${baseURL}/employees`,body, params);
  check(res1, {
      'status is 200': (r) => r.status === 200,
  });
  response = res1.json();
  employeeId = response.id;

  sleep(3);

  let res2 = http.get( `${baseURL}/employees/${employeeId}`, params);
  check(res2, {
      'status is 200': (r) => r.status === 200,
  });

  sleep(3);

  let res3 = http.put(`${baseURL}/employees`,
    JSON.stringify({
      id: employeeId,
      firstName: 'New',
      lastName: 'Employee',
      dependants: '2'
    }), 
    params
  );
  check(res3, {
      'status is 200': (r) => r.status === 200,
  });

  sleep(3);

  let res4 = http.del(`${baseURL}/employees/${employeeId}`, {}, params);
  check(res4, {
      'status is 200': (r) => r.status === 200,
  });
}