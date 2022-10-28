pragma solidity >=0.6.0 <0.9.0;

contract Bank {
    uint256 public accountNumber = 0;
    uint256 public bankBalance = 0;

    struct Account {
        uint256 serial;
        uint256 createdAt;
        string name;
        string location;
        address creator;
        uint256 balance;
        bool doesExist;
    }

    constructor() {
        accounts[0] = Account(
            0,
            block.timestamp,
            "Ethereal",
            "NIT Durgapur",
            address(this),
            0,
            true
        );
    }

    mapping(uint256 => Account) public accounts;

    event AccountCreated(
        uint256 _accountNumber,
        bytes32 _name,
        bytes32 _location,
        uint256 _createdAt,
        uint256 _balance
    );

    function createAccount(
        address payable _creator,
        string memory _name,
        string memory _location
    ) public payable {
        if (_creator.balance >= 3) {
            accountNumber++;
            accounts[accountNumber] = Account(
                accountNumber,
                block.timestamp,
                _name,
                _location,
                _creator,
                2,
                true
            );
            bankBalance += 2;
        } else {
            revert("Insufficient Funds");
        }
    }

    function getBalance(uint256 _serial) public view returns (uint256) {
        uint256 bal = accounts[_serial].balance;
        return bal;
    }

    function getSenderBalance(address payable _account)
        external
        view
        returns (uint256)
    {
        return _account.balance;
    }

    //Function to get the owner
    function getOwner() public view returns (address) {
        return msg.sender;
    }

    function addBalance(
        uint256 _serial,
        uint256 _amount,
        address payable _creator
    ) public payable {
        if (_creator.balance >= _amount / 1000000000000000000 + 1) {
            accounts[_serial].balance += _amount / 1000000000000000000;
            bankBalance += _amount / 1000000000000000000;
        } else {
            revert("Insufficient Funds");
        }
    }

    function withdrawBalance(
        uint256 _serial,
        uint256 _amount,
        address payable _creator
    ) external returns (bool _success) {
        if (accounts[_serial].balance >= _amount / 1000000000000000000 + 1) {
            _creator.transfer(_amount);
            accounts[_serial].balance -= _amount / 1000000000000000000;
            bankBalance -= _amount / 1000000000000000000;
            return true;
        } else {
            revert("Insufficient Funds");
        }
    }
}
