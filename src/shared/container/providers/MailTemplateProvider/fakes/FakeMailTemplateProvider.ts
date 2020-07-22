import IMailTemplateProvider from '../models/IMailTemplateProvider';

export default class FakeMailProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'template';
  }
}
