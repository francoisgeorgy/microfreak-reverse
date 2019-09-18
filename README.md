MicroFreak sysex reverse engineering
====================================

MIDI Manufacturer ID for Arturia is `0x00 0x20 0x6B`.
                                     
Device ID Request:                                     
------------------
                                     
    F0 <ID number> <Device ID> <Sub ID#1> <Sub ID#2> ... F7

ID Number: 
- 0x7D is reserved for non-commercial use and is not to be used on any product released to the public; 
- **0x7E (Non Real Time)** 0x7F (Real Time) are used for extensions to the MIDI specification, and are 
known as Universal System Exclusive ID numbers.

### Example:

Request:
    
    F0 7E 7F 06 01 F7

    F0  start
    7E  ID number 7E = non real-time
    7F  device ID 7F = all devices
    06  sub#1 06 = General System Information
    01  sub#2 01 = Device Identity Request

Answer:

    F0
    7E 7F 06 
    02                          sub#2: 02 = Device Identity Reply 
    00 20 6B                    Arturia ID 
    06 00 06 01 01 01 02 06
    F7

Preset number:
--------------

Exemple with preset 200:

In the sysex messages, the preset number is 0-indexed, so, the 200th preset is number 199.

The preset number is represented by two bytes. The first one is the bank, the second one the preset in the bank.
One bank contains 128 presets.

    bank number    = preset > 127 ? 1 : 0
    preset in bank = preset % 128

    199 > 127 --> 1  = 0x01
    199 % 128 --> 71 = 0x47

The 200th preset is therefore represent with `0x01 0x47` in the sysex messages.
    

Answer with data sent by MF:
----------------------------

    F0 00 20 6B 07 01 <seq#> <len> <msg type> <len# number of data bytes> F7

The **`<seq#>`** is a the sequence number that the sender has provided in its request. The MF simply echo back this
number in its answer. This allows to put the answers in the correct order. 

The byte following the MIDI ID, `0x07`, is probably the code representing the MicroFreak. 

    04 : MiniBrute
    06 : MatrixBrute 
    07 : MicroFreak


Preset name:
------------

Request:

    F0 00 20 6B 07 01 00 03 00 00 00 00 F7
    F0 00 20 6B 07 01 00 23 52 00 00 00 00 00 00 00 00 00 00 08 10 44 69 73 72 65 73 70 65 63 74 66 ...
                         ^^-number of data bytes       ^^-preset   ^^-start of name
                                                          number   
                                                       
    44 69 73 72 65 73 70 65 63 74 66 => D i s r e s p e c t
    
Answer:


Preset request:
---------------

How to read a preset (a patch).

1. Send a "start preset dump request" message
2. Send multiples "preset data request" messages until the answer indicates that all data have been sent.

### Start preset dump request:

This message must be sent once.

    F0 00 20 6B 07 01 <seq#> 01 19 <bank#> <preset#> 01 F7
                
### Preset data request:

This message must be sent multiple times, until the answer indicates that no more data are to follow.

    F0 00 20 6B 07 01 <seq#> 01 18 00 F7

Answer:

    F0 00 20 6B 07 01 <seq#> 20 16 00 23 56 43 4F 44 54 79 00 70 65 63 0C 00 40 46 00 50 61 72 61 6D 31 63 03 6E 3F 29 46 50 61 72 F7
                                ^^-not the last packet, continue to read, there are still data
                                
    F0 00 20 6B 07 01 <seq#> 20 17 00 23 56 43 4F 44 54 79 00 70 65 63 0C 00 40 46 00 50 61 72 61 6D 31 63 03 6E 3F 29 46 50 61 72 F7
                             ^^ ^^-this is the last packet, no more data to read                        
                             ||        
                             32 bytes of data
                                
The **`<seq#>`** is a sequence number that the sender has to increment with each message sent. It allows to put the answers 
in the correct order. It is possible to always send the same sequence number. The MF simply echo back in its answer the sequence 
number it receives.

The number `0x20` right after the `<seq#>` is probably the number of data bytes included in the message. 

Values in sysex
---------------

Four components:

1. MSB : high byte
2. LSB : low byte
3. msb : high bit of LSB
4. sign bit

These values define the following bits:

    MSB   01111111 00000000        
    LSB            01111111 
    msb            10000000
    sign  10000000 00000000
    
Formula for **positive values** (sign=0):

    raw_value = (MSB << 8) + (msb << 7) + LSB       

Formula for **negative values** (sign=1):

    raw_value = (~((MSB << 8) + (msb << 7) + LSB) & 0x7fff) + 1       
     
    
`<<` is shift-left operation. `<< 8` is same as `* 256`. `<< 7` is same as `* 128`.

`~` is inverse operation. `~0110` is `1001`.

`&` is masking operation. `1011 & 0111` is `0011`    
    
We do `& 0x7fff` because we work with 15 bits values, not 16.    
    
     
The raw value is mapped to 0.0 to 100.0 with:

    display_value = raw_value * 100 / 32768     
                                
If `sign=1` we must have a negative, then do:

    display_value = -display_value                                 
                                
To round the value to one decimal, use:

    display_value = Math.round(raw_value * 1000 / 32768) / 10;
                                
                                
                                
                                
                                
                                