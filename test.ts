//Exercise 1

let testEnv: string = "staging";
let retries: number = 3;
let maxRetries: number = 5; //maxRetries can not be a const because it is reassigned

if (retries < maxRetries) {
  let attemptMessage: string = `Retry ${retries} of ${maxRetries}`;
  console.log(attemptMessage);
}

maxRetries = 10; 

let userCount: number = 12; //earlier is was declared as a string

//Exercise 2

///typescript
function classifyResponse(status: number): string {
  switch (status) {
    case 200:
    case 201:
      return "Success";
  }

  if (status >= 400 && status <= 499) {
    return "Client Error";
  } else if (status >= 500) {
    return "Server Error";
  } else {
    return "Unknown";
  }
}
console.log(classifyResponse(200));

//Exercise 3

const testResults = [
  { name: "Login test", status: "passed", duration: 1200 },
  { name: "Checkout test", status: "failed", duration: 3400 },
  { name: "Search test", status: "passed", duration: 800 },
];

// Destructuring
const { name: testName, status: testStatus } = testResults[0];

// for...of
for (const test of testResults) {
  console.log(test.name, test.duration);
}

// Names of failed tests
const failedTests = testResults
  .filter(test => test.status === "failed")
  .map(test => test.name);

// Total duration
const totalDuration = testResults.reduce(
  (total, test) => total + test.duration,
  0
);

console.log(failedTests);
console.log(totalDuration);


