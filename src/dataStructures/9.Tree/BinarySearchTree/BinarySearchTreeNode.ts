import { Comparator, comparatorFn } from '../../../utils/Comparator';
import { BinaryTreeNode } from '../BinaryTreeNode';

export class BinarySearchTreeNode extends BinaryTreeNode {
  nodeValueComparator: Comparator;

  constructor(value?: any, comparatorFunction?: comparatorFn) {
    super(value);
    this.nodeValueComparator = new Comparator(comparatorFunction);
  }

  insert(value: any) {
    if (this.nodeValueComparator.equal(value, null)) {
      this.value = value;
      return this;
    }

    if (this.nodeValueComparator.lessThan(value, this.value)) {
      if (this.left) {
        return this.left.insert(value);
      }
    }
  }

  // find(value: any) {
  //   //
  // }

  // contains(value: any) {
  //   //
  // }

  // remove(value: any) {
  //   //
  // }

  findMin(): BinarySearchTreeNode {
    if (!this.left) {
      return this;
    } else {
      return this.left.findMin();
    }
  }
}
