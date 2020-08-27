export default () => {
  // eslint-disable-next-line
  console.log(`\n# TEST SETUP #`);

  // normalize timezone to UTC
  process.env.TZ = "UTC";
  // add other envs here
};
