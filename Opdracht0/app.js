let cars = []

const automerken = ['BMW', 'Mercedes', 'Ferrari', 'Lada']

class car {
  constructor(merk, model){
    this.merk = merk
    this.model = model
  }
}
automerken.forEach(merk => {
  for(let i = 1; i < 4; i++){
    cars.push(new car(merk, i))
  }
});

cars.forEach((auto, index) => {

    if(auto.merk == 'Ferrari'){
      cars[index].PK = index * 200
    }
});

console.log(cars)