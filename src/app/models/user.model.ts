export class User {
  private _id: number
  private _firstname: string;
  private _lastname: string;
  private _birthDate: string;
  private _email: string;
  private _password: string;
  private _image: string;
  private _isAdmin: boolean;
  private _favorites: any

  constructor(
    firstname: string,
    lastname: string,
    birthDate: string,
    email: string,
    password: string,
    image: string,
    isAdmin: boolean,
    favorites: any
  ) {
    this._firstname = firstname;
    this._lastname = lastname;
    this._birthDate = birthDate;
    this._email = email;
    this._password = password;
    this._image = image;
    this._isAdmin = isAdmin;
    this._favorites = favorites;
  }

  /**
   * Getter id
   * @return {number}
   */
  public get id(): number {
    return this._id;
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
   * Getter image
   * @return {string}
   */
  public get image(): string {
    return this._image;
  }

  /**
   * Getter isAdmin
   * @return {boolean}
   */
  public get isAdmin(): boolean {
    return this._isAdmin;
  }

  /**
   * Getter favorites
   * @return {any}
   */
  public get favorites(): any {
    return this._favorites;
  }

  /**
   * Setter id
   * @param {number} value
   */
  public set id(value: number) {
    this._id = value;
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

  /**
   * Setter image
   * @param {string} value
   */
  public set image(value: string) {
    this._image = value;
  }

  /**
   * Setter isAdmin
   * @param {boolean} value
   */
  public set isAdmin(value: boolean) {
    this._isAdmin = value;
  }

  /**
   * Setter favorites
   * @param {any} value
   */
  public set favorites(value: any) {
    this._favorites = value;
  }
}
