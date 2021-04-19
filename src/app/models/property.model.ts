export class Property {
  // static nbId = 1;

  private _id: number;
  private _title: string;
  private _category: string;
  private _location: string;
  private _surface: number;
  private _rooms: number;
  private _beds: number;
  private _description: string;
  private _options: Array<string>;
  private _price: number;
  private _createdAt: Date;
  private _isVisible: boolean;
  private _photos: string;

  constructor(
    title: string,
    category: string,
    location: string,
    surface: number,
    rooms: number,
    beds: number,
    description: string,
    options: Array<string>,
    price: number,
    photos: string,
  ) {
    this._title = title;
    this._category = category;
    this._location = location;
    this._surface = surface;
    this._rooms = rooms;
    this._beds = beds;
    this._description = description;
    this._options = options;
    this._price = price;
    this._photos = photos;

    // this._id = Property.nbId;
    // Property.nbId++;
    this._createdAt = new Date();
    this._isVisible = false;
  }

  /**
   * Getter id
   * @return {number}
   */
  public get id(): number {
    return this._id;
  }

  /**
   * Getter title
   * @return {string}
   */
  public get title(): string {
    return this._title;
  }

  /**
   * Getter category
   * @return {string}
   */
  public get category(): string {
    return this._category;
  }

  /**
   * Getter location
   * @return {string}
   */
  public get location(): string {
    return this._location;
  }

  /**
   * Getter surface
   * @return {number}
   */
  public get surface(): number {
    return this._surface;
  }

  /**
   * Getter rooms
   * @return {number}
   */
  public get rooms(): number {
    return this._rooms;
  }

  /**
   * Getter beds
   * @return {number}
   */
  public get beds(): number {
    return this._beds;
  }

  /**
   * Getter description
   * @return {string}
   */
  public get description(): string {
    return this._description;
  }

  /**
   * Getter options
   * @return {Array<string>}
   */
  public get options(): Array<string> {
    return this._options;
  }

  /**
   * Getter price
   * @return {number}
   */
  public get price(): number {
    return this._price;
  }

  /**
   * Getter createdAt
   * @return {Date}
   */
  public get createdAt(): Date {
    return this._createdAt;
  }

  /**
   * Getter isVisible
   * @return {boolean}
   */
  public get isVisible(): boolean {
    return this._isVisible;
  }

  /**
   * Getter photos
   * @return {string}
   */
  public get photos(): string {
    return this._photos;
  }

  /**
   * Setter id
   * @param {number} value
   */
  public set id(value: number) {
    this._id = value;
  }

  /**
   * Setter title
   * @param {string} value
   */
  public set title(value: string) {
    this._title = value;
  }

  /**
   * Setter category
   * @param {string} value
   */
  public set category(value: string) {
    this._category = value;
  }

  /**
   * Setter location
   * @param {string} value
   */
  public set location(value: string) {
    this._location = value;
  }

  /**
   * Setter surface
   * @param {number} value
   */
  public set surface(value: number) {
    this._surface = value;
  }

  /**
   * Setter rooms
   * @param {number} value
   */
  public set rooms(value: number) {
    this._rooms = value;
  }

  /**
   * Setter beds
   * @param {number} value
   */
  public set beds(value: number) {
    this._beds = value;
  }

  /**
   * Setter description
   * @param {string} value
   */
  public set description(value: string) {
    this._description = value;
  }

  /**
   * Setter options
   * @param {Array<string>} value
   */
  public set options(value: Array<string>) {
    this._options = value;
  }

  /**
   * Setter price
   * @param {number} value
   */
  public set price(value: number) {
    this._price = value;
  }

  /**
   * Setter createdAt
   * @param {Date} value
   */
  public set createdAt(value: Date) {
    this._createdAt = value;
  }

  /**
   * Setter isVisible
   * @param {boolean} value
   */
  public set isVisible(value: boolean) {
    this._isVisible = value;
  }

  /**
   * Setter photos
   * @param string value
   */
  public set photos(value: string) {
    this._photos = value;
  }
}
