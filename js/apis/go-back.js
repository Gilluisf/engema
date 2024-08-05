const BackButton = {
	_items:[],
	canGoBack:function(){
		return	this._items.length > 0
	}, goBack:function () {
		if (this.canGoBack()) {
			var lasItem = this._items.pop()

			if (lasItem.isOpen()) {
				lasItem.close()
			} else {
				this.goBack()
			}
		} else {
		    
			cordova.plugins.backgroundMode.moveToBackground()
			
		}
	}, setItem:function(obect){
		this._items.push(obect)
	}
}

document.addEventListener('backbutton',() => BackButton.goBack())