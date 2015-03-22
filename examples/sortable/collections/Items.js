
Items = new Meteor.Collection("items");

if (Meteor.isServer) {

	if (Items.find().count() == 0) {
		console.log("No Items found. | adding items ...");

		_.each(
			["violet", "unicorn", "flask", "jar", "leitmotif", "rearrange", "right", "ethereal"],
			function(t, i) {
				Items.insert({text: t, rank: i});
			}
		);//each

	}//if

}//if Meteor.isServer