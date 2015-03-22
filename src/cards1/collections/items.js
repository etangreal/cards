
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

			Items.insert({ title: "item1", list: 1, rank: 1 });
			Items.insert({ title: "item2", list: 1, rank: 2 });
			Items.insert({ title: "item3", list: 1, rank: 3 });

			Items.insert({ title: "item4", list: 2, rank: 4 });
			Items.insert({ title: "item5", list: 2, rank: 5 });
			Items.insert({ title: "item6", list: 2, rank: 6 });

			Items.insert({ title: "item7", list: 3, rank: 7 });
			Items.insert({ title: "item8", list: 3, rank: 8 });
			Items.insert({ title: "item9", list: 3, rank: 9 });
		}

	}); //Meteor.startup

} //if (Meteor.isServer)

// ------------------------------------------------------------------------------------------------
// END
// ------------------------------------------------------------------------------------------------