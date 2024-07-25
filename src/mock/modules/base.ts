/**
 * 响应封装
 */
export class JsonResp {
  static success(data: any, message = 'success') {
    return {
      code: 0,
      data: data,
      message: message,
    }
  }

  static error(message = 'error', data: any = null) {
    return {
      code: -1,
      data: data,
      message: message,
    }
  }

  static echo(data: any, code = 0, message = 'success') {
    return {
      code: code,
      data: data,
      message: message,
    }
  }
}
