export class User {
  private _firstname: string;
  private _lastname: string;
  private _birthDate: string;
  private _email: string;
  private _password: string;

  constructor(
    firstname: string,
    lastname: string,
    birthDate: string,
    email: string,
    password: string
  ) {
    this._firstname = firstname;
    this._lastname = lastname;
    this._birthDate = birthDate;
    this._email = email;
    this._password = password;
  }

  /**
   * Getter firstname
   * @return {string}
   */
  public get firstname(): string {
    return this._firstname;
  }

  /**
   * Getter lastname
   * @return {string}
   */
  public get lastname(): string {
    return this._lastname;
  }

  /**
   * Getter birthDate
   * @return {string}
   */
  public get birthDate(): string {
    return this._birthDate;
  }

  /**
   * Getter email
   * @return {string}
   */
  public get email(): string {
    return this._email;
  }

  /**
   * Getter password
   * @return {string}
   */
  public get password(): string {
    return this._password;
  }

  /**
   * Setter firstname
   * @param {string} value
   */
  public set firstname(value: string) {
    this._firstname = value;
  }

  /**
   * Setter lastname
   * @param {string} value
   */
  public set lastname(value: string) {
    this._lastname = value;
  }

  /**
   * Setter birthDate
   * @param {string} value
   */
  public set birthDate(value: string) {
    this._birthDate = value;
  }

  /**
   * Setter email
   * @param {string} value
   */
  public set email(value: string) {
    this._email = value;
  }

  /**
   * Setter password
   * @param {string} value
   */
  public set password(value: string) {
    this._password = value;
  }
}
