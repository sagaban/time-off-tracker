import initializeBasicAuth from 'nextjs-basic-auth';

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

if ((!USERNAME || !PASSWORD) && !process.browser) {
  throw new Error('Please define the USERNAME and PASSWORD environment variable inside .env.local');
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const users = [{ user: USERNAME!, password: PASSWORD! }];

export default initializeBasicAuth({
  users: users,
});
