pragma solidity ^0.5.0;

// import "@openzeppelin/contracts/math/SafeMath.sol";

contract Lottery {
    // using SafeMath for uint256;

    address public manager;
    mapping(uint256 => address[]) players;
    mapping(uint256 => mapping(bytes32 => address payable[])) lotteryEntries;
    uint256 public extractionNo;
    uint8 private nrOfNumbers;
    uint8 private limit;

    function test_getKacAbiEncode(string memory input)
        public
        pure
        returns (bytes32)
    {
        return keccak256(abi.encodePacked(input));
    }

    function test_getWinnerHash() public view returns (bytes32) {
        uint8[] memory numbers = new uint8[](nrOfNumbers);
        for (uint8 index = 0; index < 6; index++) {
            numbers[index] = index + 1;
        }
        string memory numbersConcatenated;
        for (uint8 i = 0; i < nrOfNumbers; i++) {
            numbersConcatenated = appendUintToString(
                numbersConcatenated,
                numbers[i]
            );
        }
        bytes32 winningHash = keccak256(abi.encodePacked(numbersConcatenated));
        return winningHash;
    }

    function test_getAmountWinnedByEveryPlayer() public view returns (uint256) {
        bytes32 winningHash =
            0xc888c9ce9e098d5864d3ded6ebcc140a12142263bace3a23a36f9905f12bd64a;
        uint256 numberOfWinners =
            lotteryEntries[extractionNo][winningHash].length;

        // uint256 amountWinByEveryParticipant =
        // SafeMath.div(accumulatedPrize, numberOfWinners);
        if (numberOfWinners == 0) return 1;

        uint256 amountWinByEveryParticipant = getBalance() / numberOfWinners;

        return amountWinByEveryParticipant;
    }

    function getLotteryEntries()
        public
        view
        returns (address payable[] memory)
    {
        bytes32 x =
            0xc888c9ce9e098d5864d3ded6ebcc140a12142263bace3a23a36f9905f12bd64a;
        return lotteryEntries[extractionNo][x];
    }

    constructor() public {
        manager = msg.sender;
        extractionNo = 0;
        nrOfNumbers = 6;
        limit = 49;
    }

    function enter(bytes32 entryHash) public payable {
        require(msg.value >= 0.01 ether);
        players[extractionNo].push(msg.sender);
        lotteryEntries[extractionNo][entryHash].push(msg.sender);
    }

    function random(uint256 seed) private view returns (uint256) {
        return
            uint256(keccak256(abi.encodePacked(block.difficulty, now, seed)));
    }

    function quickSort(
        uint8[] memory arr,
        int256 left,
        int256 right
    ) private pure {
        int256 i = left;
        int256 j = right;
        if (i == j) return;
        uint256 pivot = arr[uint256(left + (right - left) / 2)];
        while (i <= j) {
            while (arr[uint256(i)] < pivot) i++;
            while (pivot < arr[uint256(j)]) j--;
            if (i <= j) {
                (arr[uint256(i)], arr[uint256(j)]) = (
                    arr[uint256(j)],
                    arr[uint256(i)]
                );
                i++;
                j--;
            }
        }
        if (left < j) quickSort(arr, left, j);
        if (i < right) quickSort(arr, i, right);
    }

    function getWinnerNumbers() private view returns (uint8[] memory) {
        bool[] memory alreadyPicked = new bool[](50);
        for (uint8 i = 0; i < limit; i++) {
            alreadyPicked[i] = false;
        }
        uint256 initialSeed = now;
        uint8[] memory winnerNumbers = new uint8[](nrOfNumbers);

        uint8 temp = uint8((random(initialSeed) % limit) + 1);
        alreadyPicked[temp] = true;
        winnerNumbers[0] = temp;
        for (uint8 i = 1; i < nrOfNumbers; i++) {
            while (alreadyPicked[temp] == true) {
                temp = uint8((random(winnerNumbers[i - 1]) % limit) + 1);
            }

            winnerNumbers[i] = uint8(
                (random(winnerNumbers[i - 1]) % limit) + 1
            );
            alreadyPicked[temp] = true;
        }

        quickSort(winnerNumbers, 0, int256(winnerNumbers.length - 1));

        return winnerNumbers;
    }

    function appendUintToString(string memory inStr, uint256 v)
        private
        pure
        returns (string memory str)
    {
        uint256 maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint256 i = 0;
        while (v != 0) {
            uint256 remainder = v % 10;
            v = v / 10;
            reversed[i++] = bytes1(uint8(48 + remainder));
        }
        bytes memory inStrb = bytes(inStr);
        bytes memory s = new bytes(inStrb.length + i);
        uint256 j;
        for (j = 0; j < inStrb.length; j++) {
            s[j] = inStrb[j];
        }
        for (j = 0; j < i; j++) {
            s[j + inStrb.length] = reversed[i - 1 - j];
        }
        str = string(s);
        return str;
    }

    function pickWinner() public restricted {
        // for testing purposes
        uint8[] memory numbers = new uint8[](nrOfNumbers);
        for (uint8 index = 0; index < 6; index++) {
            numbers[index] = index + 1;
        }

        // uint8[] memory numbers = getWinnerNumbers();
        string memory numbersConcatenated;
        for (uint8 i = 0; i < nrOfNumbers; i++) {
            numbersConcatenated = appendUintToString(
                numbersConcatenated,
                numbers[i]
            );
        }
        bytes32 winningHash = keccak256(abi.encodePacked(numbersConcatenated));
        uint256 numberOfWinners =
            lotteryEntries[extractionNo][winningHash].length;
        if (numberOfWinners > 0) {
            // uint256 amountWinByEveryParticipant =
            // SafeMath.div(accumulatedPrize, numberOfWinners);
            uint256 amountWinByEveryParticipant =
                getBalance() / numberOfWinners;
            for (uint8 i = 0; i < numberOfWinners; i++) {
                lotteryEntries[extractionNo][winningHash][i].transfer(
                    amountWinByEveryParticipant
                );
            }
            emit Winners(
                lotteryEntries[extractionNo][winningHash],
                amountWinByEveryParticipant
            );
        }
        extractionNo += 1;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns (address[] memory) {
        return players[extractionNo];
    }

    function getBalance() public view restricted returns (uint256) {
        return address(this).balance;
    }

    event Winners(address payable[] indexed, uint256);
}
