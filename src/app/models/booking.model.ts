import { Property } from './property.model';

export class Booking {
  // private _id: number;
  private _startDate: Date;
  private _endDate: Date;
  private _price: number;
  private _peoples: number;
  // private _propertyId: number;
  // private _property: Property;

  constructor(
    startDate: Date,
    endDate: Date,
    price: number,
    peoples: number,
    // propertyId: number,
    // property: Property,
  ) {
    this._startDate = startDate;
    this._endDate = endDate;
    this._price = price;
    this._peoples = peoples;
    // this._propertyId = propertyId;
    // this._property = property;
  }

  // /**
  //  * Getter id
  //  * @return {number}
  //  */
  // public get id(): number {
  //   return this._id;
  // }

  /**
   * Getter startDate
   * @return {Date}
   */
  public get startDate(): Date {
    return this._startDate;
  }

  /**
   * Getter endDate
   * @return {Date}
   */
  public get endDate(): Date {
    return this._endDate;
  }

  /**
   * Getter price
   * @return {number}
   */
  public get price(): number {
    return this._price;
  }

  /**
   * Getter peoples
   * @return {number}
   */
  public get peoples(): number {
    return this._peoples;
  }

  /**
   * Getter propertyId
   * @return {number}
   */
  // public get propertyId(): number {
  //   return this._propertyId;
  // }

  // /**
  //  * Getter property
  //  * @return {Property}
  //  */
  // public get property(): Property {
  //   return this._property;
  // }

  // /**
  //  * Setter id
  //  * @param {number} value
  //  */
  // public set id(value: number) {
  //   this._id = value;
  // }

  /**
   * Setter startDate
   * @param {Date} value
   */
  public set startDate(value: Date) {
    this._startDate = value;
  }

  /**
   * Setter endDate
   * @param {Date} value
   */
  public set endDate(value: Date) {
    this._endDate = value;
  }

  /**
   * Setter price
   * @param {number} value
   */
  public set price(value: number) {
    this._price = value;
  }

  /**
   * Setter peoples
   * @param {number} value
   */
  public set peoples(value: number) {
    this._peoples = value;
  }

  /**
   * Setter propertyId
   * @param {number} value
   */
  // public set propertyId(value: number) {
  //   this._propertyId = value;
  // }

  // /**
  //  * Setter property
  //  * @param {Property} value
  //  */
  // public set property(value: Property) {
  //   this._property = value;
  // }

}
