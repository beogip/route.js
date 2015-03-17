/* globals route */
describe('routejs', function()
{
  'use strict';
  var checker;

  beforeEach(function()
  {
    checker = {
      callback: function()
      {

      }
    };
  });

  it('should get "foo" from the url "/foo" with the pattern "/:id"', function()
  {
    checker.callback = function(data)
    {
      expect(data.id).toEqual("foo");
    };

    spyOn(checker, "callback").and.callThrough();

    route("/:id", "/foo", checker.callback);

    expect(checker.callback).toHaveBeenCalled();
  });

  it('should get only "foo" from the url "/foo/var" with the pattern "/:id/var"', function()
  {
    checker.callback = function(data)
    {
      expect(data.id).toEqual("foo");
    };

    spyOn(checker, "callback").and.callThrough();

    route("/:id/var", "/foo/var", checker.callback);

    expect(checker.callback).toHaveBeenCalled();
  });

  it('should get "foo" and "var" from the url "/foo/var" with the pattern /:id/:name', function()
  {
    checker.callback = function(data)
    {
      expect(data.id).toEqual("foo");
      expect(data.name).toEqual("var");
    };

    spyOn(checker, "callback").and.callThrough();

    route("/:id/:name", "/foo/var", checker.callback);

    expect(checker.callback).toHaveBeenCalled();
  });

  it('should get "foo" from url "/:id/*" with pattern "/:id/*"', function()
  {
    checker.callback = function(data)
    {
      expect(data.id).toEqual("foo");
    };

    spyOn(checker, "callback").and.callThrough();

    route("/:id/*", "/foo/var", checker.callback);
    expect(checker.callback).toHaveBeenCalled();
  });

  it('shouldn\'t get any value from the url "/foo/var" with the pattern "/foo/var"', function()
  {
    checker.callback = function(data)
    {
      expect(data).toEqual({});
    };

    spyOn(checker, "callback").and.callThrough();

    route("/foo/var", "/foo/var", checker.callback);

    expect(checker.callback).toHaveBeenCalled();
  });

  it('shouldn\'t execute the callback from url "/foo/var" with pattern "/:id"', function()
  {
    spyOn(checker, "callback");

    route("/:id", "/foo/var", checker.callback);
    expect(checker.callback).not.toHaveBeenCalled();
  });

  it('should execute the callback from url "/foo/var" with pattern "*"', function()
  {
    spyOn(checker, "callback");

    route("*", "/foo/var", checker.callback);
    expect(checker.callback).toHaveBeenCalled();
  });

  it('shouldn\'t execute the callback from url "/foo/var" with pattern "/"', function()
  {
    spyOn(checker, "callback");

    route("/", "/foo/var", checker.callback);
    expect(checker.callback).not.toHaveBeenCalled();
  });
});
