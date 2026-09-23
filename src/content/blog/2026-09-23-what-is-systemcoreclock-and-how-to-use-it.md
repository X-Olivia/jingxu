---
title: What is `SystemCoreClock` and How Does It Relate to SysTick?
seoTitle: ""
description: From a HW of 249A.
pubDate: 2026-09-23
updatedDate: ""
tags:
  - Study Notes
  - EnbeddedSystem
  - ARM CortexTM M3
  - C program
draft: false
---
While reading an embedded systems example, I came across several terms :

* `SystemCoreClock`
* CMSIS-Core
* Cortex-M
* SysTick
* `SysTick->LOAD`
* `SysTickPeriodSet()`

A useful way to see the relationship is:

![](/uploads/level.png)



- - -

## What is `SystemCoreClock`?

In CMSIS-Core for Cortex-M processors, `SystemCoreClock` is a **global variable** that contains the **system frequency**, measured in Hz (`1/s`).

Conceptually, it may contain a value such as:

```c
SystemCoreClock = 16000000;
```

which means that the current system frequency is 16 MHz.

CMSIS standardizes this variable so that software written for different Cortex-M based microcontrollers can use a common interface instead of every manufacturer inventing a different name.

- - -

## What is CMSIS-Core?

CMSIS stands for:

**Cortex Microcontroller Software Interface Standard**

CMSIS-Core is the part of CMSIS that **provides a standardized software interface** for Arm Cortex-M processors.

It defines common names, data structures, functions, and interfaces that software can use to interact with Cortex-M processor features.

For example, CMSIS provides interfaces such as:

```c
SystemCoreClock
SystemCoreClockUpdate()

SysTick->CTRL
SysTick->LOAD
SysTick->VAL
```

- - -

## What is Cortex-M?

Cortex-M is a family of **32-bit RISC Arm processor cores** designed mainly for microcontrollers and embedded systems.

They are optimized for properties such as:

* low cost
* low power
* predictable interrupt behavior
* real-time control

For example, the Cortex-M3 processor used in this exercise is based on the Armv7-M architecture.

Inside a Cortex-M processor are several hardware components.

One of them is the **SysTick timer**.

- - -

## What is SysTick?

SysTick is a **hardware timer built into the Cortex-M processor**.

It contains a **24-bit decrementing counter**.

The basic idea is:

```text
LOAD value
    ↓
counter decreases
    ↓
...
3
2
1
0
    ↓
reload
    ↓
start counting again
```

If the SysTick interrupt is enabled, reaching zero can also cause the processor to execute an interrupt service routine (ISR).

So SysTick can be used to generate regular events such as:

```text
every 1 ms
every 10 ms
every 100 ms
```

This makes it useful for implementing a system clock.

- - -

## SysTick Registers

The SysTick hardware contains several registers.

CMSIS gives us a convenient C interface to access these registers:

```c
SysTick->CTRL
SysTick->LOAD
SysTick->VAL
```

These expressions are software interfaces, but they correspond to actual registers in the SysTick hardware.

### `SysTick->CTRL`

`CTRL` is the **control register**.

It controls how SysTick operates.

Among other things, it can:

* enable or disable the SysTick counter
* enable the SysTick interrupt
* select the clock source

Conceptually:

```text
CTRL
 ├── ENABLE
 ├── TICKINT
 └── CLKSOURCE
```

- - -

### `SysTick->LOAD`

`LOAD` stores the **reload value** for the SysTick counter.

The counter is 24 bits wide.

If:

```c
SysTick->LOAD = N - 1;
```

then the counter counts for approximately `N` clock cycles.

This is because the counter includes zero when counting down.

For example:

```text
LOAD = 4

4
3
2
1
0
```

This corresponds to five counter states.

- - -

### `SysTick->VAL`

`VAL` contains the **current value of the SysTick counter**.

For example, if:

```text
LOAD = 999
```

then during operation `VAL` may look like:

```text
999
998
997
...
2
1
0
```

After reaching zero, the counter reloads and begins another interval.

- - -

## `SystemCoreClock` and SysTick Are Different Things

This distinction was initially confusing to me.

`SystemCoreClock` and SysTick are related, but they are not the same thing.

```text
SystemCoreClock
    =
software variable describing the system frequency


SysTick
    =
hardware timer that uses a clock to count
```

For example, if:

```c
SystemCoreClock = 16000000;
```

the processor is operating with a system frequency of 16 MHz.

SysTick can then use that clock frequency to determine how many processor clock cycles correspond to a desired time interval.

So the relationship is approximately:

```text
System clock frequency
        ↓
SystemCoreClock records it
        ↓
SysTick uses clock cycles
        ↓
LOAD determines how many cycles form one interval
```

- - -

## CMSIS System Functions

CMSIS also defines functions related to the system clock configuration.

### `SystemCoreClockUpdate()`

```c
void SystemCoreClockUpdate(void);
```

This function updates the value stored in:

```c
SystemCoreClock
```

so that the software variable reflects the current clock configuration.

- - -

### `SystemInit()`

```c
void SystemInit(void);
```

This function performs low-level system initialization.

It is normally called during startup before the main application begins.

- - -

## Vendor Library APIs

The textbook also uses functions such as:

```c
SysTickPeriodSet();
SysTickIntRegister();
SysTickEnable();
SysTickIntEnable();
```

These are not the same type of interface as:

```c
SysTick->LOAD
SysTick->CTRL
```

They are higher-level library functions provided by the microcontroller vendor's software library.

For example:

```c
SysTickPeriodSet(...);
```

ultimately configures the SysTick hardware.

Conceptually:

```text
SysTickPeriodSet(...)
        ↓
library implementation
        ↓
write a SysTick register
        ↓
SysTick hardware changes behavior
```

Therefore, there may be multiple software interfaces for controlling the **same hardware**.

For example:

```text
                 SysTick hardware
                       ↑
             ┌─────────┴─────────┐
             │                   │
        CMSIS interface      Vendor library
             │                   │
      SysTick->LOAD       SysTickPeriodSet()
```

This was the part I initially found confusing: both appear as C code, but they belong to different software abstraction layers.

- - -

## APIs Used in the Textbook

### `SysTickPeriodSet()`

```c
SysTickPeriodSet(SysCtlClockGet() / 1000);
```

Sets the number of clock cycles in one SysTick period.

`SysCtlClockGet()` obtains the current system clock frequency, and the result is used to calculate the desired SysTick interval.

- - -

### `SysTickIntRegister()`

```c
SysTickIntRegister(&countDown);
```

Registers the interrupt service routine by providing a function pointer.

For example:

```c
countDown
```

is the function that should execute when the SysTick interrupt occurs.

- - -

### `SysTickEnable()`

```c
SysTickEnable();
```

Enables the SysTick counter so that it begins counting.

- - -

### `SysTickIntEnable()`

```c
SysTickIntEnable();
```

Enables the SysTick interrupt.

This is different from enabling the timer itself:

```text
SysTickEnable()
    → counter starts running

SysTickIntEnable()
    → reaching zero is allowed to generate an interrupt
```

- - -

## Putting Everything Together

The complete picture is:

```text
C program
│
├── SystemCoreClock
│      software variable containing system frequency
│
├── Vendor library
│      SysTickPeriodSet()
│      SysTickEnable()
│      SysTickIntEnable()
│
↓
CMSIS / register-level interface
│
│      SysTick->CTRL
│      SysTick->LOAD
│      SysTick->VAL
│
↓
Cortex-M processor
│
└── SysTick hardware
       ├── control register
       ├── reload register
       └── 24-bit counter
```

The important distinction is that **SysTick is hardware**, while expressions such as:

```c
SysTick->LOAD
```

and functions such as:

```c
SysTickPeriodSet()
```

are software interfaces used to control that hardware.

- - -

## A Question to Think About

> Create a C program for the ARM Cortex-M3 to use the SysTick timer to invoke a system-clock ISR with a jiffy interval of 10 ms that records the time since system start in a 32-bit integer. How long can this program run before the clock overflows?

This question connects all of the concepts above:

```text
system frequency
      ↓
SysTick period
      ↓
SysTick counter
      ↓
interrupt
      ↓
ISR
      ↓
software clock
```

I will continue this part after comparing my implementation with the reference solution.
