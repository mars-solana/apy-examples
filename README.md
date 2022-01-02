# tulip-apy-example

The `index.ts` file runs the apy calculation on the tulip USDC reserve `FTkSmGsJ3ZqDSHdcnY7ejN1pWV3Ej7i88MYpZyyaqgGt`. It uses the `tulip.ts` file to compute the USDC 
utilization ratio + apy, using a step function to derive the interest from utiliaztion -> APR. See here: https://tulip-protocol.gitbook.io/tulip-protocol/lending/apr-and-utilization

I then take that utilization and apply the function here: https://tulip-protocol.gitbook.io/tulip-protocol/useful/equations

The output is shown in the `output-apy.png` file, but I am getting the below:

```
Utilization Ratio:  0.93808404212290752427
APY:  8661
```

Any help would be appreciated :)
