/**
 * Comparator class for data items.
 * This class offers comparison functions such as quality, lessThan, greaterThan etc.
 */
export type comparatorFn = (a: any, b: any) => number;

export class Comparator {
  compare: comparatorFn

  constructor(fn?: comparatorFn) {
    this.compare = fn || Comparator.defaultComparator;
  }

  static defaultComparator (a: number | string, b: number | string) {
    if (a == b) return 0;

    return a < b ? -1 : 1;
  }

  equal = (a: any, b: any) => this.compare(a, b) === 0;

  lessThan = (a: any, b: any) => this.compare(a, b) < 0;

  greaterThan = (a: any, b: any) => this.compare(a, b) > 0;

  lessThanOrEqual = (a: any, b: any) => this.compare(a, b) < 0 || this.compare(a, b) === 0;

  greaterThanOrEqual = (a: any, b: any) => this.compare(a, b) > 0 || this.compare(a, b) === 0;
}