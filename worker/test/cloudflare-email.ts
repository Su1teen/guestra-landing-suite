/** Заглушка модуля cloudflare:email для тестов вне среды Workers. */
export class EmailMessage {
  constructor(public from: string, public to: string, public raw: string) {}
}
