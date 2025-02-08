import encoding from 'k6/encoding';
import http from 'k6/http';
import { check, sleep } from 'k6';

const baseURL = __ENV.BASE_URL_EMPLOYEES_API;
const password = __ENV.PASSWORD;
const userName = __ENV.USER_NAME;
let employeeId = '';
let response = '';

let timeDoingLogin = 6;
let timeFillingAddEmployeeForm = 10;
let timeLookingDashboard = 1;
let timeEditingEmployee = 10;
let timeDeletingEmployee = 4;

export const options = {
  vus: 10,
  duration: '60s',
};

export default function () {

  const body = JSON.stringify({
    firstName: 'PEFN',
    lastName: 'PELN',
    dependants: 1
  });
  const credentials = `${userName}:${password}`;
  const encodedCredentials = encoding.b64encode(credentials);
  const params = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${encodedCredentials}`,
      }
  };

  sleep(timeDoingLogin); //time doing the login

  let request = http.get( `${baseURL}/employees`, params);
  check(request, {
      'status is 200': (r) => r.status === 200,
  });

  sleep(timeFillingAddEmployeeForm); //time filling the add employee form

  let request1 = http.post(`${baseURL}/employees`,body, params);
  check(request1, {
      'status is 200': (r) => r.status === 200,
  });
  response = request1.json();
  employeeId = response.id;

  sleep(timeLookingDashboard); //time looking the dashboard

  let request2 = http.get( `${baseURL}/employees/${employeeId}`, params);
  check(request2, {
      'status is 200': (r) => r.status === 200,
  });

  sleep(timeEditingEmployee); //time editing an employee

  let request3 = http.put(`${baseURL}/employees`,
    JSON.stringify({
      id: employeeId,
      firstName: 'PEEdited',
      lastName: 'PEEdited',
      dependants: 1
    }), 
    params
  );
  check(request3, {
      'status is 200': (r) => r.status === 200,
  });

  sleep(timeDeletingEmployee); //time deleting an employee

  let request4 = http.del(`${baseURL}/employees/${employeeId}`, {}, params);
  check(request4, {
      'status is 200': (r) => r.status === 200,
  });
}