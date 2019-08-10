const UI = {
  numberWithCommas: (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  randomize: (startingNumber, endingNumber) => Math.floor(Math.random() * (endingNumber - startingNumber)) + startingNumber,
};

export default UI;