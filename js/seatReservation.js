// Class to represent a row in the seat reservations grid
function SeatReservation(name, initialMeal, listener) {
    var self = this;
    self.name = name;
    self.meal = ko.observable(initialMeal);

    self.meal.subscribe(listener);

    self.formattedPrice = ko.computed(function () {
        var price = self.meal().price;
        return price ? formatPrice(price) : "None";
    });
}

function formatPrice(price) {
    return "€ " + price.toFixed(2);
}

// clas for counting selected meals
function AvailableMealCounter(id, name) {
    var self = this;
    self.id = id;
    self.mealName = name;
    self.count = ko.observable("");
};

// Overall viewmodel for this screen, along with initial state
function ReservationsViewModel() {
    var self = this;

    // Non-editable catalog data - would come from the server
    self.availableMeals = [
        { mealId: "1", mealName: "Standard (sandwich)", price: 0 },
        { mealId: "2", mealName: "Vegetarian (salad)", price: 20.25 },
        { mealId: "3", mealName: "Premium (lobster)", price: 34.95 },
        { mealId: "4", mealName: "Ultimate (whole zebra)", price: 290 }
    ];

    // updte counts of selected meals
    self.listener = function (newValue) {
        console.dir(newValue);
        seats =  ko.unwrap(self.seats);
        self.availableMeals.forEach((meal, index) => {
            self.availableMealCounters[index].count(
               seats.filter(seat => seat.meal().mealName === meal.mealName).length
            );
        });
    };


    // Editable data
    self.seats = ko.observableArray([
        new SeatReservation("Steve", self.availableMeals[0], self.listener),
        new SeatReservation("Bert", self.availableMeals[0], self.listener)
    ]);


    // initialze counters for selected meals
    self.availableMealCounters = [];
    self.availableMeals.forEach(meal => {
        self.availableMealCounters.push(new AvailableMealCounter(meal.mealId, meal.mealName))
    })

    // Operations
    self.addSeat = function () {
        self.seats.push(new SeatReservation("new ...", self.availableMeals[0], self.listener));
    };


    self.removeSeat = function () {
        console.debug("remove seat " + this);
        console.dir(this);
        self.seats.remove(this);
    };

    // subscribe listener for seats, in order to update counts on add/remove person 
    self.seats.subscribe(self.listener);


    // compute total surcharges
    self.totalAmount = ko.computed(function () {

        return formatPrice(ko.unwrap(self.seats).reduce((sum, seat, i) => {
            return sum + seat.meal().price
        }, 0));
    });

}

viewModel = new ReservationsViewModel();
ko.applyBindings(viewModel);
// apply listener once for initials counts
viewModel.listener();