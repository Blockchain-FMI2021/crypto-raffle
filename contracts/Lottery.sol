pragma solidity ^0.5.0;
import "@openzeppelin/contracts/math/SafeMath.sol";

contract Lottery {
    using SafeMath for uint256;

    address public manager;
    address payable[] public players;
    mapping(uint256 => mapping(bytes32 => address payable[])) lotteryEntries;
    uint256 private extractionNo;
    uint8 private nrOfNumbers;
    uint256 private basePrize;
    uint256 private accumulatedPrize;

    constructor() public {
        manager = msg.sender;
        extractionNo = 1;
        nrOfNumbers = 6;
        basePrize = 1000;
        accumulatedPrize = 1000;
    }

    function enter(bytes32 entryHash) public payable {
        require(msg.value >= 0.01 ether);
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

    function conversion(uint8[] memory array8)
        public
        pure
        returns (uint256[] memory array256)
    {
        for (uint256 i = 0; i < array8.length; i++) {
            array256[i] = array8[i];
        }

        return array256;
    }

    function getWinnerNumbers() public view returns (uint8[] memory) {
        uint8 limit = 49;
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
        uint8[] memory numbers = getWinnerNumbers();
        string memory numbersConcatenated;
        for (uint8 i = 0; i < nrOfNumbers; i++) {
            numbersConcatenated = appendUintToString(
                numbersConcatenated,
                numbers[i]
            );
        }
        bytes32 winningHash =
            keccak256(abi.encodePacked(block.difficulty, now, players));
        uint256 numberOfWinners =
            lotteryEntries[extractionNo][winningHash].length;
        if (numberOfWinners == 0) {
            accumulatedPrize = accumulatedPrize + basePrize;
        } else {
            uint256 amountWinByEveryParticipant =
                SafeMath.div(accumulatedPrize, numberOfWinners);
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
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    event Winners(address payable[] indexed, uint256);
}
