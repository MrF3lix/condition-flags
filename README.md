# ARM Condition Flags

[![GitHub package.json version](https://img.shields.io/github/package-json/v/MrF3lix/condition-flags)](https://github.com/MrF3lix/condition-flags)
[![GitHub](https://img.shields.io/github/license/MrF3lix/condition-flags)]([.](https://raw.githubusercontent.com/MrF3lix/condition-flags/main/license.txt))

![Logo](https://raw.githubusercontent.com/MrF3lix/condition-flags/main/img/icon--small.png)

Calculate the condition flags from simple arithmetic operations.

## About the flags

Most instructions update the condition flags only if the S suffix is specified. The instructions `CMP`, `CMN`, `TEQ`, and `TST` always update the flags.

The condition flags are held in the **APSR**. They are set or cleared as follows:

- **N**: Set to 1 when the result of the operation is negative, cleared to 0 otherwise.
- **Z**: Set to 1 when the result of the operation is zero, cleared to 0 otherwise.
- **C**: Set to 1 when the operation results in a carry, or when a subtraction results in no borrow, cleared to 0 otherwise.
- **V**: Set to 1 when the operation causes overflow, cleared to 0 otherwise.

**C** can also be set in the following ways:

- For non-addition/subtractions that incorporate a shift operation, **C** is set to the last bit shifted out of the value by the shifter.

Overflow occurs if the result of a signed add, subtract, or compare is greater than or equal to 2^31, or less than –2^31.
