ember-authentication 
====================
A basic example implementation of how we are currently handling authentication in Ember. This example uses Ember CLI 0.0.37 for the front-end and rails 4.1 for the backend api.

### Shout-outs

Most of the Ember authentication code was taken from Eric Berry's great [blog post](http://coderberry.me/blog/2013/07/08/authentication-with-emberjs-part-1/). We had to make a bunch of changes to get it to work with the Ember 1.5.1 and Ember CLI but the mechanics are basically the same.

If you are just getting started with Ember CLI checkout DockYard's great [blog series](http://reefpoints.dockyard.com/2014/05/07/building-an-ember-app-with-rails-part-1.html).

note: This was last tested against Ember CLI 0.0.37. Ember CLI is under heavy development and in constant flux, we recommend you make sure our example is working against 0.0.37 before upgrading to a newer version of Ember CLI.

### Prerequisites
You can probably get away with using slightly different versions but this is what we were using at the time.
* Node.js - 0.10.28
* Ruby - 2.1.2
* Rails - 4.1.0
* ember-cli - 0.0.37
* Postgres


### Build Steps
1. run `git clone git@github.com:greenfieldhq/ember-authentication.git`
1. run `npm install -g ember-cli`
1. cd into `/ember` and run `bower install`
1. cd into `/rails` and run `bundle install`
1. while in `/rails`, run `rake db:setup`
1. inside `/ember` run `ember server --proxy http://localhost:3000`
1. inside `/rails` run `rails s`

Assuming it's all running you should be able to point your browser at http://localhost:4200 and see the sample application. The "Top Secret" link requires authentication, click it and you'll be prompted for your credentials. 

You can look at rails/db/seeds.rb to use one of the test user accounts. Alternatively you can click the "Register" link and create your own.


### Tests
There a few QUnit tests, run them by going to http://localhost:4200/tests
