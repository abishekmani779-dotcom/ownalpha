const { createPublicClient, http, parseEther } = require('viem');
const { bscTestnet } = require('viem/chains');
const fs = require('fs');

const { abi } = JSON.parse(fs.readFileSync('./src/abi/MovieFunding.json', 'utf8'));

const client = createPublicClient({
    chain: bscTestnet,
    transport: http()
});

async function main() {
    const address = '0x92f83c13de1b7f0de6ce2ee0511d735fb338ed05';

    try {
        const targetRaise = await client.readContract({ address, abi, functionName: 'targetRaise' });
        console.log('Target Raise:', targetRaise.toString());

        const tokenPrice = await client.readContract({ address, abi, functionName: 'tokenPrice' });
        console.log('Token Price:', tokenPrice.toString());

        const deadline = await client.readContract({ address, abi, functionName: 'deadline' });
        console.log('Deadline:', deadline.toString(), new Date(Number(deadline) * 1000).toLocaleString());

        const raised = await client.readContract({ address, abi, functionName: 'totalRaised' });
        console.log('Total Raised:', raised.toString());

        console.log('Simulating invest of 1 BNB...');
        await client.simulateContract({
            address,
            abi,
            functionName: 'invest',
            value: parseEther('1'),
            account: '0x0000000000000000000000000000000000000001' // dummy account
        });
        console.log('Simulation success');
    } catch (e) {
        console.error('Simulation Failed:');
        console.dir(e, { depth: null });
    }
}

main();
