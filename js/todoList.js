

// Overall viewmodel for this screen, along with initial state
function TodoListViewModel() {
    var self = this;

    self.todoItems = ko.observable();



    // fetch the todo items
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(json => {
            self.todoItems(json)
        })


}

ko.applyBindings(new TodoListViewModel());
