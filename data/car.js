class Car{
    brand;
    model;
    #speed=0;
    isTrunkOpen=false;
    constructor(carDetails){
        this.brand=carDetails.brand;
        this.model=carDetails.model;
    }
    openTrunk(){
        if(this.#speed<0){
            this.isTrunkOpen=true;
        }
    }
    closeTrunk(){
        this.isTrunkOpen=false;
    }
    go(){
        if(!this.isTrunkOpen){
            this.#speed <=200-5 ? this.#speed +=5 : this.#speed=this.#speed;
        }      
    }
    break(){
        this.#speed<=5?this.#speed===0:this.#speed-=5;
    }
    displayInfo(){
    return `${this.brand} ${this.model}, Speed: ${this.#speed} km/h, isTrunkOpen: ${this.isTrunkOpen}`;
    }
}

class RaceCar extends Car{
    acceleration;
    constructor(carDetails){
        super(carDetails);
        this.acceleration=carDetails.acceleration;
    }
    go() {
        if (!this.isTrunkOpen) {
            this.speed <= 300-(this.acceleration+5) ? this.speed +=(this.acceleration+5)  : this.speed = this.speed;
        }
    }
    break() {
        this.speed <= 5 ? this.speed === 0 : this.speed -= 5;
    }
    openTrunk() {
       super.openTrunk();
    }
    closeTrunk() {
        super.closeTrunk();
    }
}
const cars = [
    new Car({
        brand:'Toyota',
        model: 'Corolla'
    }),
    new Car({
        brand:'Tesla',
        model:'Model 3'
    })
];

const raceCars =[
    new RaceCar({
    brand:'McLaren',
    model:'F1',
    acceleration:20
    })  
];




// console.log(cars);
cars.forEach((car)=>{
    let i=0;
    let randomNumber;
    car.openTrunk();
    while(i<5){
        randomNumber=Math.random();
        randomNumber<=0.5? car.go():car.break();
        console.log(randomNumber);
        i++;
    }
    console.log(car.displayInfo());
});