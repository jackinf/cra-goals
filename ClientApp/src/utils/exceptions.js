export function TokenException(message) {
  this.message = message;
  this.name = 'TokenException';
}

export function UrlException(message) {
  this.message = message;
  this.name = 'UrlException';
}
