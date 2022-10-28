import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import ListGroup from 'react-bootstrap/ListGroup';
import Card from "react-bootstrap/Card";

import InitContractsWeb from "../Init";

const ShowAccounts = () => {
	const [loading, setLoading] = useState(true);

	// eslint-disable-next-line
	const [bankAccounts, setBankAccounts] = useState([]);

	const [web3, account, contract] = InitContractsWeb();

	useEffect(() => {
		const getContractDetails = async () => {
			const accountNumber = await contract.methods.accountNumber().call();

			for (let i = 1; i <= accountNumber; i++) {
				await contract.methods
					.accounts(i)
					.call()
					.then((res) => {
						var bankAcc = bankAccounts;
						if (res.creator === account) {
							bankAcc.push({
								name: res.name,
								location: res.location,
								accountNumber: res.serial,
								balance: res.balance,
							});
						}
						setBankAccounts(bankAcc);
						console.log(bankAccounts);
					})
					.catch((err) => {
						console.log(err);
					});
			}

			setLoading(false);
		};
		if (
			typeof contract !== "undefined" &&
			typeof account !== "undefined" &&
			typeof web3 !== "undefined"
		) {
			getContractDetails();
		}
		// eslint-disable-next-line
	}, [web3, account, contract]);

	if (!web3) {
		return <div>Loading Web3, accounts, and contract...</div>;
	}
	return (
		<Container className="p-5">
			<Card>
				<Card.Body>

					<Card.Title className="p-5">Active Accounts</Card.Title>
					<ListGroup className="p-5 text-center">
						{!loading
							? bankAccounts.map((account, index) => {
								return (
									<ListGroup.Item >
										<p className="lead">Account Name: {account.name}</p>
										<div>	<p className="text-muted">Account ID:{account.accountNumber}</p><Button
											variant="outline-info"
											onClick={() =>
												(window.location = `/accounts/${account.accountNumber}`)
											}
										>
											Account Details
										</Button></div>


									</ListGroup.Item>
								);
							})
							: null}
					</ListGroup>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default ShowAccounts;