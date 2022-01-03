# ARM Condition Flags

Calculate the condition flags from simple arithmetic operations.

## About the flags

Most ARM and Thumb data processing instructions only update the condition flags if you append an S suffix to the instruction. These instructions can update all or a subset of the flags.

The instruction also determines the flags that get updated. Some instructions update all flags, and some instructions only update a subset of the flags. If a flag is not updated, the original value is preserved. The description of each ARM and Thumb instruction includes the effect it has on the flags.

Not
Most instructions update the condition flags only if the S suffix is specified. The instructions CMP, CMN, TEQ, and TST always update the flags.

The condition flags are held in the APSR. They are set or cleared as follows:

- N
  - Set to 1 when the result of the operation is negative, cleared to 0 otherwise.
- Z
  - Set to 1 when the result of the operation is zero, cleared to 0 otherwise.
- C
  - Set to 1 when the operation results in a carry, or when a subtraction results in no borrow, cleared to 0 otherwise.
- V
  - Set to 1 when the operation causes overflow, cleared to 0 otherwise.

C is set in one of the following ways:

- For an addition, including the comparison instruction CMN, C is set to 1 if the addition produced a carry (that is, an unsigned overflow), and to 0 otherwise.
- For a subtraction, including the comparison instruction CMP, C is set to 0 if the subtraction produced a borrow (that is, an unsigned underflow), and to 1 otherwise.
- For non-addition/subtractions that incorporate a shift operation, C is set to the last bit shifted out of the value by the shifter.
- For other non-addition/subtractions, C is normally left unchanged, but see the individual instruction descriptions for any special cases.

Overflow occurs if the result of a signed add, subtract, or compare is greater than or equal to 2^31, or less than –2^31.