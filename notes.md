cyc env rise shape 0
    4,16 00
    4,19 00
    4,20 00
cyc env rise shape 100
    4,16 04
    4,19 7F
    4,20 7F    
cyc env fall shape 0
    5,24 00
    5,25 00
    5,26 00    
cyc env fall shape 100
    5,24 01
    5,25 7F
    5,26 7F    

arp swing max
    10,8 40
    10,15 7F
    10,17 7F
arp swing min
    10,8 00
    10,15 00
    10,17 00
    
arp on/off
    9,0 10
    9,5 7F
    9,6 7F

seq
    12,0 08
    12,4 7F
    12,5 7F
    
arp mod 1   17408
    9,16 00
    9,17 00
    9,18 00
arp mod 2   10922
    9,16 01
    9,17 2A
    9,18 2A
arp mod 3   21845
    9,16 01
    9,17 55
    9,18 55
arp mod 4   32767
    9,16 01
    9,17 7F
    9,18 7F

arp rate 30.0 bpm
    10,4 00
    10,5 00
arp rate max
    10,4 0C
    10,5 7B
arp 135bpm
    10,0 08
    10,4 06
    10,5 3D
arp 30.1bpm
    10.4 0f    



assign1 f cutoff
    21,4 01 cutoff
    21,5 01
assign1 f reso
    21,4 02 reso
    21,5 01    

asign1 env attack
    21,4 01
    21,5 06
assign1 env decay
    21,4 02
    21,5 06
assign1 env sustain
    21,4 03
    21,5 06

assign1 cyc rise
    21,4 01
    21,5 02
assign1 cycenv amount
    21,4 06
    21,5 02
assign1 cycenv fall
    21,4 03
    21,5 02
    

-- new:
    
assign1 mov cycenv-pitch
    21,4 00     control     00=cycenv
    21,5 0A     group
assign1 mov env-pitch   
    21,4 01                 01=env
    21,5 0A
assign1 mov lfo-pitch
    21,4 02
    21,5 0A
assign1 mov press-pitch
    21,4 03
    21,5 0A
assign1 mov key/arp-pitch
    21,4 04
    21,5 0A

assign1 mod cycenv-assign1
    21,4 00
    21,5 0E
assign1 mod cycenv-assign2
    21,4 00
    21,5 0F
assign1 mod cycenv-assign3
    21,4 00
    21,5 10
    
assign1 mov cycenv-wave
    21,4 00
    21,5 0B
assign1 mov env-wave
    21,4 01
    21,5 0B
assign1 mov lfo-wave
    21,4 02
    21,5 0B
assign1 mov press-wave
    21,4 03
    21,5 0B
assign1 mov key/arp-wave
    21,4 04
    21,5 0B

assign1 mov cycenv-timbre
    21,4 00
    21,5 0C
assign1 mov env-timbre
    21,4 01
    21,5 0C
assign1 mov lfo-timbre
    21,4 02
    21,5 0C
assign1 mov press-timbre
    21,4 03
    21,5 0C
assign1 mov key/arp-timbre
    21,4 04
    21,5 0C

assign1 mov cycenv-cutoff
    21,4 00
    21,5 0D
assign1 mov env-cutoff
    21,4 01
    21,5 0D
assign1 mov lfo-cutoff
    21,4 02
    21,5 0D
assign1 mov press-cutoff
    21,4 03
    21,5 0D
assign1 mov key/arp-cutoff
    21,4 04
    21,5 0D
    
    
assign2 mov cycenv-pitch
    21,18 00
    21,19 0A
assign2 mov env-pitch
    21,18 01
    21,19 0A
assign2 mov lfo-pitch
    21,18 02
    21,19 0A
assign2 mov press-pitch
    21,18 03
    21,19 0A
assign2 mov key/arp-pitch
    21,18 04
    21,19 0A
    
assign3 mod key/arp-pitch
    21,31 04
    22,1 0A




assign2 cyc rise
    21,18 01            1 = cycenv rise
assign2 cycenv amount
    21,18 06            6 = cycenv amount

assign3 cyc rise
    21,31 01
assign3 cycenv amount
    21,31 06            6 = cycenv amount

assign1 type
    21,4 00
    21,5 00
assign1 shape    
    21,4 05
    21,5 00
assign1 timbre    
    21,4 03
    21,5 00   
        
assign1 lfo rate    
    21,4 01
    21,5 05   
    
assign1 glide
    21,4 00
    21,5 03    
    
assign1 arp rate
    21,4 03
    21,5 04    
    
osc type
    0,14 15     superwave
    0,14 2A     harmo
    0,14 35     karplusstrong
    0,14 40     v.analog
    0,14 4a     waveshaper
    0,14 55     two-op fm
    0,14 5f     formant
    0,14 6a     chords
    0,14 75     speech
    0,14 7f     modal
    
osc type
    0,8 00 (10)     x
    0,13 55 (2B)    x
    0,14 15 (0A)    maybe
    0,24 00 (03)    x
    0,25 03 (6E)    x
    0,26 00 (44)    x
    0,27 00 (20)    x
    1,0 30 (10)     x
    1,6 7F (00)     x
    1,7 3F (00)     x
    1,16 06 (02)    x
    1,19 7F (00)    x
    1,20 3F (00)    x
osc type
    0,13 00 (55)
    0,14 20 (15)
    0,25 0F (03)
    1,0 10 (30)
    1,6 00 (7F)
    1,7 00 (3F)
    1,16 02 (06)
    1,19 00 (7F)
    1,20 00 (3F)
osc type
    0,8 10 (00)
    0,13 2A (00)
    0,14 2A (20)
    0,24 01 (00)
    0,25 6E (0F)
    1,16 06 (02)
    1,19 7F (00)
    1,20 1F (00)        
osc type
    0,8 00 (10)
    0,13 55 (2A)
    0,14 35 (2A)
    0,26 66 (00)
    0,27 26 (00)
    1,19 4C (7F)
    1,20 4C (1F)
osc type
    0,13 00 (55)
    0,14 40 (35)
    0,24 03 (01)
    0,26 3F (66)
    0,27 3F (26)
    1,0 30 (10)
    1,6 3F (00)
    1,7 3F (00)
    1,16 02 (06)
    1,19 00 (4C)
    1,20 00 (4C)
    
    
osc wave 100
    0,24 03
    0,26 7F
    0,27 7F
osc wave 60
    0,24 03
    0,26 40
    0,27 4C
osc timbre 51
    1,6 20
    1,7 01
osc timbre 0
    1,0 10
    1,6 00
    1,7 00
osc timbre 75
    1,0 30
    1,6 60
    1,7 46
        
filter LPF  
    2,16 00
    2,17 00
    2,18 00
filter BPF
    2,16 00
    2,17 00
    2,18 40
filter HPF
    2,16 01
    2,17 7F
    2,18 7F
            
    
        
paraphonic
    16,16 20    on
    16,22 7F
    16,23 7F
    16,16 00    off
    16,22 00
    16,23 00    

lfo tri
    12,16 10
    12,21 19
    12,22 19
lfo tri
    12,16 00
    12,21 33
    12,22 33
lfo square
    12,16 10
    12,21 4C
    12,22 4C
lfo snh
    12,16 00
    12,21 66
    12,22 66
lfo snhf
    12,16 10
    12,21 7F
    12,22 7F

lfo sync
    13,16 04
    13,19 7F
    13,20 7F
lfo free
    13,16 00
    13,19 00
    13,20 00    
    
oct +3
    7,0 04
    7,3 7F
    7,4 7F    
oct +2
    7,0 04
    7,3 2A
    7,4 6A    
oct +1
    7,0 00
    7,3 55
    7,4 55
oct -1
    7,0 04
    7,3 2A
    7,4 2A
oct -2
    7,0 00
    7,3 55
    7,4 15
oct -3
    7,0 00
    7,3 00
    7,4 00



env pitch   100             1 7f 7f
    
    D[22][16] (00) 40       msb
    D[22][23] (00) 7F
    D[22][25] (00) 7F

env pitch 60                1 40 4c

    D[22][16] (00) 40       msb
    D[22][23] (00) 40
    D[22][25] (00) 4C

env pitch 12.6      
    
    D[22][16] (00) 00       msb
    D[22][23] (00) 20
    D[22][25] (00) 10

env pitch -0.1              3 60 7f

    D[22][16] (00) 40       msb
    D[22][23] (00) 60
    D[22][24] (00) 01       sign
    D[22][25] (00) 7F
    
env pitch -100              2 1 0

    D[22][23] (00) 01       sign
    D[22][24] (00) 01





cycenv pitch 100
    
    D[22][8]  20
    D[22][14] 7F
    D[22][15] 7F
    
cycenv pitch -100

    D[22][8]  40
    D[22][14] 01
    D[22][15] 00

cycenv wave 100

    D[24][0] 02
    D[24][2] 7F
    D[24][3] 7F
    
cycenv wave -100

    D[24][0] 04
    D[24][2] 01
    D[24][3] 00




-100.0 --> +100.0

-1000 -> +1000

2000 = 0x7D0         11  bits

two complemet
 
-2000 12 bits -->      10000 0110000
-2000 14 bits -->    1110000 0110000 
-2000 16 bits --> 11 1110000 0110000  03  
-2 14 bits           1111111 1111110
-2 16 bits        11 1111111 1111110  03 7f 7e

 100 01 7f 7f
  50 00 00 40
-100 02 01 00 

             8  14 15       16 18 19        16 23 24 25
     100     20 7f 7f       02 7f 7f        40 7f    7f
      50     00 00 40                       00 00 00 40    
       0     00 00 00       00 00 00        00 00 00 00
     -50     40 00 00                       00 00 01 00
    -100     40 01 00       04 01 00        00 01 01 00
    0-->10                                  40 40 00 0C

lfo pitch

-100.0  02 01 00
-99.9   02 21 00
-99.8   02 41 00
-99.7   02 61 00
-99.0   02 41 01
-98.9   02 61 01
-90.0   03 41 0c
-80.0   03 21 19
-70.0   02 61 26
-60.0   02 41 33
-50.0   02 01 40
-40.0   03 41 4c
-30.0   03 21 59
-20.0   02 61 66
-10.1   02 21 73
-10.0   02 41 73
 -9.9   02 61 73
 -0.2   03 40 7f
 -0.1   03 60 7f    
  0     00 00 00
  0.1   00 20 00 
  0.2   00 40 00 
  0.3   00 60 00 
  0.4   01 00 00
  0.5   01 20 00
  0.6   01 40 00    
  0.7   01 60 00    
  0.8   00 00 01
  0.9   00 20 01
  1.0   00 40 01
  1.1   00 60 01
  2.0   01 00 02
  3.0   01 60 03
  8.0   00 3f 0a
  8.1   00 5f 0a
  9.0   00 7f 0b
  9.1   01 1f 0b
  9.9   01 1f 0c
 10.0   01 40 0c
 12.6   00 1f 10
 12.7   00 3f 10
 12.8   00 5f 10
 20.0   01 20 19
 20.1   01 3f 19
 20.2   01 5f 19
 25.4   00 7f 20
 25.5   01 1f 20
 25.6   01 3f 20
 25.7   01 5f 20
 30.0   01 60 26
 40.0   01 40 33
 50.0   00 00 40
 50.1   00 20 40
 51.1   00 5f 41
 51.2   00 7f 41
 51.3   01 1f 41
 60.0   01 40 4c
 70.0   01 20 59
 70.1   01 40 59
 76.7   00 1f 62
 76.8   00 3f 62
 76.9   00 5f 62
 80.0   00 60 66
 89.9   00 20 73
 90.0   00 40 73
 90.1   00 60 73
 99.0   01 3f 7e
 99.1   01 5f 7e
 99.8   01 3f 7f
 99.9   01 5f 7f
100.0   01 7f 7f




lfo pitch 0->100

    D[23][0] 00 01    01 7f 7f
    D[23][1] 00 7F
    D[23][2] 00 7F

lfo pitch 100->-100
    
    D[23][0] 01 02    02 01 00 
    D[23][1] 7F 01
    D[23][2] 7F 00

lfo pitch -100 -> -10

    D[23][1] 01 41
    D[23][2] 00 73

lfo pitch -10 -> +10
    
    D[23][0] 02 01
    D[23][2] 73 0C

lfo pitch +10 -> +10.1

    D[23][1] 41 61

lfo pitch +10.1 -> +10.2
    
    D[23][0] 01 00      00 01 0D
    D[23][1] 61 01
    D[23][2] 0C 0D

lfo pitch +10.2 -> +10.3

    D[23][1] 01 21      00 21 0D

lfo pitch +10.3 -> +10.4

    D[23][1] 21 41      00 41 0D

lfo pitch +10.4 -> +10.5

    D[23][1] 41 61      00 61 0D

lfo pitch 49.9
    
    D[23][0] (00) 01        01 60 3f
    D[23][1] (20) 60
    D[23][2] (00) 3F

50.0
    
    D[23][0] (01) 00        00 00 40
    D[23][1] (60) 00
    D[23][2] (3F) 40

50.1
    
    D[23][1] (00) 20        00 20 00

lfo pitch 0
    
    D[23][1] 61 00          00 00 
    D[23][2] 0D 00

lfo pitch 0.1

    D[23][1] 40 20          20 00

lfo pitch 0.2

    D[23][1] 20 40          40 00

filter amt 100

    D[27][16] 00 02
    D[27][18] 00 7F
    D[27][19] 00 7F

filter amt -100
    
    D[27][16] 02 04
    D[27][18] 7F 01
    D[27][19] 7F 00

filter amt 0

    D[27][16] 04 00
    D[27][18] 01 00
    
cycenv pitch 0    
    
    D[22][8] 40 00
    D[22][14] 01 00
    
cycenv pitch 50    
    
    D[22][15] 00 40    
    
cyce env pitch -50

    D[22][8] 00 40    

cycenv pitch 0

    D[22][8] 40 00
    D[22][15] 40 00
    
cycenv wave 100

    D[24][0] 00 02
    D[24][2] 00 7F
    D[24][3] 00 7F
    
cycenv wave -100
    
    D[24][0] 02 04
    D[24][2] 7F 01
    D[24][3] 7F 00        
        
cycenv wave 0
    
    D[24][0] 04 00
    D[24][2] 01 00

env pitch 100
    
    D[22][16] 00 40
    D[22][23] 00 7F
    D[22][25] 00 7F
    
env pitch -100
    
    D[22][16] 40 00
    D[22][23] 7F 01
    D[22][24] 00 01
    D[22][25] 7F 00
    
env pitch 0
    
    D[22][23] 01 00
    D[22][24] 01 00

env pitch 50

    D[22][25] 00 40
    
env pitch -50

    D[22][24] 00 01
    
env pitch 0
    
    D[22][24] 01 00
    D[22][25] 40 00
    
env pitch 0-->10
    
    D[22][16] 00 40
    D[22][23] 00 40
    D[22][25] 00 0C   
    
filter BPF

    D[2][18] 00 40        
        
filter HPF

    D[2][16] 00 01
    D[2][17] 00 7F
    D[2][18] 40 7F

filter LPF
       
    D[2][16] 01 00
    D[2][17] 7F 00
    D[2][18] 7F 00





    