import React, { useState, useEffect } from "react";

import InitContractsWeb from "../Init";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

const CreateAccount = () => {
	const [accountHolder, setAccountHolder] = useState("");
	const [accountLocation, setAccountLocation] = useState("");

	const [web3, account, contract] = InitContractsWeb();

	useEffect(() => {
		const getContractDetails = async () => { };
		if (
			typeof contract !== "undefined" &&
			typeof account !== "undefined" &&
			typeof web3 !== "undefined"
		) {
			console.log(contract);
			console.log(account);
			web3.eth.defaultAccount = account;
			getContractDetails();
		}
	}, [web3, account, contract]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(contract.methods);
		if (
			typeof contract !== "undefined" &&
			typeof account !== "undefined" &&
			typeof web3 !== "undefined"
		) {
			await contract.methods
				.createAccount(account, accountHolder, accountLocation)
				.send({
					from: account,
					to: contract.options.address,
					value: web3.utils.toWei("2", "ether"),
				})
				.then((res) => {
					console.log(res);
					window.location.href = "/";
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	if (!web3) {
		return <div>Loading Web3, accounts, and contract...</div>;
	}
	return (
		<div>

			<Container>
				<h3 className="display-1">Create New Account</h3>
				<Form onSubmit={handleSubmit} style={{ display: "block" }}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Account Holder</Form.Label>
						<Form.Control type="text" placeholder="Enter an account holder name" value={accountHolder}
							onChange={(e) => {
								setAccountHolder(e.target.value);
							}} />

						<Form.Text className="text-muted">
							By creating an account, you accept to pay a fee of 2Eth
						</Form.Text>
					</Form.Group>

					{/* <Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" />
				</Form.Group> */}
					<Form.Group className="mb-3" controlId="formBasicCheckbox">
						<Form.Check type="checkbox" label="Accept" />
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</Container>

		</div>
	);
};

export default CreateAccount;