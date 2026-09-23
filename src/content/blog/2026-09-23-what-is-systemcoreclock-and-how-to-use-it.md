---
title: What is SystemCoreClock and how to use it
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
### By being used in CMSIS-Core(Cortex-M), SyetemCoreClock is a  **global variable**  that contains the **system frequency**, the unit is Hz (ie. 1/s)

### What is CMSIS-Core
CMSIS-Core is a foundational component of the **Cortex Microcontroller Software Interface Standard (CMSIS)** that implements a standardized run-time system and hardware abstraction layer for Arm Cortex-M and selected Cortex-A processors.

### What is Cortex-M
Cortex-M is a family of  **32-bit RISC ARM processor cores**  optimized for low cost, low ower abd deterministic realtime control in microcontrollers.

### What is SysTick
As a part of Armv8-M architecture, the architecture provides an in-built **system timer** called as SysTick. A SysTick **provides** a simple, 24-bit decrementing, wrap-on-zero **counter**.

### Registers and Functions about SystemCoreClock from CMSIS-Core

- SysTick->CTRL
   - Writes back configuration bits to select the clock source (processor clock or external reference), **enable** the tick interrupt (TICKINT), and turn the timer back on (ENABLE)
- SysTick->LOAD
   - Sets the 24-bit wrap-around value. Because the timer counts down to 0 (inclusive), the actual number of clock cycles per interval is LOAD + 1. To get N cycles, set LOAD to N - 1.
- SysTick->VAL
   - Current value for the countdown, tnce it counts down to 0, the next clock edge reloads it with the value specified in SysTick->LOAD
- void SystemCoreClockUpdate (void) 
  - Function to update the variable SystemCoreClock.
- void SystemInit (void)
   - Function to Initialize the system.

### APIs by Luminary MicroR (2008c)

- SysTickPeriodSet(SysCtlClockGet() / 1000);
   - set number of clock cycles between "ticks" of the SysTick timer
- SysTickIntRegister(&countDown);
   - register the ISR by providing the function pointer 
- SysTickEnable();
   - start the clock, enabling ticks to occur
- SysTickIntEnable();
   - enable interrupts

- - -

Think about this question: Create a C program for the ARM CortexTM -
M3 to use the SysTick timer to invoke a system-clock ISR with a jiffy interval of 10 ms that records the time since system start in a 32-bit int. How long can this program run before your clock overflows?
]
