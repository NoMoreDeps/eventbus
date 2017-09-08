/**
* The MIT License (MIT)
* Copyright (c) <2017> <Beewix Interactive>
* Author <François Skorzec>
*
* Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
* modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
* is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
* BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
* OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

export class EventBus {
  // Protected fields

  protected get _errors() {
    const $this = this;

    return {
      get eventNameBadFormat(): string {
        return `The event name is not in the correct format : 
Should be in '${$this._depthLevel}' part${$this._depthLevel > 1 ? "s" : ""} 
${$this._depthLevel > 1 ? "separated by '" + $this._separator + "'" : ""}`;
      }
    }
  }

  /**
   * @field {string} _separator
   */
  protected _separator: string;

  /**
   * @field {number} _depthLevel
   */
  protected _depthLevel: number;

  // Protected functions
  protected checkEventNameFormat(eventName: string = void 0): boolean {
    return eventName &&
      eventName.trim().length > 0 &&
      eventName.split(this._separator).length <= this._depthLevel;
  }

  /**
   * @constructor
   * @param {string} separator 
   * @param {number} depthLevel 
   */
  constructor(separator: string = ".", depthLevel: number = 3) {
    if (separator.trim() === "") {
      separator = ".";
    }

    if (depthLevel < 1) {
      depthLevel = 1;
    }

    this._separator = separator;
    this._depthLevel = depthLevel;
  }

  /**
   * Gets or sets a value indicating the separator character to use in the event name
   * @prop {string} separator
   */
  get separator(): string {
    return this._separator;
  }

  set separator(value: string) {
    if (value.trim() === "") {
      value = ".";
    }

    this._separator = value;
  }

  /**
   * Gets or sets a value indicating the depth of the event name
   */
  get depthLevel(): number {
    return this._depthLevel;
  }

  set depthLevel(value: number) {
    if (value < 1) {
      value = 1;
    }

    this._depthLevel = value;
  }

  /**
   * Subscribe on an event
   * @param {string} eventName 
   * @param {string} handler 
   */
  on(eventName: string, handler: Function): void {
    if (!this.checkEventNameFormat(eventName)) {
      throw Error(this._errors.eventNameBadFormat);
    }
  }

}

