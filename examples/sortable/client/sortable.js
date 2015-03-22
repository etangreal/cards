
// ------------------------------------------------------------------------------------------------
// DECLARATIONS
// ------------------------------------------------------------------------------------------------

var SimpleRationalRanks = {

	beforeFirst: function (firstRank) {
		return firstRank - 1;
	},

	between: function (beforeRank, afterRank) {
		return (beforeRank + afterRank) / 2;
	},

	afterLast: function(lastRank) {
		return lastRank + 1;
	}

}//SimpleRationalRanks

// ------------------------------------------------------------------------------------------------
// SORTABLE
// ------------------------------------------------------------------------------------------------

Template.sortable.helpers({

	items: function () {
		return Items.find({}, { sort: {rank: 1} });
	}

});//Template.sortable.helpers

// ------------------------------------------------------------------------------------------------

Template.sortable.rendered = function () {

	this.$('#list')
		.sortable({ //uses the sortable interaction from jquery ui

			stop: function (e, ui) { //fired when on item is dropped

				//Blaze.getData( $('.item')[0] );

				var el = ui.item.get(0),
				before = ui.item.prev().get(0),
				 after = ui.item.next().get(0);

				var newRank;

				if (!before) { //moving to the top of the list
					after   = Blaze.getData(after);
					newRank = SimpleRationalRanks.beforeFirst(after.rank);

				} else if (!after) { //moving to the bottom of the list 
					before  = Blaze.getData(before);
					newRank = SimpleRationalRanks.afterLast(before.rank);

				} else { //normal situation
					newRank = SimpleRationalRanks.between(
						before.rank, 
						after.rank
					);
				}

				el = Blaze.getData(el);
				Items.update( el._id, { $set: {rank: newRank} } );

			}//stop

		});//sortable

};//onRendered

// ------------------------------------------------------------------------------------------------
// END
// ------------------------------------------------------------------------------------------------