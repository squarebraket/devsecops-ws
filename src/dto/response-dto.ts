import { ResponseDtoInterface } from '../interface/response-dto-interface';
import { FrequentFlyerModelInterface } from '../interface/frequent-flyer-model-interface';

export class ResponseDto {
  message: string;
  code: string;
  clubMember: FrequentFlyerModelInterface;

  constructor(code, message, clubMember = null) {
    this.code = code;
    this.message = message;
    this.clubMember = clubMember;
  }
}
