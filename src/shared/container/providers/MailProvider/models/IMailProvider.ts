import ISendMailDTO from '../dtos/ISendMailDTO';

export default interface IMailProvider {
  sendEmail(mailData: ISendMailDTO): Promise<void>;
}
