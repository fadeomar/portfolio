import { getCardSymbol } from "../cardsNames";

function findSmallestNumberPosition(arr) {
  // Extract the numbers from the strings and find the smallest one
  const numbers = arr.map((item) => parseInt(item.split("-")[1], 10));
  const smallestNumber = Math.min(...numbers);

  // Find the index of the smallest number
  return numbers.indexOf(smallestNumber);
}

const Table = ({ groundCards }) => {
  return (
    <div className="table-center">
      <div className="table">
        <div className="ground-card-wrapper">
          {!!groundCards.length &&
          groundCards.filter((card) => card.includes("a")).length ? (
            groundCards
              .filter((card) => card.includes("a"))
              .map((a, index, arr) => {
                const cardNumber = a.replace(/\D/g, "");
                const lastOne = findSmallestNumberPosition(arr);
                return (
                  <div
                    className="card played-card text-red-500"
                    style={{
                      top: (10 - Number(cardNumber)) * 15,
                      zIndex: 10 - Number(cardNumber) + 10,
                      justifyContent: lastOne !== index && "flex-start",
                      alignItems: lastOne !== index && "flex-start",
                      fontSize: lastOne !== index && 12,
                    }}
                    key={`played_card_${a}`}
                  >
                    {getCardSymbol(a)}
                  </div>
                );
              })
          ) : (
            <div className="ground-card" type="a"></div>
          )}
        </div>

        {/* type b */}
        <div className="ground-card-wrapper">
          {!!groundCards.length &&
          groundCards.filter((card) => card.includes("b")).length ? (
            groundCards
              .filter((card) => card.includes("b"))
              .map((a, index, arr) => {
                const cardNumber = a.replace(/\D/g, "");
                const lastOne = findSmallestNumberPosition(arr);
                return (
                  <div
                    className="card played-card text-red-500"
                    style={{
                      top: (10 - Number(cardNumber)) * 15,
                      zIndex: 10 - Number(cardNumber) + 10,
                      justifyContent: lastOne !== index && "flex-start",
                      alignItems: lastOne !== index && "flex-start",
                      fontSize: lastOne !== index && 12,
                    }}
                    key={`played_card_${a}`}
                  >
                    {getCardSymbol(a)}
                  </div>
                );
              })
          ) : (
            <div className="ground-card" type="b"></div>
          )}
        </div>

        {/* type c */}
        <div className="ground-card-wrapper">
          {!!groundCards.length &&
          groundCards.filter((card) => card.includes("c")).length ? (
            groundCards
              .filter((card) => card.includes("c"))
              .map((a, index, arr) => {
                const cardNumber = a.replace(/\D/g, "");
                const lastOne = findSmallestNumberPosition(arr);

                return (
                  <div
                    className="card played-card"
                    style={{
                      top: (10 - Number(cardNumber)) * 15,
                      zIndex: 10 - Number(cardNumber) + 10,
                      justifyContent: lastOne !== index && "flex-start",
                      alignItems: lastOne !== index && "flex-start",
                      fontSize: lastOne !== index && 12,
                    }}
                    key={`played_card_${a}`}
                  >
                    {getCardSymbol(a)}
                  </div>
                );
              })
          ) : (
            <div className="ground-card" type="c"></div>
          )}
        </div>

        {/* type d */}
        <div className="ground-card-wrapper">
          {!!groundCards.length &&
          groundCards.filter((card) => card.includes("d")).length ? (
            groundCards
              .filter((card) => card.includes("d"))
              .map((a, index, arr) => {
                const cardNumber = a.replace(/\D/g, "");
                const lastOne = findSmallestNumberPosition(arr);

                return (
                  <div
                    className="card played-card "
                    style={{
                      top: (10 - Number(cardNumber)) * 15,
                      zIndex: 10 - Number(cardNumber) + 10,
                      justifyContent: lastOne !== index && "flex-start",
                      alignItems: lastOne !== index && "flex-start",
                      fontSize: lastOne !== index && 12,
                    }}
                    key={`played_card_${a}`}
                  >
                    {getCardSymbol(a)}
                  </div>
                );
              })
          ) : (
            <div className="ground-card" type="d"></div>
          )}
        </div>
        {/* <div className="ground-card" type="b"></div>
        <div className="ground-card" type="c"></div>
        <div className="ground-card" type="d"></div> */}
      </div>
    </div>
  );
};

export default Table;
