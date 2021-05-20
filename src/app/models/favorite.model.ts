import { Property } from './property.model';

export class Favorite {
  private _id: number;
  private _propertyId: number;
  private _property?: Property;

  constructor(
    propertyId: number,
    property: Property,
  ) {
    this._propertyId = propertyId;
    this._property = property;
  }

  /**
   * Getter id
   * @return {number}
   */
  public get id(): number {
    return this._id;
  }

  /**
   * Getter propertyId
   * @return {number}
   */
  public get propertyId(): number {
    return this._propertyId;
  }

  /**
   * Getter property
   * @return {Property}
   */
  public get property(): Property {
    return this._property;
  }

  /**
   * Setter id
   * @param {number} value
   */
  public set id(value: number) {
    this._id = value;
  }

  /**
   * Setter propertyId
   * @param {number} value
   */
  public set propertyId(value: number) {
    this._propertyId = value;
  }

  /**
   * Setter property
   * @param {Property} value
   */
  public set property(value: Property) {
    this._property = value;
  }

}
