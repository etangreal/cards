
// ------------------------------------------------------------------------------------------------
// SORTABLE
// ------------------------------------------------------------------------------------------------

$(function() {
	'use strict'

	var _list = 1;

	// --------------------------------------------------------------------------------------------

	var stop = function (e, ui) {

		var newRank = 0,
			prev = ui.item.prev().get(0),
			curr = ui.item.get(0),
			next = ui.item.next().get(0);

		if (!prev) { //moving to the top of the list
			next    = Blaze.getData(next);
			newRank = next.rank - 1;

		} else if (!next) { //moving to the bottom of the list 
			prev  	= Blaze.getData(prev);
			newRank = prev.rank + 1;

		} else { //moving inbetween two items on the list | to empty list
			next 	= Blaze.getData(next);
			prev  	= Blaze.getData(prev);
			newRank = (prev.rank + next.rank) / 2;
		}

		curr = Blaze.getData(curr);

		Items.update( curr._id, {$set: {list: _list, rank: newRank}} );

	}//stop

	// --------------------------------------------------------------------------------------------

	var receive = function (e, ui) {
		var nr = parseInt( this.id.replace(/\D/g,'') );
		_list = nr;
	}

	// --------------------------------------------------------------------------------------------

	$("#sortable1, #sortable2, #sortable3")
		.sortable({
			connectWith: ".connectedSortable",
			receive: receive,
			stop: stop,
		})
		.disableSelection();

	// --------------------------------------------------------------------------------------------

}); // SORTABLE

// ------------------------------------------------------------------------------------------------
// LIST
// ------------------------------------------------------------------------------------------------

Template.list.helpers({

	items : function(nr) {
		nr = parseInt(nr) || 1;

		return Items.find( {list: nr}, {sort: {rank: 1}} );;
	},

	// --------------------------------------------------------------------------------------------

	isInList: function(item, val) {
		return (item.list === parseInt(val));
	}

}); //list

// ------------------------------------------------------------------------------------------------
// ADD-ITEM
// ------------------------------------------------------------------------------------------------

Template.addItem.events({

	'keypress #text' : function(e,t) {
		var ckENTER = 13;
		if (e.keyCode === ckENTER) {
			var input = t.find("input");
			var nr = parseInt(this.nr);

			Items.insert({ title: input.value, list: nr});
			input.value = "";
		}
	}

}); //search.events

// ------------------------------------------------------------------------------------------------
// ITEM
// ------------------------------------------------------------------------------------------------

Template.item.events({

	'click' : function(e,t) {
		Session.set('editing', this);
	},

	'keypress' : function(e,t) {
		var ckENTER = 13;
		if (e.keyCode === ckENTER) {
			var input = t.find("input");

			Items.update( t.data._id, { $set: {title: input.value} } );
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

}); //item.helpers

// ------------------------------------------------------------------------------------------------
// END
// ------------------------------------------------------------------------------------------------
