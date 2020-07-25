export const getCommonCreateQuestions = (projectName: string) => [
  {
    name: 'isPrivate',
    message: '私有项目？默认不是私有',
    type: 'confirm',
    initial: false,
    required: true
  },
  {
    name: ': string',
    message: '输入 package.json:name 名称，默认当前项目名',
    type: 'input',
    initial: projectName,
    required: true
  },
  {
    name: 'projectVersion',
    message: '输入项目版本，默认 1.0.0',
    type: 'input',
    initial: '1.0.0',
    required: true
  },
  {
    name: 'projectDescription',
    message: '输入项目介绍，默认空',
    type: 'input',
    initial: '',
    required: false
  }
];

export const checkDirQuestions = [
  {
    name: 'createInCurrtent',
    message: '确认在当前目录下创建么？',
    type: 'confirm',
    initial: true,
    required: true
  }
];

export const templateQuestions = [
  {
    name: 'selectTemplate',
    message: '请选择模版',
    type: 'select',
    choices: [{ name: 'template-lerna', message: '多包工程' }],
    initial: 0,
    required: true
  }
];
