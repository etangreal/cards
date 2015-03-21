
// ------------------------------------------------------------------------------------------------
// INITIALIZE
// ------------------------------------------------------------------------------------------------

$(function() {
	
	$( "#sortable1, #sortable2, #sortable3" )
		.sortable({
			connectWith: ".connectedSortable"
		})
		.disableSelection();

});

// ------------------------------------------------------------------------------------------------
// ADD CARD
// ------------------------------------------------------------------------------------------------

Template.addCard.events({

	'click button' : function(e,t) {
		// Items.
	},

	// --------------------------------------------------------------------------------------------

	'keypress #text' : function(e,t) {
		var ckENTER = 13;
		if (e.keyCode === ckENTER) {
			var input = t.find("input");
			var nr = parseInt(this.nr);
			Items.insert({ title: input.value, list: nr});
		}
	}

}); //search.events

// ------------------------------------------------------------------------------------------------

// Template.itemList.events({

// 	'click' : function(e,t) {
// 		console.log('item clicked...');
// 	}

// }); //itemList.helpers


// ------------------------------------------------------------------------------------------------
// LIST
// ------------------------------------------------------------------------------------------------

Template.list.helpers({
	items : function(nr) {
		nr = parseInt(nr);
		return Items.find({list: nr});
	},

	isInList: function(item, val) {
		return (item.list === parseInt(val));
	}
});

// ------------------------------------------------------------------------------------------------
// ITEM
// ------------------------------------------------------------------------------------------------

Template.item.events({
	'click' : function(e,t) {
		var item = this;

		Session.set('editing', item);
	},

	'keypress' : function(e,t) {
		var ckENTER = 13;
		if (e.keyCode === ckENTER) {
			var input = t.find("input");

			Items.update( t.data._id, { $set: { title: input.value}} );
			Session.set('editing', false);
		}
	}
}); //item.events

// ------------------------------------------------------------------------------------------------

Template.item.helpers({
	isEditing: function() {
		var item = Session.get('editing');
		return item ? (this._id === item._id) : false;
	},
});

// ------------------------------------------------------------------------------------------------
// END
// ------------------------------------------------------------------------------------------------
