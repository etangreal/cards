
// ------------------------------------------------------------------------------------------------
// DECLARATIONS
// ------------------------------------------------------------------------------------------------

Items = new Mongo.Collection('items');

// ------------------------------------------------------------------------------------------------
// STARTUP
// ------------------------------------------------------------------------------------------------

if (Meteor.isServer) {

	Meteor.startup(function () {

		if (Items.find().count() === 0) {
			
			console.log('collections/items | Items was empty. Adding something ...');

			Items.insert({ title: "item1", list: 1 });
			Items.insert({ title: "item2", list: 2 });
			Items.insert({ title: "item3", list: 3 });
		}

	}); //Meteor.startup

} //if (Meteor.isServer)

// ------------------------------------------------------------------------------------------------
// END
// ------------------------------------------------------------------------------------------------