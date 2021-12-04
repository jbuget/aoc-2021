module.exports = (plop) => {
  // create your generators here
  plop.setGenerator('day', {
    description: 'this is a skeleton plopfile',
    prompts: [{
      type: 'input',
      name: 'day',
      message: 'day of advent code'
    }],
    actions: [{
      type: 'addMany',
      destination: 'day/{{ day }}',
      templateFiles: 'plop-templates/**/*'
    }]
  });
};
