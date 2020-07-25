import enquirer from 'enquirer';
import message from '@/utils/message';
import { getCommonCreateQuestions, checkDirQuestions, templateQuestions } from '@/questions';

export const getAnswersCreate = async (): Promise<any> => {
  try {
    const answers = await enquirer.prompt(checkDirQuestions);
    return answers;
  } catch (error) {
    error && message.error(`确认在当前目录创建异常：${error}`);
    process.exit(1);
  }
};

export const getAnswersTemplate = async (): Promise<any> => {
  try {
    const answers = await enquirer.prompt(templateQuestions);
    return answers;
  } catch (error) {
    error && message.error(`选择模版异常：${error}`);
    process.exit(1);
  }
};

export const getAnswersProjectInfo = async (projectName: string): Promise<any> => {
  try {
    const answers = await enquirer.prompt([...getCommonCreateQuestions(projectName)]);
    return answers;
  } catch (error) {
    error && message.error(`输入项目信息异常：${error}`);
    process.exit(1);
  }
};
