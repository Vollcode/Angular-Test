
var mock = require('protractor-http-mock');

beforeEach(function(){
  mock([{
    request: {
      path: 'http://quiet-beach-24792.herokuapp.com/todos.json',
      method: 'GET'
    },
    response: {
      data: [{text: "ToDo1", completed: true}, {text: "ToDo2", completed: false}]
    }
    }]);
  });

describe("app", function() {
  it("should get home page title", function() {
    browser.get('/');
    expect(browser.getTitle()).toEqual("Todos App");
  });
});

describe('Todos tracker', function() {
  it('has several todos', function() {
    browser.get('/');
    var todos = $$('#todos p');
    expect(todos.first().getText()).toEqual('ToDo1: completed');
    expect(todos.last().getText()).toEqual('ToDo2: not completed');
  });

  it('can add a ToDo', function() {
    browser.get('/');
    $('#new-todo-name').sendKeys("NewToDo");
    $('#add-todo').click();

    var todo = $$('#todos p').last().getText();
    expect(todo).toEqual('NewToDo: not completed');
  });

  it('can remove a ToDo', function() {
    browser.get('/');
    var todos = $$('#todos p');
    var initialCount = todos.count();
    $('#remove-todo').click();
    expect(todos.count()).toEqual(1);
  });

  it('can mark a ToDo as complete', function(){
    browser.get('/');
    var todo = $$('#todos p').last();
    todo.element(by.css('.complete')).click();

    expect(todo.getText()).toEqual("ToDo2: completed");
    });
  });

  afterEach(function(){
    mock.teardown();
  });
