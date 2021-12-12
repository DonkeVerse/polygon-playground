# polygon-playground

0.1 npm install to get dependencies
0.2 create .env using env.example as ref

1. Using POS/Plasma Client for ERC20 trasnfer L1 <-> L2 ->  Run the scripts inside plasma and pos directories :
```bash
node <script>.js
```
Verify the results in wallet (for more detatils-> goerli & mumbai explorers)

2. Arbitrary state transfer L1 <-> L2 using Fx Tunnel ->  Run the scripts inside state-transfer/scripts :
```bash
npx hardhat run <script>.js --network <goerli/mumbai>
```

3. ERC20 Tunnels -> TODO
