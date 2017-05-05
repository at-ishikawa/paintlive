class ArrayUtils {
  static isEmpty(array) {
    return array.length <= 0;
  }

  static last(array) {
    return array[array.length - 1];
  }
}

export default ArrayUtils;
