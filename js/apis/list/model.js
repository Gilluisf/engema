 class FirebaseDatabaseFolderModel extends EasyEvents {
 	folder
 	fakeData = {}
 	filterData = null
 	get folderRefFiltered() {
 		if (this.filterData) {
 			var key = Object.keys(this.filterData)[0]
 			var value = this.filterData[key]
 			return this.folderRef.orderByChild(key).equalTo(value)
 		}
 	}
 	get folderRef() {
 		var ref = firebase.database().ref(`${this.folder}/`)

 		return ref
 	}
 	listenChange() {
 		this.folderRef.on('value', snapShot => {
 			let data = snapShot.val()
 			this.triggerEvent('UPDATE', data)

 		})

 	}
 	// Add a new
 	add(data) {

 		var newRef = this.folderRef.push();

 		return newRef.set(data);
 	}

 	// Get all
 	async getAll() {
 		if (Object.keys(this.fakeData).length != 0) return this.fakeData

 		var snapShot = await (this.folderRefFiltered || this.folderRef).once('value')
 		return snapShot.toJSON()
 	}


 	// Delete a book
 	delete(key) {
 		return this.folderRef.child(key).remove()
 	}
 }

 class FirebaseDatabaseFolderController {


 	async displayAll() {
 		try {
 			this.view.showLoader();
 			const items = await this.model.getAll();
 			this.view.displayAll(items);
 		} catch (error) {
 			console.error(error)
 			this.view.showError('Erro');
 		}
 		this.view.hideLoader();
 	}
 	async add(item) {
 		try {
 			this.view.showLoader();
 			await this.model.add(item);
 			this.view.showMessage('Adicionado')
 		} catch (error) {
 			console.error(error)
 			this.view.showError('Error adding book');
 		}
 		this.view.hideLoader();
 	}

 	async delete(item) {
 		try {
 			this.view.showLoader();
 			await this.model.delete(item);
 			this.view.showMessage('Eliminado')
 		} catch (error) {
 			console.error(error)
 			this.view.showError('Error deleting book');
 		}
 		this.view.hideLoader();
 	}
 }

 class FirebaseDatabaseFolderView extends AbsctractView {
 	itemEvents = [
 		'DELETE',
 	]
 	get loaderContainer() {
 		return this.itemsContainer.closest('[id]')
 	}

 	items = {}

 	displayAll(items) {
 		this.itemsContainer.innerHTML = '';
 		for (var key in items) {

 			var item = items[key]

 			var viewInstance = this.display(item, key);
 			this.items[key] = viewInstance

 			this.itemEvents.forEach(event => {
 				viewInstance.on(event, () => this.triggerEvent(event, key))
 			})
 		}
 	}
 }