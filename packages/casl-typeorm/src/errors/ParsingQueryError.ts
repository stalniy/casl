export class ParsingQueryError extends Error {
  static invalidArgument(operatorName: string, value: unknown, expectValueType: string) {
    const valueType = `${typeof value}(${JSON.stringify(value, null, 2)})`;
    return new this(
      `"${operatorName}" expects to receive ${expectValueType} but instead got "${valueType}"`
    );
  }
}
